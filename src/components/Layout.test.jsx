import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { JobsDataProvider } from '../contexts/JobsDataContext'
import { JobProvider } from '../context/JobContext'
import { ThemeProvider } from '../context/ThemeContext'
import Layout from './Layout'

describe('Layout', () => {
  beforeEach(() => {
    window.requestAnimationFrame = vi.fn(() => 1)
    window.cancelAnimationFrame = vi.fn()
    // Skip the matrix-rain animation loop for this test; MatrixRain has its own dedicated tests.
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })
  })

  it('renders the navbar, footer, matrix background, and routed page content', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Layout />,
          children: [{ index: true, element: <div>Page Content</div> }],
        },
      ],
      { initialEntries: ['/'] }
    )

    render(
      <AuthProvider>
        <JobsDataProvider>
          <JobProvider>
            <ThemeProvider>
              <RouterProvider router={router} />
            </ThemeProvider>
          </JobProvider>
        </JobsDataProvider>
      </AuthProvider>
    )

    expect(await screen.findByText('Page Content')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /jobportal/i })).toBeInTheDocument()
    expect(document.querySelector('canvas')).toBeInTheDocument()
  })
})
