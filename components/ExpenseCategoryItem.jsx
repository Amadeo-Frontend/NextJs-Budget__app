"use client";

import { currencyFormatter } from "@/lib/utilsFinance";

function ExpenseCategoryItem({ color, title, amount }) {
  return (
    <button>
      <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
        <div className="flex items-center gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full"
            style={{ backgroundColor: color }}
          />
          <h4 className="text-white capitalize">{title}</h4>
        </div>
        <p className="text-white">{currencyFormatter(amount)}</p> {/* Adicionada classe para melhor visualização */}
      </div>
    </button>
  );
}

export default ExpenseCategoryItem;
