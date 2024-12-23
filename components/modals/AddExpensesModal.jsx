"use client";

import { useState, useContext, useRef } from "react";
import { FinanceContext } from "@/lib/store/finance-context";
import Modal from "../Modal";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

function AddExpensesModal({ show, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const { expenses, addExpenseItem, addCategory } = useContext(FinanceContext);
  console.log("FinanceContext:", { expenses, addExpenseItem, addCategory });

  const titleRef = useRef(null);
  const colorRef = useRef(null);

  const addExpenseItemHandler = async () => {
    // Validações antes de adicionar a despesa
    if (!selectedCategory) {
      toast.error("Por favor, selecione uma categoria.");
      return;
    }

    if (!expenseAmount || isNaN(expenseAmount) || Number(expenseAmount) <= 0) {
      toast.error("Por favor, insira um valor válido para a despesa.");
      return;
    }

    const expense = expenses.find((e) => e.id === selectedCategory);

    if (!expense) {
      toast.error("Categoria selecionada não encontrada.");
      return;
    }

    const newExpense = {
      color: expense.color,
      title: expense.title,
      amount: expense.amount + Number(expenseAmount),
      items: [
        ...expense.items,
        {
          amount: Number(expenseAmount),
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);

      toast.success("Despesa adicionada com sucesso! 😊");

      console.log(newExpense);
      setExpenseAmount("");
      setSelectedCategory(null);
      onClose();
    } catch (error) {
      console.log(error.message);
      toast.error("Erro ao adicionar despesa. Por favor, tente novamente.");
    }
  };

  const addCategoryHandler = async () => {
    const title = titleRef.current.value.trim();
    const color = colorRef.current.value;

    if (!title) {
      toast.error("Por favor, insira um título para a categoria.");
      return;
    }

    try {
      await addCategory({ title, color, amount: 0, items: [] });
      toast.success("Categoria adicionada com sucesso! 😊");
      setShowAddExpense(false);
      titleRef.current.value = "";
      colorRef.current.value = "#000000";
    } catch (error) {
      console.log(error.message);
      toast.error("Erro ao adicionar categoria. Por favor, tente novamente.");
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label htmlFor="expenseAmount" className="text-sm font-medium text-gray-300">
          Insira um valor da despesa
        </label>
        <input
          id="expenseAmount"
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Digite o valor de sua despesa"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
          className="w-full px-4 py-2 text-sm bg-gray-600 border border-gray-300 rounded-lg focus:outline-blue-300"
        />
      </div>

      {/* Expense Categories */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl text-white capitalize">Selecione a categoria da despesa</h3>
            <button
              onClick={() => {
                setShowAddExpense(true);
              }}
              className="text-lime-400 hover:text-lime-500"
            >
              + Nova Categoria
            </button>
          </div>

          {showAddExpense && (
            <div className="flex flex-col gap-2 p-4 bg-gray-800 rounded-lg">
              <input
                type="text"
                placeholder="Insira o Título"
                ref={titleRef}
                className="w-full px-4 py-2 text-sm bg-gray-700 border border-gray-300 rounded-lg focus:outline-blue-300"
              />

              <div className="flex items-center gap-2">
                <label htmlFor="colorPicker" className="text-sm font-medium text-gray-300">
                  Escolha uma Cor
                </label>
                <input
                  id="colorPicker"
                  type="color"
                  defaultValue="#000000"
                  ref={colorRef}
                  className="w-12 h-12 p-0 border-none rounded-full cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addCategoryHandler}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Criar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddExpense(false);
                  }}
                  className="px-4 py-2 text-sm font-semibold text-gray-300 bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 mt-4">
            {expenses.map((expense) => (
              <button
                key={expense.id}
                onClick={() => {
                  setSelectedCategory(expense.id);
                }}
                className={`flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl ${
                  expense.id === selectedCategory ? "ring-2 ring-lime-400" : ""
                } hover:bg-slate-600 transition`}
              >
                <div className="flex items-center gap-2">
                  {/* Colored circle */}
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{
                      backgroundColor: expense.color,
                    }}
                  />
                  <h4 className="text-white capitalize">{expense.title}</h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button
            className="w-full px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
            onClick={addExpenseItemHandler}
          >
            Adicionar Despesa
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
