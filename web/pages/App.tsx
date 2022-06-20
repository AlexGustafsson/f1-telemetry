import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './HomePage'

export default function (): JSX.Element {
  return (
    <BrowserRouter>
      <div id="app" className="h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
