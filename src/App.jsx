import React from "react";
import CarFilterForm from "./components/AdvanceFilters";
import Header from "./components/Header";
import MandatoryFilters from "./components/MandatoryFilters";

function App() {
  return (
    <div>
      <Header />
      <MandatoryFilters />
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <CarFilterForm />
      </div> */}
    </div>
  );
}

export default App;
