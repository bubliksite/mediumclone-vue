<template>
    <div>
        <div v-if="isLoading">Tags loading...</div>
        <div v-if="error">Something wrong with tags</div>
        <div v-if="popularTags" class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
                <router-link class="tag-default tag-pill" :to="{name: 'tag', params: {slug: popularTag}}" v-for="popularTag in popularTags" :key="popularTag">
                    {{ popularTag }}
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapState} from 'vuex'
    import {actionTypes} from '@/store/modules/popularTags'

    export default {
        name: "AppPopularTags",
        computed: {
            ...mapState({
                isLoading: (state) => state.getPopularTags.isLoading,
                popularTags: (state) => state.getPopularTags.data,
                error: (state) => state.getPopularTags.error,
            })
        },
        mounted() {
            this.$store.dispatch(actionTypes.getPopularTags)
        }
    }
</script>

<style scoped>

</style>