import React, { useEffect } from "react";
import { Box, LinearProgress, Link, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import { companyInfoStore } from "stores";
import InfoContainer from "components/common/InfoContainer";

import { getProfileStyles } from "./styles";

const Profile = () => {
  const classes = getProfileStyles();
  const { companyTicker } = useParams();

  const {
    getProfile,
    getLogo,
    logo,
    isLoadingProfile,
    isLoadingLogo,
    profile: {
      name,
      address,
      city,
      state,
      zip,
      country,
      phone,
      website,
      employees,
      CEO,
      industry,
      description,
    },
  } = companyInfoStore;

  useEffect(() => {
    getProfile(companyTicker);
    getLogo(companyTicker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingProfile || isLoadingLogo) return <LinearProgress />;

  return (
    <>
      <InfoContainer sx={classes.mainInfoContainer}>
        <Box sx={classes.logoContainer}>
          <img src={logo} alt="logo" />
        </Box>
        {name && (
          <Box>
            <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
            <Typography>{address}</Typography>
            <Typography>
              {city}, {state} {zip}
            </Typography>
            <Typography>{country}</Typography>
            <Typography>{phone}</Typography>
            <Link href={website} target="_blank">
              {website}
            </Link>
          </Box>
        )}
        {name ? (
          <Box>
            <Typography>
              CEO: <span style={{ fontWeight: 700 }}>{CEO}</span>
            </Typography>
            <Typography>
              Industry: <span style={{ fontWeight: 700 }}>{industry}</span>
            </Typography>
            <Typography>
              Employees: <span style={{ fontWeight: 700 }}>{employees}</span>
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ fontWeight: 600, fontSize: "1.6rem" }}>
            No data
          </Typography>
        )}
      </InfoContainer>
      <InfoContainer>
        <Typography variant="h6" sx={classes.description}>
          Description
        </Typography>
        {description ? (
          <Typography>{description}</Typography>
        ) : (
          <Typography sx={{ fontWeight: 600, fontSize: "1.6rem" }}>
            No data
          </Typography>
        )}
      </InfoContainer>
    </>
  );
};

export default observer(Profile);
