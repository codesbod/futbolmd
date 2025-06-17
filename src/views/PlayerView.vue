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
    <form class="row g-3 w-100 needs-validation was-validated" novalidate @submit.prevent="save">
      <h1 class="col-md-12">{{ $t('message.label.player') }}</h1>
      <div class="col-md-6">
        <label for="firstName" class="form-label">{{ $t('message.label.firstName') }}</label>
        <input type="text" class="form-control" id="firstName" v-model.trim="playerStore.player.firstName"
        :placeholder="$t('message.label.enterName')" required>
        <div class="invalid-feedback">
          {{ $t('message.label.nameRequired') }}
        </div>
      </div>
      <div class="col-md-6">
        <label for="lastName" class="form-label">{{ $t('message.label.lastName') }}</label>
        <input type="text" class="form-control" id="lastName" v-model.trim="playerStore.player.lastName"
               :placeholder="$t('message.label.enterLastName')" required>
        <div class="invalid-feedback">
          {{ $t('message.label.lastNameRequired') }}
        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <label class="form-label col-md-12">{{ $t('message.label.minimumPositions') }}</label>
          <div v-for="cluster in playerStore.player.positions" :key="cluster.code" class="form-check col-md-6">
            {{ cluster.name }}
            <div v-for="position in cluster.positions" :key="position.code" class="form-check">
              <input class="form-check-input" type="checkbox" v-model="position.value">
              <label class="form-check-label">
                {{ position.name }} ({{ position.code }})
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <label class="form-label">{{ $t('message.label.addAttributes') }}</label>
        <table class="table">
          <thead>
          <tr>
            <th class="text-center">{{ $t('message.label.attributes') }}</th>
            <th colspan="2" class="text-center">{{ $t('message.label.rating') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="attribute in playerStore.player.attributes" :key="attribute.code">
            <td>
              <label class="form-range" for="">
                {{ attribute.name }}
              </label>
            </td>
            <td><input type="range" class="form-range" min="1" max="9" v-model="attribute.rating" :disabled="!attribute?.show"></td>
            <td class="text-center">{{ attribute.rating }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 border-top text-center pt-2">
        <button class="btn btn-primary" type="submit" :disabled="playerStore.loadingPlayer">
          <span class="spinner-border spinner-border-sm" v-show="playerStore.loadingPlayer"></span>
          <span class="bi bi-floppy" v-show="!playerStore.loadingPlayer"></span>
          {{ $t('message.label.save') }}
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