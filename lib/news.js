import sql from 'better-sqlite3';

const DUMMY_NEWS = [
  {
    id: 1,
    slug: 'will-ai-replace-humans',
    title: 'Will AI Replace Humans?',
    image: 'ai-robot.jpg',
    date: '2021-07-01',
    content:
      'Since late 2022 AI is on the rise and therefore many people worry whether AI will replace humans. The answer is not that simple. AI is a tool that can be used to automate tasks, but it can also be used to augment human capabilities. The future is not set in stone, but it is clear that AI will play a big role in the future. The question is how we will use it.',
  },
  {
    id: 2,
    slug: 'beaver-plague',
    title: 'A Plague of Beavers',
    image: 'beaver.jpg',
    date: '2022-05-01',
    content:
      'Beavers are taking over the world. They are building dams everywhere and flooding entire cities. What can we do to stop them?',
  },
  {
    id: 3,
    slug: 'couple-cooking',
    title: 'Spend more time together!',
    image: 'couple-cooking.jpg',
    date: '2024-03-01',
    content:
      'Cooking together is a great way to spend more time with your partner. It is fun and you get to eat something delicious afterwards. What are you waiting for? Get cooking!',
  },
  {
    id: 4,
    slug: 'hiking',
    title: 'Hiking is the best!',
    image: 'hiking.jpg',
    date: '2024-01-01',
    content:
      'Hiking is a great way to get some exercise and enjoy the great outdoors. It is also a great way to clear your mind and reduce stress. So what are you waiting for? Get out there and start hiking!',
  },
  {
    id: 5,
    slug: 'landscape',
    title: 'The beauty of landscape',
    image: 'landscape.jpg',
    date: '2022-07-01',
    content:
      'Landscape photography is a great way to capture the beauty of nature. It is also a great way to get outside and enjoy the great outdoors. So what are you waiting for? Get out there and start taking some pictures!',
  },
];

// Initialize database
let db;

function initializeDatabase() {
  try {
    // Try to use the existing database file first (for local development)
    db = sql('data.db');
    
    // Create table if it doesn't exist
    db.prepare(
      'CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, slug TEXT UNIQUE, title TEXT, content TEXT, date TEXT, image TEXT)'
    ).run();
    
    // Check if the database has data
    const { count } = db.prepare('SELECT COUNT(*) as count FROM news').get();
    
    if (count === 0) {
      // If no data, populate with dummy data
      const insert = db.prepare(
        'INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)'
      );
      
      DUMMY_NEWS.forEach((news) => {
        insert.run(news.slug, news.title, news.content, news.date, news.image);
      });
    }
  } catch (error) {
    // If file database fails (like on Vercel), create in-memory database
    console.log('File database not available, creating in-memory database:', error.message);
    db = sql(':memory:');
    
    // Create table
    db.prepare(
      'CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, slug TEXT UNIQUE, title TEXT, content TEXT, date TEXT, image TEXT)'
    ).run();
    
    // Insert dummy data
    const insert = db.prepare(
      'INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)'
    );
    
    DUMMY_NEWS.forEach((news) => {
      insert.run(news.slug, news.title, news.content, news.date, news.image);
    });
  }
}

// Initialize database when module is imported
initializeDatabase();

export async function getAllNews() {
  try {
    const news = db.prepare('SELECT * FROM news').all();
    await new Promise((resolve) => setTimeout(resolve, 20));
    return news;
  } catch (error) {
    console.error('Error fetching all news:', error);
    return [];
  }
}

export async function getNewsItem(slug) {
  try {
    const newsItem = db.prepare('SELECT * FROM news WHERE slug = ?').get(slug);

    await new Promise((resolve) => setTimeout(resolve, 20));

    return newsItem;
  } catch (error) {
    console.error('Error fetching news item:', error);
    return null;
  }
}

export async function getLatestNews() {
  const latestNews = db
    .prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3')
    .all();
  await new Promise((resolve) => setTimeout(resolve, 20));
  return latestNews;
}

export async function getAvailableNewsYears() {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year) => year.year);

  await new Promise((resolve) => setTimeout(resolve, 20));

  return years;
}

export function getAvailableNewsMonths(year) {
  try {
    return db
      .prepare(
        "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
      )
      .all(year)
      .map((month) => month.month);
  } catch (error) {
    console.error('Error fetching available months:', error);
    return [];
  }
}

export async function getNewsForYear(year) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year);

  await new Promise((resolve) => setTimeout(resolve, 20));

  return news;
}

export async function getNewsForYearAndMonth(year, month) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month);

  await new Promise((resolve) => setTimeout(resolve, 20));

  return news;
}