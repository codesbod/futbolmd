import {defineStore} from "pinia";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {auth, db} from "@/components/firebaseConfig.js";
import {addDoc, collection, query, where, doc, getDocs, setDoc} from "firebase/firestore";


export const useSurveyStore = defineStore('surveyStore', () => {

    const router = useRouter();

    const loadingSurvey = ref(false);

    const survey = ref({
        id: null,
        game: {},
        player: null,
        qualifications: [],
    });

    const actionSendSurveys = async (objGame) => {
        await getSurveys(objGame);
        if (survey.value.id === null) {
            setSurvey(objGame);
        }
        await router.push("/sendSurvey");
    }

    const setSurvey = (objGame) => {
        const uid = auth.currentUser.uid;

        const qualifications = ref([]);
        if (objGame.teamOne.some(player => player.id === uid)) {
            qualifications.value = objGame.teamOne
                .filter(player => player.id !== uid && player.firstName !== 'Invitado' && player.lastName !== 'Invitado')
                .map(player => ({
                    id: player.id,
                    firstName: player.firstName,
                    lastName: player.lastName,
                    qualification: 5
                }));
        }
        if (objGame.teamTwo.some(player => player.id === uid)) {
            qualifications.value = objGame.teamTwo
                .filter(player => player.id !== uid && player.firstName !== 'Invitado' && player.lastName !== 'Invitado')
                .map(player => ({
                    id: player.id,
                    firstName: player.firstName,
                    lastName: player.lastName,
                    qualification: 5
                }));
        }

        survey.value = {
            id: null,
            game: {
                id: objGame.id,
                place: objGame.place,
                dateTime: objGame.dateTime,
                type: objGame.type,
            },
            player: uid,
            qualifications: qualifications.value,
        }
    }

    const getSurveys = async (objGame) => {
        loadingSurvey.value = true;
        try {
            const q = query(
                collection(db, "survey"),
                where("player", "==", auth.currentUser.uid),
                where("game.id", "==", objGame.id)
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((obj) => {
                survey.value = ({
                    id: obj.id,
                    ...obj.data()
                });
            });
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);
        } finally {
            loadingSurvey.value = false;
        }
    }

    const addSurvey = async () => {
        loadingSurvey.value = true;
        try {
            if(survey.value.id !== null){
                await setDoc(doc(db, "survey", survey.value.id), survey.value);
            }else{
                const docRef = await addDoc(collection(db, "survey"), survey.value);
                survey.value.id = docRef.id;
                await setDoc(doc(db, "survey", survey.value.id), survey.value);
            }
            await router.push('/surveys');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);
        } finally {
            loadingSurvey.value = false;
        }
    }

    const resetStore = () => {
        survey.value = {
            id: null,
            game: {},
            player: null,
            qualifications: []
        };
    };

    return {
        loadingSurvey,
        survey,
        actionSendSurveys,
        addSurvey,
        resetStore,
    }

});