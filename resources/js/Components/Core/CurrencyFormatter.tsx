import React from "react";

type CurrencyFormatterProps = {
  amount: number;
  currency?: string;
  locale?: string;
};

function CurrencyFormatter({
  amount,
  currency = "PHP",
  locale = "en-PH",
}: CurrencyFormatterProps): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

export default CurrencyFormatter;