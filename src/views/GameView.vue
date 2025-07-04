<script setup lang="ts">
import {useGameStore} from '@/stores/game';
import {usePlayerStore} from '@/stores/player';
import {useStatisticStore} from '@/stores/statistic';
import {ref, computed} from "vue";
import dayjs from "dayjs";
import {v4 as uuidv4} from "uuid";


const statisticStore = useStatisticStore();
const gameStore = useGameStore();
const playerStore = usePlayerStore();
playerStore.getPlayers();

const save = () => {
  if (gameStore.game.players.length < gameStore.game.type.min
      || gameStore.game.players.length > gameStore.game.type.max) {
    alert(`The number of players in ${gameStore.game.type.name} is outside the allowed range: minimum ${gameStore.game.type.min} and maximum ${gameStore.game.type.max}.`);
    return;
  }
  gameStore.addGame();
}

const invitado = ref({
  id: null,
  firstName: 'Invitado',
  lastName: 'Invitado',
  average: 10,
  positions: [
    {
      code: "PORTERO", name: "Portero",
      positions: [
        {code: "PP", name: "Portero", value: false}
      ]
    },
    {
      code: "DEFENSA", name: "Defensa",
      positions: [
        {code: "DFD", name: "Defensa Derecho", value: true},
        {code: "DFC", name: "Defensa Central", value: true},
        {code: "DFI", name: "Defensa Izquierdo", value: true}
      ]
    },
    {
      code: "MEDIO", name: "Medio",
      positions: [
        {code: "MCD", name: "Medio Defensivo", value: true},
        {code: "MD", name: "Medio Derecho", value: true},
        {code: "MC", name: "Medio", value: true},
        {code: "MI", name: "Medio Izquierdo", value: true},
        {code: "MCO", name: "Medio Ofensivo", value: true},
      ]
    },
    {
      code: "DELANTERO", name: "Delantero",
      positions: [
        {code: "DD", name: "Delantero Derecho", value: true},
        {code: "DC", name: "Delantero Centro", value: true},
        {code: "DI", name: "Delantero Izquierdo", value: true}
      ]
    }
  ],
});

const selectPlayer = ref({});
const addPlayerGame = () => {
  if (selectPlayer.value.firstName !== invitado.value.firstName) {
    gameStore.game.players = gameStore.game.players.filter(player => player.id !== selectPlayer.value.id);
    playerStore.getAverage(selectPlayer.value);
    selectPlayer.value.average = statisticStore.genuineAverage(selectPlayer.value);
  }

  if (selectPlayer.value.firstName === invitado.value.firstName) {
    invitado.value.id = uuidv4();
  }

  const isPortero = selectPlayer.value.positions.find(p => p.code === 'PORTERO') ?.positions.some(sub => sub.value === true);
  gameStore.game.players.push({
    id: selectPlayer.value.id,
    firstName: selectPlayer.value.firstName,
    lastName: selectPlayer.value.lastName,
    average: selectPlayer.value.average,
    isPortero: isPortero,
  });
  selectPlayer.value = {};
}

const removePlayerGame = (objPlayer) => {
  gameStore.game.players = gameStore.game.players.filter(player => player.id !== objPlayer?.id);
};



const formattedDateTime = computed({

  get() {
    const dateTimeValue = gameStore.game.dateTime;

    if (dateTimeValue) {
      if (typeof dateTimeValue.seconds === 'number') {
         return dayjs.unix(dateTimeValue.seconds).format("YYYY-MM-DDTHH:mm");
      }
      return dayjs(dateTimeValue).format("YYYY-MM-DDTHH:mm");
    }
    return '';
  },

  set(newValue) {
    if (newValue) {
      const newDayJsDate = dayjs(newValue);
      gameStore.game.dateTime = newDayJsDate.toDate();
    } else {
      gameStore.game.dateTime = null; 
    }
  },
});





</script>
<template>
  <div class="game">
    <form class="row g-3 w-100 needs-validation was-validated" novalidate @submit.prevent="save">
      <h1 class="col-md-12">{{ $t('message.label.game') }}</h1>
      <div class="col-md-12">
        <label for="place" class="form-label"> {{ $t('message.label.place') }}</label>
        <input type="text" class="form-control" id="place" v-model.trim="gameStore.game.place"
               :placeholder="$t('message.label.enterPlace')" required>
        <div class="invalid-feedback">
          {{ $t('message.label.placeRequired') }}
        </div>
      </div>
      <div class="col-md-6">
        <label for="dateTime" class="form-label">{{ $t('message.label.datetime') }}</label>
        <input type="datetime-local" class="form-control" id="dateTime" v-model="formattedDateTime"
               :placeholder="$t('message.label.enterDate')" required>
        <div class="invalid-feedback">
          {{ $t('message.label.dateRequired') }}
        </div>
      </div>
      <div class="col-md-6">
        <label for="type" class="form-label">{{ $t('message.label.type') }}</label>
        <select class="form-select" id="type" v-model="gameStore.game.type" required>
          <option v-for="type in gameStore.types" :key="type.code" :value="type">{{ type.name }} ({{ type.code }})
          </option>
        </select>
        <div class="invalid-feedback">
          {{ $t('message.label.typeRequired') }}
        </div>
      </div>
      <div class="col-md-12">
        <label class="form-label">{{ $t('message.label.addPlayer') }}</label>
        <div class="row">
          <div class="col-10">
            <select class="form-select" v-model="selectPlayer">
              <option :value="invitado" class="fw-bold text-danger">{{ invitado.firstName }} {{
                  invitado.lastName
                }}
              </option>
              <option v-for="player in playerStore.players" :key="player.id" :value="player">
                {{ player.firstName }} {{ player.lastName }}
              </option>
            </select>
          </div>
          <div class="col-2 text-center">
            <button class="btn btn-outline-primary" type="button" @click="addPlayerGame">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <table class="table table-striped table-sm">
          <thead>
          <tr>
            <th class="text-center">{{ $t('message.label.number') }}</th>
            <th class="text-center">{{ $t('message.label.firstName') }}</th>
            <th class="text-center">{{ $t('message.label.lastName') }}</th>
            <th class="text-center">{{ $t('message.label.average') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(player, index) in gameStore.game.players" :key="player.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ player.firstName }}</td>
            <td>{{ player.lastName }}</td>
            <td class="text-center">{{ player.average }}</td>
            <td class="text-center">
              <button class="btn btn-outline-danger btn-sm" type="button" @click="removePlayerGame(player)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6" v-show="gameStore.game.teamOne?.length > 0">
        <label class="form-label fw-bold">{{ $t('message.label.playersTeamOne') }}</label>
        <ul class="list-group list-group-flush">
          <li class="list-group-item text-orange p-0 ps-3" v-for="(player, index) in gameStore.game.teamOne"
              :key="player.id">
            {{ index + 1 }}. {{ player.firstName }} {{ player.lastName }}
          </li>
        </ul>
      </div>
      <div class="col-md-6" v-show="gameStore.game.teamTwo?.length > 0">
        <label class="form-label fw-bold">{{ $t('message.label.playersTeamTwo') }}</label>
        <ul class="list-group list-group-flush">
          <li class="list-group-item text-chartreuse p-0 ps-3" v-for="(player,index) in gameStore.game.teamTwo"
              :key="player.id">
            {{ index + 1 }}. {{ player.firstName }} {{ player.lastName }}
          </li>
        </ul>
      </div>
      <div class="col-md-6" v-show="gameStore.game.teamOne?.length > 0">
        <label for="goalsTeamOne" class="form-label">{{ $t('message.label.goalTeamOne') }}</label>
        <input type="number" class="form-control" id="goalsTeamOne" v-model.trim="gameStore.game.goalsTeamOne"
               :placeholder="$t('message.label.enterGoals')">
        <div class="invalid-feedback">
          {{ $t('message.label.goalRequired') }}
          Goal required
        </div>
      </div>
      <div class="col-md-6" v-show="gameStore.game.teamTwo?.length > 0">
        <label for="goalsTeamTwo" class="form-label">{{ $t('message.label.goalTeamTwo') }}</label>
        <input type="number" class="form-control" id="goalsTeamTwo" v-model.trim="gameStore.game.goalsTeamTwo"
               :placeholder="$t('message.label.enterGoals')">
        <div class="invalid-feedback">
          {{ $t('message.label.goalRequired') }}

        </div>
      </div>
      <div class="col-12 border-top text-center pt-2">

        <button class="btn btn-outline-secondary me-1" type="button"
                @click="statisticStore.calculateStatistic(gameStore.game)">
          <i class="bi bi-dice-5"></i>
          {{ $t('message.btn.calculateStatistic') }}
        </button>

        <button class="btn btn-outline-secondary me-1" type="button" :disabled="gameStore.loadingGame"
                @click="gameStore.divideTeams()">
          <span class="spinner-border spinner-border-sm" v-show="gameStore.loadingGame"></span>
          <span class="bi bi-shuffle" v-show="!gameStore.loadingGame"></span>
          {{ $t('message.btn.distributeTeams') }}
        </button>

        <button class="btn btn-primary me-1" type="submit" :disabled="gameStore.loadingGame">
          <span class="spinner-border spinner-border-sm" v-show="gameStore.loadingGame"></span>
          <span class="bi bi-floppy" v-show="!gameStore.loadingGame"></span>
          {{ $t('message.btn.save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .game {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.text-chartreuse {
  color: chartreuse;
}

.text-orange {
  color: orange;
}
</style>