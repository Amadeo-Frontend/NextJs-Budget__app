export const currencyFormatter = (amount) => {
    const formatter = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  
    return formatter.format(amount);
  };