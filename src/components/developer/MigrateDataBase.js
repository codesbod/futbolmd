import {collection, doc, getDocs, getFirestore, setDoc} from "firebase/firestore";
import {db as dbStart} from "@/components/firebaseConfig.js";
import {ref} from "vue"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from "firebase/app";

const authEnd = ref();
const dbEnd = ref();

const logMigrate = ref([]);

const migrateDataBase = async (user, firebaseConfig) => {
    try {
        logMigrate.value = [];
        // 📥 Leer datos desde proyecto origen
        const players = await getData("player");
        // 📥 Leer datos desde proyecto origen
        const games = await getData("game");
        // 📥 Leer datos desde proyecto origen
        const surveys = await getData("survey");

        // 🔐 Autenticación
        await getConnection(firebaseConfig);
        await loginDestination(user.email, user.password);
        // 📤 Escribir datos en proyecto destino
        await setData("player", players.value);
        // 📤 Escribir datos en proyecto destino
        await setData("game", games.value);
        // 📤 Escribir datos en proyecto destino
        await setData("survey", surveys.value);

        logMigrate.value.push("✔️ ¡Migración completada con éxito!");
    } catch (error) {
        logMigrate.value.push(`❌ Error durante la migración: ${error.code} ${error.message}`);
    }
};

const getData = async (path) => {
    try {
        logMigrate.value.push(`📥 Leer datos desde proyecto origen ${path}`);
        const data = ref([]);
        const querySnapshot = await getDocs(collection(dbStart, path));
        querySnapshot.forEach((obj) => {
            data.value.push({
                id: obj.id,
                ...obj.data()
            })
        });
        return data;
    } catch (error) {
        logMigrate.value.push(`${error.code} ${error.message}`);
    }
}

const getConnection = async (firebaseConfig) => {
    try {
        logMigrate.value.push(`✔️ Conexion exitosa`);
        const appEnd = initializeApp(firebaseConfig, "destine");
        authEnd.value = getAuth(appEnd);
        dbEnd.value = getFirestore(appEnd);
    }catch (error) {
        logMigrate.value.push(`${error.code} ${error.message}`);
    }
}

const loginDestination = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(authEnd.value, email, password);
        logMigrate.value.push(`✔️ Autenticación exitosa ${userCredential.user.uid}`);
    } catch (error) {
        logMigrate.value.push(`${error.code} ${error.message}`);
    }
}

const setData = async (path, data) => {
    try {
        console.log("📤 Escribir datos en proyecto destino", data);
        for (const obj of data) {
            await setDoc(doc(dbEnd.value, path, obj.id), obj);
            logMigrate.value.push(`✅ Migrado ${path}: ${obj.id}`);
        }
    } catch (error) {
        logMigrate.value.push(`${error.code} ${error.message}`);
    }
}

export {logMigrate, migrateDataBase}