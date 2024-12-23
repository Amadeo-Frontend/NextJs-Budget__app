"use client";

import { createContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export const FinanceContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  toggle: false,
  setToggle: () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
});

export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [toggle, setToggle] = useState(false);

  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, "expenses", expenseCategoryId);

    try {
      await updateDoc(docRef, {
        amount: newExpense.amount,
        items: newExpense.items,
        color: newExpense.color,
        title: newExpense.title,
      });
      setExpenses((prevState) => {
        const updateExpenses = [...prevState];
        const foundIndex = updateExpenses.findIndex(
          (expense) => expense.id === expenseCategoryId
        );
        if (foundIndex !== -1) {
          updateExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense };
        }
        return updateExpenses;
      });
    } catch (error) {
      console.error("Erro ao adicionar despesa:", error);
      throw error;
    }
  };

  const addCategory = async (newCategory) => {
    const collectionRef = collection(db, "expenses");
    try {
      const docSnap = await addDoc(collectionRef, newCategory);
      setExpenses((prevState) => [
        ...prevState,
        { id: docSnap.id, ...newCategory },
      ]);
      toast.success("Categoria adicionada com sucesso! 😊");
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      toast.error("Erro ao adicionar categoria. 😒");
    }
  };

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis()),
        amount: Number(doc.data().amount) || 0,
        items: doc.data().items || [],
      }));

      setIncome(data);
      console.log("Fetched Income:", data);
    };

    const getExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        amount: Number(doc.data().amount) || 0,
        title: doc.data().title || "Sem Título",
        color: doc.data().color || "#000000",
        items: doc.data().items || [],
      }));

      setExpenses(data);
      console.log("Fetched Income:", data);
    };
    getExpensesData();
    getIncomeData();
  }, []);

  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      setIncome((prevState) => [
        ...prevState,
        { id: docSnap.id, ...newIncome },
      ]);
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

  const values = {
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    toggle,
    setToggle,
    addExpenseItem,
    addCategory,
  };

  return (
    <FinanceContext.Provider value={values}>{children}</FinanceContext.Provider>
  );
}
