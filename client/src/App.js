import React from "react";
import "./App.css";

import Navbar from "./component/navbar/navbar";
import Body from "./component/body/body";

const App = () => {
  const [user, setUser] = React.useState(null);

  const BodyFunc = () => {
    if (user != null) return <Body user={user} setUser={setUser} />;
    else return <div />;
  };

  return (
    <div className="app">
      <Navbar setUserRecord={setUser} />
      <BodyFunc />
    </div>
  );
};

export default App;
