const fs = require('fs');

const solarisResults = JSON.parse(fs.readFileSync('solaris-results-2026-02-27.json', 'utf-8'));
const doubanMovies = JSON.parse(fs.readFileSync('douban_movies.json', 'utf-8'));

const doubanMap = {};
doubanMovies.forEach(movie => {
  const englishTitle = movie.input.split('(')[0].trim();
  doubanMap[movie.douban_id] = englishTitle;
});

for (const [doubanId, movieData] of Object.entries(solarisResults)) {
  const englishTitle = doubanMap[doubanId] || '';
  movieData.title_en = englishTitle;
}

fs.writeFileSync('solaris-results-2026-02-27.json', JSON.stringify(solarisResults, null, 2), 'utf-8');
console.log('已添加英文标题到 solaris-results-2026-02-27.json');
