<script setup lang="ts">
import { useTeamStore } from "@/stores/team";

const teamStore = useTeamStore();
teamStore.getTeamPlayers();

</script>

<template>
  <div class="team">
    <div class="col-md-12">
        <table class="table table-striped table-sm">
          <thead>
          <tr>
            <th class="text-center">{{ $t('message.label.number') }}</th>
            <th class="text-center">{{ $t('message.label.firstName') }}</th>
            <th class="text-center">{{ $t('message.label.lastName') }}</th>
            <th class="text-center">{{ $t('message.label.qualification') }}</th>
            <th class="text-center">{{ $t('message.label.change') }}</th>
            <th class="text-center">{{ $t('message.label.average') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(player, index) in teamStore.players" :key="player.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ player.firstName }}</td>
            <td>{{ player.lastName }}</td>
            <td class="text-center">{{ player.genuineAverage }}</td>
            <td class="text-center">{{ player.averagePlus }}</td>
            <td class="text-center">{{ player.statistic.average }}</td>
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