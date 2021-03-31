import { http } from '../plugins/http/index.js'
import { bus } from '../plugins/event-bus.js'

export const getQuestions = ({ module }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      module: module
    }
  }
  http.post('api/getQuestionsAndAnswersAPI', {}, config).then(function (response) {
    bus.$emit('getQuestionsSuccess', response.data)
  }).catch(error => {
    bus.$emit('getQuestionsFailed', error.response)
  })
}

export const getVideos = ({ module }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      module: module
    }
  }
  http.post('api/getVideosAPI', {}, config).then(function (response) {
    bus.$emit('getVideosSuccess', response.data)
  }).catch(error => {
    bus.$emit('getVideosFailed', error.response)
  })
}

export const getVideoIframe = ({ id }) => {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      id: id
    }
  }
  http.post('api/getHelpVideoToPlayAPI', {}, config).then(function (response) {
    bus.$emit('getVideoIframeSuccess', response.data)
  }).catch(error => {
    bus.$emit('getVideoIframeFailed', error.response)
  })
}
