import addToFavoritesApi from '@/api/addToFavorites'

export const mutationTypes = {
  addToFavoritesStart: '[addToFavorites] addToFavoritesStart',
  addToFavoritesSuccess: '[addToFavorites] addToFavoritesSuccess',
  addToFavoritesFailure: '[addToFavorites] addToFavoritesFailed'
}

export const actionTypes = {
  addToFavorites: '[addToFavorites] Add To Favorites'
}

export default {
  mutations: {
    [mutationTypes.addToFavoritesStart]() {},
    [mutationTypes.addToFavoritesSuccess]() {},
    [mutationTypes.addToFavoritesFailure]() {}
  },
  actions: {
    [actionTypes.addToFavorites](context, {slug, isFavorited}) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.addToFavoritesStart)
        const promise = isFavorited
          ? addToFavoritesApi.removeFromFavorites(slug)
          : addToFavoritesApi.addToFavorites(slug)

        promise
          .then((article) => {
            context.commit(mutationTypes.addToFavoritesSuccess, article)
            resolve(article)
          })
          .catch(() => {
            context.commit(mutationTypes.addToFavoritesFailure)
          })
      })
    }
  }
}
