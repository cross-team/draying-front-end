import React, { Component } from 'react'
import styled from '@emotion/styled'

import Button from './button'
import { colors, unit } from '../styles'

export default class LoginForm extends Component {
  state = { email: '', password: '' }

  onEmailChange = event => {
    const email = event.target.value
    this.setState(s => ({ email }))
  }

  onPasswordChange = event => {
    const password = event.target.value
    this.setState(s => ({ password }))
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.login({
      variables: {
        user: { email: this.state.email, password: this.state.password },
      },
    })
  }

  render() {
    return (
      <Container>
        <Heading>Draying Login</Heading>
        <StyledForm onSubmit={this.onSubmit}>
          <StyledInput
            required
            type="email"
            name="email"
            placeholder="Email"
            data-testid="login-email"
            onChange={this.onEmailChange}
          />
          <StyledInput
            required
            type="password"
            name="password"
            placeholder="Password"
            data-testid="login-password"
            onChange={this.onPasswordChange}
          />
          <Button type="submit">Log in</Button>
        </StyledForm>
      </Container>
    )
  }
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  paddingBottom: unit * 6,
  color: 'white',
  backgroundColor: colors.primary,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
})

const Heading = styled('h1')({
  margin: `${unit * 3}px 0 ${unit * 6}px`,
})

const StyledForm = styled('form')({
  width: '100%',
  maxWidth: 406,
  padding: unit * 3.5,
  borderRadius: 3,
  boxShadow: '6px 6px 1px rgba(0, 0, 0, 0.25)',
  color: colors.text,
  backgroundColor: 'white',
})

const StyledInput = styled('input')({
  width: '100%',
  marginBottom: unit * 2,
  padding: `${unit * 1.25}px ${unit * 2.5}px`,
  border: `1px solid ${colors.grey}`,
  fontSize: 16,
  outline: 'none',
  ':focus': {
    borderColor: colors.primary,
  },
})
