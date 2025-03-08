import React from 'react';

export default function Facilitator() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Outreach</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <img alt="Image 1" className="gal-img" width="400" src="https://vlead.vlabs.ac.in/astro/1.be2df230_1yU5Jg.jpg" loading="lazy" decoding="async" />
        <img alt="Image 1" className="gal-img" width="400" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2EkEzcaEROvVG1OCdGHCFXMI389bxci20LgQ-_YeIsNGCejUQtxnvLnw5Y3j8Fuee6R0&usqp=CAU" loading="lazy" decoding="async" />
      </div>
    </div>
  );
}