<script setup>
defineProps({
  player: {
    type: JSON,
    required: false,
  },
})

defineOptions({inheritAttrs: false})
</script>

<template>
  <div v-bind="$attrs">
    <div class="icono-con-texto">
      <i class="bi bi-shield-fill"></i>
      <span class="texto-superpuesto fw-bold">{{ player?.average }}</span>
    </div>
    {{ player?.firstName }} {{ player?.lastName }}
  </div>
</template>

<style scoped>
.icono-con-texto {
  position: relative;
  display: inline-block;
}

.icono-con-texto i {
  font-size: 19px; /* asegúrate que coincide con el tamaño del contenedor */
}

.texto-superpuesto {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  color: white; /* o el color que quieras */
  pointer-events: none; /* para que no interfiera con clics */
}
</style>
