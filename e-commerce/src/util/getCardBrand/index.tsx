export const getCardBrand = (cardNumber: string): string | null => {
  const cleanNumber = cardNumber.replace(/\D/g, ''); // Remove caracteres não numéricos

  const cardRules = [
    { brand: "Visa", regex: /^4/ },
    { brand: "Mastercard", regex: /^(5[1-5]|2[2-7])/ },
    { brand: "American Express", regex: /^3[47]/ },
    { brand: "Discover", regex: /^6(?:011|5|22)/ },
    { brand: "Elo", regex: /^(5067|4576|4011)/ },
    { brand: "Hipercard", regex: /^(38|60)/ }
  ];

  const matchedBrand = cardRules.find(rule => rule.regex.test(cleanNumber));
  return matchedBrand ? matchedBrand.brand : null;
};

// Exemplo de uso:
console.log(getCardBrand("4536125254885548")); // "Visa"
console.log(getCardBrand("5255555555554444")); // "Mastercard"
console.log(getCardBrand("378282246310005"));  // "American Express"
