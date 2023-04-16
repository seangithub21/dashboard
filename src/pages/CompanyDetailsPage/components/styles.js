export const getQuoteStyles = () => {
  return {
    container: {
      maxWidth: "25rem",
    },
    info: {
      display: "flex",
      justifyContent: "space-between",
    },
    quoteValue: {
      fontWeight: 700,
    },
  };
};

export const getProfileStyles = ({ theme }) => {
  return {
    mainInfoContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "5rem",
      width: "fit-content",
      mb: "2rem",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "15rem",
      height: "15rem",
    },
    description: {
      fontWeight: 700,
    },
  };
};
