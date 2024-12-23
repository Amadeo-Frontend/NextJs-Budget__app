"use client";

import { useState, useRef, useEffect } from "react";
import { currencyFormatter } from "@/lib/utilsFinance";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import Modal from "@/components/Modal";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MoonLoader } from "react-spinners";

// Firebase
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  { id: 1, title: "Entertainment", color: "#000", total: 500 },
  { id: 2, title: "Gass", color: "#009", total: 200 },
  { id: 3, title: "Fuel", color: "#000", total: 1200 },
  { id: 4, title: "Movies", color: "#000", total: 800 },
  { id: 5, title: "Holiday", color: "#000", total: 2000 },
];

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState([]);

  const amountRef = useRef(null);
  const descriptionRef = useRef(null);

  const addIncomeHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newIncome = {
      amount: parseFloat(amountRef.current.value),
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    const collectionRef = collection(db, "income");

    try {
      const docSnap = await addDoc(collectionRef, newIncome);

      // Atualiza o estado local
      setIncome((prevState) => [
        ...prevState,
        {
          id: docSnap.id,
          ...newIncome,
        },
      ]);

      // Reseta os campos
      descriptionRef.current.value = "";
      amountRef.current.value = "";

      // Toast de sucesso
      toast.success("Dados adicionados com sucesso 😁");
    } catch (error) {
      console.error(error.message);
      // Toast de erro
      toast.error("Erro, tente novamente! 😒");
    } finally {
      setLoading(false);
      setShowAddIncomeModal(false);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId) => {
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

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Add Income Modal */}
      <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
        <form className="flex flex-col gap-4 p-4" onSubmit={addIncomeHandler}>
          <div className="input-group">
            <label
              htmlFor="amount"
              className="block mt-12 mb-2 text-sm font-bold text-gray-300"
            >
              Valor
            </label>
            <input
              className="w-full px-4 py-2 text-sm transition duration-300 ease-in-out transform bg-gray-600 border border-gray-300 rounded-lg shadow-sm custom-input focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300"
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Digite o valor"
              required
            />
          </div>

          <div className="input-group">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-bold text-gray-300"
            >
              Descrição
            </label>
            <input
              className="w-full px-4 py-2 text-sm transition duration-300 ease-in-out transform bg-gray-600 border border-gray-300 rounded-lg shadow-sm custom-input focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300"
              name="description"
              ref={descriptionRef}
              type="text"
              placeholder="Escreva a descrição"
              required
            />
          </div>

          <button
            type="submit"
            className="self-start btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <MoonLoader color="var(--foreground)" size={16} />
              </div>
            ) : (
              "Adicionar"
            )}
          </button>
        </form>

        <div className="flex flex-col gap-4 p-6 mt-6">
          <h3 className="text-2xl font-bold">Histórico</h3>

          {income.map((i) => (
            <div className="flex justify-between item-center" key={i.id}>
              <div>
                <p className="font-semibold">{i.description}</p>
                <small className="text-xs">
                  {new Date(i.createdAt).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </small>
              </div>
              <p className="flex items-center gap-2">
                {currencyFormatter(i.amount)}
                <button
                  onClick={() => {
                    deleteIncomeEntryHandler(i.id);
                  }}
                >
                  <FaRegTrashAlt  className="hover:scale-105 hover:fill-red-500"/>
                </button>
              </p>
            </div>
          ))}
        </div>
      </Modal>

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              // Lógica para "+ Expenses" aqui
            }}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button
            className="btn btn-primary-outline"
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
          >
            + Income
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA.map((expense) => (
              <ExpenseCategoryItem
                key={expense.id}
                color={expense.color}
                title={expense.title}
                total={expense.total}
              />
            ))}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: DUMMY_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DUMMY_DATA.map((expense) => expense.total),
                    backgroundColor: DUMMY_DATA.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
