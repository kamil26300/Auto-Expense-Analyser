import React, { Children } from "react";
import Header from "../components/Header";

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
