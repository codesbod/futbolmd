<script setup>
import {usePlayerStore} from "@/stores/player";
import {useStatisticStore} from "@/stores/statistic";
import {ref} from "vue";

const statisticStore = useStatisticStore();
const playerStore = usePlayerStore();

const genuineAverage = ref(0);
const averagePlus = ref(0);

const init = async () => {
  await playerStore.getPlayer();
  genuineAverage.value = statisticStore.genuineAverage(playerStore.player);
  averagePlus.value = statisticStore.averagePlus(playerStore.player);
}
init();

</script>

<template>
  <div class="home">
    <div v-show="playerStore.loadingPlayer">
      <button class="btn btn-primary btn-sm" type="button" disabled>
        <span class="spinner-border spinner-border-sm"></span>
        loading...
      </button>
    </div>
    <div class="row g-3 w-100">
      <div class="col-md-12">
        <table class="table table-sm m-auto">
          <thead>
          <tr>
            <th class="text-center fst-italic">MP</th>
            <th class="text-center fst-italic">W</th>
            <th class="text-center fst-italic">D</th>
            <th class="text-center fst-italic">L</th>
            <th class="text-center fst-italic">GF</th>
            <th class="text-center fst-italic">GA</th>
            <th class="text-center fst-italic">GD</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-center">{{ playerStore.player?.statistic?.detail?.pg + playerStore.player?.statistic?.detail?.pe + playerStore.player?.statistic?.detail?.pp }}</td>
            <td class="text-center text-success">{{ playerStore.player?.statistic?.detail?.pg }}</td>
            <td class="text-center text-warning">{{ playerStore.player?.statistic?.detail?.pe }}</td>
            <td class="text-center text-danger">{{ playerStore.player?.statistic?.detail?.pp }}</td>
            <td class="text-center text-success">{{ playerStore.player?.statistic?.detail?.gf }}</td>
            <td class="text-center text-danger">{{ playerStore.player?.statistic?.detail?.gc }}</td>
            <td class="text-center">{{ playerStore.player?.statistic?.detail?.gf - playerStore.player?.statistic?.detail?.gc}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-12">
        <div v-show="!playerStore.loadingPlayer && playerStore.player.id"
             :class="genuineAverage  >= 85 ? 'cartaDiamante' : genuineAverage >= 70 ? 'cartaOro' : 'cartaPlata'"
             class="m-auto">
          <div class="row p-5">
            <div class="col-12" style="height: 10px"></div>
            <div class="col-2 fw-bold fs-1">{{ genuineAverage }}</div>
            <div class="col-10 text-success fw-bold" v-if="averagePlus > 0"><i class="bi bi-chevron-double-up"></i>{{averagePlus}}</div>
            <div class="col-10 text-danger fw-bold" v-if="averagePlus < 0"><i class="bi bi-chevron-double-down"></i>{{averagePlus}}</div>
            <span v-for="(position, index) in playerStore.positions" :key="position.code">
            <div class="col-2" :class="{'fw-bold': index === 0 }">{{ position.code }}</div><div class="col-10"></div>
          </span>
            <div class="col-12 heightCardUno"></div>
            <div class="col-12 text-center fw-bold text-uppercase">{{ playerStore.player.lastName }}</div>
            <div class="col-12" style="height: 10px"></div>
            <div v-for="attribute in playerStore.player?.attributes" :key="attribute.code" class="col-4 text-uppercase">
              <span v-if="!attribute?.show">{{ attribute.rating * 10 }} {{ attribute.name.substring(0, 2) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row m-auto">
          <div class="col-md-12 text-center border-bottom fw-bold pb-2">Statistics</div>
          <div class="col-md-2 col-4 fst-italic">Attribute:</div>
          <div class="col-md-1 col-2">{{ playerStore.player?.statistic?.average }}</div>
          <div class="col-md-2 col-4 fst-italic">Surveys:</div>
          <!--<div class="col-md-1 col-2">{{ playerStore.player?.attributes[9].rating }}</div>-->
          <div class="col-md-1 col-2">0</div>
          <div class="col-md-2 col-4 fst-italic">Game:</div>
          <div class="col-md-1 col-2">{{ playerStore.player?.statistic?.games }}</div>
          <div class="col-md-2 col-4 fst-italic">Goals:</div>
          <div class="col-md-1 col-2">{{ playerStore.player?.statistic?.goals }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .heightCardUno {
    height: 60px; /* Ajuste para pantallas grandes */
  }
}

@media (max-width: 768px) {
  /* Móvil */
  .heightCardUno {
    height: 80px; /* Ajuste para pantallas pequeñas */
  }
}

.cartaOro {
  height: 420px;
  width: 300px;
  background-image: url('@/assets/cartaOro.png');
  background-size: contain; /* Ajusta la imagen sin recortarla */
  background-repeat: no-repeat;
}

.cartaZafiro {
  height: 420px;
  width: 300px;
  color: #f2f2f2;
  background-image: url('@/assets/cartaZafiro.png');
  background-size: contain; /* Ajusta la imagen sin recortarla */
  background-repeat: no-repeat;
}

.cartaDiamante {
  height: 420px;
  width: 300px;
  background-image: url('@/assets/cartaDiamante.png');
  background-size: contain; /* Ajusta la imagen sin recortarla */
  background-repeat: no-repeat;
}

.cartaPlata {
  height: 420px;
  width: 300px;
  background-image: url('@/assets/cartaPlata.png');
  background-size: contain; /* Ajusta la imagen sin recortarla */
  background-repeat: no-repeat;
}

</style>
