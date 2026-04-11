figma.showUI(__html__, { width: 400, height: 620 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {
    const rawText = msg.data;

    const selection = figma.currentPage.selection[0];
    if (!selection) {
      figma.notify("❌ 请先选中一个卡片组件实例");
      figma.ui.postMessage({ type: 'done', text: '请先选中一个卡片组件实例' });
      return;
    }

    // 加载字体
    const textNodes = (selection.findAll ? selection.findAll(n => n.type === "TEXT") : []);
    for (const node of textNodes) await figma.loadFontAsync(node.fontName);

    // ========== 检测输入格式 ==========
    const isFilmDirectorFormat = /^film\s*[：:]/im.test(rawText);

    const cards = [];

    if (isFilmDirectorFormat) {
      // ===== 格式B: film:/director: 格式 =====
      const filmMatch = rawText.match(/^film\s*[：:]\s*(.+)$/im);
      const dirMatch = rawText.match(/^director\s*[：:]\s*(.+)$/im);
      const filmName = filmMatch ? filmMatch[1].trim() : "未知电影";
      const director = dirMatch ? dirMatch[1].trim() : "";

      // 解析短评: 支持 "用户名 看过 ★★★" 和 "用户名 ★★★ 看过"
      const reviews = [];
      let currentReview = null;
      const lines = rawText.split('\n');

      for (const line of lines) {
        const trimmed = line.trim();
        if (/^film\s*[：:]/i.test(trimmed) || /^director\s*[：:]/i.test(trimmed)) continue;

        // 格式: 用户名 看过 ★★★ 日期
        const userMatchA = trimmed.match(/^(.+?)\s+看过\s+([★☆]+)\s+(.*)$/);
        // 格式: 用户名 ★★★ 看过 日期
        const userMatchB = trimmed.match(/^(.+?)\s+([★☆]+)\s*看过\s+(.*)$/);
        // 格式: 用户名 Watched ★★★ 日期
        const userMatchC = trimmed.match(/^(.+?)\s+Watched\s+([★☆]+)\s+(.*)$/i);
        // 格式: 用户名 ★★★ Watched 日期
        const userMatchD = trimmed.match(/^(.+?)\s+([★☆]+)\s*Watched\s+(.*)$/i);

        const um = userMatchA || userMatchB || userMatchC || userMatchD;
        if (um) {
          if (currentReview) reviews.push(currentReview);
          currentReview = {
            name: um[1].trim(),
            stars: um[2],
            content: ''
          };
          continue;
        }

        if (trimmed && currentReview) {
          if (currentReview.content) currentReview.content += '\n';
          currentReview.content += trimmed;
        }
      }
      if (currentReview) reviews.push(currentReview);

      for (const r of reviews) {
        cards.push({ filmName, director, reviews: [r], merged: false });
      }

    } else {
      // ===== 格式A: 短评格式 =====
      const lines = rawText.split('\n');
      let currentFilmName = null;
      let currentDirector = '';
      let currentGrouped = false;
      let currentReview = null;
      const filmBlocks = [];

      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();

        // 检测电影标题行
        const titleMatch = trimmed.match(/^(.+?)\s*短评(\d*)\s*(这[两三四五六七八九十\d]+[段个]放在一张上)?\s*$/);
        const titleMatchEN = trimmed.match(/^(.+?)\s*Review\s*(\d*)\s*(put .* on one card)?$/i);
        const tm = titleMatch || titleMatchEN;

        if (tm && !/★/.test(trimmed) && !/看过/.test(trimmed) && !/Watched/i.test(trimmed)) {
          const rawTitle = tm[1].trim();
          const pipeMatch = rawTitle.match(/^(.+?)\s*\|\s*(.+)$/);
          if (pipeMatch) {
            currentFilmName = pipeMatch[1].trim();
            currentDirector = pipeMatch[2].trim();
          } else {
            currentFilmName = rawTitle;
            currentDirector = '';
          }
          currentGrouped = !!tm[3];
          currentReview = null;

          let block = filmBlocks.find(b => b.filmName === currentFilmName && b === filmBlocks[filmBlocks.length - 1]);
          if (!block) {
            block = { filmName: currentFilmName, director: currentDirector, entries: [] };
            filmBlocks.push(block);
          } else if (currentDirector) {
            block.director = currentDirector;
          }
          block.entries.push({ grouped: currentGrouped, reviews: [] });
          continue;
        }

        // 检测用户评分行（两种星级位置）
        const userMatchA = trimmed.match(/^(.+?)\s+([★☆]+)\s*(?:看过|Watched)\s+(.*)$/);
        const userMatchB = trimmed.match(/^(.+?)\s+(?:看过|Watched)\s+([★☆]+)\s+(.*)$/);
        const userMatch = userMatchA || userMatchB;

        if (userMatch && filmBlocks.length > 0) {
          const block = filmBlocks[filmBlocks.length - 1];
          const entry = block.entries[block.entries.length - 1];
          currentReview = {
            name: userMatch[1].trim(),
            stars: userMatch[2],
            content: ''
          };
          entry.reviews.push(currentReview);
          continue;
        }

        // 内容行
        if (trimmed && currentReview) {
          if (currentReview.content) currentReview.content += '\n';
          currentReview.content += trimmed;
        }
      }

      for (const block of filmBlocks) {
        for (const entry of block.entries) {
          if (entry.grouped && entry.reviews.length > 1) {
            cards.push({ filmName: block.filmName, director: block.director, reviews: entry.reviews, merged: true });
          } else {
            for (const r of entry.reviews) {
              cards.push({ filmName: block.filmName, director: block.director, reviews: [r], merged: false });
            }
          }
        }
      }
    }

    // ========== 生成Figma卡片 ==========
    let yOffset = selection.height + 60;

    for (const card of cards) {
      const instance = selection.createInstance ? selection.createInstance() : selection.clone();

      // --- FilmTitle ---
      const filmTitleLayer = instance.findOne(n => n.name === "FilmTitle");
      if (filmTitleLayer && filmTitleLayer.type === "TEXT") {
        filmTitleLayer.characters = card.filmName;
        const maxWidth = 300;
        filmTitleLayer.textAutoResize = "WIDTH_AND_HEIGHT";
        if (filmTitleLayer.width > maxWidth) {
          filmTitleLayer.textAutoResize = "HEIGHT";
          filmTitleLayer.resize(maxWidth, filmTitleLayer.height);
          filmTitleLayer.lineHeight = { value: 35, unit: 'PIXELS' };
          filmTitleLayer.y = 90;
          filmTitleLayer.x = instance.width - maxWidth - 74;
        } else {
          filmTitleLayer.textAutoResize = "WIDTH_AND_HEIGHT";
          filmTitleLayer.y = 103;
          filmTitleLayer.x = instance.width - filmTitleLayer.width - 74;
        }
      }

      // --- ReviewText ---
      const reviewTextLayer = instance.findOne(n => n.name === "ReviewText");
      if (reviewTextLayer && reviewTextLayer.type === "TEXT") {
        let text;
        if (card.merged) {
          text = card.reviews.map(r =>
            r.name + "  " + r.stars + "\n" + r.content
          ).join("\n\n");
        } else {
          text = card.reviews[0].content;
        }

        const fixedWidth = 932;
        reviewTextLayer.textAlignHorizontal = "LEFT";
        reviewTextLayer.textAlignVertical = "TOP";
        reviewTextLayer.characters = text;
        reviewTextLayer.textAutoResize = "NONE";
        reviewTextLayer.resize(fixedWidth, 10);
        reviewTextLayer.textAutoResize = "HEIGHT";
        reviewTextLayer.x = (instance.width - fixedWidth) / 2;
        const visualCenterY = instance.height / 2 - 40;
        reviewTextLayer.y = visualCenterY - (reviewTextLayer.height / 2);
      }

      // --- UserName & Stars ---
      const fillText = (name, val) => {
        const t = instance.findOne(n => n.name === name);
        if (t && t.type === "TEXT") t.characters = val || "";
      };
      fillText("DirectorName", card.director || "");
      if (card.merged) {
        fillText("UserName", "");
      } else {
        fillText("UserName", card.reviews[0].name + "  " + card.reviews[0].stars);
      }
      fillText("Stars", "");

      instance.y = selection.y + yOffset;
      instance.x = selection.x;
      yOffset += instance.height + 40;
      figma.currentPage.appendChild(instance);
    }

    figma.notify("✅ 已生成 " + cards.length + " 张卡片");
    figma.ui.postMessage({ type: 'done', text: '已生成 ' + cards.length + ' 张卡片' });
  }
};
