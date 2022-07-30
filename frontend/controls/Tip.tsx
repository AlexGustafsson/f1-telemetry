import { useState } from 'react'

export type Props = {
  children?: JSX.Element | JSX.Element[]
}

export default function (props: Props) {
  const [dismissed, setDismissed] = useState<boolean>(false)

  if (dismissed) {
    return null
  }

  return (
    <div className="card">
      {props.children}
      <button className="mt-2" onClick={() => setDismissed(true)}>
        Dismiss
      </button>
    </div>
  )
}
