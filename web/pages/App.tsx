import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'

import { ChartIcon, HomeIcon, LeftArrowIcon, SettingsIcon } from '../icons'
import GraphPage from './GraphPage'
import HomePage from './HomePage'
import SettingsPage from './SettingsPage'

export default function (): JSX.Element {
  const [navDepth, setNavDepth] = useState<number>(0)

  const navigate = useNavigate()

  return (
    <div className="relative">
      <menu className="fixed w-20 bg-slate-700 h-full flex items-center justify-center">
        <ul className="grid grid-rows-2 gap-y-5">
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive ? 'text-red-500' : 'text-slate-400'
            }
          >
            <li>
              <HomeIcon className="w-8 h-8" />
            </li>
          </NavLink>
          <NavLink
            to="/graphs"
            className={(navData) =>
              navData.isActive ? 'text-red-500' : 'text-slate-400'
            }
          >
            <li>
              <ChartIcon className="w-8 h-8" />
            </li>
          </NavLink>
          <NavLink
            to="/settings"
            className={(navData) =>
              navData.isActive ? 'text-red-500' : 'text-slate-400'
            }
          >
            <li>
              <SettingsIcon className="w-8 h-8" />
            </li>
          </NavLink>
        </ul>
      </menu>
      <main className="pl-24 py-5 pr-4 flex flex-col">
        <header className="mb-4 text-sm">
          {navDepth > 0 ? (
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <LeftArrowIcon className="w-4" /> Back
            </div>
          ) : null}
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/graphs" element={<GraphPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}
