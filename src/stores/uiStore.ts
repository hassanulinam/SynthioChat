import { makeAutoObservable, runInAction } from 'mobx'

import { THEME_KEY } from '../constants/storageKeys'
import { readStorage, writeStorage } from '../utils/storage'

export type ThemeMode = 'light' | 'dark'

export interface ToastItem {
  id: string
  message: string
}

export class UiStore {
  theme: ThemeMode = 'dark'
  toasts: ToastItem[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
    this.hydrateTheme()
  }

  get isDark(): boolean {
    return this.theme === 'dark'
  }

  setTheme(theme: ThemeMode): void {
    this.theme = theme
    document.documentElement.dataset.theme = theme
    writeStorage(THEME_KEY, theme)
  }

  toggleTheme(): void {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    this.showToast(this.theme === 'dark' ? 'Dark mode on' : 'Light mode on')
  }

  showToast(message: string): void {
    const id = crypto.randomUUID()
    this.toasts = [...this.toasts, { id, message }]
    window.setTimeout(() => {
      runInAction(() => {
        this.dismissToast(id)
      })
    }, 2800)
  }

  dismissToast(id: string): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id)
  }

  private hydrateTheme(): void {
    const saved = readStorage<ThemeMode>(THEME_KEY)
    const theme = saved === 'dark' || saved === 'light' ? saved : 'dark'
    this.theme = theme
    document.documentElement.dataset.theme = theme
  }
}
