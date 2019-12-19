import React, { useState } from 'react'
import FormValidator from '../utils/form-validator'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function Login({ login }) {
  const [state, setState] = useState({
    formLogin: {
      email: '',
      password: '',
    },
  })
  const validateOnChange = event => {
    const input = event.target
    const form = input.form
    const value = input.type === 'checkbox' ? input.checked : input.value

    const result = FormValidator.validate(input)

    setState({
      [form.name]: {
        ...state[form.name],
        [input.name]: value,
        errors: {
          ...state[form.name].errors,
          [input.name]: result,
        },
      },
    })
  }

  const onSubmit = e => {
    const form = e.target
    const inputs = [...form.elements].filter(i =>
      ['INPUT', 'SELECT'].includes(i.nodeName),
    )

    const { errors, hasError } = FormValidator.bulkValidate(inputs)

    setState({
      [form.name]: {
        ...state[form.name],
        errors,
      },
    })

    console.log(hasError ? 'Form has errors. Check!' : 'Form Submitted!')

    e.preventDefault()
    login({
      variables: {
        user: {
          email: state.formLogin.email,
          password: state.formLogin.password,
        },
      },
    })
  }

  /* Simplify error check */
  const hasError = (formName, inputName, method) => {
    return (
      state[formName] &&
      state[formName].errors &&
      state[formName].errors[inputName] &&
      state[formName].errors[inputName][method]
    )
  }
  return (
    <>
      <Container maxWidth="sm">
        <Grid container justify="center">
          <Grid item xs={8} md={6}>
            <Card>
              <CardContent>
                <p className="text-center py-2">SIGN IN TO CONTINUE.</p>
                <form className="mb-3" name="formLogin" onSubmit={onSubmit}>
                  <TextField
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="Enter email"
                    error={
                      hasError('formLogin', 'email', 'required') ||
                      hasError('formLogin', 'email', 'email')
                    }
                    onChange={validateOnChange}
                    value={state.formLogin.email}
                    fullWidth
                  />
                  <TextField
                    type="password"
                    id="id-password"
                    name="password"
                    required
                    className="border-right-0"
                    placeholder="Password"
                    invalid={hasError('formLogin', 'password', 'required')}
                    onChange={validateOnChange}
                    value={state.formLogin.password}
                    fullWidth
                  />

                  <div className="clearfix">
                    <div className="checkbox c-checkbox float-left mt-0">
                      <label>
                        <input type="checkbox" value="" name="remember" />
                        <span className="fa fa-check"></span>Remember Me
                      </label>
                    </div>
                    {/* <div className="float-right">
                <Link to="recover" className="text-muted">
                  Forgot your password?
                </Link>
              </div> */}
                  </div>
                  <Button variant="contained" type="submit">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Login
