import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import { companyInfoStore } from "stores";
import {
  decimalConverter,
  percentPriceChangeConverter,
  priceChangeConverter,
} from "utils/priceConverter";
import Tabs from "components/common/Tabs";
import Quote from "./components/Quote";
import Profile from "./components/Profile";
import HistoricalQuotes from "./components/HistoricalQuotes";

import getStyles from "./styles";

const tabs = [
  {
    tabId: "quote",
    label: "Quote",
    component: <Quote />,
  },
  {
    tabId: "profile",
    label: "Profile",
    component: <Profile />,
  },
  {
    tabId: "historical-quotes",
    label: "Historical Quotes",
    component: <HistoricalQuotes />,
  },
];

const CompanyDetailsPage = () => {
  const theme = useTheme();
  const classes = getStyles({ theme });
  const { companyTicker } = useParams();

  const {
    getQuote,
    isLoadingQuote,
    isLoadingRealTimePrice,
    quote: {
      name,
      symbol,
      is_market_open,
      timestamp,
      currency,
      exchange,
      close,
      change,
      percent_change,
    },
    getRealTimePrice,
    realTimePrice,
  } = companyInfoStore;

  useEffect(() => {
    getQuote({ symbol: companyTicker });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    is_market_open && getRealTimePrice({ symbol: companyTicker });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_market_open]);

  if (isLoadingQuote || isLoadingRealTimePrice) return <LinearProgress />;

  return (
    <Box>
      <Box sx={classes.companyNameInfo}>
        <Typography variant="h6" sx={classes.companyName}>
          {name}
        </Typography>
        <Typography variant="h6" sx={classes.companyTicker}>
          ({exchange}: {symbol})
        </Typography>
      </Box>
      <Typography sx={classes.priceCurrency}>Currency in {currency}</Typography>
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
