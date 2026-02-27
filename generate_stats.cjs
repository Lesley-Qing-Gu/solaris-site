const fs = require('fs');

const data = JSON.parse(fs.readFileSync('solaris-results-2026-02-27.json', 'utf-8'));

const results = [];

for (const [movieId, movieData] of Object.entries(data)) {
  const title = movieData.title.replace(' 短评', '');
  const scored = movieData.scored;
  const average = parseFloat(movieData.average).toFixed(2);
  
  results.push([title, `${average} (${scored})`]);
}

const output = results.map(item => `  ["${item[0]}", "${item[1]}"],`).join('\n');
console.log(output);
