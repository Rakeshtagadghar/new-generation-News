# Next.js News Application

A modern news application built with Next.js featuring server-side rendering, dynamic routing, and a SQLite backend.

## 🚀 Getting Started

Follow these steps to set up and run the application locally:

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
```

#### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

#### 3. Initialize Database
Start the backend server to create the SQLite database:
```bash
node app.js
```
This will create a `data.db` file in the backend directory with sample news data.

#### 4. Move Database to Root
Move the generated database file to the root directory:
```bash
# From the backend directory
mv data.db ../
# Or from the root directory
mv backend/data.db ./
```

#### 5. Frontend Setup
Navigate back to the root directory and install frontend dependencies:
```bash
cd ..  # if you're in the backend directory
npm install
```

#### 6. Start Development Server
Start the Next.js development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Running the Full Application

To run both frontend and backend simultaneously:

1. **Terminal 1** - Start the backend API server:
```bash
cd backend
node app.js
```
Backend will run on `http://localhost:8080`

2. **Terminal 2** - Start the frontend development server:
```bash
npm run dev
```
Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
01-starting-project/
├── app/                          # Next.js App Router directory
│   ├── (content)/               # Route group for content pages
│   │   ├── archive/            # Archive functionality
│   │   │   ├── @archive/       # Parallel route for archive
│   │   │   │   └── [[...filter]]/  # Catch-all dynamic route
│   │   │   └── @latest/        # Parallel route for latest news
│   │   ├── news/               # News section
│   │   │   ├── [slug]/         # Dynamic news article pages
│   │   │   │   ├── @modal/     # Parallel route for modal
│   │   │   │   │   └── (.)image/   # Intercepting route for images
│   │   │   │   └── image/      # Image display page
│   │   │   └── page.js         # News listing page
│   │   └── layout.js           # Content layout
│   ├── (marketing)/            # Route group for marketing pages
│   │   ├── layout.js           # Marketing layout
│   │   └── page.js             # Home page
│   ├── api/                    # API routes
│   │   └── route.js            # API endpoint
│   ├── globals.css             # Global styles
│   ├── layout.js               # Root layout
│   └── page.js                 # Default page
├── backend/                     # Express.js backend
│   ├── app.js                  # Main server file
│   ├── package.json            # Backend dependencies
│   └── node_modules/           # Backend dependencies
├── components/                  # Reusable React components
│   ├── main-header/            # Header component
│   ├── nav-link.js             # Navigation link component
│   └── news-list.js            # News list component
├── lib/                        # Utility functions
│   ├── news.js                 # News data utilities
│   └── news-list.js            # News list utilities
├── public/                     # Static assets
│   └── images/                 # Image assets
├── assets/                     # Application assets
├── data.db                     # SQLite database (after setup)
├── middleware.js               # Next.js middleware
├── next.config.mjs             # Next.js configuration
└── package.json                # Frontend dependencies
```

## 🎯 Key Features

### Next.js App Router (Latest Architecture)
This project uses **Next.js 14 with the App Router** - the newest and recommended routing system that offers:

- **File-based Routing**: Routes are defined by folder structure in the `app/` directory
- **Server-Side Rendering (SSR)**: Fast initial page loads with automatic optimization
- **Server Components**: Components render on the server by default for better performance
- **Nested Layouts**: Shared UI components across multiple pages
- **Route Groups**: Organize routes without affecting URL structure using `(groupName)`
- **Parallel Routes**: Render multiple pages simultaneously using `@folderName`
- **Intercepting Routes**: Create modal-like experiences with `(.)` syntax
- **Loading & Error States**: Built-in loading.js and error.js file conventions
- **Dynamic Routing**: URL-based navigation with slug support using `[param]`
- **Catch-all Routes**: Flexible route matching with `[[...slug]]`

### Application Features
- **SQLite Database**: Lightweight database for news storage
- **Responsive Design**: Mobile-friendly interface
- **API Integration**: RESTful API for news data
- **Image Optimization**: Automatic image optimization with Next.js Image component
- **TypeScript Support**: Full TypeScript integration (optional)

## 🔧 Available Scripts

### Frontend (Root Directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `node app.js` - Start backend server

## 📊 Database Structure

The SQLite database (`data.db`) contains a `news` table with the following structure:

```sql
CREATE TABLE news (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE,
  title TEXT,
  content TEXT,
  date TEXT,
  image TEXT
);
```

## 🌐 API Endpoints

- `GET /news` - Retrieve all news articles (Backend: http://localhost:8080/news)

## 🎨 Next.js App Router Deep Dive

### What is the App Router?

The **App Router** is Next.js's latest routing system (stable since Next.js 13.4) that replaces the traditional Pages Router. It's built on React Server Components and provides more powerful routing capabilities.

### App Router vs Pages Router

| Feature | App Router (`app/` directory) | Pages Router (`pages/` directory) |
|---------|------------------------------|-----------------------------------|
| **Routing** | File-based routing with folders | File-based routing with files |
| **Layouts** | Nested layouts with `layout.js` | Custom `_app.js` and `_document.js` |
| **Server Components** | Server Components by default | Client-side rendering by default |
| **Data Fetching** | `fetch()` with caching | `getServerSideProps`, `getStaticProps` |
| **Route Groups** | ✅ Supported with `(groupName)` | ❌ Not supported |
| **Parallel Routes** | ✅ Supported with `@folderName` | ❌ Not supported |
| **Intercepting Routes** | ✅ Supported with `(.)` syntax | ❌ Not supported |

### Advanced Routing Patterns in This Project

This application demonstrates cutting-edge Next.js App Router patterns:

#### 1. **Route Groups**: `(content)` and `(marketing)`
```
app/
├── (content)/          # Route group - doesn't affect URL
│   ├── news/          # URL: /news
│   └── archive/       # URL: /archive
└── (marketing)/       # Route group - doesn't affect URL
    └── page.js        # URL: / (root)
```

#### 2. **Dynamic Routes**: `[slug]` for individual articles
```
app/(content)/news/[slug]/page.js
# Matches: /news/ai-robots, /news/beaver-plague, etc.
```

#### 3. **Catch-all Routes**: `[[...filter]]` for flexible filtering
```
app/(content)/archive/@archive/[[...filter]]/page.js
# Matches: /archive, /archive/2024, /archive/2024/january, etc.
```

#### 4. **Parallel Routes**: `@archive` and `@latest`
```
app/(content)/archive/
├── @archive/          # Parallel route slot
├── @latest/           # Parallel route slot
└── layout.js          # Renders both slots simultaneously
```

#### 5. **Intercepting Routes**: `(.)image` for modal functionality
```
app/(content)/news/[slug]/
├── @modal/
│   └── (.)image/page.js    # Intercepts /news/[slug]/image
└── image/page.js           # Original route
```

### File Conventions in App Router

- **`page.js`**: Creates a route and makes it publicly accessible
- **`layout.js`**: Shared UI between multiple pages (wraps pages)
- **`loading.js`**: Loading state UI while page is loading
- **`error.js`**: Error state UI when something goes wrong
- **`not-found.js`**: 404 error page for unmatched routes
- **`route.js`**: API endpoints (replaces `pages/api/`)
- **`middleware.js`**: Request/response middleware (root level)

## 🔍 Development Notes

### Why App Router?

This project uses **Next.js 14 with the App Router** because it provides:

- **Better Performance**: Server Components reduce JavaScript bundle size
- **Improved SEO**: Server-side rendering by default
- **Enhanced Developer Experience**: Better file organization and routing patterns
- **Future-proof**: The recommended approach for new Next.js projects
- **Advanced Features**: Parallel routes, intercepting routes, and more

### Technical Details

- **Server Components**: Components render on the server by default, reducing client-side JavaScript
- **Database**: SQLite database is initialized automatically with sample news data
- **Images**: Stored in `public/images/news/` directory with Next.js Image optimization
- **Styling**: Global CSS with modern responsive design patterns
- **Component Architecture**: Follows modern React patterns with separation of concerns
- **Middleware**: Handles request processing and routing logic
- **API Routes**: RESTful endpoints using the new `route.js` convention

## 🚨 Troubleshooting

1. **Database Issues**: Ensure `data.db` is in the root directory
2. **Port Conflicts**: Make sure ports 3000 and 8080 are available
3. **Build Errors**: Run `rm -rf .next` and `npm run build` to clean build cache
4. **Module Errors**: Delete `node_modules` and run `npm install` again

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Happy coding! 🎉 