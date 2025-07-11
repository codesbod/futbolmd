import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayerView from "@/views/PlayerView.vue";
import NewPlayerView from "@/views/NewPlayerView.vue";
import {useUserStore} from "@/stores/user";
import LoginView from "@/views/LoginView.vue";
import GamesView from "@/views/GamesView.vue";
import GameView from "@/views/GameView.vue";
import TeamView from "@/views/TeamView.vue";
import DetailGameView from "@/views/DetailGameView.vue";
import SurveysView from "@/views/SurveysView.vue";
import SendSurveyView from "@/views/SendSurveyView.vue";
import MigrateDataBaseView from "@/components/developer/MigrateDataBaseView.vue";

const requiresAuth = async (to, from, next) => {
    const userStore = useUserStore();
    userStore.loadingUser = true;
    const user = await userStore.currentUser();
    if (user) {
        userStore.validationIsAdmin();
        userStore.validationIsDeveloper();
        next();
    } else {
        next('/login');
    }
    userStore.loadingUser = false;
}

const routes = [
    {path: '/', component: HomeView, beforeEnter: requiresAuth},
    {path: '/player', component: PlayerView, beforeEnter: requiresAuth},
    {path: '/games', component: GamesView, beforeEnter: requiresAuth},
    {path: '/game', component: GameView, beforeEnter: requiresAuth},
    {path: '/detailGame', component: DetailGameView, beforeEnter: requiresAuth},
    {path: '/surveys', component: SurveysView, beforeEnter: requiresAuth},
    {path: '/team', component: TeamView, beforeEnter: requiresAuth},
    {path: '/sendSurvey', component: SendSurveyView, beforeEnter: requiresAuth},
    {path: '/migrateDataBase', component: MigrateDataBaseView, beforeEnter: requiresAuth},
    {path: '/newPlayer', component: NewPlayerView},
    {path: '/login', component: LoginView},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router
