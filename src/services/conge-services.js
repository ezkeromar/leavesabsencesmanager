import { http } from '../plugins/http/index.js'
import { bus } from '../plugins/event-bus.js'

export const getCongetoValidateCount = () => {
  let config = {
    params: {
    }
  }
  http.post('api/notifyManagerTwoDaysBeforLeaveStartAPI', {}, config).then(function (response) {
    bus.$emit('getCongetoValidateCountSuccess', response.data)
  }).catch(error => {
    bus.$emit('getCongetoValidateCountFailed', error.response)
  })
}

export const getColabs = ({ term }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      search: term
    }
  }
  http.post('api/listCollaborateurAPI', {}, config).then(function (response) {
    bus.$emit('getColabsSuccess', response.data)
  }).catch(error => {
    bus.$emit('getColabsFailed', error.response)
  })
}

export const getTempSoldeColabs = ({ id }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      id: id
    }
  }
  http.post('api/getNumberOfLeaveDaysAllowed', {}, config).then(function (response) {
    bus.$emit('getTempSoldeColabsSuccess', response.data)
  }).catch(error => {
    bus.$emit('getTempSoldeColabsFailed', error.response)
  })
}

export const store = ({ dateStart, dateEnd, morning, afternoon }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      dateDeDebut: dateStart,
      dateDeFin: dateEnd,
      typeDebut: morning,
      typeFin: afternoon,
      jsonReturn: true
    }
  }
  http.post('api/soumettreDemande', {}, config).then(function (response) {
    bus.$emit('congeCreateSuccess', response.data)
  }).catch(error => {
    bus.$emit('congeCreateFailed', error.response)
  })
}

export const storeAnterieur = ({ dateStart, dateEnd, morning, afternoon, id }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      dateDeDebut: dateStart,
      dateDeFin: dateEnd,
      typeDebut: morning,
      typeFin: afternoon,
      id: id,
      jsonReturn: true
    }
  }
  http.post('api/soumettreDemandeAnterieurAPI', {}, config).then(function (response) {
    bus.$emit('storeAnterieurSuccess', response.data)
  }).catch(error => {
    bus.$emit('storeAnterieurFailed', error.response)
  })
}

export const getReliquats = () => {
  let config = {
    params: {
    }
  }
  http.post('api/congeNouvelleDemande', {}, config).then(function (response) {
    bus.$emit('getReliquatsSuccess', response.data)
  }).catch(error => {
    bus.$emit('getReliquatsFailed', error.response)
  })
}

export const requestHolidays = ({ page, maxRows }) => {
  let config = {
    params: {
      page: page,
      maxRows: maxRows
    }
  }
  http.post('api/congeJoursFeriersAPI', {}, config).then(function (response) {
    bus.$emit('requestHolidaysSuccess', response.data)
  }).catch(error => {
    bus.$emit('requestHolidaysFailed', error.response)
  })
}

export const exportPaiePeriodeDemandes = ({ periodPaiment = null, state = null }) => {
  let stringstate = ''
  switch (state) {
    case '09':
      stringstate = 'NON_PAYEE'
      break
    case '11':
      stringstate = 'PAYEE'
      break
    case '12':
      stringstate = 'A_REGULARISER'
      break
    case '13':
      stringstate = 'REGULARISEE'
      break
  }
  let config = {
    params: {
      periodPaiment: periodPaiment,
      statut: stringstate
    }
  }
  let url = ''
  if (periodPaiment == null) {
    url = 'api/exportDemandeSansSuiteAsExcel'
  } else {
    url = 'api/exportDemandCongePayeeAsExcel'
  }
  http.post(url, {}, config).then(function (response) {
    bus.$emit('exportPaiePeriodeDemandesSuccess', response.data)
  }).catch(error => {
    bus.$emit('exportPaiePeriodeDemandesFailed', error.response)
  })
}

export const exportDemandesConge = ({ dateStart, dateEnd, state }) => {
  let stringstate = ''
  switch (state) {
    case '05':
      stringstate = 'En_COURS_VALIDATION'
      break
    case '06':
      stringstate = 'VALIDEE'
      break
    case '07':
      stringstate = 'REFUSEE'
      break
    case '08':
      stringstate = 'ANNULEE'
      break
  }
  let config = {
    params: {
      dateStart: dateStart,
      dateEnd: dateEnd,
      etat: stringstate
    }
  }
  http.post('api/exportDemandeCongeManagerAsExcel', {}, config).then(function (response) {
    bus.$emit('exportPaiePeriodeDemandesSuccess', response.data)
  }).catch(error => {
    bus.$emit('exportPaiePeriodeDemandesFailed', error.response)
  })
}

export const addCodeConge = ({ props }) => {
  let config = {
    params: {
      id: props.id,
      codeConge: props.codeConge,
      droit: props.droit
    }
  }
  http.post('api/addOrUpdateCodeCongeAPI', {}, config).then(function (response) {
    bus.$emit('addCodeCongeSuccess', response.data)
  }).catch(error => {
    bus.$emit('addCodeCongeFailed', error.response)
  })
}

export const addHoliday = ({ props, dateDebutJourFerier }) => {
  let config = {
    params: {
      id: props.id,
      intitule: props.intitule,
      dateDebutJourFerier: dateDebutJourFerier,
      nBJourFerier: props.nBJourFerier
    }
  }
  http.post('api/addOrUpdateCongeJoursFeriersAPI', {}, config).then(function (response) {
    bus.$emit('addHolidaySuccess', response.data)
  }).catch(error => {
    bus.$emit('addHolidayFailed', error.response)
  })
}

export const deleteHoliday = ({ id }) => {
  let config = {
    params: {
      id: id
    }
  }
  http.post('api/deleteCongeJoursFeriersAPI', {}, config).then(function (response) {
    bus.$emit('deleteHolidaySuccess', response.data)
  }).catch(error => {
    bus.$emit('deleteHolidayFailed', error.response)
  })
}

export const deleteCodeConge = ({ props }) => {
  let config = {
    params: {
      id: props.id
    }
  }
  http.post('api/deleteCodeCongeAPI', {}, config).then(function (response) {
    bus.$emit('deleteCodeCongeSuccess', response.data)
  }).catch(error => {
    bus.$emit('deleteCodeCongeFailed', error.response)
  })
}

export const getCodeConges = () => {
  let config = {
    params: {
    }
  }
  http.post('api/codeCongeAPI', {}, config).then(function (response) {
    bus.$emit('getCodeCongesSuccess', response.data)
  }).catch(error => {
    bus.$emit('getCodeCongesFailed', error.response)
  })
}

export const getMenuTable = ({ menuTable }) => {
  let config = {
    params: {
      menuTableId: menuTable
    }
  }
  http.post('api/listMenuOptionsAPI', {}, config).then(function (response) {
    bus.$emit('getMenuTableSuccess', response.data)
  }).catch(error => {
    bus.$emit('getMenuTableFailed', error.response)
  })
}

export const getConges = ({ code, maxRows, descending, column, search, dateStart, dateEnd, page }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      code: code,
      maxRows: maxRows,
      descending: descending,
      column: column,
      search: search,
      dateStart: dateStart,
      dateEnd: dateEnd,
      page: page
    }
  }
  http.post('api/listDemandeCongeAPI', {}, config).then(function (response) {
    bus.$emit('getCongesSuccess', response.data)
  }).catch(error => {
    bus.$emit('getCongesFailed', error.response)
  })
}

export const expiredDemandes = ({ code, maxRows, descending, column, search, dateStart, dateEnd, page }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      filterType: code,
      maxRows: maxRows,
      descending: descending,
      column: column,
      search: search,
      dateStart: dateStart,
      dateEnd: dateEnd,
      page: page
    }
  }
  http.post('api/listDemandeCongeEnCoursAPI', {}, config).then(function (response) {
    bus.$emit('getCongesSuccess', response.data)
  }).catch(error => {
    bus.$emit('getCongesFailed', error.response)
  })
}

export const getUserstoBlockUnblock = ({ maxRows, descending, column, search, page }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      maxRows: maxRows,
      descending: descending,
      column: column,
      search: search,
      page: page
    }
  }
  http.post('api/blockedAndUnblockedUsersAPI', {}, config).then(function (response) {
    bus.$emit('getUserstoBlockUnblockSuccess', response.data)
  }).catch(error => {
    bus.$emit('getUserstoBlockUnblockFailed', error.response)
  })
}

export const getCongestoPayandHistory = ({ datePaiment, code, maxRows, descending, column, search, dateStart, dateEnd, page }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      code: code,
      maxRows: maxRows,
      descending: descending,
      column: column,
      search: search,
      dateStart: dateStart,
      dateEnd: dateEnd,
      page: page,
      datePaiment: datePaiment
    }
  }
  http.post('api/listDemandeCongeAPI', {}, config).then(function (response) {
    bus.$emit('getCongesSuccess', response.data)
  }).catch(error => {
    bus.$emit('getCongesFailed', error.response)
  })
}

export const getCongesHistory = ({ reference }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      id: reference
    }
  }
  http.post('api/historiqueDemandeCongeCollaborateurAPI', {}, config).then(function (response) {
    bus.$emit('getCongeHistorySuccess', response.data)
  }).catch(error => {
    bus.$emit('getCongeHistoryFailed', error.response)
  })
}

export const sendActions = ({ code, rows, comment, soldtoRegulize, datePaiment }) => {
  let apiUrl = ''
  switch (code) {
    case 'congeValidated':
      if (!Array.isArray(rows)) {
        apiUrl = 'api/validerManagerDemandeAPI'
      } else {
        apiUrl = 'api/validerManagerToutesDemandeAPI'
        rows = Object.assign({}, rows)
      }
      break
    case 'congerejected':
      apiUrl = 'api/refuserManagerDemandeAPI'
      break
    case 'congeCanceled':
      apiUrl = 'api/annulerManagerDemandeAPI'
      break
    case 'payConge':
      apiUrl = 'api/payerCongeAPI'
      if (!Array.isArray(rows)) {
        rows = Object.assign({}, [rows])
      } else {
        rows = Object.assign({}, rows)
      }
      break
    case 'regulariserConge':
      if (!Array.isArray(rows)) {
        apiUrl = 'api/regulariserCongeAPI'
      } else {
        apiUrl = 'api/regulariserToutesDemandesAPI'
        rows = Object.assign({}, rows)
      }
      break
    case 'aRegulariserConge':
      apiUrl = 'api/aRegulariserCongeAPI'
      break
    case 'UnblockCollab':
      if (!Array.isArray(rows)) {
        apiUrl = 'api/blockOrUnblockUserFromDemandeCongeAPI'
      } else {
        apiUrl = 'api/UnblockUserFromDemandeCongeAPI'
        rows = Object.assign({}, rows)
      }
      break
    case 'blockCollab':
      apiUrl = 'api/blockOrUnblockUserFromDemandeCongeAPI'
      break
    case 'congeSansSuite':
      if (!Array.isArray(rows)) {
        apiUrl = 'api/updateEtatDemandeEnCours'
      } else {
        apiUrl = 'api/updateEtatForAllDemandeEnCours'
        rows = Object.assign({}, rows)
      }
      break
  }
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      id: rows,
      comment: comment,
      sold_a_reg: soldtoRegulize,
      datePaiment: datePaiment
    }
  }
  http.post(apiUrl, {}, config).then(function (response) {
    bus.$emit('sendActionsSuccess', response.data)
  }).catch(error => {
    bus.$emit('sendActionsFailed', error.response)
  })
}
