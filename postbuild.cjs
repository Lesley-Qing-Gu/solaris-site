const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, 'dist');
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

const pages = {
  '/about': {
    title: 'About — SOLARIS',
    description: 'SOLARIS is a Chinese cinephile collective dedicated to the discussion and exploration of cinema, viewing experiences, and film culture.',
  },
  '/members': {
    title: 'Members — SOLARIS',
    description: 'Meet the editorial team behind SOLARIS.',
  },
  '/monthly-ratings': {
    title: 'Monthly Ratings — SOLARIS',
    description: 'Monthly film ratings and scores by SOLARIS editors.',
  },
  '/annual-top10': {
    title: 'Annual Top 10 — SOLARIS',
    description: 'SOLARIS Annual Top 10 films of the year.',
  },
  '/film-festivals': {
    title: 'Film Festivals — SOLARIS',
    description: 'On-the-ground coverage from Cannes, Berlin, Pingyao and other film festivals.',
  },
  '/reviews': {
    title: 'Reviews — SOLARIS',
    description: 'Film reviews and critical writing by SOLARIS editors.',
  },
  '/news': {
    title: 'News — SOLARIS',
    description: 'Latest news and updates from SOLARIS.',
  },
  '/reviews/tt35499025-review': {
    title: '生活是诗还是电影？ — SOLARIS',
    description: 'Review of What Does that Nature Say to You (Sang-soo Hong, 2025) by 欧.',
  },
  '/reviews/yes-review': {
    title: '笔记：同义词 — SOLARIS',
    description: 'Review of Yes (Nadav Lapid, 2025) by 欧.',
  },
  '/reviews/two-seasons-two-strangers-review': {
    title: '笔记：陌生的三宅唱，陌生的电影 — SOLARIS',
    description: 'Review of Two Seasons, Two Strangers (Sho Miyake, 2025) by 欧.',
  },
  '/reviews/enzo-review': {
    title: '你的世界。 — SOLARIS',
    description: 'Review of Enzo (Robin Campillo, 2025) by Cardinal.',
  },
  '/reviews/eat-the-night-review': {
    title: '世界的终结，青春的终结 — SOLARIS',
    description: 'Review of Eat the Night (Caroline Poggi & Jonathan Vinel, 2024) by 迷宫中的站起来.',
  },
  '/reviews/man-and-cow-review': {
    title: '人与牛。 — SOLARIS',
    description: 'Review of Afternoons of Solitude (Albert Serra, 2024) by Cardinal.',
  },
  '/festival-coverage/cannes-2024-day3': { title: 'Argentine Cinema & First Surprises - Day 3 — SOLARIS', description: 'Cannes 2024 Day 3 coverage by KID Y.' },
  '/festival-coverage/cannes-2024-day4': { title: 'Emilia Pérez & Lou Ye\'s Unfinished Film - Day 4 — SOLARIS', description: 'Cannes 2024 Day 4 coverage by KID Y.' },
  '/festival-coverage/cannes-2024-day6': { title: 'Eephus & Carax\'s Self-Portrait - Day 6 — SOLARIS', description: 'Cannes 2024 Day 6 coverage by KID Y.' },
  '/festival-coverage/cannes-2024-day8': { title: 'Cronenberg\'s The Shrouds - Day 8 — SOLARIS', description: 'Cannes 2024 Day 8 coverage by KID Y.' },
  '/festival-coverage/cannes-2023-day0': { title: 'Ticket Grabbing Battle - Day 0 — SOLARIS', description: 'Cannes 2023 Day 0 coverage by zyt.' },
  '/festival-coverage/cannes-2023-day1': { title: 'Sleepless Night & Five Films Marathon - Day 1 — SOLARIS', description: 'Cannes 2023 Day 1 coverage by zyt.' },
  '/festival-coverage/cannes-2023-day2-day3': { title: 'The Zone of Interest & Gourmet\'s Death — SOLARIS', description: 'Cannes 2023 Day 2-3 coverage by zyt.' },
  '/festival-coverage/pyiff-2024-between-the-kinos': { title: 'Between the Kinos - 8th Pingyao Film Festival — SOLARIS', description: 'Pingyao 2024 coverage by 欧 & zyt.' },
  '/festival-coverage/cannes-2024-day0': { title: 'The Battle of Ticketing - Day 0 — SOLARIS', description: 'Cannes 2024 Day 0 coverage by zyt.' },
  '/festival-coverage/cannes-2024-day1': { title: 'OMG! She\'s Got No Name - Day 1 — SOLARIS', description: 'Cannes 2024 Day 1 coverage by zyt.' },
  '/festival-coverage/cannes-2024-day2-day3': { title: 'Life is a Movie - Day 2 and 3 — SOLARIS', description: 'Cannes 2024 Day 2-3 coverage by zyt & LesleyGujiji.' },
  '/festival-coverage/berlin-2025-day0': { title: 'What did Berlin 2025 say to you? — SOLARIS', description: 'Berlin 2025 Day 0 coverage by zyt & LesleyGujiji.' },
  '/festival-coverage/berlin-2025-final': { title: 'The End of the Spree - Berlin final — SOLARIS', description: 'Berlin 2025 final coverage by zyt & LesleyGujiji.' },
  '/festival-coverage/cannes-2025-final': { title: 'Please Return My Mastermind for Free - Cannes final — SOLARIS', description: 'Cannes 2025 final coverage by zyt & LesleyGujiji.' },
  '/festival-coverage/pyiff-2025-day1': { title: 'One Battle After Another! - Day 1 — SOLARIS', description: 'Pingyao 2025 Day 1 coverage by 欧.' },
  '/festival-coverage/pyiff-2025-day2': { title: 'Meeting Xin Zhilei - Day 2 — SOLARIS', description: 'Pingyao 2025 Day 2 coverage by 欧.' },
  '/festival-coverage/pyiff-2025-day3': { title: 'Can\'t Understand Cannes Competition - Day 3 — SOLARIS', description: 'Pingyao 2025 Day 3 coverage by 欧.' },
  '/festival-coverage/pyiff-2025-day4': { title: 'I am a Female SWAT - Day 4 — SOLARIS', description: 'Pingyao 2025 Day 4 coverage by 欧.' },
  '/festival-coverage/pyiff-2025-day5': { title: 'Hangzhou New Wave in Pingyao - Day 5 — SOLARIS', description: 'Pingyao 2025 Day 5 coverage by 欧.' },
  '/festival-coverage/berlinale-2026-report': { title: 'Beyond the Golden Bear: Berlin 2026 — SOLARIS', description: 'Berlin 2026 report by KID Y.' },
};

let count = 0;
for (const [route, meta] of Object.entries(pages)) {
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${meta.description}"`)
    .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${meta.title}"`)
    .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${meta.description}"`);

  const dir = path.join(DIST, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  count++;
}

console.log(`✅ Generated ${count} static HTML pages`);
