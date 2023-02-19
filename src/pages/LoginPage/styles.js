const getStyles = ({ theme }) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage:
        "linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))",
    },
    formContainer: {
      borderRadius: ".8rem",
      p: "2rem",
      backgroundColor: "#fff",
      boxShadow: "rgba(0, 0, 0, 0.1) 0rem .4rem 1.2rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      textAlign: "center",
    },
    logo: {
      fontWeight: "700",
      color: theme.palette.primary.main,
    },
    createdBy: {
      fontSize: "1.3rem",
      fontFamily: `Kaushan Script, ${theme.typography.fontFamily}`,
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[700]
          : theme.palette.grey[400],
    },
    inputsContainer: {
      display: "flex",
      flexDirection: "column",
      mt: "2rem",
    },
  };
};

export default getStyles;
