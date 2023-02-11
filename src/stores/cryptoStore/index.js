import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";

import axios from "configs/axios";

class CryptoStore {
  cryptoCurrencies = [];

  isLoadingCryptoCurrencies = false;

  constructor() {
    makeAutoObservable(this, {
      cryptoCurrencies: observable.ref,

      isLoadingCryptoCurrencies: observable.ref,

      getCryptoCurrencies: action,
    });
  }

  getCryptoCurrencies = (params) => {
    runInAction(() => {
      this.isLoadingCryptoCurrencies = true;
    });
    axios
      .get("cryptocurrencies", {
        params: params
          ? params
          : {
              currency_base: "BTC",
              format: "json",
              ...params,
            },
      })
      .then(({ data: { data } }) => {
        toast.success("Cryptocurrencies fetched successfully");
        runInAction(() => {
          this.cryptoCurrencies = data;
          this.isLoadingCryptoCurrencies = false;
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        runInAction(() => {
          this.isLoadingCryptoCurrencies = false;
        });
      });
  };
}

export default new CryptoStore();
