import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null
}

export const mutationTypes = {
  updateArticleStart: '[updateArticle] Update article start',
  updateArticleSuccess: '[updateArticle] Update article success',
  updateArticleFailed: '[updateArticle] Update article failed',

  getArticleStart: '[getArticle] Get article start',
  getArticleSuccess: '[getArticle] Get article success',
  getArticleFailed: '[getArticle] Get article failed'
}

export const actionTypes = {
  updateArticle: '[updateArticle] Update article',
  getArticle: '[getArticle] Get article'
}

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.updateArticleFailed](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.article = payload
  },
  [mutationTypes.getArticleFailed](state, payload) {
    state.isLoading = false
    state.error = payload
  }
}

const actions = {
  [actionTypes.updateArticle](context, {slug, articleInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateArticleStart)
      articleApi
        .updateArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.updateArticleSuccess, article)
          resolve(article)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateArticleFailed,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart, {slug})
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailed)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
