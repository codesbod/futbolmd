<script setup lang="ts">
import {useGameStore} from '@/stores/game';
import {useUserStore} from '@/stores/user';
import dayjs from "dayjs";

const userStore = useUserStore();
const gameStore = useGameStore();
gameStore.getHistoryGames();

const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}
</script>

<template>
  <div class="games">
    <div class="row g-3 w-100">
      <h1 class="col-md-12">{{ $t('message.label.games') }}</h1>
      <div class="col-md-12 text-end" v-if="userStore.userData && userStore.isAdmin">
        <button class="btn btn-primary me-2" type="button" @click="gameStore.actionNewGame()">
          <i class="bi bi-plus-lg"></i>
          {{ $t('message.btn.newGame') }}
        </button>
      </div>
      <div class="col-md-12">
        <table class="table table-striped table-sm">
          <thead>
          <tr>
            <th class="text-center">{{ $t('message.label.place') }}</th>
            <th class="text-center">{{ $t('message.label.dateAndTime') }}</th>
            <th class="text-center">{{ $t('message.label.type') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="game in gameStore.games" :key="game.id">
            <td>{{ game.place }}</td>
            <td class="text-center" style="min-width: 150px">{{ formatDate(game.dateTime.toDate()) }}</td>
            <td class="text-center">{{ game.type.code }}</td>
            <td class="text-center">
              <button class="btn btn-outline-primary btn-sm me-1" type="button" @click="gameStore.actionViewGame(game)">
                <i class="bi bi-zoom-in"></i>
              </button>
              <button class="btn btn-outline-primary btn-sm me-1" type="button" @click="gameStore.actionUpdateGame(game)" v-if="userStore.userData && userStore.isAdmin">
                <i class="bi bi-pencil-square"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .games {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>