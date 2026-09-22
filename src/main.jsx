import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.jsx'
import Home from './pages/Home.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Authors from './pages/Authors.jsx'
import CreateRecipe from './pages/CreateRecipe.jsx'
import EditRecipe from './pages/EditRecipe.jsx'
import CategoryRecipes from './pages/CategoryRecipes.jsx'
import AuthorRecipes from './pages/AuthorRecipes.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Logout from './pages/Logout.jsx'
import DeleteRecipe from './pages/DeleteRecipe.jsx'
import UserProvider from './context/userContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><App /></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "recipes/:id", element: <RecipeDetail /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "authors", element: <Authors /> },
      { path: "create", element: <CreateRecipe /> },
      { path: "recipes/categories/:category", element: <CategoryRecipes /> },
      { path: "recipes/users/:id", element: <AuthorRecipes /> },
      { path: "myrecipes/:id", element: <Dashboard /> },
      { path: "recipes/:id/edit", element: <EditRecipe /> },
      { path: "recipes/:id/delete", element: <DeleteRecipe /> },
      { path: "logout", element: <Logout /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
