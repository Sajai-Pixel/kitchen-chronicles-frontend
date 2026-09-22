# 🍳 Kitchen Chronicles — Frontend

A recipe discovery and sharing platform built with the MERN stack, where users can browse, search, and share recipes, and manage their own kitchen content.

**Live Demo:** [kitchenchronicles-frontend.vercel.app](https://kitchenchronicles-frontend.vercel.app/)
**Backend Repo:** [kitchen-chronicles-backend](https://github.com/Sajai-Pixel/kitchen-chronicles-backend)

## ✨ Features

- Browse and search recipes
- User authentication (sign up / login)
- Create, edit, and delete your own recipes
- Upload recipe images
- Responsive design across devices

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Icons | FontAwesome |
| Linting | ESLint |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm
- A running instance of the [backend server](https://github.com/Sajai-Pixel/kitchen-chronicles-backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/Sajai-Pixel/kitchen-chronicles-frontend.git
cd kitchen-chronicles-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# then fill in the values (see below)

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173` by default.

### Environment Variables

Create a `.env` file in the root directory with the following:

```env
VITE_BASE_URL=http://localhost:5000/api
VITE_ASSETS_URL=http://localhost:5000
```

| Variable | Description |
|---|---|
| `VITE_BASE_URL` | Base URL of the backend API |
| `VITE_ASSETS_URL` | Base URL for serving uploaded images/assets |

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite dev server with hot reload |
| `npm run build` | Builds the app for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint |

## 🌐 Deployment

This project is deployed on [Vercel](https://vercel.com/). To deploy your own instance:
1. Push your code to GitHub
2. Import the repo into Vercel
3. Add the environment variables above in the Vercel project settings (pointing to your deployed backend URL)
4. Deploy

## 🔗 Related Repositories

- **Backend / API:** [kitchen-chronicles-backend](https://github.com/Sajai-Pixel/kitchen-chronicles-backend)

## 👤 Author

**Sajai**
- GitHub: [@Sajai-Pixel](https://github.com/Sajai-Pixel)