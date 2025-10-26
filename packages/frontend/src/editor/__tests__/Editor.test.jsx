import React from 'react'
import { render, screen } from '@testing-library/react'
import Editor from '../Editor'

describe('Editor', () => {
  it('renders file input', () => {
    render(<Editor />)
    // Ensure editor root exists
    expect(document.querySelector('.editor-root')).toBeTruthy()
  })
})
