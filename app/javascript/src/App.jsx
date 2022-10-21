import React, { useEffect, useState } from "react";

import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import redirectionApi from "apis/redirections";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import NewArticle from "components/Dashboard/Articles/NewArticle/Create";
import EditArticle from "components/Dashboard/Articles/NewArticle/Edit";
import EUI from "components/Dashboard/EUI";
import Settings from "components/Dashboard/Settings";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [redirectionItems, setRedirectionItems] = useState([]);

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
    fetchRedirections();
    initializeLogger();
    setAuthHeaders(setLoading);
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
        <Route component={EUI} path="/preview" />
        <Route exact component={Dashboard} path="/" />
        <Route exact component={NewArticle} path="/articles/create" />
        <Route exact component={EditArticle} path="/articles/:slug/edit" />
        <Route exact component={Settings} path="/settings" />
      </Switch>
    </Router>
  );
};

export default App;
