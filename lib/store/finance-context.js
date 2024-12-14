"use client";

import { createContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export const FinanceContext = createContext({
  income: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
});

export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis()),
      }));

      setIncome(data);
    };

    getIncomeData();
  }, []);

  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      setIncome((prevState) => [...prevState, { id: docSnap.id, ...newIncome }]);
      toast.success("Dados adicionados com sucesso😁");
    } catch (error) {
      console.error(error.message);
      toast.error("Erro, tente novamente! 😒");
    }
  };

  const removeIncomeItem = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => prevState.filter((i) => i.id !== incomeId));
      toast.success("Entrada de renda excluída com sucesso! 😊");
    } catch (error) {
      console.log(error.message);
      toast.error("Erro ao excluir entrada de renda. 😒");
    }
  };

  const values = { income, addIncomeItem, removeIncomeItem };

  return (
    <FinanceContext.Provider value={values}>
      {children}
    </FinanceContext.Provider>
  );
}
