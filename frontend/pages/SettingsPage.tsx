import { useStore } from '../store'

export default function (): JSX.Element {
  const [resetHints, clearQueries] = useStore((state) => [
    state.resetHints,
    state.clearQueries,
  ])

  return (
    <div>
      <h1>Settings</h1>
      <div className="card">
        <h2>Queries</h2>
        <button onClick={clearQueries} className="mt-2">
          Clear query history
        </button>
      </div>
      <div className="card">
        <h2>Hints</h2>
        <button onClick={resetHints} className="mt-2">
          Reset dismissed hints
        </button>
      </div>
    </div>
  )
}
