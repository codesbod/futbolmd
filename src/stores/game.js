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

        const hoy = new Date(); // Fecha actual
        const unaSemanaAntes = new Date();
        unaSemanaAntes.setDate(hoy.getDate() - 7);

        await getGames(
            query(
                collection(db, "game"),
                where("dateTime", ">=", unaSemanaAntes),
                where("dateTime", "<=", hoy),
                orderBy("dateTime", "desc")
            )
        );
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
        try {
            game.value.dateTime = new Date(game.value.dateTime);
            if (game.value.id !== null) {
                await setDoc(doc(db, "game", game.value.id), game.value);
            } else {
                const docRef = await addDoc(collection(db, "game"), game.value);
                game.value.id = docRef.id;
                await setDoc(doc(db, "game", game.value.id), game.value);
            }
            await router.push('/games');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);
        } finally {
            loadingGame.value = false;
        }
    }

    const divideTeams = () => {
        game.value.players.sort((a, b) => b.average - a.average);
        game.value.teamOne = [];
        game.value.teamTwo = [];

        const playersIsPortero = game.value.players
            .filter(player => player.isPortero)
            .slice(0, 2);
        //console.log("playersIsPortero", playersIsPortero);

        const playersInvitados = game.value.players
            .filter(player => player.firstName === 'Invitado');
        //console.log("playersInvitados", playersInvitados);

        const players = game.value.players
            .filter(player =>
                !playersIsPortero.some(p => p.id === player.id) &&
                !playersInvitados.some(p => p.id === player.id)
            );
        //console.log("players", players);

        /*
        players.forEach(player => {
            if (game.value.teamOne.length === game.value.teamTwo.length) {
                game.value.teamOne.push(player);
            } else {
                game.value.teamTwo.push(player);
            }
        });
        */
        let direction = 1; // 1 para adelante, -1 para atrás
        let index = 0; // índice en el array
        let round = 0;

        while (index < players.length) {
            if (round % 2 === 0) {
                // Ronda hacia adelante
                if (index % 2 === 0) {
                    game.value.teamOne.push(players[index]);
                } else {
                    game.value.teamTwo.push(players[index]);
                }
            } else {
                // Ronda hacia atrás
                if (index % 2 === 0) {
                    game.value.teamTwo.push(players[index]);
                } else {
                    game.value.teamOne.push(players[index]);
                }
            }

            index++;
            if (index % 2 === 0 && index !== 0) {
                round++;
            }
        }
        //console.log("game.value.teamOne", game.value.teamOne);
        //console.log("game.value.teamTwo", game.value.teamTwo);

        if (playersIsPortero.length === 1) {
            console.log("playersIsPortero.length === 1");
            if (game.value.teamOne.length < game.value.teamTwo.length) {
                game.value.teamOne.push(playersIsPortero[0]);
            } else {
                game.value.teamTwo.push(playersIsPortero[0]);
            }
        }

        if (playersIsPortero.length === 2) {
            console.log("playersIsPortero.length === 2");
            game.value.teamOne.push(playersIsPortero[0]);
            game.value.teamTwo.push(playersIsPortero[1]);
        }
        //console.log("game.value.teamOne", game.value.teamOne);
        //console.log("game.value.teamTwo", game.value.teamTwo);

        playersInvitados.forEach(invitados => {
            if (game.value.teamOne.length <= game.value.teamTwo.length) {
                game.value.teamOne.push(invitados);
            } else {
                game.value.teamTwo.push(invitados);
            }
        });
        //console.log("game.value.teamOne", game.value.teamOne);
        //console.log("game.value.teamTwo", game.value.teamTwo);
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

    return {
        loadingGame,
        types,
        games,
        newGame,
        game,
        getGames,
        addGame,
        divideTeams,
        actionNewGame,
        actionUpdateGame,
        actionViewGame,
        resetStore,
        getHistoryGames,
        getGamesSurveys
    }
})
