<script setup>
import {usePlayerStore} from "@/stores/player.js";
import {useUserStore} from "@/stores/user.js";

const playerStore = usePlayerStore();
playerStore.getPlayer();

const userStore = useUserStore();
//console.log("userData", userStore.userData);
</script>

<template>
  <div class="home">
    <div v-show="playerStore.loadingPlayer">
      <button class="btn btn-primary btn-sm" type="button" disabled>
        <span class="spinner-border spinner-border-sm"></span>
        loading...
      </button>
    </div>
    <div v-show="!playerStore.loadingPlayer && playerStore.player.id"
         :class="playerStore.average >= 85 ? 'cartaZafiro' : playerStore.average >= 70 ? 'cartaDiamante' : 'cartaOro'"
         class="m-auto" style="height: 500px; width: 300px">
      <div class="row p-5">
        <div class="col-12" style="height: 10px"></div>
        <div class="col-2 fw-bold fs-1">{{ playerStore.average }}</div>
        <div class="col-10"></div>
        <span v-for="(position, index) in playerStore.positions" :key="position.code">
            <div class="col-2" :class="{'fw-bold': index === 0 }">{{ position.code }}</div><div class="col-10"></div>
          </span>
        <div class="col-12 heightCardUno"></div>
        <div class="col-12 text-center fw-bold text-uppercase">{{ playerStore.player.lastName }}</div>
        <div class="col-12" style="height: 10px"></div>
        <div v-for="attribute in playerStore.player?.attributes" :key="attribute.code" class="col-4 text-uppercase">
          {{ attribute.rating * 10 }} {{ attribute.name.substring(0, 2) }}
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
  height: 500px;
  width: 300px;
  background-image: url('@/assets/cartaOro.png');
  background-size: contain; /* Ajusta la imagen sin recortarla */
  background-repeat: no-repeat;
}

.cartaZafiro {
  height: 500px;
  width: 300px;
  color: #f2f2f2;
  background-image: url('@/assets/cartaZafiro.png');
  background-size: contain; /* Ajusta la imagen sin recortarla */
  background-repeat: no-repeat;
}

.cartaDiamante {
  height: 500px;
  width: 300px;
  background-image: url('@/assets/cartaDiamante.png');
  background-size: contain; /* Ajusta la imagen sin recortarla */
  background-repeat: no-repeat;
}

</style>
