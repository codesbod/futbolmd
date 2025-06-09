<script setup lang="ts">

import {usePlayerStore} from '@/stores/player'

const playerStore = usePlayerStore();

playerStore.getPlayer();

const save = () => {
  playerStore.getPositions(playerStore.player);
  if(playerStore.positions.length < 3){
    alert(`Select minimum tree positions`);
    return;
  }
  playerStore.addPlayer();
}

</script>

<template>
  <div class="player">
    <form class="row g-3 w-100 needs-validation" novalidate @submit.prevent="save">
      <h1 class="col-md-12">Player</h1>
      <div class="col-md-6">
        <label for="firstName" class="form-label">First name</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="playerStore.player.firstName"
               placeholder="Ingrese su nombre">
        <div class="invalid-feedback">
          First name required
        </div>
      </div>
      <div class="col-md-6">
        <label for="lastName" class="form-label">Last name</label>
        <input type="text" class="form-control" id="lastName" v-model.trim="playerStore.player.lastName"
               placeholder="Ingrese sus apellidos">
        <div class="invalid-feedback">
          Last name required
        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <label for="validationCustom03" class="form-label col-md-12">Positions (Select minimum tree positions)</label>
          <div v-for="cluster in playerStore.player.positions" :key="cluster.code" class="form-check col-md-6">
            {{ cluster.name }}
            <div v-for="position in cluster.positions" :key="position.code" class="form-check">
              <input class="form-check-input" type="checkbox" v-model="position.value">
              <label class="form-check-label fs-6">
                {{ position.name }} ({{ position.code }})
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <label class="form-label">Add attributes</label>
        <table class="table">
          <thead>
          <tr>
            <th class="text-center">Attributes</th>
            <th colspan="2" class="text-center">Rating</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="attribute in playerStore.player.attributes" :key="attribute.code">
            <td>{{ attribute.name }}</td>
            <td><input type="range" class="form-range" min="1" max="9" v-model="attribute.rating" :disabled="attribute?.show"></td>
            <td class="text-center">{{ attribute.rating }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 border-top text-center pt-2">
        <button class="btn btn-primary" type="submit" :disabled="playerStore.loadingPlayer">
          <span class="spinner-border spinner-border-sm" v-show="playerStore.loadingPlayer"></span>
          <span class="bi bi-floppy" v-show="!playerStore.loadingPlayer"></span>
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .player {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>