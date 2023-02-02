import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import { companyInfoStore } from "stores";
import {
  decimalConverter,
  percentPriceChangeConverter,
  priceChangeConverter,
} from "utils/priceConverter";
import theme from "configs/theme";
import Tabs from "components/common/Tabs";

import getStyles from "./styles";

//  NOTE: Mock data
const Comp1 = () => {
  useEffect(() => {
    console.log("Tab 1 here");
  }, []);

  return <Box>Tab1</Box>;
};

//  NOTE: Mock data
const Comp2 = () => {
  useEffect(() => {
    console.log("Tab 2 here");
  }, []);

  return <Box>Tab2</Box>;
};

//  NOTE: Mock data
const tabs = [
  {
    tabId: "companyInfo",
    label: "Company info",
    component: <Comp1 />,
  },
  {
    tabId: "companyInfo2",
    label: "Company info2",
    component: <Comp2 />,
  },
];

const CompanyDetailsPage = () => {
  const classes = getStyles();
  const { companyTicker } = useParams();

  const {
    getQuote,
    isLoading,
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

  if (isLoading) return <LinearProgress />;

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
            lineHeight: "1",
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

//  NOTE: Quote response example
// {
//   "symbol": "AMZN",
//   "name": "Amazon.com Inc",
//   "exchange": "NASDAQ",
//   "mic_code": "XNGS",
//   "currency": "USD",
//   "datetime": "2023-01-27",
//   "timestamp": 1674853199,
//   "open": "99.53000",
//   "high": "103.49000",
//   "low": "99.53000",
//   "close": "102.24000",
//   "volume": "87678100",
//   "previous_close": "99.22000",
//   "change": "3.02000",
//   "percent_change": "3.04374",
//   "average_volume": "76794270",
//   "is_market_open": false,
//   "fifty_two_week": {
//     "low": "81.43000",
//     "high": "170.83150",
//     "low_change": "20.81000",
//     "high_change": "-68.59150",
//     "low_change_percent": "25.55569",
//     "high_change_percent": "-40.15155",
//     "range": "81.430000 - 170.831497"
//   }
// }
