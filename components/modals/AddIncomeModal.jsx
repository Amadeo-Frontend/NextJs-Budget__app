"use client";

import { useRef, useState, useContext } from "react";
import Modal from "@/components/Modal";
import { MoonLoader } from "react-spinners";
import { FaRegTrashAlt } from "react-icons/fa";
import { currencyFormatter } from "@/lib/utilsFinance";
import { FinanceContext } from "@/lib/store/finance-context";

const AddIncomeModal = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { income, addIncomeItem, removeIncomeItem } = useContext(FinanceContext);

  const amountRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const newIncome = {
      amount: parseFloat(amountRef.current.value),
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };
  
    try {
      await addIncomeItem(newIncome);
  
      // Reseta os campos
      descriptionRef.current.value = "";
      amountRef.current.value = "";
      onClose(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar renda, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao remover entrada de renda, tente novamente.");
    }
  };

  return (
    <>

      <Modal show={show} onClose={onClose}>
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
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

          <button type="submit" className="self-start btn btn-primary" disabled={loading}>
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
            <div className="flex justify-between items-center" key={i.id}>
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
                <button onClick={() => handleDelete(i.id)}>
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default AddIncomeModal;
