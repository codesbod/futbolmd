import {defineStore} from 'pinia'
import {ref} from "vue";
import {collection, getDocs, getDoc, setDoc, doc} from "firebase/firestore/lite";
import {auth, db} from "@/components/firebaseConfig";
import {useRouter} from "vue-router";

export const usePlayerStore = defineStore('playerStore', () => {

    const router = useRouter();

    const loadingPlayer = ref(false);

    const players = ref([]);

    const newPlayer = ref({
        id: null,
        firstName: null,
        lastName: null,
        user: null,
        positions: [
            {
                code: "PORTERO", name: "Portero",
                positions: [
                    {code: "PP", name: "Portero", value: false}
                ]
            },
            {
                code: "DEFENSA", name: "Defensa",
                positions: [
                    {code: "DFD", name: "Defensa Derecho", value: false},
                    {code: "DFC", name: "Defensa Central", value: false},
                    {code: "DFI", name: "Defensa Izquierdo", value: false}
                ]
            },
            {
                code: "MEDIO", name: "Medio",
                positions: [
                    {code: "MCD", name: "Medio Defensivo", value: false},
                    {code: "MD", name: "Medio Derecho", value: false},
                    {code: "MC", name: "Medio", value: false},
                    {code: "MI", name: "Medio Izquierdo", value: false},
                    {code: "MCO", name: "Medio Ofensivo", value: false},
                ]
            },
            {
                code: "DELANTERO", name: "Delantero",
                positions: [
                    {code: "DD", name: "Delantero Derecho", value: false},
                    {code: "DC", name: "Delantero Centro", value: false},
                    {code: "DI", name: "Delantero Izquierdo", value: false}
                ]
            }
        ],
        attributes: [
            {code: 0, name: "Resistencia", rating: 3},
            {code: 1, name: "Velocidad", rating: 3},
            {code: 2, name: "Pase", rating: 3},
            {code: 3, name: "Control", rating: 3},
            {code: 4, name: "Regate", rating: 3},
            {code: 5, name: "Definición", rating: 3},
            {code: 6, name: "Cabeceo", rating: 3},
            {code: 7, name: "Posicionamiento", rating: 3},
            {code: 8, name: "Fuerza", rating: 3},
            {code: 9, name: "Calificacion", rating: 5, show: false},
        ],
        statistic: {
            detail: {
                pg: 0,
                pe: 0,
                pp: 0,
                gf: 0,
                gc: 0,
            },
            games: 0,
            goals: 0,
            average: 0,
        },
    });
    const player = ref({});

    const positions = ref([]);

    const getPlayers = async () => {
        loadingPlayer.value = true;
        try {
            if (players.value.length !== 0) {
                return;
            }
            const querySnapshot = await getDocs(collection(db, "player"));
            querySnapshot.forEach((obj) => {
                players.value.push({
                    id: obj.id,
                    ...obj.data()
                })
            });
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);
        } finally {
            loadingPlayer.value = false;
        }
    }

    const getPlayer = async () => {
        loadingPlayer.value = true;
        try {
            const docRef = doc(db, "player", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                player.value = {
                    id: docSnap.id,
                    ...docSnap.data()
                };
            } else {
                player.value = newPlayer.value;
            }
            getCard();
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);
        } finally {
            loadingPlayer.value = false;
        }
    }

    const addPlayer = async () => {
        loadingPlayer.value = true;
        try {
            const uid = auth.currentUser.uid;
            player.value.id = uid;
            player.value.user = uid;

            await setDoc(doc(db, "player", uid), player.value);
            await router.push('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);
        } finally {
            loadingPlayer.value = false;
        }
    }

    const getCard = () => {
        getAverage(player.value);
        getPositions(player.value);
    }

    const getAverage = (objPlayer) => {
        console.log(objPlayer.id, objPlayer);
        const sumAttribute = ref(0);
        objPlayer.attributes.forEach(attribute => {
            sumAttribute.value += Number(attribute.rating);
        });
        objPlayer.statistic.average = Math.round((sumAttribute.value / objPlayer.attributes.length) * 10);
    }

    const getPositions = (objPlayer) => {
        positions.value = objPlayer.positions
            .flatMap(posicion => posicion.positions?.filter(subPosicion => subPosicion.value === true))
            .reverse()
            .slice(0, 3);
    }

    const resetStore = () => {
        player.value = newPlayer.value;
        getPlayers.value = [];
        positions.value = [];
    };

    return {
        loadingPlayer,
        players,
        player,
        positions,
        getPlayers,
        getPlayer,
        addPlayer,
        getAverage,
        getPositions,
        resetStore
    }

})
