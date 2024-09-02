# Blogify - A Blogging Platform

**Blogify** is a blogging platform inspired by Medium where users can sign in, write, and publish blogs. It provides an intuitive interface for content creators to share their thoughts, ideas, and stories with the world.

## Features

- **User Authentication**: Secure sign-in and sign-up with JWT-based authentication.
- **Create and Manage Blogs**: Users can create, edit, delete, and manage their blog posts.
- **View Blogs**: Visitors can browse and read blogs posted by users.
- **Responsive Design**: The platform is designed to be accessible and responsive across devices.

## Tools and Technologies

- **Frontend**: 
  - [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.

- **Backend**:
  - [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - [Hono](https://hono.com/) - A minimal and flexible Node.js web application framework.
  - [Zod](https://zod.com/) - For Validation of the requests.
  - [Postgressql](https://neon.com/) - A SQL DataBase.
  - [Prisma](https://www.prisma.io/) - An open-source ORM for Node.js and TypeScript.
  - [JWT](https://jwt.io/) - JSON Web Tokens for user authentication.
  
- **Database**:
  - [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system.

- **DevOps**:
  - [Docker](https://www.docker.com/) - A platform to develop, ship, and run applications in containers.
  - [Vercel](https://vercel.com/) - Deployment and hosting for frontend apps.
  
## Getting Started

### Prerequisites

- Node.js and npm/yarn installed.
- PostgreSQL installed and running.
- Docker (optional, if you want to containerize the app).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hegdeadithyak/Blog-API.git
   cd Blog-API
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database**:

   - Create a PostgreSQL database.
   - Configure the `.env` file with your database credentials.

4. **Run migrations**:

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be running on [http://localhost:3000](http://localhost:3000).

### Deployment

- **Docker**:

  To run the app in a Docker container:

  ```bash
  docker build -t blogify .
  docker run -p 3000:3000 blogify
  ```

- **Vercel**:

  Deploy the frontend to Vercel with a single command:

  ```bash
  vercel
  ```

## Usage

- Sign up or sign in to create your account.
- Start writing and publishing your blogs.
- Browse blogs created by other users.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements, bug fixes, or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

