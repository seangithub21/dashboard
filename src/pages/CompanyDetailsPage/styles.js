const getStyles = ({ theme }) => {
  return {
    companyNameInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    companyName: {
      fontWeight: "700",
    },
    companyTicker: {
      fontSize: "1.2rem",
    },
    priceCurrency: {
      fontSize: "1.2rem",
      color: theme.palette.grey[600],
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
