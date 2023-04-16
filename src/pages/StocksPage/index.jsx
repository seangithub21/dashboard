import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { LinearProgress, Link, useMediaQuery } from "@mui/material";

import { stocksStore } from "stores";
import Table from "components/common/Table";

const StocksPage = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const navigate = useNavigate();

  const { getStocks, stocks, isLoading } = stocksStore;

  const handleClickCompanyTicker = (data) => {
    navigate(`company-details/${data.symbol}`);
  };

  const mobileColumns = [
    {
      title: "Symbol",
      field: "symbol",
      render: (rowData) => (
        <Link
          underline="hover"
          onClick={() => handleClickCompanyTicker(rowData)}
          sx={{ cursor: "pointer", fontFamily: "UbuntuBold" }}
        >
          {rowData.symbol}
        </Link>
      ),
    },
    {
      title: "Name",
      field: "name",
      cellStyle: {
        maxWidth: "20rem",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
      headerStyle: {
        width: "20rem",
      },
    },
  ];

  const tabletColumns = [
    ...mobileColumns,
    { title: "Market", field: "mic_code" },
  ];

  const columns = [
    ...tabletColumns,
    { title: "Currency", field: "currency" },
    { title: "Exchange", field: "exchange" },
    { title: "Country", field: "country" },
    { title: "Type", field: "type" },
  ];

  useEffect(() => {
    getStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <LinearProgress />;

  return (
    <Table
      title={!isMobile ? "Stocks" : ""}
      columns={isMobile ? mobileColumns : isTablet ? tabletColumns : columns}
      data={stocks}
    />
  );
};

export default observer(StocksPage);
