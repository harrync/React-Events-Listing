import { render, cleanup, screen } from '@testing-library/react'
import Excerpt from '../ui/excerpt'

afterEach(cleanup)

describe('Excerpt test', () => {
  test('renders text & HTML', () => {
    render(<Excerpt copy="Testing text &amp; HTML decoding" />)
    expect(screen.getByText('Testing text & HTML decoding')).toBeInTheDocument()
  })
})
