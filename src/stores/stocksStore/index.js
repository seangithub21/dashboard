import axios from "configs/axios";
import { action, makeAutoObservable, observable, runInAction } from "mobx";

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
        runInAction(() => {
          this.stocks = data;
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

export default new StocksStore();
