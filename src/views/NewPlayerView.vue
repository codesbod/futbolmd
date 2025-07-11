<script setup>
import {ref} from "vue";
import {useUserStore} from '@/stores/user';
import {RouterLink} from "vue-router";

const userStore = useUserStore();

const email = ref();
const password = ref();
const codeTeam = ref();

const newPlayer = () => {
  if (!email.value || password.value.length < 6 || !codeTeam.value) {
    alert("Campos requeridos");
    return;
  }
  userStore.createUser(email.value, password.value, codeTeam.value);
}
</script>

<template>
  <div class="login">
    <form class="row g-3 w-100 needs-validation was-validated" novalidate @submit.prevent="newPlayer">
      <h1 class="col-md-12">{{ $t('message.menu.newPlayer') }}</h1>
      <div class="col-md-6">
        <label for="email" class="form-label"> {{ $t('message.label.email') }}</label>
        <input type="email" class="form-control" id="email" v-model.trim="email" :placeholder="$t('message.label.enterEmail')"
               required>
        <div class="invalid-feedback">
          {{ $t('message.label.emailRequired') }}
        </div>
      </div>
      <div class="col-md-6">
        <label for="password" class="form-label">{{ $t('message.label.password') }}</label>
        <input type="password" class="form-control" id="password" v-model.trim="password"
               :placeholder="$t('message.label.enterPassword')" required>
        <div class="invalid-feedback">
          {{ $t('message.label.passwordRequired') }}
        </div>
      </div>
      <div class="col-md-12">
        <label for="codeTeam" class="form-label">{{ $t('message.label.codeTeam') }}</label>
        <input type="password" class="form-control" id="codeTeam" v-model.trim="codeTeam"
               :placeholder="$t('message.label.enterCodeTeam')" required>
        <div class="invalid-feedback">
          {{ $t('message.label.passwordCodeTeam') }}
        </div>
      </div>
      <div class="col-12 border-top text-center pt-2">
        <button class="btn btn-primary" type="submit" :disabled="userStore.loadingAction">
          <span class="spinner-border spinner-border-sm" v-show="userStore.loadingAction"></span>
          <span class="bi bi-person-plus" v-show="!userStore.loadingAction"></span>
          {{ $t('message.btn.signUp') }}
        </button>
      </div>
      <div class="text-center mb-2">
        <RouterLink class="link-primary" to="/login">{{ $t('message.label.goToSingIn') }}</RouterLink>
      </div>
    </form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
