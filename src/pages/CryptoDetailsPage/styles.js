import theme from "configs/theme";

const getStyles = () => {
  return {
    cryptoNameInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    cryptoName: {
      fontWeight: "700",
    },
    cryptoSymbol: {
      fontSize: "1.2rem",
    },
    currentPriceContainer: {
      display: "flex",
      alignItems: "flex-end",
      gap: "1rem",
      mt: ".5rem",
      mb: ".5rem",
    },
    currentPrice: {
      fontSize: "4rem",
      fontWeight: 700,
      lineHeight: "1",
    },
    marketOpen: {
      color: theme.palette.marketOpen,
      fontWeight: 600,
    },
    marketClose: {
      color: theme.palette.marketClosed,
      fontWeight: 600,
    },
  };
};

export default getStyles;
