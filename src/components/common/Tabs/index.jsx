import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tab as MuiTab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

const Tabs = ({ tabs }) => {
  const [tab, setTab] = useState(tabs[0].tabId);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeTab = (_, newValue) => {
    setTab(newValue);
    navigate(`#${newValue}`);
  };

  useEffect(() => {
    const tab = location.hash ? location.hash.slice(1) : tabs[0].tabId;
    setTab(tab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChangeTab}>
          {tabs.map((tab) => (
            <MuiTab
              disableRipple
              label={tab.label}
              value={tab.tabId}
              key={tab.tabId}
            />
          ))}
        </TabList>
      </Box>
      {tabs.map((tab) => (
        <TabPanel key={tab.tabId} value={tab.tabId}>
          {tab.component}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default Tabs;
