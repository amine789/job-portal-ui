import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the brand mark and key navigation links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /jobportal/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /browse jobs/i })).toHaveAttribute('href', '/jobs')
    expect(screen.getByRole('link', { name: /contact us/i })).toHaveAttribute('href', '/contact')
  })
})
