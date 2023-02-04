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

// CEO: "Mr. Timothy D. Cook";
// address: "One Apple Park Way";
// city: "Cupertino";
// country: "US";
// description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. In addition, the company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. Further, it provides AppleCare support and cloud services store services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. Additionally, the company offers various services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was incorporated in 1977 and is headquartered in Cupertino, California.";
// employees: 164000;
// exchange: "NASDAQ";
// industry: "Consumer Electronics";
// mic_code: "XNGS";
// name: "Apple Inc";
// phone: "408 996 1010";
// sector: "Technology";
// state: "CA";
// symbol: "AAPL";
// type: "Common Stock";
// website: "https://www.apple.com";
// zip: "95014";
