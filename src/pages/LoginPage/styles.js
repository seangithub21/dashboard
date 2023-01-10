const getStyles = () => {
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
      gap: "2rem",
    },
  };
};

export default getStyles;
