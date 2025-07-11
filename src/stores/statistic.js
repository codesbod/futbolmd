import {defineStore} from 'pinia'
import {ref} from "vue";
import {getDoc, setDoc, doc, collection, getDocs} from "firebase/firestore";
import {db} from "@/components/firebaseConfig";
import {useRouter} from "vue-router";

export const useStatisticStore = defineStore('statisticStore', () => {

    const router = useRouter();

    const loadingStatistic = ref(false);

    const findPlayerById = async (id) => {
        try {
            const objPlayer = ref();
            const playerRef = doc(db, "player", id);
            const playerSnap = await getDoc(playerRef);
            if (playerSnap.exists()) {
                objPlayer.value = {
                    id: playerSnap.id,
                    ...playerSnap.data()
                };
            }
            return objPlayer.value;
        } catch (error) {
            console.log(`${error.code} ${error.message}`);
        }
    }

    const updatePlayer = async (player) => {
        try {
            await setDoc(doc(db, "player", player.id), player);
        } catch (error) {
            console.log(`${error.code} ${error.message}`);
        }
    }

    const calculateStatistic = async(game) => {
        await calculateTeam(game.teamOne, game.goalsTeamOne, game.goalsTeamTwo);
        await calculateTeam(game.teamTwo, game.goalsTeamTwo, game.goalsTeamOne);
        await router.push('/');
    }

    const calculateTeam = async (team, gf, gc) => {
        team = team.filter(player => player.firstName !== 'Invitado' && player.lastName !== 'Invitado');
        await Promise.all(team.map(async obj => {
            const player = await findPlayerById(obj.id);

            player.statistic.detail.gf += gf;
            player.statistic.detail.gc += gc;

            if (gf === gc) {
                player.statistic.detail.pe++;
            }
            if (gf > gc) {
                player.statistic.detail.pg++;
            }
            if (gf < gc) {
                player.statistic.detail.pp++;
            }

            player.statistic.games = ((player.statistic.detail.pg * 0.03) * player.statistic.average) - ((player.statistic.detail.pp * 0.03) * player.statistic.average);
            player.statistic.goals = ((player.statistic.detail.gf * 0.01) * player.statistic.average) - ((player.statistic.detail.gc * 0.01) * player.statistic.average);

            player.statistic.games = player.statistic.games.toFixed(2);
            player.statistic.goals = player.statistic.goals.toFixed(2);

            await updatePlayer(player);
        }));
    }

    const genuineAverage = (player) => {
        return (Number(player.statistic.average) +
            Number(player.statistic.games) +
            Number(player.statistic.goals)).toFixed(0);
    }

    const averagePlus = (player) => {
        return (Number(player.statistic.games) + Number(player.statistic.goals)).toFixed(0);
    }

    return {loadingStatistic, calculateStatistic, genuineAverage, averagePlus}
})
