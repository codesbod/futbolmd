<script setup lang="ts">
import {useTeamStore} from "@/stores/team";
import PlayerDetail from "@/components/PlayerDetail.vue";
import {ref} from "vue";

const teamStore = useTeamStore();
teamStore.getTeamPlayers();

const selectPlayer = ref({});
const actionViewCardPlayer = (player) => {
  selectPlayer.value = {...player};
}

</script>

<template>
  <div class="team">
    <div class="row g-3 w-100">
      <h1 class="col-md-12">{{ $t('message.menu.teamPlayers') }}</h1>
      <div class="col-md-12">
        <table class="table table-striped table-sm">
          <thead class="small">
          <tr>
            <th class="text-center">{{ $t('message.label.number') }}</th>
            <th class="text-center">{{ $t('message.label.firstName') }}</th>
            <th class="text-center">{{ $t('message.label.note') }}</th>
            <th class="text-center">{{ $t('message.label.change') }}</th>
            <th class="text-center">{{ $t('message.label.mid') }}</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(player, index) in teamStore.players" :key="player.id">
            <td class="text-end">{{ index + 1 }}</td>
            <td class="text-capitalize small">{{ player.firstName }} {{ player.lastName }}</td>
            <td class="text-end">{{ player.genuineAverage }}</td>
            <td class="text-end" :class="player.averagePlus >= 0 ? 'text-success' : 'text-danger'">
              {{ player.averagePlus }}
              <i class="bi " :class="player.averagePlus >= 0 ? 'bi-chevron-double-up' : 'bi-chevron-double-down'"></i>
            </td>
            <td class="text-end">{{ player.statistic.average }}</td>
            <td class="text-center">
              <button class="btn btn-outline-primary btn-sm me-1" type="button" @click="actionViewCardPlayer(player)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="bi bi-eye"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <PlayerDetail :player="selectPlayer" :positions="selectPlayer?.positions" :genuineAverage="selectPlayer?.genuineAverage"
                          :averagePlus="selectPlayer?.averagePlus"></PlayerDetail>
          </div>
        </div>
      </div>
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