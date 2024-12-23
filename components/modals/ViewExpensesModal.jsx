"use client";

import { useContext } from "react";
import { FinanceContext } from "@/lib/store/finance-context";

import Modal from "@/components/Modal";
import { currencyFormatter } from "@/lib/utilsFinance";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function ViewExpenseModal({ show, onClose, expense }) {
  const { removeExpenseItem, removeExpenseCategory } = useContext(FinanceContext);

  const deleteExpenseHandler = async () => {
    try {
      console.log("Attempting to delete expense category with ID:", expense.id);
      await removeExpenseCategory(expense.id);
      toast.success("Despesa removida com sucesso! 😊");
      onClose(false); 
    } catch (error) {
      console.error("Erro ao remover despesa:", error);
      toast.error("Erro ao remover despesa. Por favor, tente novamente.");
    }
  };

  const deleteExpenseItemHandler = async (item) => {
    try {
      console.log("Attempting to delete expense item with ID:", item.id);
      await removeExpenseItem(expense.id, item.id);
      toast.success("Item de despesa removido com sucesso! 😊");
    } catch (error) {
      console.error("Erro ao remover item de despesa:", error);
      toast.error("Erro ao remover item de despesa. Por favor, tente novamente.");
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-center justify-between mt-16">
        <h2 className="text-4xl">{expense.title}</h2>
        <button onClick={deleteExpenseHandler} className="btn btn-danger">
          Delete
        </button>
      </div>

      <div>
        <h3 className="my-4 text-2xl">Histórico de Despesas</h3>
        {expense.items.map((item) => {
          return (
            <div key={item.id} className="flex items-center justify-between">
              <small>
                {item.createdAt.toMillis
                  ? new Date(item.createdAt.toMillis()).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })
                  : new Date(item.createdAt).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
              </small>
              <p className="flex items-center gap-2">
                {currencyFormatter(item.amount)}
                <button
                  onClick={() => {
                    deleteExpenseItemHandler(item);
                  }}
                  className="text-red-500 hover:text-red-700 hover:scale-105"
                >
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default ViewExpenseModal;
