import { LinearProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { stocksStore } from "stores";
import Table from "components/common/Table";

const StockPage = () => {
  const { getStocks, stocks, isLoading } = stocksStore;

  const columns = [
    { title: "Name", field: "name" },
    { title: "Symbol", field: "symbol" },
  ];

  useEffect(() => {
    getStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <LinearProgress />;

  return <Table columns={columns} data={stocks} />;
};

export default observer(StockPage);
