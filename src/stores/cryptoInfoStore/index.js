import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";

import axios from "configs/axios";
import { decimalConverter } from "utils/priceConverter";

class CryptoInfoStore {
  quote = {};
  realTimePrice = 0;
  historicalQuotes = [];

  isLoadingQuote = false;
  isLoadingRealTimePrice = false;
  isLoadingHistoricalQuotes = false;

  constructor() {
    makeAutoObservable(this, {
      quote: observable.ref,
      realTimePrice: observable.ref,
      historicalQuotes: observable.ref,

      isLoadingQuote: observable.ref,
      isLoadingRealTimePrice: observable.ref,
      isLoadingHistoricalQuotes: observable.ref,

      getQuote: action,
      getRealTimePrice: action,
      getHistoricalQuotes: action,
    });
  }

  getQuote = (params) => {
    runInAction(() => {
      this.isLoadingQuote = true;
    });
    axios
      .get("quote", {
        params: {
          symbol: "ETH/BTC",
          interval: "1day",
          outputsize: "30",
          format: "json",
          ...params,
        },
      })
      .then(({ data }) => {
        toast.success("Quote fetched successfully");
        runInAction(() => {
          this.quote = data;
          this.isLoadingQuote = false;
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        runInAction(() => {
          this.isLoadingQuote = false;
        });
      });
  };

  getRealTimePrice = (params) => {
    runInAction(() => {
      this.realTimePrice = 0;
      this.isLoadingRealTimePrice = true;
    });
    axios
      .get("price", {
        params: {
          symbol: "ETH/BTC",
          interval: "1day",
          outputsize: "30",
          format: "json",
          ...params,
        },
      })
      .then(({ data: { price } }) => {
        toast.success("Real-time price fetched successfully");
        runInAction(() => {
          this.realTimePrice = decimalConverter(price);
          this.isLoadingRealTimePrice = false;
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        runInAction(() => {
          this.isLoadingRealTimePrice = false;
        });
      });
  };

  getHistoricalQuotes = (params) => {
    runInAction(() => {
      this.historicalQuotes = [];
      this.isLoadingHistoricalQuotes = true;
    });
    axios
      .get("time_series", {
        params: {
          symbol: "ETH/BTC",
          interval: "1day",
          outputsize: "30",
          format: "json",
          ...params,
        },
      })
      .then(({ data: { values } }) => {
        toast.success("Historical quotes fetched successfully");
        runInAction(() => {
          this.historicalQuotes = values;
          this.isLoadingHistoricalQuotes = false;
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        runInAction(() => {
          this.isLoadingHistoricalQuotes = false;
        });
      });
  };
}

export default new CryptoInfoStore();
