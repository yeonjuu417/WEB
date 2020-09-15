import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Mypage } from "./pages/Mypage";

class App extends React.Component {
  state = {
    isLogin: false,
  };

  render() {
    const { isLogin } = this.state;
    return (
      <div>
        <Switch>
          <Route path="/login" render={() => <Login isLogin={isLogin} />} />
          <Route
            exact
            path="/signup"
            render={() => <Signup isLogin={isLogin} />}
          />
          <Route
            exact
            path="/mypage"
            render={() => <Mypage isLogin={isLogin} />}
          />
          <Route
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/mypage" />;
              }
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
