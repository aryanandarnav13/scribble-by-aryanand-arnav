import React, { useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageLoader } from "neetoui";
import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "src/utils/storage";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import siteApi from "apis/sites";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import Actions from "components/Dashboard/Articles/Actions/Create";
import EditArticle from "components/Dashboard/Articles/Actions/Edit";
import Eui from "components/Dashboard/EUI";
import Settings from "components/Dashboard/Settings";
import "lib/dayjs";

import PrivateRoute from "./components/Common/PrivateRoute";
import Analytics from "./components/Dashboard/Analytics";
import { Login } from "./components/Dashboard/EUI/Login";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [hasPassword, setHasPassword] = useState(true);
  const [siteName, setSiteName] = useState("");

  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  const queryClient = new QueryClient();

  const fetchSiteDetails = async () => {
    try {
      setLoading(true);
      const response = await siteApi.list();
      setSiteName(response.data.name);
      setHasPassword(response.data.password_enabled);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAuthHeaders(setLoading);
    registerIntercepts();
    initializeLogger();
    fetchSiteDetails();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact component={Dashboard} path="/" />
          <Route exact component={Actions} path="/articles/create" />
          <Route exact component={EditArticle} path="/articles/:id/edit" />
          <Route exact component={Settings} path="/settings" />
          <Route exact component={Analytics} path="/analytics" />
          <Route
            exact
            component={() => <Login siteName={siteName} />}
            path="/preview/login"
          />
          <PrivateRoute
            Component={() => <Eui siteName={siteName} />}
            condition={isLoggedIn || !hasPassword}
            path="/preview"
            redirectRoute="/preview/login"
          />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
