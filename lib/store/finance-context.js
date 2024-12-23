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

export const FinanceContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  removeExpenseItem: async () => {},
  addCategory: async () => {},
  toggle: false,
  setToggle: () => {},
});

export default function FinanceContextProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const getIncomeData = async () => {
      try {
        const collectionRef = collection(db, "income");
        const docsSnap = await getDocs(collectionRef);

        const data = docsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt
            ? new Date(doc.data().createdAt.toMillis())
            : new Date(),
          amount: Number(doc.data().amount) || 0,
          items: doc.data().items || [],
        }));

        setIncome(data);
        console.log("Fetched Income:", data);
      } catch (error) {
        console.error("Erro ao buscar renda:", error);
       
      }
    };

    const getExpensesData = async () => {
      try {
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
        console.log("Fetched Expenses:", data);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
        
      }
    };

    getExpensesData();
    getIncomeData();
  }, []);

  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      setIncome((prevState) => [...prevState, { id: docSnap.id, ...newIncome }]);
     
    } catch (error) {
      console.error("Erro ao adicionar renda:", error);
      
      throw error; 
    }
  };

  const removeIncomeItem = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => prevState.filter((i) => i.id !== incomeId));
      
    } catch (error) {
      console.log("Erro ao remover renda:", error);
    
      throw error;
    }
  };

  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, "expenses", expenseCategoryId);

    try {
      await updateDoc(docRef, { 
        amount: newExpense.amount, 
        items: newExpense.items,
        color: newExpense.color,
        title: newExpense.title
      });
      setExpenses(prevState => {
        const updateExpenses = [...prevState];
        const foundIndex = updateExpenses.findIndex(expense => expense.id === expenseCategoryId);
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
      setExpenses((prevState) => [...prevState, { id: docSnap.id, ...newCategory }]);
      
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      
      throw error;
    }
  };

  const removeExpenseItem = async (expenseId) => {
    const docRef = doc(db, "expenses", expenseId);
    try {
      await deleteDoc(docRef);
      setExpenses((prevState) => prevState.filter((e) => e.id !== expenseId));
    } catch (error) {
      console.log("Erro ao remover despesa:", error);
      throw error;
    }
  };

  const values = { 
    income, 
    expenses, 
    addIncomeItem, 
    removeIncomeItem, 
    addExpenseItem, 
    removeExpenseItem,
    addCategory,
    toggle, 
    setToggle 
  };

  return (
    <FinanceContext.Provider value={values}>
      {children}
    </FinanceContext.Provider>
  );
}
