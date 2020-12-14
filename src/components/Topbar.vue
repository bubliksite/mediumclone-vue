<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'globalFeed'}"
        >Booblik.dev</router-link
      >
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'globalFeed'}"
            exact
            active-class="active"
            >Home</router-link
          >
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'createArticle'}"
              active-class="active"
              ><i class="ion-compose"></i>&nbsp;New Article</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'settings'}"
              active-class="active"
              ><i class="ion-gear-a"></i>&nbsp;Settings</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'userProfile', params: {slug: currentUser.username}}"
            >
              <img
                :src="currentUser.image"
                alt="Profile picture"
                class="user-pic"
              />&nbsp;{{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'login'}"
              active-class="active"
              >Sign In</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'register'}"
              active-class="active"
              >Sign Up</router-link
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getterTypes} from '@/store/modules/auth'

  export default {
    name: 'AppTopbar',
    computed: {
      ...mapGetters({
        currentUser: getterTypes.currentUser,
        isLoggedIn: getterTypes.isLoggedIn,
        isAnonymous: getterTypes.isAnonymous,
      }),
    },
  }
</script>
