<script setup>
import {usePlayerStore} from "@/stores/player";
import {useStatisticStore} from "@/stores/statistic";
import {ref} from "vue";
import PlayerDetail from "@/components/PlayerDetail.vue";

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
    <PlayerDetail :player="playerStore.player" :positions="playerStore.positions" :genuineAverage="genuineAverage"
                  :averagePlus="averagePlus"></PlayerDetail>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
