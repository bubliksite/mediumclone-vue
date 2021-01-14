import articleApi from '@/api/article'

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailed: '[article] getArticleFailed',

  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailed: '[article] deleteArticleFailed'
}

export const actionTypes = {
  getArticle: '[article] getArticle',
  deleteArticle: '[article] deleteArticle'
}

export default {
  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    [mutationTypes.getArticleStart](state) {
      state.isLoading = true
      state.data = null
    },
    [mutationTypes.getArticleSuccess](state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationTypes.getArticleFailed](state, payload) {
      state.isLoading = false
      state.error = payload
    },
    [mutationTypes.deleteArticleStart]() {},
    [mutationTypes.deleteArticleSuccess]() {},
    [mutationTypes.deleteArticleFailed]() {}
  },
  actions: {
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
    },
    [actionTypes.deleteArticle](context, {slug}) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.deleteArticleStart, {slug})
        articleApi
          .deleteArticle(slug)
          .then(() => {
            context.commit(mutationTypes.getArticleSuccess)
            resolve()
          })
          .catch(() => {
            context.commit(mutationTypes.deleteArticleFailed)
          })
      })
    }
  }
}
