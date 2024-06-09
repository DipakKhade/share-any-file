import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Header ,navItems} from './components/Header.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

     <Header navItems={navItems} />
<main className=''>

     <RouterProvider router={router} />
</main>

    </ThemeProvider>
  </React.StrictMode>,
)
