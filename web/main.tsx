// Import global style
import React from 'react'
import { createRoot } from 'react-dom/client'

import './main.css'
import App from './pages/App'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
