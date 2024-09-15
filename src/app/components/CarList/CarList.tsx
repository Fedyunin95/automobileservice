'use client';

import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {Car} from "@/pages/data/carsData";

import styles from './carslist.module.scss';
import {CarCard} from "@/app/components/CarList/CarCard";

export const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState({
    year: 'up',
    price: 'up',
    make: 'all',
    color: 'all',
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchCars() {
      const response = await axios.get('/api/cars');
      setCars(response.data);
    }

    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    const filtered = cars.filter(car =>
      (filters.make !== 'all' ? car.make === filters.make : true) &&
      (filters.color !== 'all' ? car.color.label === filters.color : true)
    );

    if (filters.year === 'up') {
      filtered.sort((a, b) => a.year - b.year);
    } else {
      filtered.sort((a, b) => b.year - a.year);
    }

    if (filters.price === 'up') {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [filters, cars]);

  const handleCarClick = (id: string | number) => {
    router.push(`/cars/${id}`);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters({...filters, [e.target.name]: e.target.value})
  }

  if (cars.length === 0) {
    return <div className={styles.carsList}>
      <h1>Loading...</h1>
    </div>;
  }

  return (
    <div className={styles.carsList}>
      <h1 className={styles.title}>Список авто</h1>
      <div className={styles.filters}>
        <div className={styles.input}>
          <label>Год выпуска:</label>
          <select name="year" id="year" defaultValue={filters.year} onChange={handleSelect}>
            <option value="up">По возрастанию</option>
            <option value="down">По убыванию</option>
          </select>
        </div>
        <div className={styles.input}>
          <label>Цена:</label>
          <select name="price" id="price" defaultValue={filters.price} onChange={handleSelect}>
            <option value="up">По возрастанию</option>
            <option value="down">По убыванию</option>
          </select>
        </div>
        <div className={styles.input}>
          <label>Производитель:</label>
          <select name="make" id="make" defaultValue={filters.make} onChange={handleSelect}>
            <option value='all'>All</option>
            <option value="Toyota">Toyota</option>
            <option value="Tesla">Tesla</option>
            <option value="Ford">Ford</option>
          </select>
        </div>
        <div className={styles.input}>
          <label>Производитель:</label>
          <select name="color" id="color" defaultValue={filters.make} onChange={handleSelect}>
            <option value='all'>All</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Silver">Silver</option>
          </select>
        </div>
      </div>
      <div className={styles.cars}>
        {filteredCars.map(car => (
          <CarCard car={car} key={car.id} click={handleCarClick}/>
        ))}
      </div>
    </div>
  );
};
