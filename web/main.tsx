// Import global style
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './main.css'
import App from './pages/App'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}
