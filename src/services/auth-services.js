import { http } from '../plugins/http/index.js'
import { bus } from '../plugins/event-bus.js'

export const signIn = ({ username, password }) => {
  let config = {
    username: username,
    password: password,
    jsonReturn: true
  }
  http.post('auth/signIn/', config, {}).then(function (response) {
    bus.$emit('signInSuccess', response.data)
  }).catch(error => {
    bus.$emit('signInFailed', error.response)
  })
}

export const hasPermission = ({ menu }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      menuId: menu,
      jsonReturn: true
    }
  }

  http.post('api/updateListConsultedMenus/', {}, config).then(function (response) {
    bus.$emit('permissionGranted', response.data)
  }).catch(error => {
    bus.$emit('permissionDenied', error.response)
  })
}

export const getUserProfileImage = ({ user }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      id: user,
      jsonReturn: true
    }
  }

  http.post('api/getUserProfileImage', {}, config).then(function (response) {
    bus.$emit('getUserProfileImageSuccess', response.data)
  }).catch(error => {
    bus.$emit('getUserProfileImageFailed', error.response)
  })
}

export const getModules = () => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      jsonReturn: true
    }
  }

  http.post('api/listModuleSirhusAPI/', {}, config).then(function (response) {
    bus.$emit('getModulesSuccess', response.data)
  }).catch(error => {
    bus.$emit('getModulesFailed', error.response)
  })
}

export const getMenu = ({ module }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      module: module,
      jsonReturn: true
    }
  }

  http.post('api/listMenuSirhusAPI/', {}, config).then(function (response) {
    bus.$emit('getMenuSuccess', response.data)
  }).catch(error => {
    bus.$emit('getMenuFailed', error.response)
  })
}
