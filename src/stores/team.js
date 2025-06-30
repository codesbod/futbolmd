import {defineStore} from "pinia";
import {ref} from "vue";
import {db} from "@/components/firebaseConfig.js";
import {collection, query, where, doc, getDocs, setDoc} from "firebase/firestore/lite";
import { useStatisticStore } from "./statistic";

export const useTeamStore = defineStore('teamStore', () => {

    const loadingTeam = ref(false);
    const players = ref([]);

    const getTeamPlayers = async (objGame) => {
        loadingTeam.value = true;
        players.value = [];
        try {
            const q = query(
                collection(db, "player")
            );
            const statisticStore = useStatisticStore();
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((obj) => {
                const data = obj.data();
                data.genuineAverage = statisticStore.genuineAverage(data);
                data.averagePlus = statisticStore.averagePlus(data);
                players.value.push(data);
            });
            players.value.sort((a, b) => b.genuineAverage - a.genuineAverage);
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