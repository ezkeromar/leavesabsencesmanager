import { http } from '../plugins/http/index.js'
import { bus } from '../plugins/event-bus.js'

export const notpaidstore = ({ dateStart, dateEnd, morning, afternoon, motif, colabId = null }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      dateDeDebut: dateStart,
      dateDeFin: dateEnd,
      typeDebut: morning,
      typeFin: afternoon,
      motif: motif,
      jsonReturn: true,
      collab_id: colabId
    }
  }
  http.post('api/nouvelleAbsenceNonRemuneree', {}, config).then(function (response) {
    bus.$emit('absenceCreateSuccess', response.data)
  }).catch(error => {
    bus.$emit('absenceCreateFailed', error.response)
  })
}

export const sicknessstore = ({ dateStart, dateEnd, morning, afternoon, colabId }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      dateDeDebut: dateStart,
      dateDeFin: dateEnd,
      typeDebut: morning,
      typeFin: afternoon,
      jsonReturn: true,
      collab_id: colabId
    }
  }
  http.post('api/ajouterAbsenceMaladie', {}, config).then(function (response) {
    bus.$emit('absenceCreateSuccess', response.data)
  }).catch(error => {
    bus.$emit('absenceCreateFailed', error.response)
  })
}

export const workaccidentstore = ({ dateStart, dateEnd, morning, afternoon, colabId }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      dateDeDebut: dateStart,
      dateDeFin: dateEnd,
      typeDebut: morning,
      typeFin: afternoon,
      jsonReturn: true,
      collab_id: colabId
    }
  }
  http.post('api/ajouterAbsenceAccidentTravail', {}, config).then(function (response) {
    bus.$emit('absenceCreateSuccess', response.data)
  }).catch(error => {
    bus.$emit('absenceCreateFailed', error.response)
  })
}

export const maternitystore = ({ dateStart, dateEnd, morning, afternoon, colabId }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      dateDeDebut: dateStart,
      dateDeFin: dateEnd,
      typeDebut: morning,
      typeFin: afternoon,
      jsonReturn: true,
      collab_id: colabId
    }
  }
  http.post('api/ajouterAbsenceMaternite', {}, config).then(function (response) {
    bus.$emit('absenceCreateSuccess', response.data)
  }).catch(error => {
    bus.$emit('absenceCreateFailed', error.response)
  })
}

export const legalfamilystore = ({ dateStart, dateEnd, morning, afternoon, type, colabId = null }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      dateDeDebut: dateStart,
      dateDeFin: dateEnd,
      typeDebut: morning,
      typeFin: afternoon,
      typeAbsenceCode: type,
      jsonReturn: true,
      collab_id: colabId
    }
  }
  http.post('api/ajouterAbsenceSpecial', {}, config).then(function (response) {
    bus.$emit('legalfamilystoreSuccess', response.data)
  }).catch(error => {
    bus.$emit('legalfamilystoreFailed', error.response)
  })
}

export const exportPaiePeriodeDemandes = ({ periodPaiment }) => {
  let config = {
    params: {
      period: periodPaiment
    }
  }
  http.post('api/exportAbsenceTraiteeAsExcel', {}, config).then(function (response) {
    bus.$emit('exportPaiePeriodeDemandesSuccess', response.data)
  }).catch(error => {
    bus.$emit('exportPaiePeriodeDemandesFailed', error.response)
  })
}

export const getDurationAC = ({ dateStart, dateEnd, morning, afternoon, type }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      dateDeDebut: dateStart,
      dateDeFin: dateEnd,
      typeDebut: morning,
      typeFin: afternoon,
      type: type
    }
  }
  http.post('api/calculateNombreJoursExact', {}, config).then(function (response) {
    bus.$emit('getDurationACSuccess', response.data)
  }).catch(error => {
    bus.$emit('getDurationACFailed', error.response)
  })
}

export const getAbsences = ({ code, maxRows, descending, column, search, dateStart, dateEnd, page, period = null, menuId = null }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      maxRows: maxRows,
      descending: descending,
      column: column,
      search: search,
      dateStart: dateStart,
      dateEnd: dateEnd,
      page: page,
      period: period,
      etat: '',
      menuId: menuId
    }
  }
  var url = ''
  switch (code) {
    case '23':
      url = 'api/listAbsenceNonRemunereeCollaborateur'
      break
    case '24':
      url = 'api/listAbsenceSpecialForRoleCollab'
      break
    case '25':
      url = 'api/listAbsenceMaladieCollaborateur'
      break
    case '26':
      url = 'api/listAbsenceAccidentTravailCollaborateur'
      break
    case '27':
      url = 'api/listAbsenceMaterniteCollaborateur'
      break
    case '28':
      url = 'api/listAbsenceNonRemunereeEquipe'
      break
    case '29':
      url = 'api/listAbsenceSpecialEquipe'
      break
    case '30':
      url = 'api/listAbsenceMaladieEquipe'
      break
    case '31':
      url = 'api/listAbsenceAccidentTravailEquipe'
      break
    case '32':
      url = 'api/listAbsenceAccidentTravailEquipe'
      break
    case '33':
      url = 'api/listAbsenceForAdmin'
      config.params.etat = 'EN_COURS'
      break
    case '34':
      url = 'api/listAbsenceForAdmin'
      config.params.etat = 'VALIDEE'
      break
    case '35':
      url = 'api/listAbsenceForAdmin'
      config.params.etat = 'TRAITEE'
      break
  }
  http.post(url, {}, config).then(function (response) {
    bus.$emit('getAbsenceSuccess', response.data)
  }).catch(error => {
    bus.$emit('getAbsenceFailed', error.response)
  })
}

export const sendActions = ({ code, rows, comment, soldtoRegulize, datePaiment }) => {
  let apiUrl = ''
  switch (code) {
    case 'deleteabs':
      apiUrl = 'api/supprimerAbsence'
      rows = Object.assign({}, [rows])
      break
    case 'validateabsren':
      apiUrl = 'api/validerAbsenceNonRemunereeEquipe'
      if (!Array.isArray(rows)) {
        rows = Object.assign({}, [rows])
      } else {
        rows = Object.assign({}, rows)
      }
      break
    case 'refuseabsren':
      apiUrl = 'api/refuserAbsenceNonRemunereeEquipe'
      break
    case 'validateabsrencc':
      apiUrl = 'api/validerAbsence'
      if (!Array.isArray(rows)) {
        rows = Object.assign({}, [rows])
      } else {
        rows = Object.assign({}, rows)
      }
      break
    case 'traitedabsrencc':
      apiUrl = 'api/traiterAbsence'
      if (!Array.isArray(rows)) {
        rows = Object.assign({}, [rows])
      } else {
        rows = Object.assign({}, rows)
      }
      break
    case 'demnadeCongecc':
      apiUrl = 'api/transformAbsenceToDemandeConge'
      break
    case 'demandeNRcc':
      apiUrl = 'api/transformAbsenceMaladieToAbsenceNR'
      break
    case 'deleteAbsencecc':
      apiUrl = 'api/supprimerAbsence'
      rows = Object.assign({}, [rows])
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

export const listabslegal = () => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      jsonReturn: true
    }
  }
  http.post('api/listTypesAbsenceSpecial', {}, config).then(function (response) {
    bus.$emit('listabslegalSuccess', response.data)
  }).catch(error => {
    bus.$emit('listabslegalFailed', error.response)
  })
}
