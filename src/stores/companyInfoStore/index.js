import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";

import axios from "configs/axios";
import { decimalConverter } from "utils/priceConverter";

class CompanyInfoStore {
  quote = {};
  realTimePrice = 0;
  profile = {};
  logo = "";
  historicalQuotes = [];

  isLoadingQuote = false;
  isLoadingRealTimePrice = false;
  isLoadingProfile = false;
  isLoadingLogo = false;
  isLoadingHistoricalQuotes = false;

  constructor() {
    makeAutoObservable(this, {
      quote: observable.ref,
      realTimePrice: observable.ref,
      profile: observable.ref,
      logo: observable.ref,
      historicalQuotes: observable.ref,

      isLoadingQuote: observable.ref,
      isLoadingRealTimePrice: observable.ref,
      isLoadingProfile: observable.ref,
      isLoadingLogo: observable.ref,
      isLoadingHistoricalQuotes: observable.ref,

      getQuote: action,
      getRealTimePrice: action,
      getProfile: action,
      getLogo: action,
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
          symbol: "AMZN",
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
          symbol: "AMZN",
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

  getProfile = (symbol) => {
    runInAction(() => {
      this.profile = {};
      this.isLoadingProfile = true;
    });
    axios
      .get("profile", {
        params: {
          symbol: symbol,
        },
      })
      .then(({ data }) => {
        if (data.code) {
          toast.error(data.message);
        } else {
          toast.success("Profile fetched successfully");
        }
        runInAction(() => {
          this.profile = data;
          this.isLoadingProfile = false;
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        runInAction(() => {
          this.isLoadingProfile = false;
        });
      });
  };

  getLogo = (symbol) => {
    runInAction(() => {
      this.logo = "";
      this.isLoadingLogo = true;
    });
    axios
      .get("logo", {
        params: {
          symbol: symbol,
        },
      })
      .then(({ data }) => {
        toast.success("Logo fetched successfully");
        runInAction(() => {
          this.logo = data.url;
          this.isLoadingLogo = false;
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        runInAction(() => {
          this.isLoadingLogo = false;
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
          symbol: "AMZN",
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

export default new CompanyInfoStore();
