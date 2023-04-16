import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { LinearProgress, Typography, useMediaQuery } from "@mui/material";
import { format } from "date-fns";

import { cryptoInfoStore } from "stores";
import { decimalConverter } from "utils/priceConverter";
import Table from "components/common/Table";

const HistoricalQuotes = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { cryptoSymbol } = useParams();

  const { getHistoricalQuotes, historicalQuotes, isLoadingHistoricalQuotes } =
    cryptoInfoStore;

  const mobileColumns = [
    {
      title: "Date",
      field: "datetime",
      render: (rowData) => {
        return (
          <Typography>
            {format(new Date(rowData.datetime), "dd LLL yyyy")}
          </Typography>
        );
      },
    },
    {
      title: "Open",
      field: "open",
      render: (rowData) => {
        return <Typography>{decimalConverter(rowData.open)}</Typography>;
      },
    },
    {
      title: "Close",
      field: "close",
      render: (rowData) => {
        return <Typography>{decimalConverter(rowData.close)}</Typography>;
      },
    },
  ];

  const columns = [
    ...mobileColumns,
    {
      title: "High",
      field: "high",
      render: (rowData) => {
        return <Typography>{decimalConverter(rowData.high)}</Typography>;
      },
    },
    {
      title: "Low",
      field: "low",
      render: (rowData) => {
        return <Typography>{decimalConverter(rowData.low)}</Typography>;
      },
    },
  ];

  useEffect(() => {
    const symbol = cryptoSymbol.replace("-", "/");
    getHistoricalQuotes({ symbol });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingHistoricalQuotes) return <LinearProgress />;

  return (
    <Table
      title="Historical quotes"
      data={historicalQuotes}
      columns={isMobile ? mobileColumns : columns}
      options={{ search: false }}
    />
  );
};

export default observer(HistoricalQuotes);
