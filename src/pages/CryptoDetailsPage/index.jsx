import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import { cryptoInfoStore } from "stores";
import {
  decimalConverter,
  percentPriceChangeConverter,
  priceChangeConverter,
} from "utils/priceConverter";
import theme from "configs/theme";
import Tabs from "components/common/Tabs";
import Quote from "./components/Quote";
import HistoricalQuotes from "./components/HistoricalQuotes";

import getStyles from "./styles";

const tabs = [
  {
    tabId: "quote",
    label: "Quote",
    component: <Quote />,
  },
  {
    tabId: "historical-quotes",
    label: "Historical Quotes",
    component: <HistoricalQuotes />,
  },
];

const CompanyDetailsPage = () => {
  const classes = getStyles();
  const { cryptoSymbol } = useParams();

  const {
    getQuote,
    isLoadingQuote,
    isLoadingRealTimePrice,
    quote: {
      name,
      symbol,
      is_market_open,
      timestamp,
      exchange,
      close,
      change,
      percent_change,
    },
    getRealTimePrice,
    realTimePrice,
  } = cryptoInfoStore;

  useEffect(() => {
    const symbol = cryptoSymbol.replace("-", "/");
    getQuote({ symbol });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const symbol = cryptoSymbol.replace("-", "/");
    is_market_open && getRealTimePrice({ symbol });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_market_open]);

  if (isLoadingQuote || isLoadingRealTimePrice) return <LinearProgress />;

  return (
    <Box>
      <Box sx={classes.cryptoNameInfo}>
        <Typography variant="h6" sx={classes.cryptoName}>
          {name}
        </Typography>
        <Typography variant="h6" sx={classes.cryptoSymbol}>
          ({exchange}: {symbol})
        </Typography>
      </Box>
      <Box sx={classes.currentPriceContainer}>
        <Typography sx={classes.currentPrice}>
          {is_market_open ? realTimePrice : decimalConverter(close)}
        </Typography>
        <Typography
          sx={{
            color:
              change && change.includes("-")
                ? theme.palette.priceFall
                : theme.palette.priceRise,
            lineHeight: "1.2",
            fontSize: "2rem",
            fontWeight: 600,
          }}
        >
          {priceChangeConverter(change)} (
          {percentPriceChangeConverter(percent_change)})
        </Typography>
      </Box>
      <Typography>
        Last Updated:{" "}
        {timestamp &&
          format(new Date(Number(`${timestamp}000`)), "iii dd LLL yyyy ppp")}
      </Typography>
      {is_market_open ? (
        <Typography sx={classes.marketOpen}>Market open</Typography>
      ) : (
        <Typography sx={classes.marketClose}>Market closed</Typography>
      )}
      <Tabs tabs={tabs} />
    </Box>
  );
};

export default observer(CompanyDetailsPage);
