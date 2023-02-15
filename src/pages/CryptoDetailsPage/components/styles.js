export const getQuoteStyles = () => {
  return {
    container: {
      maxWidth: "40rem",
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
    description: {
      fontWeight: 700,
    },
  };
};
