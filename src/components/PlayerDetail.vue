<script setup>
defineProps({
  player: {
    type: JSON,
    required: false,
  },
  positions: {
    type: Array,
    required: false,
  },
  genuineAverage: {
    type: Number,
    required: false,
  },
  averagePlus: {
    type: Number,
    required: false,
  }
})

defineOptions({inheritAttrs: false})
</script>

<template>
  <div v-bind="$attrs" class="row g-3 w-100">
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
          <td class="text-center">{{ player?.statistic?.detail?.pg + player?.statistic?.detail?.pe + player?.statistic?.detail?.pp }}</td>
          <td class="text-center text-success">{{ player?.statistic?.detail?.pg }}</td>
          <td class="text-center text-warning">{{ player?.statistic?.detail?.pe }}</td>
          <td class="text-center text-danger">{{ player?.statistic?.detail?.pp }}</td>
          <td class="text-center text-success">{{ player?.statistic?.detail?.gf }}</td>
          <td class="text-center text-danger">{{ player?.statistic?.detail?.gc }}</td>
          <td class="text-center">{{ player?.statistic?.detail?.gf - player?.statistic?.detail?.gc}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-12">
      <div :class="genuineAverage  >= 85 ? 'cartaDiamante' : genuineAverage >= 70 ? 'cartaOro' : 'cartaPlata'"
           class="m-auto">
        <div class="row p-5">
          <div class="col-12" style="height: 10px"></div>
          <div class="col-2 fw-bold fs-1">{{ genuineAverage }}</div>
          <div class="col-10 text-success fw-bold" v-if="averagePlus > 0"><i class="bi bi-chevron-double-up"></i>{{averagePlus}}</div>
          <div class="col-10 text-danger fw-bold" v-if="averagePlus < 0"><i class="bi bi-chevron-double-down"></i>{{averagePlus}}</div>
          <span v-for="(position, index) in positions" :key="position.code">
            <div class="col-2" :class="{'fw-bold': index === 0 }">{{ position.code }}</div><div class="col-10"></div>
          </span>
          <div class="col-12 heightCardUno"></div>
          <div class="col-12 text-center fw-bold text-uppercase">{{ player.lastName }}</div>
          <div class="col-12" style="height: 10px"></div>
          <div v-for="attribute in player?.attributes" :key="attribute.code" class="col-4 text-uppercase">
            <span v-if="attribute?.show">{{ attribute.rating * 10 }} {{ attribute.name.substring(0, 2) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="row m-auto">
        <div class="col-md-12 text-center border-bottom fw-bold pb-2">{{$t('message.label.statistics')}}</div>
        <div class="col-md-2 col-4 fst-italic">{{$t('message.label.attributes')}}:</div>
        <div class="col-md-1 col-2">{{ player?.statistic?.average }}</div>
        <div class="col-md-2 col-4 fst-italic">{{$t('message.label.surveys')}}:</div>
        <!--<div class="col-md-1 col-2">{{ playerStore.player?.attributes[9].rating }}</div>-->
        <div class="col-md-1 col-2">0</div>
        <div class="col-md-2 col-4 fst-italic">{{$t('message.label.games')}}:</div>
        <div class="col-md-1 col-2">{{ player?.statistic?.games }}</div>
        <div class="col-md-2 col-4 fst-italic">{{$t('message.label.goals')}}:</div>
        <div class="col-md-1 col-2">{{ player?.statistic?.goals }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
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
