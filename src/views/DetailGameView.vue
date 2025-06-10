<script setup lang="ts">
import {useGameStore} from '@/stores/game';
import dayjs from "dayjs";

const gameStore = useGameStore();

const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}
</script>
<template>
  <div class="detailGame">
    <div class="row g-3 w-100">
      <h1 class="col-md-12">Detail Game</h1>
      <div class="col-md-12">
        <table class="table table-striped table-sm">
          <thead>
          <tr>
            <th class="text-center">Place</th>
            <th class="text-center">Date and Time</th>
            <th class="text-center">Type</th>
            <th class="text-center">Result</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ gameStore.game.place }}</td>
            <td class="text-center" style="min-width: 150px">{{ formatDate(gameStore.game.dateTime?.toDate()) }}</td>
            <td class="text-center">{{ gameStore.game.type.code }}</td>
            <td class="text-center">{{ gameStore.game.goalsTeamOne }} - {{ gameStore.game.goalsTeamTwo }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-12" v-if="gameStore.game.type?.code === 'F5'">
        <div class="cancha p-2 text-white text-lowercase m-auto">

          <div class="row team text-orange">
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[5]?.firstName}} {{gameStore.game.teamOne[5]?.lastName}}</div>
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[0]?.firstName}} {{gameStore.game.teamOne[0]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[1]?.firstName}} {{gameStore.game.teamOne[1]?.lastName}}</div>
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[2]?.firstName}} {{gameStore.game.teamOne[2]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[3]?.firstName}} {{gameStore.game.teamOne[3]?.lastName}}</div>
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[4]?.firstName}} {{gameStore.game.teamOne[4]?.lastName}}</div>
          </div>

          <div class="row team text-chartreuse">
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[5]?.firstName}} {{gameStore.game.teamTwo[5]?.lastName}}</div>
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[0]?.firstName}} {{gameStore.game.teamTwo[0]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[1]?.firstName}} {{gameStore.game.teamTwo[1]?.lastName}}</div>
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[2]?.firstName}} {{gameStore.game.teamTwo[2]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[3]?.firstName}} {{gameStore.game.teamTwo[3]?.lastName}}</div>
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[4]?.firstName}} {{gameStore.game.teamTwo[4]?.lastName}}</div>
          </div>

        </div>
      </div>

      <div class="col-md-12" v-if="gameStore.game.type?.code === 'F7'">
        <div class="cancha p-2 text-white text-lowercase m-auto">

          <div class="row team text-orange">
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[7]?.firstName}} {{gameStore.game.teamOne[7]?.lastName}}</div>
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[0]?.firstName}} {{gameStore.game.teamOne[0]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[1]?.firstName}} {{gameStore.game.teamOne[1]?.lastName}}</div>
            <div class="col-4 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[2]?.firstName}} {{gameStore.game.teamOne[2]?.lastName}}</div><div class="col-4 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[3]?.firstName}} {{gameStore.game.teamOne[3]?.lastName}}</div><div class="col-4 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[4]?.firstName}} {{gameStore.game.teamOne[4]?.lastName}}</div>
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[5]?.firstName}} {{gameStore.game.teamOne[5]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[6]?.firstName}} {{gameStore.game.teamOne[6]?.lastName}}</div>
          </div>

          <div class="row team text-chartreuse">
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[5]?.firstName}} {{gameStore.game.teamTwo[5]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[6]?.firstName}} {{gameStore.game.teamTwo[6]?.lastName}}</div>
            <div class="col-4 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[2]?.firstName}} {{gameStore.game.teamTwo[2]?.lastName}}</div><div class="col-4 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[3]?.firstName}} {{gameStore.game.teamTwo[3]?.lastName}}</div><div class="col-4 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[4]?.firstName}} {{gameStore.game.teamTwo[4]?.lastName}}</div>
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[0]?.firstName}} {{gameStore.game.teamTwo[0]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[1]?.firstName}} {{gameStore.game.teamTwo[1]?.lastName}}</div>
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[7]?.firstName}} {{gameStore.game.teamTwo[7]?.lastName}}</div>
          </div>

        </div>
      </div>

      <div class="col-md-12" v-if="gameStore.game.type?.code === 'F11'">
        <div class="cancha p-2 text-white text-lowercase m-auto">

          <div class="row team text-orange">
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[10]?.lastName}}</div>
            <div class="col-3 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[0]?.lastName}}</div><div class="col-3 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[1]?.lastName}}</div><div class="col-3 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[2]?.lastName}}</div><div class="col-3 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[3]?.lastName}}</div>
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[4]?.lastName}}</div>
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[5]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[6]?.lastName}}</div>
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[7]?.lastName}}</div>
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[8]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamOne[9]?.lastName}}</div>
          </div>

          <div class="row team text-chartreuse">
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[8]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[9]?.lastName}}</div>
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[7]?.lastName}}</div>
            <div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[5]?.lastName}}</div><div class="col-6 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[6]?.lastName}}</div>
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[4]?.lastName}}</div>
            <div class="col-3 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[0]?.lastName}}</div><div class="col-3 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[1]?.lastName}}</div><div class="col-3 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[2]?.lastName}}</div><div class="col-3 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[3]?.lastName}}</div>
            <div class="col-12 text-center"><i class="bi bi-shield-fill m-1"></i>{{gameStore.game.teamTwo[10]?.lastName}}</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .detailGame {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.cancha {
  height: 460px;
  width: 300px;
  background-image: url('@/assets/cancha.jpg');
  background-size: contain; /* Ajusta la imagen sin recortarla */
  background-repeat: no-repeat;
}

.team {
  height: 220px;
  width: 300px;
}

.text-chartreuse {
  color: chartreuse;
}

.text-orange {
  color: orange;
}
</style>