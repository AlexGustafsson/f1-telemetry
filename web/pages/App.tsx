import { useState } from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'

import {
  ChartIcon,
  CodeIcon,
  HomeIcon,
  LeftArrowIcon,
  SettingsIcon,
} from '../icons'
import GraphPage from './GraphPage'
import HomePage from './HomePage'
import QueryPage from './QueryPage'
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
            <li className="transition-transform active:scale-95 hover:scale-105">
              <HomeIcon className="w-8 h-8" />
            </li>
          </NavLink>
          <NavLink
            to="/graphs"
            className={(navData) =>
              navData.isActive ? 'text-red-500' : 'text-slate-400'
            }
          >
            <li className="transition-transform active:scale-95 hover:scale-105">
              <ChartIcon className="w-8 h-8" />
            </li>
          </NavLink>
          <NavLink
            to="/query"
            className={(navData) =>
              navData.isActive ? 'text-red-500' : 'text-slate-400'
            }
          >
            <li className="transition-transform active:scale-95 hover:scale-105">
              <CodeIcon className="w-8 h-8" />
            </li>
          </NavLink>
          <NavLink
            to="/settings"
            className={(navData) =>
              navData.isActive ? 'text-red-500' : 'text-slate-400'
            }
          >
            <li className="transition-transform active:scale-95 hover:scale-105">
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
          <Route path="/query" element={<QueryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}
