# CommentsSite

This is a full-stack implementation of the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). It includes backend logic, authentication, database integration, and frontend UI—all built from scratch without relying on UI component libraries.

## Table of Contents

- [Overview](#overview)

  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)

- [My Process](#my-process)

  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)

- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)

- [Author](#author)

---

## Overview

### The Challenge

Users should be able to:

- View the optimal layout for any screen size
- See hover states for interactive elements
- Create, read, update, and delete comments and replies
- Upvote and downvote comments
- Register and log in using a secure authentication system

### Links

- 🔗 **Live Site**: [comments-app-eight-omega.vercel.app](https://comments-app-eight-omega.vercel.app/)
- 📦 **GitHub Repo**: [github.com/AnasOsta/comments-app](https://github.com/AnasOsta/comments-app)

---

## My Process

### Built With

- [Next.js](https://nextjs.org/) – Full-stack React framework
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [Prisma](https://www.prisma.io/) – ORM for database management
- [Supabase](https://supabase.com/) – PostgreSQL database hosting
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) – For hashing passwords
- [NextAuth.js](https://next-auth.js.org/) – Authentication library

### What I Learned

This project taught me how to build a full-featured comment system from scratch. Key learnings:

- Working with Prisma and Supabase for database management
- Hashing passwords securely using bcrypt
- Implementing a complete login system using NextAuth.js
- Building components manually instead of relying on UI libraries like `shadcn` or `framer`
- Designing scalable backend logic and clean API structure

### Continued Development

Future plans for the project include:

- Adding notifications for replies or mentions
- Enhancing UI/UX using animation libraries
- Adding user profiles and editable settings

---

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- A Supabase project (free tier works fine)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AnasOsta/comments-app.git
   cd comments-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Supabase and NextAuth credentials:

   ```env
   DATABASE_URL="your-supabase-database-url"
   DIRECT_URL="your-supabase-direct-url"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"

   ```

4. **Initialize the database:**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

6. Open your browser at [http://localhost:3000](http://localhost:3000)

---

## Author

- 👨‍💻 GitHub: [AnasOsta](https://github.com/AnasOsta)
- 🌐 LinkedIn: [Anas Osta](https://www.linkedin.com/in/anas-osta/)
- 🧩 Frontend Mentor: [AnasOsta](https://www.frontendmentor.io/profile/AnasOsta)
