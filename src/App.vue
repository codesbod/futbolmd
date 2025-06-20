<script setup>
import {RouterLink, RouterView} from 'vue-router'

import {useUserStore} from '@/stores/user';

import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const changeLocale = (lang) => {
  locale.value = lang;
};

const userStore = useUserStore();
</script>

<template>
  <header>
    <img alt="strategy" class="logo" src="@/assets/strategy.svg" width="125" height="125"/>
    <div class="wrapper">
      <div class="d-flex justify-content-end w-100">
        <div class="btn-group  btn-group-sm" role="group">
          <button @click="changeLocale('en')" type="button" class="btn btn-primary">EN</button>
          <button @click="changeLocale('es')" type="button" class="btn btn-primary">ES</button>
        </div>
      </div>




      <div class="row text-center">
        <h1 class="col-md-12">Amateur F&uacute;tbol Metrics</h1>
        <div class="col-md-12">
          <div class="btn-group" role="group" v-show="!userStore.loadingUser">
            <RouterLink v-show="userStore.userData" class="btn btn-primary btn-sm" to="/">{{ $t('message.menu.home') }}</RouterLink>
            <RouterLink v-show="userStore.userData" class="btn btn-primary btn-sm" to="/surveys">{{ $t('message.menu.surveys') }}</RouterLink>
            <RouterLink v-show="userStore.userData" class="btn btn-primary btn-sm" to="/games">{{ $t('message.menu.games') }}</RouterLink>
            <RouterLink v-show="userStore.userData" class="btn btn-primary btn-sm" to="/player">{{ $t('message.menu.player') }}</RouterLink>
            <RouterLink v-show="!userStore.userData" class="btn btn-primary btn-sm" to="/login">{{ $t('message.menu.login') }}</RouterLink>
            <RouterLink v-show="!userStore.userData" class="btn btn-primary btn-sm" to="/newPlayer"> {{ $t('message.menu.newPlayer') }}</RouterLink>
            <button v-show="userStore.userData" class="btn btn-primary btn-sm" type="button" @click="userStore.logoutUser()"
                    :disabled="userStore.loadingAction">
              <span class="spinner-border spinner-border-sm" v-show="userStore.loadingAction"></span>
              <span class="bi bi-box-arrow-left" v-show="!userStore.loadingAction"></span>
              {{ $t('message.menu.logout') }}
            </button>
          </div>
          <div v-show="userStore.loadingUser">
            <button class="btn btn-primary btn-sm" type="button" disabled>
              <span class="spinner-border spinner-border-sm"></span>
              loading...
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <RouterView class="pt-3 pb-3"/>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
