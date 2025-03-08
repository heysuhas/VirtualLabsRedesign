import React from 'react';
import pic1 from '../../assets/1.jpg';
import pic2 from '../../assets/2.jpg';
import pic3 from '../../assets/3.jpg';
import pic4 from '../../assets/4.jpg';
import pic5 from '../../assets/5.jpg';
import pic6 from '../../assets/6.jpg';
import pic7 from '../../assets/7.jpg';
import pic8 from '../../assets/8.jpg';
import pic9 from '../../assets/9.jpg';
import pic10 from '../../assets/10.jfif';
import pic11 from '../../assets/11.jpg';
import pic12 from '../../assets/12.jpg';
import pic13 from '../../assets/13.jpg';
import pic14 from '../../assets/14.jpg';
import pic15 from '../../assets/15.jpg';
import pic16 from '../../assets/16.jpg';

export default function Facilitator() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center mb-5">Outreach</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        <img alt="Image 1" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic1} loading="lazy" decoding="async" />
        <img alt="Image 2" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic2} loading="lazy" decoding="async" />
        <img alt="Image 3" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic3} loading="lazy" decoding="async" />
        <img alt="Image 4" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic4} loading="lazy" decoding="async" />
        <img alt="Image 5" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic5} loading="lazy" decoding="async" />
        <img alt="Image 6" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic6} loading="lazy" decoding="async" />
        <img alt="Image 7" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic7} loading="lazy" decoding="async" />
        <img alt="Image 8" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic8} loading="lazy" decoding="async" />
        <img alt="Image 9" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic9} loading="lazy" decoding="async" />
        <img alt="Image 10" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic10} loading="lazy" decoding="async" />
        <img alt="Image 11" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic11} loading="lazy" decoding="async" />
        <img alt="Image 12" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic12} loading="lazy" decoding="async" />
        <img alt="Image 13" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic13} loading="lazy" decoding="async" />
        <img alt="Image 14" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic14} loading="lazy" decoding="async" />
        <img alt="Image 15" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic15} loading="lazy" decoding="async" />
        <img alt="Image 16" className="gal-img rounded-lg shadow-lg transform transition duration-500 hover:scale-105" width="400" src={pic16} loading="lazy" decoding="async" /> 
      </div>
    </div>
  );
}