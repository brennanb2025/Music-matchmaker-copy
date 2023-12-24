// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useCallback, useState, useEffect } from "react";
import { getDatabase, onValue, ref, update } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8KWlYFoo3ItJB1gkpE8jLsN77FmmI9S0",
  authDomain: "music-matchmaker-392.firebaseapp.com",
  databaseURL: "https://music-matchmaker-392-default-rtdb.firebaseio.com",
  projectId: "music-matchmaker-392",
  storageBucket: "music-matchmaker-392.appspot.com",
  messagingSenderId: "176789524645",
  appId: "1:176789524645:web:47bdd4a91a2a23ccaabd4c",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) return;

    const dataRef = ref(database, path);

    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        setData(snapshot.val());
      },
      (err) => {
        setError(err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [path]);

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return [user];
};
