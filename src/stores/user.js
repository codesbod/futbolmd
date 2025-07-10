import {defineStore} from 'pinia'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "@/components/firebaseConfig.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {usePlayerStore} from "@/stores/player.js";
import {useGameStore} from "@/stores/game.js";
import {useSurveyStore} from "@/stores/survey.js";

export const useUserStore = defineStore('userStore', () => {

    const router = useRouter();

    const loadingAction = ref(false);
    const loadingUser = ref(false);

    const userData = ref();
    const isAdmin = ref(false);
    const isDeveloper = ref(false);

    const trueCodeTeam = "u3P96dFpFn7w";

    const createUser = async (email, password, codeTeam) => {
        loadingAction.value = true;
        try {
            if(codeTeam !== trueCodeTeam){
                alert("The team code does not exist");
                return;
            }
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            userData.value = user;
            await router.push('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);

            alert(errorCode);
        } finally {
            loadingAction.value = false;
        }
    }

    const loginUser = async (email, password) => {
        loadingAction.value = true;
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password);
            userData.value = user;
            validationIsAdmin();
            validationIsDeveloper();
            await router.push('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);

            alert(errorCode);
        } finally {
            loadingAction.value = false;
        }
    }

    const logoutUser = async () => {
        loadingAction.value = true;
        try {
            resetAllStore();

            await signOut(auth);
            userData.value = null;
            await router.push('/login');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode} ${errorMessage}`);
        } finally {
            loadingAction.value = false;
        }
    }

    const currentUser = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth,
                (user) => {
                    if (user) {
                        userData.value = user;
                    } else {
                        userData.value = null;
                    }
                    resolve(user);
                    unsubscribe();
                },
                error => reject(error)
            );
        });
    }

    const validationIsAdmin = () => {
        isAdmin.value = userData.value.uid === "8yxnSvcLPthVc3b3XRCOSaXZr0h1"
            || userData.value.uid === "WQ5WZyiDWWPd5Yl9zuKR79tIwDS2";
    }

    const validationIsDeveloper = () => {
        isDeveloper.value = userData.value.uid === "8yxnSvcLPthVc3b3XRCOSaXZr0h1";
    }

    const resetAllStore = () => {
        const playerStore = usePlayerStore();
        playerStore.resetStore();
        const gameStore = useGameStore();
        gameStore.resetStore();
        const surveyStore = useSurveyStore();
        surveyStore.resetStore();
    }

    return {loadingAction, loadingUser, userData, isAdmin, isDeveloper, createUser, loginUser, logoutUser, currentUser, validationIsAdmin}

})
