<script setup lang="ts">
import { useTeamStore } from "@/stores/team";

const teamStore = useTeamStore();
teamStore.getTeamPlayers();

</script>

<template>
  <div class="team">
    <div class="col-md-12">
      <h1 class="col-md-12">{{ $t('message.menu.teamPlayers') }}</h1>
        <table class="table table-striped table-sm">
          <thead  class="small">
          <tr>
            <th class="text-center">{{ $t('message.label.number') }}</th>
            <th class="text-center">{{ $t('message.label.firstName') }}</th>
            <th class="text-center">{{ $t('message.label.note') }}</th>
            <th class="text-center">{{ $t('message.label.change') }}</th>
            <th class="text-center">{{ $t('message.label.mid') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(player, index) in teamStore.players" :key="player.id">
            <td class="text-end">{{ index + 1 }}</td>
            <td class="text-capitalize small">{{ player.firstName }} {{ player.lastName }}</td>
            <td class="text-end" :class="player.averagePlus >= 0 ? 'text-success' : 'text-danger'">{{ player.genuineAverage }}</td>
            <td class="text-end" :class="player.averagePlus >= 0 ? 'text-success' : 'text-danger'">
              {{player.averagePlus}}
              <i class="bi " :class="player.averagePlus >= 0 ? 'bi-chevron-double-up' : 'bi-chevron-double-down'"></i>
            </td>
            <td class="text-end" :class="player.averagePlus >= 0 ? 'text-success' : 'text-danger'">{{ player.statistic.average }}</td>
          </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .team {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>