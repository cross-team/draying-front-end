import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import { globalHistory as history } from '@reach/router'
import Typography from '@material-ui/core/Typography'

function Login({ login }) {
  const { location } = history
  const { hostname } = location
  const [state, setState] = useState({
    formLogin: {
      email: '',
      password: '',
      remember: true,
    },
  })
  const validateOnChange = event => {
    const input = event.target
    const form = input.form
    const value = input.type === 'checkbox' ? input.checked : input.value

    // const result = FormValidator.validate(input)

    setState({
      [form.name]: {
        ...state[form.name],
        [input.name]: value,
      },
    })
  }

  const onSubmit = e => {
    const form = e.target
    setState({
      [form.name]: {
        ...state[form.name],
      },
    })
    e.preventDefault()
    login({
      variables: {
        user: {
          email: state.formLogin.email,
          password: state.formLogin.password,
          host: hostname || 'localhost',
        },
      },
    })
  }

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={8} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="h1"
                className="text-center py-2"
              >
                SIGN IN TO CONTINUE.
              </Typography>
              <form className="mb-3" name="formLogin" onSubmit={onSubmit}>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  inputProps={{ 'aria-label': 'email' }}
                  required
                  placeholder="Enter email"
                  onChange={validateOnChange}
                  value={state.formLogin.email}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  type="password"
                  id="id-password"
                  name="password"
                  inputProps={{ 'aria-label': 'password' }}
                  required
                  placeholder="Password"
                  onChange={validateOnChange}
                  value={state.formLogin.password}
                  fullWidth
                  variant="outlined"
                />
                <Grid container justify="space-between">
                  <Typography>
                    <label htmlFor="remember">
                      <Checkbox
                        checked={state.formLogin.remember}
                        onChange={validateOnChange}
                        value="remember"
                        name="remember"
                        color="primary"
                        id="remember"
                      />
                      Remember me
                    </label>
                  </Typography>
                  <Button
                    aria-label="login button"
                    variant="contained"
                    type="submit"
                  >
                    Login
                  </Button>
                  {/* <div className="float-right">
                    <Link to="recover" className="text-muted">
                      Forgot your password?
                    </Link>
                  </div> */}
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
