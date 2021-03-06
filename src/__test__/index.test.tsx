/**
 * @jest-environment jsdom
 */

import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render, fireEvent, waitFor, screen, getByText } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'
import { withTestRouter } from './mock-next-test-router'

const mockRouter = () =>
  withTestRouter(<Home />, {
    pathname: '',
    asPath: '/',
  })
describe('Homepage', () => {
  it('renders homepage banner text', async () => {
    render(mockRouter())
    await waitFor(() => {
      const myNode = screen.getByText(/We may have a solution. Just search!/i)
      expect(myNode).toBeInTheDocument()
    })
  })
})
