"use client";

import { useState, useContext } from "react";
import { FinanceContext } from "@/lib/store/finance-context";
import { currencyFormatter } from "@/lib/utilsFinance";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIncomeModal from "@/components/modals/AddIncomeModal";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const { expenses } = useContext(FinanceContext);

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
            {expenses.map((expense) => (
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
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
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
