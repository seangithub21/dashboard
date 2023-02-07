import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { LinearProgress, Typography } from "@mui/material";
import { format } from "date-fns";

import { companyInfoStore } from "stores";
import { decimalConverter } from "utils/priceConverter";
import { volumeConverter } from "utils/volumeConverter";
import Table from "components/common/Table";

const HistoricalQuotes = () => {
  const { companyTicker } = useParams();

  const { getHistoricalQuotes, historicalQuotes, isLoadingHistoricalQuotes } =
    companyInfoStore;

  const columns = [
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
      title: "Close",
      field: "close",
      render: (rowData) => {
        return <Typography>{decimalConverter(rowData.close)}</Typography>;
      },
    },
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
    {
      title: "Open",
      field: "open",
      render: (rowData) => {
        return <Typography>{decimalConverter(rowData.open)}</Typography>;
      },
    },
    {
      title: "Volume",
      field: "volume",
      render: (rowData) => {
        return <Typography>{volumeConverter(rowData.volume)}</Typography>;
      },
    },
  ];

  useEffect(() => {
    getHistoricalQuotes({ symbol: companyTicker });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingHistoricalQuotes) return <LinearProgress />;

  return (
    <Table
      title="Historical quotes"
      data={historicalQuotes}
      columns={columns}
      options={{ search: false }}
    />
  );
};

export default observer(HistoricalQuotes);
