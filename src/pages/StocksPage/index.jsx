import { LinearProgress, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { stocksStore } from "stores";
import Table from "components/common/Table";

const StocksPage = () => {
  const navigate = useNavigate();

  const { getStocks, stocks, isLoading } = stocksStore;

  const handleClickCompanyTicker = (data) => {
    navigate(`company-details/${data.symbol}`);
  };

  const columns = [
    {
      title: "Symbol",
      field: "symbol",
      render: (rowData) => (
        <Link
          underline="hover"
          onClick={() => handleClickCompanyTicker(rowData)}
          sx={{ cursor: "pointer", fontWeight: "700" }}
        >
          {rowData.symbol}
        </Link>
      ),
    },
    {
      title: "Name",
      field: "name",
      cellStyle: {
        width: "20rem",
      },
      headerStyle: {
        width: "20rem",
      },
    },
    { title: "Currency", field: "currency" },
    { title: "Exchange", field: "exchange" },
    { title: "Market", field: "mic_code" },
    { title: "Country", field: "country" },
    { title: "Type", field: "type" },
  ];

  useEffect(() => {
    getStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <LinearProgress />;

  return <Table title="Stocks" columns={columns} data={stocks} />;
};

export default observer(StocksPage);
