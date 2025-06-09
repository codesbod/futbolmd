<script setup>
import {ref} from "vue";
import {useUserStore} from '@/stores/user';

const userStore = useUserStore();

const email = ref();
const password = ref();

const newPlayer = () => {
  if (!email.value || password.value.length < 6) {
    alert("Campos requeridos");
    return;
  }
  userStore.createUser(email.value, password.value);
}
</script>

<template>
  <div class="login">
    <form class="row g-3 needs-validation" novalidate @submit.prevent="newPlayer">
      <h1 class="col-md-12">New Player</h1>
      <div class="col-md-6">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model.trim="email" placeholder="Ingrese un email"
               required>
        <div class="invalid-feedback">
          Email required
        </div>
      </div>
      <div class="col-md-6">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model.trim="password"
               placeholder="Ingrese un contraseña" required>
        <div class="invalid-feedback">
          Password required
        </div>
      </div>
      <div class="col-12 border-top text-center pt-2">
        <button class="btn btn-primary" type="submit" :disabled="userStore.loadingAction">
          <span class="spinner-border spinner-border-sm" v-show="userStore.loadingAction"></span>
          <span class="bi bi-person-plus" v-show="!userStore.loadingAction"></span>
          New player
        </button>
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
