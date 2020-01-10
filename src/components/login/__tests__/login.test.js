import React from 'react'
import { render, fireEvent } from "@testing-library/react"
import { MockedProvider } from "@apollo/react-testing"
import Login, { LOGIN_USER } from '../login'

describe( 'login', () => {
  it('logs in correctly', async () => {

    const loginUser = { token: 'pweiorughfeil', email: 'person@email.com' }

    const mocks = [
      {
        request: {
          query: LOGIN_USER,
        },
        result: { data: { loginUser } },
      },
    ]

    const {
      findByPlaceholderText,
      findByText,
    } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login />
      </MockedProvider>
    )

    const emailInput = await findByPlaceholderText(/Enter email/i)

    fireEvent.change(emailInput, {
      target: {
        value: 'person@email.com'
      }
    })
    const pwordInput = await findByPlaceholderText(/Password/i)
    fireEvent.change(emailInput, {
      target: {
        value: 'password'
      }
    })
    const loginButton = await findByText(/Login/i)
    fireEvent.click(loginButton)


  })
})
