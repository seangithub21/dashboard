import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";

import axios from "configs/axios";

class CurrenciesExchangeStore {
  currencies = [];
  convertedCurrency = "";

  isLoadingCurrencies = false;
  isLoadingConvertedCurrency = false;

  constructor() {
    makeAutoObservable(this, {
      currencies: observable.ref,
      convertedCurrency: observable.ref,

      isLoadingCurrencies: observable.ref,
      isLoadingConvertedCurrency: observable.ref,

      getCurrency: action,
      convertCurrency: action,
    });
  }

  getCurrency = ({ currencyType = "forex_pairs", currencyBase } = {}) => {
    runInAction(() => {
      this.isLoadingCurrencies = true;
      this.convertedCurrency = "";
    });
    axios
      .get(`${currencyType}`, {
        params: {
          currency_base:
            (currencyBase && currencyBase) ||
            (currencyType === "forex_pairs" ? "EUR" : "BTC"),
          format: "json",
        },
      })
      .then(({ data: { data } }) => {
        toast.success("Currency fetched successfully");
        runInAction(() => {
          this.currencies = data;
          this.isLoadingCurrencies = false;
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        runInAction(() => {
          this.isLoadingCurrencies = false;
        });
      });
  };

  convertCurrency = ({ symbol, amount }) => {
    runInAction(() => {
      this.isLoadingConvertedCurrency = true;
    });
    axios
      .get("currency_conversion", {
        params: { symbol, amount },
      })
      .then(({ data }) => {
        toast.success("Currency converted successfully");
        runInAction(() => {
          this.convertedCurrency = data;
          this.isLoadingConvertedCurrency = false;
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        runInAction(() => {
          this.isLoadingConvertedCurrency = false;
        });
      });
  };
}

export default new CurrenciesExchangeStore();
