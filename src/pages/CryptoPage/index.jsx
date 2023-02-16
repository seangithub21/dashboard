import { useEffect } from "react";
import { LinearProgress, Link } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import { cryptoStore } from "stores";
import Table from "components/common/Table";

const CryptoPage = () => {
  const navigate = useNavigate();

  const { cryptoCurrencies, getCryptoCurrencies, isLoadingCryptoCurrencies } =
    cryptoStore;

  const handleClickCryptoSymbol = (data) => {
    const symbol = data.symbol.replace("/", "-");
    navigate(`crypto-details/${symbol}`);
  };

  const columns = [
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
      render: (rowData) => {
        return rowData.available_exchanges.join(", ");
      },
    },
    { title: "Currency base", field: "currency_base" },
    { title: "Currency quote", field: "currency_quote" },
  ];

  useEffect(() => {
    getCryptoCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingCryptoCurrencies) return <LinearProgress />;

  return <Table title="Crypto" columns={columns} data={cryptoCurrencies} />;
};

export default observer(CryptoPage);
