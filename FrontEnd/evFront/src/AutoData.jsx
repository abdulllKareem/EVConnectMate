// src/data/scooterData.js
import React from 'react';
import { Link } from 'react-router-dom';

const AutoData = [
    {
      company: 'Kinetic Energy',
        name: 'Safar Smart',
        images: ['/images3/kinetic/safar1.webp', '/images3/kinetic/safar2.avif'],
        price: '₹ 1.53 - 2.18',
        batteryLife: '80 km per charge',
        topSpeed: '25 kmph',
        chargingTime: '3 hrs',
        variants: '2',
        website: 'https://kineticgreen.com/product/safar-smart'
    },
    {
      company: 'Kinetic Energy',
      name: 'Super DX',
      images: ['/images3/kinetic/dx1.jpg', '/images3/kinetic/dx2.jpg'],
      price: '₹ 1,38,000',
      batteryLife: '110 km per charge',
      topSpeed: '25 kmph',
      chargingTime: '8 hrs',
      variants: '1',
      website: 'https://kineticgreen.com/product/super-dx'
    },
    {
        company: 'Kinetic Energy', 
        name: 'Safar Jumbo Ranger',
        images: ['/images3/kinetic/ranger1.jpg', '/images3/kinetic/ranger2.jpg'],
        price: '₹ 3,15,000 - 3,45,000',
        batteryLife: '140 km per charge',
        topSpeed: '55 kmph',
        chargingTime: '4 hrs',
        variants: '2',
        website: 'https://kineticgreen.com/product/safar-jumbo-ranger'
      },
      {
        company: 'Mahindra',
        name: 'Treo',
        images: ['/images3/mahindra/reo1.webp', '/images3/mahindra/reo2.webp'],
        price: '₹ 2,92,000 - 3,12,000',
        batteryLife: '130 km per charge',
        topSpeed: '55 kmph',
        chargingTime: '4 hrs',
        variants: '2',
        website: 'https://ampere.greaveselectricmobility.com/magnus'
      },
      {
        company: 'Mahindra',
        name: 'e-Alfa Plus',
        images: ['/images3/mahindra/alpha1.png', '/images3/mahindra/alpha2.webp'],
        price: '₹ 1,61,000 - 1,63,000',
        batteryLife: '100 km per charge',
        topSpeed: '25 kmph',
        chargingTime: '10-12 hrs',
        variants: '2',
        website: 'https://ampere.greaveselectricmobility.com/nexus-home'
      },
      {
        company: 'Mahindra',
        name: 'e-Alfa Cargo',
        images: ['/images3/mahindra/cargo1.png', '/images3/mahindra/cargo2.jpg'],
        price: '₹ 1,57,000 - 1,60,000',
        batteryLife: '96 km per charge',
        topSpeed: '25 kmph',
        chargingTime: '8 hrs',
        variants: '1',
        website: 'https://mahindralastmilemobility.com/e-alfa-cargo'
      },
      {
        company: 'Mahindra',
        name: 'Zor Grand DV Plus',
        images: ['/images3/mahindra/grand1.jpg', '/images3/mahindra/grand2.webp'],
        price: '₹ 3,50,000 - ₹3,80,000',
        batteryLife: '90 km per charge',
        topSpeed: '50 kmph',
        chargingTime: '4 hrs 30 min',
        variants: '3',
        website: 'https://mahindralastmilemobility.com/zor-dv-plus'
      },
      {
        company: 'Mahindra',
        name: 'Treo Zor',
        images: ['/images3/mahindra/zor1.jpg', '/images3/mahindra/zor2.jpg'],
        price: '₹ 3,13,000 - ₹3,48,000',
        batteryLife: '80 km per charge',
        topSpeed: '50 kmph',
        chargingTime: '3 hrs 50 min',
        variants: '2',
        website: 'https://mahindralastmilemobility.com/treo-zor-dv'
      },
      {
        company: 'Bajaj',
        name: 'RE E-TEC',
        images: ['/images3/re/re1.webp', '/images3/re/re2.jpg'],
        price: '₹ 3,73,294',
        batteryLife: '178 km per charge',
        topSpeed: '45 kmph',
        chargingTime: '4 hrs 30 min',
        variants: '1',
        website: 'https://www.bajajauto.com/three-wheelers/ev-re'
      },
      {
        company: 'Omega Seiki Mobility (OSM)',
        name: 'Rage plus',
        images: ['/images3/osm/rage+1.jpg', '/images3/osm/rage+2.jpg'],
        price: '₹ 3,40,000 - 3,70,000',
        batteryLife: '115-151 km per charge',
        topSpeed: '45 kmph',
        chargingTime: '3 hrs',
        variants: '3',
        website: 'https://omegaseikimobility.com/rage-plus/'
      },
      {
        company: 'Omega Seiki Mobility (OSM)',
        name: 'Rage+ Frost',
        images: ['/images3/osm/frost1.webp', '/images3/osm/frost2.jpg'],
        price: '₹ 73,900',
        batteryLife: '80 km per charge',
        topSpeed: '45 kmph',
        chargingTime: '3-4 hrs',
        variants: '1',
        website: 'https://omegaseikimobility.com/rage-frost/'
      },
      {
        company: 'PIAGGIO',
        name: 'Ape E City FX Max',
        images: ['/images3/piaggo/apeAuto1.jpg', '/images3/piaggo/apeAuto2.jpg'],
        price: '₹ 3,25,000',
        batteryLife: '147 km per charge',
        topSpeed: '50 kmph',
        chargingTime: '3 hrs 45 minutes',
        variants: '2',
        website: 'https://piaggio-cv.co.in/electric/ape-e-city-fx-max-fixed/'
      },
      {
        company: 'PIAGGIO',
        name: 'Ape E-Xtra',
        images: ['/images3/piaggo/cargo1.webp', '/images3/piaggo/cargo2.jpg'],
        price: '₹ 3,89,000 - 4,10,000',
        batteryLife: '118 km per charge',
        topSpeed: '50 kmph',
        chargingTime: '3 hrs 45 minutes',
        variants: '1',
        website: 'https://piaggio-cv.co.in/electric/electric-cargo-swappable-battery/'
      },
      {
        company: 'ATUL GreenTech',
        name: 'Atul Mobili',
        images: ['/images3/atulGreen/mobili1.jpeg', '/images3/atulGreen/mobili2.webp'],
        price: '₹ 3,54,753',
        batteryLife: '110 km per charge',
        topSpeed: '45 kmph',
        chargingTime: '4-6 hrs',
        variants: '2',
        website: 'https://atulgreentech.co.in/product'
      },
      {
        company: 'ATUL GreenTech',
        name: 'Atul Energie',
        images: ['/images3/atulGreen/energie1.jfif', '/images3/atulGreen/energie2.webp'],
        price: '₹ 3,71,595',
        batteryLife: '107/195 km per charge',
        topSpeed: '45 kmph',
        chargingTime: '4-6 hrs',
        variants: '2',
        website: 'https://atulgreentech.co.in/product/'
      },
      {
        company: 'ATUL Auto',
        name: 'Atul Elite',
        images: ['/images3/atul/elite1.jpg', '/images3/atul/elite2.webp'],
        price: '₹ 1,12,000 - 1,15,000',
        batteryLife: '60-70 km per charge',
        topSpeed: '22 kmph',
        chargingTime: '8-10 hrs',
        variants: '2',
        website: 'https://atulauto.co.in/product-details.aspx?cid=4&pid=31'
      },
      {
        company: 'Euler Motors',
        name: 'HiLoad EV',
        images: ['/images3/euler/euler1.png', '/images3/euler/euler2.avif'],
        price: '₹ 4,43,000',
        batteryLife: '170 km per charge',
        topSpeed: '45 kmph',
        chargingTime: '4 hrs',
        variants: '2',
        website: 'https://www.eulermotors.com/en/hiload'
      },

      {
        company: 'Lohia Auto',
        name: 'Narain E-Rickshaw',
        images: ['/images3/lohiya/narain1.png', '/images3/lohiya/narain2.jpg'],
        price: '₹ 1,65,000',
        batteryLife: '80-90 km per charge',
        topSpeed: '25 kmph',
        chargingTime: '9-10 hrs',
        variants: '5',
        website: 'https://www.lohiaauto.com/narain-base.php'
      },
      {
        company: 'Lohia Auto',
        name: 'Narain E-Auto',
        images: ['/images3/lohiya/auto1.png', '/images3/lohiya/auto2.jpg'],
        price: '₹ 2,07,000',
        batteryLife: '80-90 km per charge',
        topSpeed: '25 kmph',
        chargingTime: '4-5 hrs',
        variants: '3',
        website: 'https://www.lohiaauto.com/narain-xiu.php'
      },
      {
        company: 'ALTIGREEN',
        name: 'Low Deck',
        images: ['/images3/altiGreen/lowDeck1.jpg', '/images3/altiGreen/lowDeck2.jfif'],
        price: '₹ 4,07,000 - 4,12,000',
        batteryLife: '125 km per charge',
        topSpeed: '53 kmph',
        chargingTime: '3 hrs 30 mnts',
        variants: '2',
        website: 'https://www.altigreen.com/vehicle/cargo/electric-3-wheeler/low-deck'
      }
  ];
  
  export default AutoData;
  