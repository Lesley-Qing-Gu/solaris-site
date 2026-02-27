const fs = require('fs');
const ExcelJS = require('exceljs');

const data = JSON.parse(fs.readFileSync('solaris-results-2026-02-27.json', 'utf-8'));

const ratingsMap = {};
const allMembers = new Set();

for (const [movieId, movieData] of Object.entries(data)) {
  const title = movieData.title_en || movieData.title.replace(' 短评', '');
  ratingsMap[title] = {};
  
  movieData.users.forEach(userRating => {
    const match = userRating.match(/(.+?)\((\d+)★\)/);
    if (match) {
      const member = match[1];
      const rating = parseInt(match[2]);
      ratingsMap[title][member] = rating;
      allMembers.add(member);
    }
  });
}

const sortedMembers = Array.from(allMembers).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
const sortedTitles = Object.keys(ratingsMap).sort();

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Ratings');

// 添加表头
const headerRow = worksheet.addRow(['电影', ...sortedMembers]);

// 添加数据行
sortedTitles.forEach(title => {
  const row = [title];
  sortedMembers.forEach(member => {
    row.push(ratingsMap[title][member] || '');
  });
  worksheet.addRow(row);
});

// 设置列宽
const maxTitleLength = Math.max(...sortedTitles.map(t => t.length));
worksheet.getColumn(1).width = maxTitleLength;
for (let i = 2; i <= sortedMembers.length + 1; i++) {
  worksheet.getColumn(i).width = 6;
}

// 设置样式
worksheet.eachRow((row, rowNumber) => {
  row.eachCell((cell, colNumber) => {
    // 字体
    cell.font = { 
      name: 'Calibri', 
      size: 24, 
      bold: rowNumber === 1 && colNumber === 1 
    };
    
    // 对齐
    cell.alignment = { 
      vertical: 'middle', 
      horizontal: 'center',
      textRotation: rowNumber === 1 && colNumber > 1 ? 90 : 0
    };
    
    // 填充颜色
    if (rowNumber === 1) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000000' } };
      cell.font = { ...cell.font, color: { argb: 'FFFFFFFF' } };
    } else if (rowNumber % 2 === 0) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
    } else {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
    }
  });
});

workbook.xlsx.writeFile('solaris-results-2026-02-27-final.xlsx')
  .then(() => console.log('Excel文件已生成：solaris-results-2026-02-27-final.xlsx'));
