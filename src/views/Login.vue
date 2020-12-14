<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">Need an account?</router-link>
          </p>
          <app-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty ng-valid-email"
                type="email"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>

            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click="onSubmit"
              :disabled="isSubmitting"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import AppValidationErrors from '@/components/ValidationErrors'
  import {actionTypes} from '@/store/modules/auth'

  export default {
    name: 'AppLogin',
    components: {AppValidationErrors},
    data() {
      return {
        email: '',
        password: '',
      }
    },
    computed: {
      ...mapState({
        isSubmitting: (state) => state.auth.isSubmitting,
        validationErrors: (state) => state.auth.validationErrors,
      }),
    },
    methods: {
      onSubmit() {
        this.$store
          .dispatch(actionTypes.login, {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.$router.push({name: 'globalFeed'})
          })
      },
    },
  }
</script>
