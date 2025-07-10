<script setup lang="ts">

import {logMigrate, migrateDataBase} from "@/components/developer/MigrateDataBase.js";
import {ref} from "vue";

const user = ref({
  email: "",
  password: "",
});

const firebaseConfig = ref({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
  databaseURL: ""
});

const migrateDataBase = async () => {
  await migrateDataBase(user.value, firebaseConfig.value);
}

</script>

<template>
  <div class="migrate">
    <form class="row g-3 w-100 needs-validation was-validated" novalidate @submit.prevent="migrateDataBase">
      <h1 class="col-md-12">Migrate Data Base</h1>
      <div class="col-md-6">
        <label for="firstName" class="form-label">Email</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="user.email" required>
        <div class="invalid-feedback">
          Required email
        </div>
      </div>
      <div class="col-md-6">
        <label for="firstName" class="form-label">Password</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="user.password" required>
        <div class="invalid-feedback">
          Required password
        </div>
      </div>
      <div class="col-md-12 border-top"></div>
      <div class="col-md-6">
        <label for="firstName" class="form-label">apiKey</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="firebaseConfig.apiKey" required>
        <div class="invalid-feedback">
          Required apiKey
        </div>
      </div>
      <div class="col-md-6">
        <label for="firstName" class="form-label">authDomain</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="firebaseConfig.authDomain" required>
        <div class="invalid-feedback">
          Required authDomain
        </div>
      </div>
      <div class="col-md-6">
        <label for="firstName" class="form-label">projectId</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="firebaseConfig.projectId" required>
        <div class="invalid-feedback">
          Required projectId
        </div>
      </div>
      <div class="col-md-6">
        <label for="firstName" class="form-label">storageBucket</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="firebaseConfig.storageBucket" required>
        <div class="invalid-feedback">
          Required storageBucket
        </div>
      </div>
      <div class="col-md-6">
        <label for="firstName" class="form-label">messagingSenderId</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="firebaseConfig.messagingSenderId" required>
        <div class="invalid-feedback">
          Required messagingSenderId
        </div>
      </div>
      <div class="col-md-6">
        <label for="firstName" class="form-label">appId</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="firebaseConfig.appId" required>
        <div class="invalid-feedback">
          Required appId
        </div>
      </div>
      <div class="col-md-6">
        <label for="firstName" class="form-label">measurementId</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="firebaseConfig.measurementId" required>
        <div class="invalid-feedback">
          Required measurementId
        </div>
      </div>
      <div class="col-md-6">
        <label for="firstName" class="form-label">databaseURL</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="firebaseConfig.databaseURL" required>
        <div class="invalid-feedback">
          Required databaseURL
        </div>
      </div>
      <div class="col-12 border-top text-center pt-2">
        <button class="btn btn-primary" type="submit">
          <i class="bi bi-database-add"></i>
          Migrete
        </button>
      </div>
      <h1 class="col-md-12">Log...</h1>
      <div class="col-12 cmd-style">
        <div class="list-group-item" v-for="(log, index) in logMigrate" :key="index">{{ log }}</div>
      </div>
    </form>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .migrate {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.cmd-style {
  background-color: black;
  color: lime;
  font-family: 'Courier New', Courier, monospace;
  padding: 20px;
  border-radius: 5px;
  white-space: pre-wrap;
  overflow-y: scroll;
  height: 400px;
}
</style>