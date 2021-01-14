import userProfileApi from '@/api/userProfile'

export const mutationTypes = {
  getUserProfileStart: '[userProfile] getUserProfileStart',
  getUserProfileSuccess: '[userProfile] getUserProfileSuccess',
  getUserProfileFailed: '[userProfile] getUserProfileFailed'
}

export const actionTypes = {
  getUserProfile: '[userProfile] getUserProfile'
}

export default {
  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    [mutationTypes.getUserProfileStart](state) {
      state.isLoading = true
      state.data = null
    },
    [mutationTypes.getUserProfileSuccess](state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationTypes.getUserProfileFailed](state, payload) {
      state.isLoading = false
      state.error = payload
    }
  },
  actions: {
    [actionTypes.getUserProfile](context, {slug}) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.getUserProfileStart)
        userProfileApi
          .getUserProfile(slug)
          .then((userProfile) => {
            context.commit(mutationTypes.getUserProfileSuccess, userProfile)
            resolve(userProfile)
          })
          .catch(() => {
            context.commit(mutationTypes.getUserProfileFailed)
          })
      })
    }
  }
}
