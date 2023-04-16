import { Box, Divider, LinearProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

import { cryptoInfoStore } from "stores";
import {
  decimalConverter,
  percentPriceChangeConverter,
  priceChangeConverter,
} from "utils/priceConverter";
import theme from "configs/theme";
import InfoContainer from "components/common/InfoContainer";

import { getQuoteStyles } from "./styles";

const Quote = () => {
  const classes = getQuoteStyles();

  const {
    isLoadingQuote,
    quote: {
      is_market_open,
      open,
      high,
      low,
      close,
      previous_close,
      change,
      percent_change,
      fifty_two_week,
      rolling_1d_change,
      rolling_7d_change,
    },
  } = cryptoInfoStore;

  if (isLoadingQuote) return <LinearProgress />;

  return (
    <InfoContainer sx={classes.container}>
      {!is_market_open && (
        <>
          <Box sx={classes.info}>
            <Typography>Close:</Typography>
            <Typography sx={classes.quoteValue}>
              {decimalConverter(close)}
            </Typography>
          </Box>
          <Divider />
        </>
      )}
      <Box sx={classes.info}>
        <Typography>Open:</Typography>
        <Typography sx={classes.quoteValue}>
          {decimalConverter(open)}
        </Typography>
      </Box>
      <Divider />
      <Box sx={classes.info}>
        <Typography>High:</Typography>
        <Typography sx={classes.quoteValue}>
          {decimalConverter(high)}
        </Typography>
      </Box>
      <Divider />
      <Box sx={classes.info}>
        <Typography>Low:</Typography>
        <Typography sx={classes.quoteValue}>{decimalConverter(low)}</Typography>
      </Box>
      <Divider />
      <Box sx={classes.info}>
        <Typography>Previous Close:</Typography>
        <Typography sx={classes.quoteValue}>
          {decimalConverter(previous_close)}
        </Typography>
      </Box>
      <Divider />
      <Box sx={classes.info}>
        <Typography>Change:</Typography>
        <Typography
          sx={{
            color:
              change && change.includes("-")
                ? theme.palette.priceFall
                : theme.palette.priceRise,
            fontWeight: 700,
          }}
        >
          {priceChangeConverter(change)} (
          {percentPriceChangeConverter(percent_change)})
        </Typography>
      </Box>
      <Divider />
      <Box sx={classes.info}>
        <Typography>52 Week Range:</Typography>
        <Typography sx={classes.quoteValue}>
          {decimalConverter(fifty_two_week?.low)} -{" "}
          {decimalConverter(fifty_two_week?.high)}
        </Typography>
      </Box>
      <Divider />
      <Box sx={classes.info}>
        <Typography>Rolling 1-day change:</Typography>
        <Typography
          sx={{
            color:
              change && change.includes("-")
                ? theme.palette.priceFall
                : rolling_1d_change === undefined
                ? ""
                : theme.palette.priceRise,
            fontWeight: 700,
          }}
        >
          {priceChangeConverter(rolling_1d_change)}
        </Typography>
      </Box>
      <Divider />
      <Box sx={classes.info}>
        <Typography>Rolling 7-day change:</Typography>
        <Typography
          sx={{
            color:
              change && change.includes("-")
                ? theme.palette.priceFall
                : theme.palette.priceRise,
            fontWeight: 700,
          }}
        >
          {priceChangeConverter(rolling_7d_change)}
        </Typography>
      </Box>
    </InfoContainer>
  );
};

export default observer(Quote);
