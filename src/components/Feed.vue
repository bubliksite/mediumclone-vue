<template>
  <div>
    <app-loading v-if="isLoading" />
    <app-error-message v-if="error" :message="error" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" :alt="article.author.username" />
          </router-link>
          <div class="info">
            <router-link
              class="author"
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <app-add-to-favorites
              :isFavorited="article.favorited"
              :articleSlug="article.slug"
              :favoritesCount="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <app-taglist :tags="article.tagList" />
        </router-link>
      </div>
      <app-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
  import {actionTypes} from '@/store/modules/feed'
  import {limit} from '@/helpers/vars'
  import {mapState} from 'vuex'
  import AppPagination from '@/components/Pagination'
  import {stringify, parseUrl} from 'query-string'
  import AppLoading from '@/components/Loading'
  import AppErrorMessage from '@/components/ErrorMessage'
  import AppTaglist from './Taglist'
  import AppAddToFavorites from '@/components/AddToFavorites'

  export default {
    name: 'AppFeed',
    props: {
      apiUrl: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        limit
      }
    },
    computed: {
      ...mapState({
        isLoading: (state) => state.feed.isLoading,
        feed: (state) => state.feed.data,
        error: (state) => state.feed.error
      }),
      currentTag() {
        return String(this.$route.params.slug || '')
      },
      currentPage() {
        return Number(this.$route.query.page || '1')
      },
      baseUrl() {
        return this.$route.path
      },
      offset() {
        return this.currentPage * limit - limit
      }
    },
    watch: {
      currentPage() {
        this.fetchFeed()
      },
      currentTag() {
        this.fetchFeed()
      },
      apiUrl() {
        this.fetchFeed()
      }
    },
    components: {
      AppAddToFavorites,
      AppTaglist,
      AppErrorMessage,
      AppLoading,
      AppPagination
    },
    mounted() {
      this.fetchFeed()
    },
    methods: {
      fetchFeed() {
        const parsedUrl = parseUrl(this.apiUrl)
        const stringifyParams = stringify({
          limit,
          offset: this.offset,
          ...parsedUrl.query
        })
        const apiUrlWithParams = `${parsedUrl.url}?${stringifyParams}`
        console.log(apiUrlWithParams)
        this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
      }
    }
  }
</script>
