import React from "react";

import ServiceSlider from "./ServiceSlider";

const Services = () => {
  return (
    <section className="bg-services bg-cover bg-no-repeat bg-center py-8">
      <div className="container mx-auto ">
        <h2 className="h2 mb-12">Our Services</h2>
        <ServiceSlider />
      </div>
    </section>
  );
};

export default Services;
