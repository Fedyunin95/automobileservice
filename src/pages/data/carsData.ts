export const carsList: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    image: '/assets/toyota_camry.png',
    // image: 'https://steamuserimages-a.akamaihd.net/ugc/1751310190349590073/152F1EE6FFACC620BDDAFB4168F9C7D6A9E37454/',
    year: 2020,
    engine: 'benzine',
    transmission: 'automate',
    color: {
      hex: '#aaa9ad',
      label: 'Silver',
    },
    price: 24000,
    description: 'A reliable car for city driving.',
  },
  {
    id: '2',
    make: 'Tesla',
    model: 'Model 3',
    image: '/assets/tesla.png',
    engine: 'electric',
    powerReserve: 560,
    year: 2021,
    color: {
      hex: '#E31937',
      label: 'Red',
    },
    price: 42000,
    description: 'A modern electric vehicle.',
  },
  {
    id: '3',
    make: 'Ford',
    model: 'Mustang',
    image: '/assets/mustang.png',
    year: 2019,
    engine: 'benzine',
    transmission: 'mechanic',
    color: {
      hex: '#0033A0',
      label: 'Blue',
    },
    price: 30000,
    description: 'A powerful sports car.',
  },
];

type Color = {
  hex: string;
  label: string;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  engine?: string;
  transmission?: string;
  powerReserve?: string | number;
  year: number;
  color: Color;
  price: number;
  image: string;
  description: string;
}