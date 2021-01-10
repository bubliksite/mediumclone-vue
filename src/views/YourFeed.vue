<template>
  <div class="home-page">
    <app-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed-toggler />
          <app-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <app-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppFeed from '@/components/Feed'
  import AppPopularTags from '@/components/PopularTags'
  import AppBanner from '@/components/Banner'
  import AppFeedToggler from '@/components/FeedToggler'
  export default {
    name: 'AppYourFeed',
    components: {
      AppFeedToggler,
      AppBanner,
      AppFeed,
      AppPopularTags
    },
    data() {
      return {
        apiUrl: '/articles/feed'
      }
    }
  }
</script>
