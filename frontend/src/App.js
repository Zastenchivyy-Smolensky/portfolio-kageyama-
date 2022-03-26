import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "./lib/api/auth";

import SignUp from "./components/auth/SignUp";
import CommonLayout from "./components/layouts/CommonLayout";
import Home from "./components/pages/Home";
import SignIn from "./components/auth/SignIn";
import ProductList from "./components/todos/ProductList";
import Edit from "./components/todos/Edit";
import Users from "./components/pages/Users";

export const AuthContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="signin" />;
      }
    } else {
      return <></>;
    }
  };
  return (
    <Router>
      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
        }}
      >
        <Switch>
          <CommonLayout>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />

            <Private>
              <Route exact path="/list" component={ProductList} />
              <Route exact path="/users" component={Users} />
              <Route path="/edit/:id" component={Edit} />
              <Route exact path="/" component={Home} />
            </Private>
          </CommonLayout>
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
