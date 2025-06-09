<script setup lang="ts">
import {useGameStore} from '@/stores/game';
import { useSurveyStore } from '@/stores/survey';
import dayjs from "dayjs";

const surveyStore = useSurveyStore();
const gameStore = useGameStore();
gameStore.getGames();

const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}
</script>

<template>
  <div class="survey">
    <div class="row g-3">
      <h1 class="col-md-12">Surveys</h1>
      <div class="col-md-12">
        <table class="table table-striped table-sm">
          <thead>
          <tr>
            <th class="text-center">Place</th>
            <th class="text-center">Date and Time</th>
            <th class="text-center">Type</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          <tr v-for="game in gameStore.games" :key="game.id">
            <td>{{ game.place }}</td>
            <td class="text-center" style="min-width: 150px">{{ formatDate(game.dateTime) }}</td>
            <td class="text-center">{{ game.type?.code }}</td>
            <td class="text-center">
              <button class="btn btn-outline-primary btn-sm" type="button" @click="surveyStore.actionSendSurveys(game)">
                <i class="bi bi-send"></i>
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
  .survey {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>