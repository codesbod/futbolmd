import {defineStore} from 'pinia'
import {ref} from "vue";
import {addDoc, collection, query, where, doc, getDocs, setDoc, orderBy} from "firebase/firestore/lite";
import {auth, db} from "@/components/firebaseConfig";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.js";

export const useGameStore = defineStore('gameStore', () => {

    const router = useRouter();

    const loadingGame = ref(false);

    const games = ref([]);
    const newGame = ref({
        id: null,
        place: null,
        dateTime: null,
        type: null,
        players: [],
        teamOne: [],
        teamTwo: [],
        goalsTeamOne: 0,
        goalsTeamTwo: 0,
    });
    const game = ref({})

    const types = ref([
        {code: "F5", name: "Futbol Cinco", min: 10, max: 12},
        {code: "F7", name: "Futbol Siete", min: 14, max: 16},
        {code: "F11", name: "Futbol Once", min: 22, max: 24},
    ])

    const getHistoryGames = async () => {
        games.value = [];
        await getGames(query(collection(db, "game"), orderBy("dateTime", "desc")));
    }

    const getGamesSurveys = async () => {
        games.value = [];
        await getGames(query(collection(db, "game"), where("dateTime", "<", new Date()), orderBy("dateTime", "desc")));
    }

    const getGames = async (query) => {
        const userStore = useUserStore();
        loadingGame.value = true;
        try {
            const querySnapshot = await getDocs(query);
            querySnapshot.forEach((obj) => {
                games.value.push({
                    id: obj.id,
                    ...obj.data()
                })
            });

            if (!userStore.isAdmin) {
                games.value = games.value.filter(game =>
                    game?.players.some(player => player.id === auth.currentUser.uid)
                );
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);
        } finally {
            loadingGame.value = false;
        }
    }

    const addGame = async () => {
        loadingGame.value = true;
        try{
            game.value.dateTime = new Date(game.value.dateTime);
            if(game.value.id !== null){
                await setDoc(doc(db, "game", game.value.id), game.value);
            }else{
                const docRef = await addDoc(collection(db, "game"), game.value);
                game.value.id = docRef.id;
                await setDoc(doc(db, "game", game.value.id), game.value);
            }
            await router.push('/games');
        }catch (error){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);
        }finally {
            loadingGame.value = false;
        }
    }

    const divideTeams = () => {
        let sumTeam1 = 0;
        let sumTeam2 = 0;

        game.value.players.sort((a, b) => b.average - a.average);
        game.value.teamOne = [];
        game.value.teamTwo = [];

        console.log("game.value.players", game.value.players);

        game.value.players.forEach(player => {
            if (sumTeam1 <= sumTeam2) {
                game.value.teamOne.push(player);
                sumTeam1 += Number(player.average);
            } else {
                game.value.teamTwo.push(player);
                sumTeam2 += Number(player.average);
            }
        });
    }

    const actionNewGame = async () => {
        game.value = newGame.value;
        await router.push("/game");
    }

    const actionUpdateGame = async (objGame) => {
        game.value = objGame;
        await router.push("/game");
    }

    const actionViewGame = async (objGame) => {
        game.value = objGame;
        await router.push("/detailGame");
    }

    const resetStore = () => {
        games.value = [];
        game.value = newGame.value;
    };

    return {loadingGame, types, games, newGame, game, getGames, addGame, divideTeams, actionNewGame, actionUpdateGame, actionViewGame, resetStore,  getHistoryGames, getGamesSurveys }
})
