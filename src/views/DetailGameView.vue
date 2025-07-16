<script setup lang="ts">
import {useGameStore} from '@/stores/game';
import dayjs from "dayjs";
import PlayerCard from "@/components/PlayerCard.vue";
import {onMounted, ref} from "vue";

const gameStore = useGameStore();

const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}

const pointsTeamOne = ref(0);
const pointsTeamTwo = ref(0);
const substitutes = ref([]);

onMounted(() => {
  gameStore.game.teamOne.forEach(team => {
    pointsTeamOne.value += Number(team.average);
  });
  gameStore.game.teamTwo.forEach(team => {
    pointsTeamTwo.value += Number(team.average);
  });

  console.log(gameStore.game.type);
  if(gameStore.game?.vs) {
    const playerCountMap = {
      F5: 6,
      F7: 8,
      F11: 11,
    };
    const nPlayers = playerCountMap[gameStore.game.type?.code] || 0;
    console.log("nPlayers",nPlayers);
    const teamPlayers = gameStore.game.teamOne || [];
    console.log("teamPlayers",teamPlayers);
    const subs = teamPlayers.slice(nPlayers);
    console.log("subs",subs);

    substitutes.value.push(...subs);
    console.log("substitutes",substitutes.value);
  }

})

</script>
<template>
  <div class="detailGame">
    <div class="row w-100">
      <h1 class="col-md-12">{{ $t('message.label.detailGame') }}</h1>
      <div class="col-md-12">
        <table class="table table-striped table-sm w-100">
          <thead>
          <tr>
            <th class="text-center">{{ $t('message.label.place') }}</th>
            <th class="text-center">{{ $t('message.label.dateAndTime') }}</th>
            <th class="text-center">{{ $t('message.label.type') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ gameStore.game.place }}</td>
            <td class="text-center" style="min-width: 150px">{{ formatDate(gameStore.game.dateTime?.toDate()) }}</td>
            <td class="text-center">{{ gameStore.game.type.code }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-12 text-center fs-1">
        <span class="text-orange">{{ gameStore.game.goalsTeamOne }}</span> - <span
          class="text-chartreuse">{{ gameStore.game.goalsTeamTwo }}</span>
      </div>
      <div class="col-md-12 text-center">
        <div class="text-white text-center bg-orange pointsWidth p-2 m-auto "> {{ $t('message.label.totalPoints') }}
          {{ pointsTeamOne }}
        </div>
      </div>
      <div class="col-md-12" v-if="gameStore.game.type?.code === 'F5'">
        <div class="cancha p-2 text-white text-lowercase m-auto">
          <div class="row team text-orange">
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamOne[5]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[4]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[3]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[2]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[1]"></PlayerCard>
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamOne[0]"></PlayerCard>
          </div>

          <div class="row team text-chartreuse" v-if="!gameStore.game?.vs">
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamTwo[0]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamTwo[1]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamTwo[2]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamTwo[3]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamTwo[4]"></PlayerCard>
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamTwo[5]"></PlayerCard>
          </div>
          <div class="row team text-chartreuse" v-if="gameStore.game?.vs">
            <h1 class="col-12 text-center">VS</h1>
          </div>
        </div>
      </div>

      <div class="col-md-12" v-if="gameStore.game.type?.code === 'F7'">
        <div class="cancha p-2 text-white text-lowercase m-auto">
          <div class="row team text-orange">
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamOne[7]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[6]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[5]"></PlayerCard>
            <PlayerCard class="col-4 text-center" :player="gameStore.game.teamOne[4]"></PlayerCard>
            <PlayerCard class="col-4 text-center" :player="gameStore.game.teamOne[3]"></PlayerCard>
            <PlayerCard class="col-4 text-center" :player="gameStore.game.teamOne[2]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[1]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[0]"></PlayerCard>
          </div>

          <div class="row team text-chartreuse" v-if="!gameStore.game?.vs">
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamTwo[0]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamTwo[1]"></PlayerCard>
            <PlayerCard class="col-4 text-center" :player="gameStore.game.teamTwo[2]"></PlayerCard>
            <PlayerCard class="col-4 text-center" :player="gameStore.game.teamTwo[3]"></PlayerCard>
            <PlayerCard class="col-4 text-center" :player="gameStore.game.teamTwo[4]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamTwo[5]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamTwo[6]"></PlayerCard>
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamTwo[7]"></PlayerCard>
          </div>
          <div class="row team text-chartreuse" v-if="gameStore.game?.vs">
            <h1 class="col-12 text-center m-auto">VS</h1>
          </div>

        </div>
      </div>

      <div class="col-md-12" v-if="gameStore.game.type?.code === 'F11'">
        <div class="cancha p-2 text-white text-lowercase m-auto">
          <div class="row team text-orange">
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamOne[10]"></PlayerCard>
            <PlayerCard class="col-3 text-center" :player="gameStore.game.teamOne[9]"></PlayerCard>
            <PlayerCard class="col-3 text-center" :player="gameStore.game.teamOne[8]"></PlayerCard>
            <PlayerCard class="col-3 text-center" :player="gameStore.game.teamOne[7]"></PlayerCard>
            <PlayerCard class="col-3 text-center" :player="gameStore.game.teamOne[6]"></PlayerCard>
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamOne[5]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[4]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[3]"></PlayerCard>
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamOne[2]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[1]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[0]"></PlayerCard>
          </div>

          <div class="row team text-chartreuse" v-if="!gameStore.game?.vs">
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[0]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[1]"></PlayerCard>
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamOne[2]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[3]"></PlayerCard>
            <PlayerCard class="col-6 text-center" :player="gameStore.game.teamOne[4]"></PlayerCard>
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamOne[5]"></PlayerCard>
            <PlayerCard class="col-3 text-center" :player="gameStore.game.teamOne[6]"></PlayerCard>
            <PlayerCard class="col-3 text-center" :player="gameStore.game.teamOne[7]"></PlayerCard>
            <PlayerCard class="col-3 text-center" :player="gameStore.game.teamOne[8]"></PlayerCard>
            <PlayerCard class="col-3 text-center" :player="gameStore.game.teamOne[9]"></PlayerCard>
            <PlayerCard class="col-12 text-center" :player="gameStore.game.teamOne[10]"></PlayerCard>
          </div>
          <div class="row team text-chartreuse" v-if="gameStore.game?.vs">
            <h1 class="col-12 text-center">VS</h1>
          </div>

        </div>
      </div>
      <div class="col-md-12 text-center" v-if="!gameStore.game?.vs">
        <div class="text-white text-center bg-chartreuse p-2 pointsWidth m-auto"> {{ $t('message.label.totalPoints') }}
          {{ pointsTeamTwo }}
        </div>
      </div>
      <div class="col-md-12 text-center" v-if="gameStore.game?.vs">
        <div class="text-white text-center bg-chartreuse p-2 pointsWidth m-auto"> {{ $t('message.label.totalPoints') }}
          --
        </div>
      </div>

      <div class="col-md-12 mt-3" v-if="gameStore.game?.vs">
        <h3 class="col-md-12"> {{ $t('message.label.substitutes') }}</h3>
        <PlayerCard v-for="player in substitutes" :key="player.id" :player="player"></PlayerCard>
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
  height: 450px;
  width: 300px;
  background-image: url('@/assets/cancha.jpg');
  background-size: contain; /* Ajusta la imagen sin recortarla */
  background-repeat: no-repeat;
}

.team {
  height: 220px;
  width: 300px;
}

.pointsWidth {
  width: 300px;
}

.bg-chartreuse {
  background: chartreuse;
}

.bg-orange {
  background: orange;
}

.text-chartreuse {
  color: chartreuse;
}

.text-orange {
  color: orange;
}
</style>