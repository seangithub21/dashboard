import { Box, Divider, LinearProgress, Typography } from "@mui/material";

import { companyInfoStore } from "stores";
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
    isLoading,
    quote: {
      is_market_open,
      open,
      high,
      low,
      close,
      volume,
      previous_close,
      change,
      percent_change,
      fifty_two_week,
    },
  } = companyInfoStore;

  if (isLoading) return <LinearProgress />;

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
        <Typography>Volume:</Typography>
        <Typography sx={classes.quoteValue}>
          {Intl.NumberFormat("en", { notation: "compact" }).format(volume)}
        </Typography>
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
    </InfoContainer>
  );
};

export default Quote;
