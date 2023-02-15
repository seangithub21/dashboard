import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { toast } from "react-toastify";

import { currenciesExchangeStore } from "stores";
import { decimalConverter } from "utils/priceConverter";
import InfoContainer from "components/common/InfoContainer";
import Button from "components/common/Button";
import Input from "components/common/Input";
import FormAutocomplete from "components/common/FormAutocomplete";

const initialValues = { symbol: "", amount: "" };

const schema = Yup.object().shape({
  symbol: Yup.string().required("* You need to choose a currency pair"),
  amount: Yup.number()
    .typeError("* You have to type a number")
    .required("* You need to type an amount"),
});

const currencyBasesForex = ["USD", "EUR", "PLN", "UAH", "CNY", "VND"];

const currencyBasesCrypto = ["BTC", "ETH", "BNB"];

const CurrencyConverterPage = () => {
  const [currentType, setCurrentType] = useState("forex_pairs");
  const [currencyBase, setCurrencyBase] = useState("USD");
  const theme = useTheme();

  const {
    isLoadingCurrencies,
    getCurrency,
    currencies,
    convertCurrency,
    convertedCurrency: { symbol, rate, amount, timestamp },
    isLoadingConvertedCurrency,
  } = currenciesExchangeStore;

  useEffect(() => {
    getCurrency({ currencyBase });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentType === "forex_pairs") setCurrencyBase("USD");
    if (currentType === "cryptocurrencies") setCurrencyBase("BTC");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType]);

  const handleChangeCurrencyType = (event) => {
    setCurrentType(event.target.value);
    if (event.target.value === "forex_pairs") {
      getCurrency({ currencyType: event.target.value, currencyBase: "USD" });
    } else {
      getCurrency({ currencyType: "cryptocurrencies", currencyBase: "BTC" });
    }
  };

  const handleConvertCurrency = (data) => {
    if (!currencyBase) {
      toast.error("You have to select currency base");
      return;
    }
    convertCurrency(data);
  };

  if (isLoadingCurrencies) {
    return <LinearProgress />;
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={schema}
      onSubmit={handleConvertCurrency}
    >
      {({ errors, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <InfoContainer sx={{ width: "fit-content" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "2rem" }}>
                Currency Converter
              </Typography>
              <FormControl>
                <FormLabel>Currency Type</FormLabel>
                <RadioGroup
                  value={currentType}
                  onChange={handleChangeCurrencyType}
                >
                  <Box>
                    <FormControlLabel
                      value="forex_pairs"
                      control={<Radio />}
                      label="Forex Pairs"
                      disabled={isLoadingCurrencies}
                    />
                    <FormControlLabel
                      value="cryptocurrencies"
                      control={<Radio />}
                      label="Crypto"
                      disabled={isLoadingCurrencies}
                    />
                  </Box>
                </RadioGroup>
              </FormControl>
              <Divider />
              {isLoadingCurrencies ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {" "}
                  <CircularProgress />{" "}
                </Box>
              ) : (
                <Box
                  sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <Typography>Convert from: </Typography>
                  <Autocomplete
                    value={currencyBase}
                    onChange={(event, newValue) => {
                      setCurrencyBase(newValue);
                      if (newValue === null) {
                        return;
                      }
                      getCurrency({
                        currencyType: currentType,
                        currencyBase: newValue,
                      });
                    }}
                    sx={{ mt: "2rem" }}
                    options={
                      currentType === "forex_pairs"
                        ? currencyBasesForex
                        : currencyBasesCrypto
                    }
                    autoHighlight
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                      <Box {...props}>{option}</Box>
                    )}
                    fullWidth
                    renderInput={(params) => (
                      <Input
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                        helperText={
                          !currencyBase && "You have to select currency base"
                        }
                        error={!!!currencyBase}
                        size="small"
                      />
                    )}
                  />
                </Box>
              )}
              {isLoadingCurrencies ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Field name="symbol">
                  {(props) => (
                    <FormAutocomplete
                      {...props}
                      options={currencies}
                      disabled={isLoadingConvertedCurrency}
                      label="Choose Pair"
                    />
                  )}
                </Field>
              )}
              <Field name="amount">
                {({ meta: { error }, ...props }) => (
                  <Input
                    {...props}
                    disabled={isLoadingConvertedCurrency}
                    label="Amount to convert"
                    helperText={error}
                    error={!!error}
                  />
                )}
              </Field>
              <Button disabled={isLoadingConvertedCurrency} type="submit">
                Convert
              </Button>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {isLoadingConvertedCurrency ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.grey[600] }}
                    >
                      {timestamp &&
                        format(
                          new Date(Number(`${timestamp}000`)),
                          "iii dd LLL yyyy ppp"
                        )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.grey[600] }}
                    >
                      {rate && `Rate: ${decimalConverter(rate)}`}
                    </Typography>
                    <Typography sx={{ fontSize: "2rem", fontWeight: 700 }}>
                      {amount && `= ${decimalConverter(amount)}`}{" "}
                      {symbol && symbol.slice(4)}
                    </Typography>
                  </Box>
                )}
              </Box>
            </InfoContainer>
          </form>
        );
      }}
    </Formik>
  );
};

export default observer(CurrencyConverterPage);
