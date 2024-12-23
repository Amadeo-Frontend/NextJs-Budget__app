"use client";
import { useState } from "react";
import { currencyFormatter } from "@/lib/utilsFinance";
import ViewExpenseModal from "./modals/ViewExpensesModal";

function ExpenseCategoryItem({ color, title, amount, id, items }) {
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);

  return (
    <>
      <ViewExpenseModal
        show={showViewExpenseModal} 
        onClose={() => setShowViewExpenseModal(false)}
        expense={{ id, color, title, amount, items }}
      />
      <button onClick={() => { setShowViewExpenseModal(true) }}>
        <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
          <div className="flex items-center gap-2">
            <div
              className="w-[25px] h-[25px] rounded-full"
              style={{ backgroundColor: color }}
            />
            <h4 className="text-white capitalize">{title}</h4>
          </div>
          <p className="text-white">{currencyFormatter(amount)}</p>
        </div>
      </button>
    </>
  );
}

export default ExpenseCategoryItem;
