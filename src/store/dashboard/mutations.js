
export function setShowLeft (state, show) {
  state.showLeft = show
}

export function setActiveMenu (state, menu) {
  state.activeMenu = menu
}

export function setMultiplemodules (state, hasmodules) {
  state.multiplemodules = hasmodules
  localStorage.setItem('multiplemodules', hasmodules)
}
