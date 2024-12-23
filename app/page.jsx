// /app/page.jsx

"use client";

import { useState, useContext, useEffect } from "react";
import { FinanceContext } from "@/lib/store/finance-context";
import { AuthContext } from "@/lib/store/auth-context";
import { currencyFormatter } from "@/lib/utilsFinance";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const { expenses, income } = useContext(FinanceContext);
  const [balance, setBalance] = useState(0);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.amount;
      }, 0);

    setBalance(newBalance);
  }, [expenses, income]);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-400">Carregando...</p>
      </main>
    );
  }

  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      {/* Add Income Modal */}
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />

      {/* Add Expenses Modal */}
      <AddExpensesModal
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />
      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">Meu Balanço Financeiro</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setShowAddExpenseModal(true);
            }}
            className="btn btn-primary"
          >
            + Despesas
          </button>
          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className="btn btn-primary-outline"
          >
            + Renda
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">Minhas Despesas</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => (
              <ExpenseCategoryItem
                key={expense.id}
                color={expense.color}
                title={expense.title}
                amount={expense.amount}
                id={expense.id}
                items={expense.items}
              />
            ))}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-6" id="chart">
          <h3 className="text-2xl">Gráfico das Despesas</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Despesas",
                    data: expenses.map((expense) => expense.amount),
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
