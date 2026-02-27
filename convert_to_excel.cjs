const fs = require('fs');
const XLSX = require('xlsx');

const data = JSON.parse(fs.readFileSync('solaris-results-2026-02-27.json', 'utf-8'));

const ratingsMap = {};
const allMembers = new Set();

for (const [movieId, movieData] of Object.entries(data)) {
  const title = movieData.title.replace(' 短评', '');
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

XLSX.writeFile(workbook, 'solaris-results-2026-02-27.xlsx');
console.log('Excel文件已生成：solaris-results-2026-02-27.xlsx');
