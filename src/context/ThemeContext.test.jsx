import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './ThemeContext'

const Consumer = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('light', 'dark')
  })

  it('defaults to the dark (matrix) theme when nothing is saved', async () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    )

    expect(await screen.findByTestId('theme')).toHaveTextContent('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('respects a saved light theme preference', async () => {
    localStorage.setItem('job-portal-theme', 'light')

    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    )

    expect(await screen.findByTestId('theme')).toHaveTextContent('light')
  })

  it('falls back to dark for any saved value other than light', async () => {
    localStorage.setItem('job-portal-theme', 'something-unexpected')

    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    )

    expect(await screen.findByTestId('theme')).toHaveTextContent('dark')
  })

  it('toggles between dark and light and persists the choice', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>
    )

    await screen.findByTestId('theme')
    await user.click(screen.getByText('toggle'))

    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(localStorage.getItem('job-portal-theme')).toBe('light')
  })
})
