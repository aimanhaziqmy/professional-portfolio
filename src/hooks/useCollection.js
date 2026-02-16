import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export const useCollection = (collectionName, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // use a ref to avoid infinite loop in useEffect
    // _orderBy is an array e.g. ["createdAt", "desc"]
    const orderByRef = useRef(_orderBy).current;

    useEffect(() => {
        let ref = collection(db, collectionName);

        if (orderByRef) {
            ref = query(ref, orderBy(...orderByRef));
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id });
            });

            setDocuments(results);
            setError(null);
        }, (error) => {
            console.error(error);
            setError("Could not fetch the data");
        });

        return () => unsubscribe();

    }, [collectionName, orderByRef]);

    return { documents, error };
};
