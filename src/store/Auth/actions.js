import * as services from '../../services/auth-services.js'
// login
export function signIn (context, user) {
  services.signIn({ username: user.username, password: user.password })
}

export function signOut ({ commit }) {
  commit('setUser', null)
  localStorage.removeItem('user')
  this.$router.push({ path: '/login' })
}
