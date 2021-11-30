/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, fireEvent, waitFor, screen, getByText } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'

describe('Homepage', () => {
  test('renders title', async () => {
    render(<Home />)

    await waitFor(() => {
      const myNode = screen.getByText(/We may have a solution. Just search!/i)
      expect(myNode).toBeInTheDocument()
    })
  })
})
