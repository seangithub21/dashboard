import { toast } from "react-toastify";
import { action, makeAutoObservable, observable, runInAction } from "mobx";

import axios from "configs/axios";

class StocksStore {
  stocks = [];

  isLoading = false;

  constructor() {
    makeAutoObservable(this, {
      stocks: observable.ref,

      isLoading: observable.ref,

      getStocks: action,
    });
  }

  getStocks = (params) => {
    runInAction(() => {
      this.stocks = [];
      this.isLoading = true;
    });
    axios
      .get("stocks", {
        params: params
          ? params
          : {
              exchange: "NASDAQ",
              format: "json",
            },
      })
      .then(({ data: { data } }) => {
        toast.success("Stocks fetched successfully");
        runInAction(() => {
          this.stocks = data;
          this.isLoading = false;
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        runInAction(() => {
          this.isLoading = false;
        });
      });
  };
}

export default new StocksStore();
