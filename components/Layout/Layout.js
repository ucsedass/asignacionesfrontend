import React from "react";
import Nav from "./Nav";

const Layout = (props) => {
  return (
    <>
      <Nav />
      {props.children}
    </>
  );
};

export default Layout;
