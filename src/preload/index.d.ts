import { ElectronAPI } from '@electron-toolkit/preload'

export interface AppSettings {
  apiKey: string
  models: string[]
  shortcut: string
}

// Define the custom API interface
export interface API {
  onClipboardUpdate: (callback: (text: string) => void) => void
  hideWindow: () => void
  getSettings: () => Promise<AppSettings>
  getSetting: (key: keyof AppSettings) => Promise<string | string[]>
  setSetting: (key: keyof AppSettings, value: string | string[]) => Promise<boolean>
  hasApiKey: () => Promise<boolean>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
