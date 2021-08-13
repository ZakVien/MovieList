import React, { useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ListIcon from "@material-ui/icons/List";
import MovieIcon from "@material-ui/icons/Movie";
import AppBar from "@material-ui/core/AppBar";
import { BrowserRouter, Link } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
import MainContentArea from "./components/MainContentArea";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleNavChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  return (
    <BrowserRouter>
      <LastLocationProvider>
        <QueryClientProvider client={queryClient}>
          <div>
            <MainContentArea />
            <AppBar
              position="fixed"
              component="footer"
              style={{ top: "auto", bottom: 0 }}
            >
              <BottomNavigation
                value={selectedTabIndex}
                onChange={handleNavChange}
                showLabels
              >
                <BottomNavigationAction
                  component={Link}
                  to="/lists"
                  label="Lists"
                  icon={<ListIcon />}
                />
                <BottomNavigationAction
                  component={Link}
                  to="/browse"
                  label="Browse"
                  icon={<MovieIcon />}
                />
              </BottomNavigation>
            </AppBar>
          </div>
        </QueryClientProvider>
      </LastLocationProvider>
    </BrowserRouter>
  );
}

export default App;
