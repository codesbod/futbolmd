<script setup lang="ts">
import {useSurveyStore} from '@/stores/survey';
import dayjs from "dayjs";

const surveyStore = useSurveyStore();

const formatDate = (date) => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}

const send = () => {
  surveyStore.addSurvey();
}

</script>

<template>
  <div class="sendSurvey">
    <form class="row g-3 needs-validation" novalidate @submit.prevent="send">
      <h1 class="col-md-12">Send Survey</h1>
      <div class="col-md-12">
        <table class="table table-striped table-sm">
          <thead>
          <tr>
            <th class="text-center">Place</th>
            <th class="text-center">Date and Time</th>
            <th class="text-center">Type</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{ surveyStore.survey?.game?.place }}</td>
            <td class="text-center" style="min-width: 150px">{{ formatDate(surveyStore.survey?.game?.dateTime) }}</td>
            <td class="text-center">{{ surveyStore.survey?.game?.type?.code }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-12">
        <label class="form-label fw-bold">Players</label>
        <table class="table">
          <thead>
          <tr>
            <th class="text-center">Name</th>
            <th colspan="2" class="text-center">Qualification</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="qualification in surveyStore.survey?.qualifications" :key="qualification.id">
            <td>{{ qualification.firstName }} {{ qualification.lastName }}</td>
            <td><input type="range" class="form-range" min="1" max="9"
                       v-model="qualification.qualification"></td>
            <td class="text-center">{{ qualification.qualification }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 border-top text-center pt-2">
        <button class="btn btn-primary me-1" type="submit" :disabled="surveyStore.loadingSurvey || surveyStore.survey?.qualifications.length === 0">
          <span class="spinner-border spinner-border-sm" v-show="surveyStore.loadingSurvey"></span>
          <span class="bi bi-send" v-show="!surveyStore.loadingSurvey"></span>
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .sendSurvey {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>