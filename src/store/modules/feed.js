import feedApi from '@/api/feed'

export const mutationTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailed: '[feed] getFeedFailed',
}

export const actionTypes = {
  getFeed: '[feed] getFeed',
}

export default {
  state: {
    data: null,
    isLoading: false,
    error: null,
  },
  mutations: {
    [mutationTypes.getFeedStart](state) {
      state.isLoading = true
      state.data = null
    },
    [mutationTypes.getFeedSuccess](state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationTypes.getFeedFailed](state, payload) {
      state.isLoading = false
      state.error = payload
    },
  },
  actions: {
    [actionTypes.getFeed](context, {apiUrl}) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.getFeedStart)
        feedApi
          .getFeed(apiUrl)
          .then((response) => {
            context.commit(mutationTypes.getFeedSuccess, response.data)
            resolve(response.data)
          })
          .catch(() => {
            context.commit(mutationTypes.getFeedFailed)
          })
      })
    },
  },
}
