import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistance.storage'

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailed: '[auth] registerFailed',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailed: '[auth] loginFailed',

  logout: '[auth] logout',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailed: '[auth] getCurrentUserFailed',

  updateCurrentUserStart: '[auth] updateCurrentUserStart',
  updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
  updateCurrentUserFailed: '[auth] updateCurrentUserFailed'
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  logout: '[auth] logout',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser'
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous'
}

export default {
  state: {
    isLoading: false,
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
  },
  mutations: {
    [mutationTypes.registerStart](state) {
      state.isSubmitting = true
      state.validationErrors = null
    },
    [mutationTypes.registerSuccess](state, payload) {
      state.isSubmitting = false
      state.currentUser = payload
      state.isLoggedIn = true
    },
    [mutationTypes.registerFailed](state, payload) {
      state.isSubmitting = false
      state.validationErrors = payload
    },

    [mutationTypes.loginStart](state) {
      state.isSubmitting = true
      state.validationErrors = null
    },
    [mutationTypes.loginSuccess](state, payload) {
      state.isSubmitting = false
      state.currentUser = payload
      state.isLoggedIn = true
    },
    [mutationTypes.loginFailed](state, payload) {
      state.isSubmitting = false
      state.validationErrors = payload
    },

    [mutationTypes.logout](state) {
      state.currentUser = null
      state.isLoggedIn = false
    },

    [mutationTypes.getCurrentUserStart](state) {
      state.isLoading = true
    },
    [mutationTypes.getCurrentUserSuccess](state, payload) {
      state.isLoading = false
      state.currentUser = payload
      state.isLoggedIn = true
    },
    [mutationTypes.getCurrentUserFailed](state) {
      state.isLoading = false
      state.isLoggedIn = false
      state.currentUser = null
    },

    [mutationTypes.updateCurrentUserStart]() {},
    [mutationTypes.updateCurrentUserSuccess](state, payload) {
      state.currentUser = payload
    },
    [mutationTypes.updateCurrentUserFailed]() {}
  },
  actions: {
    [actionTypes.register](context, credentials) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.registerStart)
        authApi
          .register(credentials)
          .then((response) => {
            context.commit(mutationTypes.registerSuccess, response.data.user)
            setItem('accessToken', response.data.user.token)
            resolve(response.data.user)
          })
          .catch((result) => {
            context.commit(
              mutationTypes.registerFailed,
              result.response.data.errors
            )
          })
      })
    },
    [actionTypes.login](context, credentials) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.loginStart)
        authApi
          .login(credentials)
          .then((response) => {
            context.commit(mutationTypes.loginSuccess, response.data.user)
            setItem('accessToken', response.data.user.token)
            resolve(response.data.user)
          })
          .catch((result) => {
            context.commit(
              mutationTypes.loginFailed,
              result.response.data.errors
            )
          })
      })
    },
    [actionTypes.logout](context) {
      return new Promise((resolve) => {
        setItem('accessToken', '')
        context.commit(mutationTypes.logout)
        resolve()
      })
    },
    [actionTypes.getCurrentUser](context) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.getCurrentUserStart)
        authApi
          .getCurrentUser()
          .then((response) => {
            context.commit(
              mutationTypes.getCurrentUserSuccess,
              response.data.user
            )
            resolve(response.data.user)
          })
          .catch(() => {
            context.commit(mutationTypes.getCurrentUserFailed)
          })
      })
    },
    [actionTypes.updateCurrentUser](context, {currentUserInput}) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.updateCurrentUserStart)
        authApi
          .updateCurrentUser(currentUserInput)
          .then((user) => {
            context.commit(mutationTypes.updateCurrentUserSuccess, user)
            resolve(user)
          })
          .catch((result) => {
            context.commit(
              mutationTypes.updateCurrentUserFailed,
              result.response.data.errors
            )
          })
      })
    }
  },
  getters: {
    [getterTypes.currentUser]: (state) => {
      return state.currentUser
    },
    [getterTypes.isLoggedIn]: (state) => {
      return Boolean(state.isLoggedIn)
    },
    [getterTypes.isAnonymous]: (state) => {
      return state.isLoggedIn === false
    }
  }
}
