<script setup>
import {RouterLink, RouterView} from 'vue-router'

import {useUserStore} from '@/stores/user';

import {useI18n} from 'vue-i18n';

const {t, locale} = useI18n();

const changeLocale = (lang) => {
  locale.value = lang;
};

const userStore = useUserStore();
</script>

<template>
  <header>
    <img alt="strategy" class="logo" src="@/assets/strategy.svg" width="125" height="125"/>
    <div class="wrapper">
      <div class="row text-center">
        <h1 class="col-md-12">Amateur F&uacute;tbol Analytics</h1>
        <div class="col-md-12">
          <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
              <div class="btn-group  btn-group-sm" role="group">
                <button @click="changeLocale('en')" type="button" class="btn btn-primary">EN</button>
                <button @click="changeLocale('es')" type="button" class="btn btn-primary">ES</button>
              </div>
              <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                      aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar"
                   aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Amateur F&uacute;tbol Analytics</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                  <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <RouterLink v-show="userStore.userData" class="nav-link" to="/">
                        <span class="bi bi-house"></span>
                        {{ $t('message.menu.home') }}
                      </RouterLink>
                    </li>
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <RouterLink v-show="userStore.userData" class="nav-link" to="/team">{{ $t('message.menu.teamPlayers') }}</RouterLink>
                    </li>
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <RouterLink v-show="userStore.userData" class="nav-link" to="/player">{{$t('message.menu.player')}}</RouterLink>
                    </li>
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <RouterLink v-show="userStore.userData" class="nav-link" to="/games">{{$t('message.menu.games')}}</RouterLink>
                    </li>
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <RouterLink v-show="userStore.userData" class="nav-link" to="/surveys">{{ $t('message.menu.surveys') }}</RouterLink>
                    </li>
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <RouterLink v-show="!userStore.userData" class="nav-link" to="/login">{{$t('message.menu.login')}}</RouterLink>
                    </li>
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <RouterLink v-show="!userStore.userData" class="nav-link" to="/newPlayer">{{ $t('message.menu.newPlayer') }}</RouterLink>
                    </li>
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <RouterLink v-if="userStore.isDeveloper" class="nav-link text-danger" to="/migrateDataBase">Migrate Data Base</RouterLink>
                    </li>
                    <li class="nav-item">
                      <button v-show="userStore.userData" class="nav-link m-auto" type="button"
                              @click="userStore.logoutUser()"
                              :disabled="userStore.loadingAction">
                        <span class="spinner-border spinner-border-sm" v-show="userStore.loadingAction"></span>
                        <span class="bi bi-box-arrow-left" v-show="!userStore.loadingAction"></span>
                        {{ $t('message.menu.logout') }}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
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
