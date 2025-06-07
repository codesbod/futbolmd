import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayerView from "@/views/PlayerView.vue";
import NewPlayerView from "@/views/NewPlayerView.vue";
import {useUserStore} from "@/stores/user";
import LoginView from "@/views/LoginView.vue";
import GamesView from "@/views/GamesView.vue";
import GameView from "@/views/GameView.vue";
import DetailGameView from "@/views/DetailGameView.vue";

const requiresAuth = async (to, from, next) => {
    const userStore = useUserStore();
    userStore.loadingUser = true;
    const user = await userStore.currentUser();
    if (user) {
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
    {path: '/newPlayer', component: NewPlayerView},
    {path: '/login', component: LoginView}
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router
