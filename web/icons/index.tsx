import { SVGProps } from 'react'

// Remix Icons, Apache 2.0 License
// See: https://github.com/Remix-Design/RemixIcon

export function SettingsIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.954 2.21a9.99 9.99 0 0 1 4.091-.002A3.993 3.993 0 0 0 16 5.07a3.993 3.993 0 0 0 3.457.261A9.99 9.99 0 0 1 21.5 8.876A3.993 3.993 0 0 0 20 12a3.99 3.99 0 0 0 1.502 3.124a10.043 10.043 0 0 1-2.046 3.543a3.993 3.993 0 0 0-3.456.261a3.993 3.993 0 0 0-1.954 2.86a9.99 9.99 0 0 1-4.091.004A3.993 3.993 0 0 0 8 18.927a3.993 3.993 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121A3.993 3.993 0 0 0 4 11.999a3.993 3.993 0 0 0-1.502-3.124a10.043 10.043 0 0 1 2.046-3.543A3.993 3.993 0 0 0 8 5.071a3.993 3.993 0 0 0 1.954-2.86zM12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6z"
      ></path>
    </svg>
  )
}

export function HomeIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9z"
      ></path>
    </svg>
  )
}

export function ChartIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11 2.05V13h10.95c-.501 5.053-4.765 9-9.95 9c-5.523 0-10-4.477-10-10c0-5.185 3.947-9.449 9-9.95zm2-1.507C18.553 1.02 22.979 5.447 23.457 11H13V.543z"
      ></path>
    </svg>
  )
}

export function LeftArrowIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.828 11H20v2H7.828l5.364 5.364l-1.414 1.414L4 12l7.778-7.778l1.414 1.414z"
      ></path>
    </svg>
  )
}
