import React, { Children } from "react";
import Header from "../components/Header";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="h-header"></div>
      {children}
    </div>
  );
}

export default Layout;
