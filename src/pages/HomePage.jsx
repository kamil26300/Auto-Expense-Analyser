import React, { useState } from "react";
import AdvanceFilters from "../components/AdvanceFilters";
import Header from "../components/Header";
import MandatoryFilters from "../components/MandatoryFilters";
import Layout from "../components/Layout";

function HomePage() {
  const [checkedAdvFilters, setCheckedAdvFilters] = useState(false);

  return (
    <Layout>
      <MandatoryFilters
        checkedAdvFilters={checkedAdvFilters}
        setCheckedAdvFilters={setCheckedAdvFilters}
      />
      <div className="flex items-center justify-center bg-dark-blue m-container rounded-small">
        {checkedAdvFilters && <AdvanceFilters />}
      </div>
    </Layout>
  );
}

export default HomePage;
