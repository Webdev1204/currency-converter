import React, { useState, useEffect } from "react";
import { InputNumber, Select, Button } from "antd";
import "./CurrencyConverter.css";
import axios from "axios";

const { Option } = Select;

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/f814936966b42917e1184d2a/latest/USD`
        );
        setExchangeRates(response.data.conversion_rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, [fromCurrency]);

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleFromCurrencyChange = (value) => {
    setFromCurrency(value);
  };

  const handleToCurrencyChange = (value) => {
    setToCurrency(value);
  };

  const handleConvert = () => {
    const rate = exchangeRates[toCurrency];
    if (rate) {
      const result = amount * rate;
      setConvertedAmount(result.toFixed(2));
    }
  };

  return (
    <div id="main">
      <div className="content">
        <h1>Currency Converter </h1>
        <div className="input_box">
          {/* Input Field */}
          <InputNumber
            className="input"
            value={amount}
            onChange={handleAmountChange}
          />
          {/* Select options */}
          <Select
            className="select"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            {Object.keys(exchangeRates).map((currency) => (
              <Option key={currency} value={currency}>
                {currency}
              </Option>
            ))}
          </Select>
          <Select
            className="select"
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            {Object.keys(exchangeRates).map((currency) => (
              <Option key={currency} value={currency}>
                {currency}
              </Option>
            ))}
          </Select>
          {/* Convert Button  */}
          <Button type="primary" onClick={handleConvert} className="button">
            Convert
          </Button>
        </div>
        {convertedAmount && (
          <div>
            <h2>Converted amount is:</h2>
            <h3>{convertedAmount}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
