import { useEffect } from "react";
import { LinearProgress, Link, useMediaQuery } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { cryptoStore } from "stores";
import Table from "components/common/Table";

const CryptoPage = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const { cryptoCurrencies, getCryptoCurrencies, isLoadingCryptoCurrencies } =
    cryptoStore;

  const handleClickCryptoSymbol = (data) => {
    const symbol = data.symbol.replace("/", "-");
    navigate(`crypto-details/${symbol}`);
  };

  const mobileColumns = [
    {
      title: "Symbol",
      field: "symbol",
      render: (rowData) => (
        <Link
          underline="hover"
          onClick={() => handleClickCryptoSymbol(rowData)}
          sx={{ cursor: "pointer", fontWeight: "700" }}
        >
          {rowData.symbol}
        </Link>
      ),
    },
    {
      title: "Available exchanges",
      field: "available_exchanges",
      cellStyle: {
        maxWidth: "20rem",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
      headerStyle: {
        width: "20rem",
      },
      render: (rowData) => {
        return rowData.available_exchanges.join(", ");
      },
    },
  ];

  const columns = [
    ...mobileColumns,
    { title: "Currency base", field: "currency_base" },
    { title: "Currency quote", field: "currency_quote" },
  ];

  useEffect(() => {
    getCryptoCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingCryptoCurrencies) return <LinearProgress />;

  return (
    <Table
      title={!isMobile ? "Crypto" : ""}
      columns={isMobile ? mobileColumns : columns}
      data={cryptoCurrencies}
    />
  );
};

export default observer(CryptoPage);
