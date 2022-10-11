import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
import NewArticle from "components/Dashboard/Articles/NewArticle/Create";
import EditArticle from "components/Dashboard/Articles/NewArticle/Edit";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <Switch>
        <Route exact component={Dashboard} path="/" />
        <Route exact component={NewArticle} path="/articles/create" />
        <Route exact component={EditArticle} path="/articles/:slug/edit" />
      </Switch>
    </Router>
  );
};

export default App;
