"use client";

import { useState } from "react";
import { currencyFormatter } from "@/lib/utilsFinance";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIncomeModal from "@/components/modals/AddIncomeModal";

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

  return (
    <>
      {/* Caso queira exibir toasts aqui também */}
      <ToastContainer position="top-right" autoClose={3000} />

      <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} />
      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              // Lógica para "+ Expenses"
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
        <section className="py-6" id="chart">
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
