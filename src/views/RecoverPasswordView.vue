<script setup lang="ts">

import {useUserStore} from "@/stores/user";
import {ref} from "vue";
import {RouterLink} from "vue-router";

const userStore = useUserStore();

const email = ref("");

const recoverPassword = () => {
  if (!email.value) {
    alert("Campos requeridos");
    return;
  }
  userStore.recoverPassword(email.value);
}

</script>

<template>
  <div class="recoverPassword">
    <form class="row g-3 w-100 needs-validation was-validated" novalidate @submit.prevent="recoverPassword">
      <h1 class="col-md-12">{{ $t('message.menu.recoverPassword') }}</h1>
      <div class="col-12 lh-1">
        {{ $t('message.text.recoverPassword') }}
      </div>
      <div class="col-12">
        <label for="email" class="form-label">{{ $t('message.label.email') }}</label>
        <input type="email" class="form-control" id="email" v-model.trim="email" :placeholder="$t('message.label.enterEmail')"
               required>
        <div class="invalid-feedback">
          {{ $t('message.label.emailRequired') }}
        </div>
      </div>
      <div class="col-12 border-top text-center pt-2">
        <button class="btn btn-primary" type="submit"  :disabled="userStore.loadingAction">
          <span class="spinner-border spinner-border-sm" v-show="userStore.loadingAction"></span>
          <span class="bi bi-send" v-show="!userStore.loadingAction"></span>
          {{ $t('message.btn.send') }}
        </button>
      </div>
      <div class="text-center mb-2">
        <RouterLink class="link-primary" to="/login">{{ $t('message.label.goToSingIn') }}</RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .recoverPassword {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>