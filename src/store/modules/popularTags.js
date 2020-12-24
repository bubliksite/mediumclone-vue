import popularTagsApi from '@/api/popularTags'

export const mutationTypes = {
    getPopularTagsStart: '[popularTags] getPopularTagsStart',
    getPopularTagsSuccess: '[popularTags] getPopularTagsSuccess',
    getPopularTagsFailed: '[popularTags] getPopularTagsFailed',
}

export const actionTypes = {
    getPopularTags: '[popularTags] getPopularTags',
}

export default {
    state: {
        data: null,
        isLoading: false,
        error: null,
    },
    mutations: {
        [mutationTypes.getPopularTagsStart](state) {
            state.isLoading = true
            state.data = null
        },
        [mutationTypes.getPopularTagsSuccess](state, payload) {
            state.isLoading = false
            state.data = payload
        },
        [mutationTypes.getPopularTagsFailed](state, payload) {
            state.isLoading = false
            state.error = payload
        },
    },
    actions: {
        [actionTypes.getPopularTags](context) {
            return new Promise((resolve) => {
                context.commit(mutationTypes.getPopularTagsStart)
                popularTagsApi
                    .getPopularTags()
                    .then((tags) => {
                        context.commit(mutationTypes.getPopularTagsSuccess, tags)
                        resolve(tags)
                    })
                    .catch(() => {
                        context.commit(mutationTypes.getPopularTagsFailed)
                    })
            })
        },
    },
}
