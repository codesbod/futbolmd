import {defineStore} from 'pinia'
import {ref} from "vue";
import {addDoc, collection, doc, getDocs, setDoc} from "firebase/firestore/lite";
import {db} from "@/components/firebaseConfig";
import {useRouter} from "vue-router";

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
    });
    const game = ref({})

    const types = ref([
        {code: "F5", name: "Futbol Cinco", min: 10, max: 12},
        {code: "F7", name: "Futbol Siete", min: 14, max: 16},
        {code: "F11", name: "Futbol Once", min: 22, max: 24},
    ])

    const getGames = async () => {
        loadingGame.value = true;
        try {
            if(games.value.length !== 0){
                return;
            }
            const querySnapshot = await getDocs(collection(db, "game"));
            querySnapshot.forEach((obj) => {
                games.value.push({
                    id: obj.id,
                    ...obj.data()
                })
            });
            game.value = games.value[0];
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
            divideTeams();
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

        game.value.players.forEach(player => {
            if (sumTeam1 <= sumTeam2) {
                game.value.teamOne.push(player);
                sumTeam1 += player.average;
            } else {
                game.value.teamTwo.push(player);
                sumTeam2 += player.average;
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

    return {loadingGame, types, games, newGame, game, getGames, addGame, actionNewGame, actionUpdateGame, actionViewGame, resetStore}

})
