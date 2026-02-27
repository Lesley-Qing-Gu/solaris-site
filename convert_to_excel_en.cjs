const fs = require('fs');
const XLSX = require('xlsx');

const data = JSON.parse(fs.readFileSync('solaris-results-2026-02-27.json', 'utf-8'));

const titleMap = {
  "圣女贞德": "Joan of Arc",
  "夜来风雨声": "Voice of Rain That Comes at Night",
  "水之年代": "The Chronology of Water",
  "时空奇旅": "Arco",
  "狂野时代": "Resurrection",
  "哈姆奈特": "Hamnet",
  "阿姆鲁姆": "Amrum",
  "约瑟夫·门格勒的消失": "The Disappearance of Josef Mengele",
  "母亲的宝贝": "Mother's Baby",
  "是的": "Yes",
  "孤儿": "Orphan",
  "开麦了吗？": "Is This Thing On?",
  "镖人：风起大漠": "Blades of the Guardians: Wind Rises in the Desert",
  "奇怪的河流": "Strange River",
  "箭下的贞德": "Joan of Arc",
  "至尊马蒂": "Marty Supreme",
  "新凯旋门": "The Great Arch",
  "亨利·方达竞选总统": "Henry Fonda for President",
  "你行！你上！": "You are the Best",
  "死人开关": "Dead Man's Wire",
  "星河入梦": "Per Aspera Ad Astra",
  "后座": "Pillion",
  "女孩": "Girl",
  "恩典": "La Grazia",
  "惊蛰无声": "Scare Out",
  "飞驰人生3": "Pegasus 3"
};

const ratingsMap = {};
const allMembers = new Set();

for (const [movieId, movieData] of Object.entries(data)) {
  const chineseTitle = movieData.title.replace(' 短评', '');
  const englishTitle = titleMap[chineseTitle] || chineseTitle;
  ratingsMap[englishTitle] = {};
  
  movieData.users.forEach(userRating => {
    const match = userRating.match(/(.+?)\((\d+)★\)/);
    if (match) {
      const member = match[1];
      const rating = parseInt(match[2]);
      ratingsMap[englishTitle][member] = rating;
      allMembers.add(member);
    }
  });
}

const sortedMembers = Array.from(allMembers).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
const sortedTitles = Object.keys(ratingsMap).sort();

const worksheetData = [['电影', ...sortedMembers]];

sortedTitles.forEach(title => {
  const row = [title];
  sortedMembers.forEach(member => {
    row.push(ratingsMap[title][member] || '');
  });
  worksheetData.push(row);
});

const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Ratings');

XLSX.writeFile(workbook, 'solaris-results-2026-02-27-en.xlsx');
console.log('Excel文件已生成：solaris-results-2026-02-27-en.xlsx');
