export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && window.localStorage.getItem('user')
    ? JSON.parse(window.localStorage.getItem('user'))
    : {}

export const setUser = ({ token, email }) =>
  window.localStorage.setItem('user', JSON.stringify({ token, email }))

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.token
}
export const logout = callback => {
  setUser({ token: null })
  callback()
}
