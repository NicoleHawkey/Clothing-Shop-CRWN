import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword 
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAWYnxrdRN3FvIP3nm_4SIgEsZ83Z3oU6Y",
    authDomain: "crwn-clothing-db-970dd.firebaseapp.com",
    projectId: "crwn-clothing-db-970dd",
    storageBucket: "crwn-clothing-db-970dd.appspot.com",
    messagingSenderId: "947613429347",
    appId: "1:947613429347:web:b74a91f0d92080fe989256"
  };
 
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => 
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    // if user data does not exist
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { 
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
         } catch (error) {
                console.log('error creating the user', error.message);
            }
        }
    // if user data exist
        return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};