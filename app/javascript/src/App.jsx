import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { getFromLocalStorage } from "src/utils/storage";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import redirectionApi from "apis/redirections";
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
  const [redirectionItems, setRedirectionItems] = useState([]);

  const fetchSiteDetails = async () => {
    try {
      setLoading(true);
      const response = await websiteApi.show();
      setSiteName(response.data.website.name);
      if (!response.data.website.has_password) {
        setHasPassword(false);
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRedirections = async () => {
    try {
      const {
        data: { redirections },
      } = await redirectionApi.list();

      setRedirectionItems(redirections);
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    registerIntercepts();
    fetchRedirections();
    initializeLogger();
    setAuthHeaders(setLoading);
    fetchSiteDetails();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <Switch>
        {redirectionItems.map((item, idx) => (
          <Route
            exact
            key={idx}
            path={item.frompath}
            render={() => <Redirect to={item.topath} />}
          />
        ))}
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
