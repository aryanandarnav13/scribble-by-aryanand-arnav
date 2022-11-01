import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getFromLocalStorage } from "src/utils/storage";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import websiteApi from "apis/websites";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import NewArticle from "components/Dashboard/Articles/NewArticle/Create";
import EditArticle from "components/Dashboard/Articles/NewArticle/Edit";
import Eui from "components/Dashboard/EUI";
import Settings from "components/Dashboard/Settings";

import PrivateRoute from "./components/Common/PrivateRoute";
import { Login } from "./components/Dashboard/EUI/Login";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);
  const [loading, setLoading] = useState(true);
  const [hasPassword, setHasPassword] = useState(true);
  const [siteName, setSiteName] = useState("");

  const fetchSiteDetails = async () => {
    try {
      setLoading(true);
      const response = await websiteApi.get();
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
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={Dashboard} path="/" />
        <Route exact component={NewArticle} path="/articles/create" />
        <Route exact component={EditArticle} path="/articles/:slug/edit" />
        <Route exact component={Settings} path="/settings" />
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
  );
};

export default App;
