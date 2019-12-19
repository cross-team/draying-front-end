import React, { useState } from 'react'
import { Input } from 'reactstrap'

import FormValidator from '../utils/form-validator.js/index.js.js'

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
    <div className="block-center mt-4 wd-xl">
      <div className="card card-flat">
        <div className="card-body">
          <p className="text-center py-2">SIGN IN TO CONTINUE.</p>
          <form className="mb-3" name="formLogin" onSubmit={onSubmit}>
            <div className="form-group">
              <div className="input-group with-focus">
                <Input
                  type="email"
                  name="email"
                  className="border-right-0"
                  placeholder="Enter email"
                  invalid={
                    hasError('formLogin', 'email', 'required') ||
                    hasError('formLogin', 'email', 'email')
                  }
                  onChange={validateOnChange}
                  data-validate='["required", "email"]'
                  value={state.formLogin.email}
                />
                <div className="input-group-append">
                  <span className="input-group-text text-muted bg-transparent border-left-0">
                    <em className="fa fa-envelope"></em>
                  </span>
                </div>
                {hasError('formLogin', 'email', 'required') && (
                  <span className="invalid-feedback">Field is required</span>
                )}
                {hasError('formLogin', 'email', 'email') && (
                  <span className="invalid-feedback">
                    Field must be valid email
                  </span>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="input-group with-focus">
                <Input
                  type="password"
                  id="id-password"
                  name="password"
                  className="border-right-0"
                  placeholder="Password"
                  invalid={hasError('formLogin', 'password', 'required')}
                  onChange={validateOnChange}
                  data-validate='["required"]'
                  value={state.formLogin.password}
                />
                <div className="input-group-append">
                  <span className="input-group-text text-muted bg-transparent border-left-0">
                    <em className="fa fa-lock"></em>
                  </span>
                </div>
                <span className="invalid-feedback">Field is required</span>
              </div>
            </div>
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
            <button className="btn btn-block btn-primary mt-3" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
