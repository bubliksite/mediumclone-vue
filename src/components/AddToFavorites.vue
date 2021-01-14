<template>
  <button
    :class="{
      'btn': true,
      'btn-sm': true,
      'btn-primary': isFavoritedLocal,
      'btn-outline-primary': !isFavoritedLocal
    }"
    @click="handleLike"
  >
    <i class="ion-heart"></i>
    <span>&nbsp;{{ favoritesCountLocal }}</span>
  </button>
</template>

<script>
  import {actionTypes} from '@/store/modules/addToFavorites'
  export default {
    name: 'AppAddToFavorites',
    props: {
      isFavorited: {
        type: Boolean,
        required: true
      },
      articleSlug: {
        type: String,
        required: true
      },
      favoritesCount: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        isFavoritedLocal: this.isFavorited,
        favoritesCountLocal: this.favoritesCount
      }
    },
    methods: {
      handleLike() {
        this.$store.dispatch(actionTypes.addToFavorites, {
          slug: this.articleSlug,
          isFavorited: this.isFavoritedLocal
        })
        if (this.isFavoritedLocal) {
          this.favoritesCountLocal--
        } else {
          this.favoritesCountLocal++
        }
        this.isFavoritedLocal = !this.isFavoritedLocal
      }
    }
  }
</script>

<style></style>
