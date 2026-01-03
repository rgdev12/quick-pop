import { ElectronAPI } from '@electron-toolkit/preload'

// Define the custom API interface
export interface API {
  onClipboardUpdate: (callback: (text: string) => void) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
