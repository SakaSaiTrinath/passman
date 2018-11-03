import React from "react";
import PropTypes from "prop-types";

import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import AllPage from "./components/pages/AllPage";
import AddNewPage from "./components/pages/AddNewPage";

import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";

const App = ({ location }) => {
  return (
    <div>
      <GuestRoute location={location} path="/" exact component={LoginPage} />
      <UserRoute location={location} path="/home" exact component={HomePage} />
      <UserRoute location={location} path="/all" exact component={AllPage} />
      <UserRoute
        location={location}
        path="/addnew"
        exact
        component={AddNewPage}
      />
    </div>
  );
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
