figma.showUI(__html__, { width: 400, height: 520 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {
    const rawText = msg.data;

    // 1. 抓取电影信息
    const filmTitleMatch = rawText.match(/film\s*:\s*["']?([^"',\n]+)["']?/i);
    const directorNameMatch = rawText.match(/director\s*:\s*["']?([^"',\n]+)["']?/i);
    const filmTitle = filmTitleMatch ? filmTitleMatch[1].trim() : "未知电影";
    const directorName = directorNameMatch ? directorNameMatch[1].trim() : "未知导演";

    // 2. 解析影评列表
    const reviews = [];
    const reviewRegex = /([^\n]+?)\s+([★☆]+)\s+看过[\s\S]+?\n([\s\S]+?)(?=\n[^\n]+?\s+[★☆]+\s+看过|$)/g;
    let match;
    while ((match = reviewRegex.exec(rawText)) !== null) {
      reviews.push({ name: match[1].trim(), stars: match[2], content: match[3].trim() });
    }

    const selection = figma.currentPage.selection[0];
    if (!selection) {
      figma.notify("❌ 请先选中一个卡片组件实例");
      return;
    }

    // 3. 加载字体
    const textNodes = (selection.findAll ? selection.findAll(n => n.type === "TEXT") : []);
    for (const node of textNodes) await figma.loadFontAsync(node.fontName);

    // 4. 批量生成
    let yOffset = selection.height + 60;
    
    for (const item of reviews) {
      const instance = selection.createInstance ? selection.createInstance() : selection.clone();
      
      // --- 处理 FilmTitle ---
      const filmTitleLayer = instance.findOne(n => n.name === "FilmTitle");
      if (filmTitleLayer && filmTitleLayer.type === "TEXT") {
        filmTitleLayer.characters = filmTitle;
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

      // --- 处理 ReviewText (针对图片布局修正) ---
      const reviewTextLayer = instance.findOne(n => n.name === "ReviewText");
      if (reviewTextLayer && reviewTextLayer.type === "TEXT") {
          const fixedWidth = 932; 
          
          reviewTextLayer.textAlignHorizontal = "LEFT";
          reviewTextLayer.textAlignVertical = "TOP"; 
          reviewTextLayer.characters = item.content;

          // 强制刷新高度
          reviewTextLayer.textAutoResize = "NONE";
          reviewTextLayer.resize(fixedWidth, 10);
          reviewTextLayer.textAutoResize = "HEIGHT"; 

          // X 轴水平居中
          reviewTextLayer.x = (instance.width - fixedWidth) / 2;
          
          /**
           * Y 轴算法修正：
           * 从图片看，影评区域大约在 Y=200 到 Y=1000 之间
           * 视觉中心点设为卡片物理高度的中心稍微偏上一点 (减去底部用户名的占用空间)
           */
          const visualCenterY = instance.height / 2 - 40; // 这里的 -40 是为了避开底部的用户名区域
          reviewTextLayer.y = visualCenterY - (reviewTextLayer.height / 2);
      }

      // --- 填充其他字段 ---
      const fillText = (name, val) => {
        const t = instance.findOne(n => n.name === name);
        if (t && t.type === "TEXT") t.characters = val || "";
      };
      fillText("DirectorName", directorName);
      fillText("UserName", item.name);
      fillText("Stars", item.stars);

      instance.y = selection.y + yOffset;
      instance.x = selection.x;
      yOffset += instance.height + 40; 
      figma.currentPage.appendChild(instance);
    }
    figma.notify("✅ 已完成");
  }
};