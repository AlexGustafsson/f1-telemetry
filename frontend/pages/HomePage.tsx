import { NavLink } from 'react-router-dom'

import Tip from '../controls/Tip'

export default function (): JSX.Element {
  return (
    <div>
      <Tip>
        <p>
          To get started with querying your data, visit the{' '}
          <NavLink to="/query">query page</NavLink>. To create a diagram of
          telemetry, visit the <NavLink to="/graph">graph page</NavLink>.
        </p>
      </Tip>
    </div>
  )
}
