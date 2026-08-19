import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { JobsDataProvider } from '../contexts/JobsDataContext'
import { JobProvider } from '../context/JobContext'
import { ThemeProvider } from '../context/ThemeContext'
import Navbar from './Navbar'

const Providers = ({ children }) => (
  <MemoryRouter>
    <AuthProvider>
      <JobsDataProvider>
        <JobProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </JobProvider>
      </JobsDataProvider>
    </AuthProvider>
  </MemoryRouter>
)

describe('Navbar', () => {
  it('renders the brand mark and primary nav links when logged out', async () => {
    render(<Navbar />, { wrapper: Providers })

    expect(await screen.findByRole('link', { name: /jobportal/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /find jobs/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^companies$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument()
  })

  it('toggles the theme without crashing when the toggle button is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />, { wrapper: Providers })

    await screen.findByRole('link', { name: /jobportal/i })
    const toggleButton = screen.getByLabelText(/toggle theme/i)

    await user.click(toggleButton)

    expect(toggleButton).toBeInTheDocument()
  })
})
