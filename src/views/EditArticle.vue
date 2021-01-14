<template>
  <div class="container">
    <app-loading v-if="isLoading" />
    <app-article-form
      v-else
      :initial-values="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
  import AppArticleForm from '@/components/ArticleForm'
  import AppLoading from '@/components/Loading'
  import {actionTypes} from '@/store/modules/editArticle'
  import {mapState} from 'vuex'

  export default {
    name: 'AppEditArticle',
    components: {AppLoading, AppArticleForm},
    computed: {
      ...mapState({
        isSubmitting: (state) => state.editArticle.isSubmitting,
        validationErrors: (state) => state.editArticle.validationErrors,
        isLoading: (state) => state.editArticle.isLoading,
        article: (state) => state.editArticle.article
      }),
      initialValues() {
        if (!this.article) {
          return {
            title: '',
            description: '',
            body: '',
            tagList: []
          }
        }
        return {
          title: this.article.title,
          description: this.article.description,
          body: this.article.body,
          tagList: this.article.tagList
        }
      }
    },
    mounted() {
      this.$store.dispatch(actionTypes.getArticle, {
        slug: this.$route.params.slug
      })
    },
    methods: {
      onSubmit(articleInput) {
        const slug = this.$route.params.slug
        this.$store
          .dispatch(actionTypes.updateArticle, {slug, articleInput})
          .then((article) => {
            this.$router.push({name: 'article', params: {slug: article.slug}})
          })
      }
    }
  }
</script>

<style></style>
