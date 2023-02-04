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

export const getProfileStyles = () => {
  return {
    mainInfoContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "5rem",
      width: "fit-content",
      mb: "2rem",
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
