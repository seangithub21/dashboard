import axios from "configs/axios";
import { action, makeAutoObservable, observable, runInAction } from "mobx";

import { decimalConverter } from "utils/priceConverter";

class CompanyInfoStore {
  quote = {};
  realTimePrice = 0;

  isLoading = false;

  constructor() {
    makeAutoObservable(this, {
      quote: observable.ref,
      realTimePrice: observable.ref,

      isLoading: observable.ref,

      getQuote: action,
      getRealTimePrice: action,
    });
  }

  getQuote = (params) => {
    runInAction(() => {
      this.quote = {};
      this.isLoading = true;
    });
    axios
      .get("quote", {
        params: {
          symbol: "AMZN",
          interval: "1day",
          outputsize: "30",
          format: "json",
          ...params,
        },
      })
      .then(({ data }) => {
        runInAction(() => {
          this.quote = data;
          this.isLoading = false;
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.isLoading = false;
        });
        return error;
      });
  };

  getRealTimePrice = (params) => {
    runInAction(() => {
      this.realTimePrice = 0;
      this.isLoading = true;
    });
    axios
      .get("price", {
        params: {
          symbol: "AMZN",
          interval: "1day",
          outputsize: "30",
          format: "json",
          ...params,
        },
      })
      .then(({ data: { price } }) => {
        runInAction(() => {
          this.realTimePrice = decimalConverter(price);
          this.isLoading = false;
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.isLoading = false;
        });
        return error;
      });
  };
}

export default new CompanyInfoStore();
