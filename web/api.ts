import { invoke } from '@tauri-apps/api'

export type ServerStatus = 'NotStarted' | 'Started' | 'Idle' | 'ShuttingDown'

export async function startServer() {
  await invoke('start_server')
}

export async function getServerStatus(): Promise<ServerStatus> {
  const status = await invoke('server_status')
  return status as ServerStatus
}

export async function greet() {
  const greeting = await invoke('greet', { name: 'world' })
  console.log(greeting)
}
