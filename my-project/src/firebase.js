import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyDgSRIeJQnhmj9K_oH1_IdSf8WBUu-JgYQ",
    authDomain: "netflix-clone-43baa.firebaseapp.com",
    projectId: "netflix-clone-43baa",
    storageBucket: "netflix-clone-43baa.firebasestorage.app",
    messagingSenderId: "116680179539",
    appId: "1:116680179539:web:f23e9a54b995eab8a72ba6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,

        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = () => {
    signOut(auth);
}
export { auth, db, login, signup, logout };