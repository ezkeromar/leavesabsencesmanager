// login
export function setUser (state, user) {
  state.user = user
  localStorage.setItem('user', JSON.stringify(user))
}

export function setUnauthorizedError (state, error) {
  state.unauthorizedError = error
}

export function SetLoading (state, load) {
  state.loading = load
}

export function SetLoggedNow (state, logged) {
  state.loggedNow = logged
}

export function setToken (state, token) {
  state.token = token
}

export function setExpiredError (state, error) {
  state.expiredError = error
}

export function setModule (state, module) {
  state.module = module
  localStorage.setItem('module', JSON.stringify(module))
}

export function setBottomMenu (state, menu) {
  state.bottomMenu = menu
}
