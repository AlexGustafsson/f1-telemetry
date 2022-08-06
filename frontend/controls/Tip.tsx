import { useStore } from '../store'

export type Props = {
  uuid: string
  children?: JSX.Element | JSX.Element[]
}

export default function ({ uuid, children }: Props) {
  const [dismissedHints, dismissHint] = useStore((state) => [
    state.dismissedHints,
    state.dismissHint,
  ])

  if (dismissedHints.includes(uuid)) {
    return null
  }

  return (
    <div className="card">
      {children}
      <button className="mt-2" onClick={() => dismissHint(uuid)}>
        Dismiss
      </button>
    </div>
  )
}
