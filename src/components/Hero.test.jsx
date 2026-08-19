import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Hero from './Hero'

describe('Hero', () => {
  it('renders the headline and search form', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    )

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(/dream job/i)
    expect(heading).toHaveTextContent(/today/i)
    expect(screen.getByPlaceholderText(/job title, keywords, or company/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/city, state, or country/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search jobs/i })).toBeInTheDocument()
  })

  it('lets the user type a search query and location', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    )

    const jobInput = screen.getByPlaceholderText(/job title, keywords, or company/i)
    const locationInput = screen.getByPlaceholderText(/city, state, or country/i)

    await user.type(jobInput, 'Engineer')
    await user.type(locationInput, 'Remote')

    expect(jobInput).toHaveValue('Engineer')
    expect(locationInput).toHaveValue('Remote')
  })
})
