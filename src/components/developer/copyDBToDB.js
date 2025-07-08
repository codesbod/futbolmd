import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {db as dbStart} from "@/components/firebaseConfig.js";
import {auth as authEnd, db as dbEnd} from "@/components/developer/firebaseConfigEnd.js";
import {ref} from "vue"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const copyDBtoDB = async () => {
    try {
        // 🔐 Autenticación
        await loginDestination("migrate@futbol.com", "123456789");

        // 📥 Leer datos desde proyecto origen
        const players = await getData("player");
        // 📤 Escribir datos en proyecto destino
        await setData("player", players.value);

        // 📥 Leer datos desde proyecto origen
        const games = await getData("game");
        // 📤 Escribir datos en proyecto destino
        await setData("game", games.value);

        // 📥 Leer datos desde proyecto origen
        const surveys = await getData("survey");
        // 📤 Escribir datos en proyecto destino
        await setData("survey", surveys.value);

        alert("¡Migración completada con éxito!");
    } catch (error) {
        console.error("❌ Error durante la migración:", error.code, error.message);
    }
};

const getData = async (path) => {
    try {
        console.log("📥 Leer datos desde proyecto origen");
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
        console.log(`${error.code} ${error.message}`);
    }
}

const loginDestination = async (email, password) => {
    try {
        //await createUserWithEmailAndPassword(authEnd, email, password);
        const userCredential = await signInWithEmailAndPassword(authEnd, "migrate@futbol.com", "123456789");
        console.log("✔️ Autenticación exitosa", userCredential.user.uid);
    } catch (error) {
        console.log(`${error.code} ${error.message}`);
    }
}

const setData = async (path, data) => {
    try {
        console.log("📤 Escribir datos en proyecto destino", data);
        for (const obj of data) {
            await setDoc(doc(dbEnd, path, obj.id), obj);
            console.log(`✅ Migrado ${path}: ${obj.id}`);
        }
    } catch (error) {
        console.log(`${error.code} ${error.message}`);
    }
}

export {copyDBtoDB}