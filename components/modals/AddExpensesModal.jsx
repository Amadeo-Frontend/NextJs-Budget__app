'use client'

import { useState } from "react";
import Modal from "../Modal";

function AddExpensesModal({ show, onClose }) {
const [expenseAmount, setExpenseAmount] = useState('')

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label>Despesas ....</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Digite sua despesa"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>
    </Modal>
  );
}

export default AddExpensesModal;
