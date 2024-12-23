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
  getDoc,
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

  const removeExpenseItem = async (expenseCategoryId, itemId) => {
    const docRef = doc(db, "expenses", expenseCategoryId);
    try {
      const expenseDoc = await getDoc(docRef);
      if (!expenseDoc.exists()) {
        throw new Error("Despesa não encontrada.");
      }
      const expenseData = expenseDoc.data();
      const updatedItems = expenseData.items.filter(item => item.id !== itemId);
      const itemToDelete = expenseData.items.find(item => item.id === itemId);
      const updatedAmount = expenseData.amount - (itemToDelete ? itemToDelete.amount : 0);

      await updateDoc(docRef, {
        items: updatedItems,
        amount: updatedAmount,
      });

      setExpenses(prevState => {
        const updatedExpenses = prevState.map(expense => {
          if (expense.id === expenseCategoryId) {
            return {
              ...expense,
              items: updatedItems,
              amount: updatedAmount,
            };
          }
          return expense;
        });
        return updatedExpenses;
      });
    } catch (error) {
      console.error("Erro ao remover item de despesa:", error);
      throw error;
    }
  };

  const removeExpenseCategory = async (expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await deleteDoc(docRef);

      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter(
          (expense) => expense.id !== expenseCategoryId
        );

        return [...updatedExpenses];
      });
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
    removeExpenseCategory,
    toggle,
    setToggle, 
  };

  return (
    <FinanceContext.Provider value={values}>
      {children}
    </FinanceContext.Provider>
  );
}
