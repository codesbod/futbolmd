import {defineStore} from "pinia";
import {ref} from "vue";
import {db} from "@/components/firebaseConfig.js";
import {collection, query, where, doc, getDocs, setDoc} from "firebase/firestore";
import {useStatisticStore} from "./statistic";
import {usePlayerStore} from "@/stores/player.js";

export const useTeamStore = defineStore('teamStore', () => {

    const loadingTeam = ref(false);
    const players = ref([]);

    const getTeamPlayers = async (objGame) => {
        loadingTeam.value = true;
        players.value = [];
        try {
            const statisticStore = useStatisticStore();
            const playerStore = usePlayerStore();

            const q = query(
                collection(db, "player")
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((obj) => {
                const data = obj.data();
                data.genuineAverage = statisticStore.genuineAverage(data);
                data.averagePlus = statisticStore.averagePlus(data);
                data.positions = playerStore.getPositions(data);
                players.value.push(data);
            });
            players.value.sort((a, b) => {
                if (b.genuineAverage !== a.genuineAverage) {
                    return b.genuineAverage - a.genuineAverage; // Primero genuineAverage descendente
                }
                return b.averagePlus - a.averagePlus; // Luego averagePlus descendente
            });
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);
        } finally {
            loadingTeam.value = false;
        }
    }

    return {
        loadingTeam,
        getTeamPlayers,
        players,
    }

});