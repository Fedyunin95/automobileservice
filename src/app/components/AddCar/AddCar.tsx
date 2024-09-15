'use client'

import {ChangeEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';

import styles from './addcar.module.scss';

export const AddCar = () => {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    color: {
      hex: '',
      label: ''
    },
    price: '',
    image: '',
    engine: '',
    powerReserve: '',
    transmission: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'color-hex') {
      setCarData({...carData, color: {...carData.color, hex: e.target.value}});
    } else if (e.target.name === 'color-label') {
      setCarData({...carData, color: {...carData.color, label: e.target.value}});
    } else {
      setCarData({...carData, [e.target.name]: e.target.value});
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCarData({...carData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/cars', carData);
      alert('Car added successfully');
      router.push('/');
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to add car');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добавить машину</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.input}>
          <label>Производитель:</label>
          <input
            type="text"
            name="make"
            value={carData.make}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input}>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={carData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input}>
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={carData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input}>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={carData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input}>
          <label>Color label:</label>
          <input
            type="text"
            name="color-label"
            value={carData.color.label}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input}>
          <label>Color hex:</label>
          <input
            type="text"
            name="color-hex"
            value={carData.color.hex}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input}>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={carData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.input}>
          <label>Вид двигателя:</label>
          <select name="engine" id="engine-type" defaultValue={carData.transmission} onChange={handleSelect}>
            <option value="benzine">benzine</option>
            <option value="diesel">diesel</option>
            <option value="electric">electric</option>
          </select>
        </div>
        {carData.engine !== 'electric' && <div className={styles.input}>
          <label>Вид трансмиссии:</label>
          <select name="transmission" id="transmission-type" defaultValue={carData.transmission} onChange={handleSelect}>
            <option value="automate">automate</option>
            <option value="robot">robot</option>
            <option value="mechanic">mechanic</option>
          </select>
        </div>}
        {carData.engine === 'electric' && <div className={styles.input}>
          <label>Запас хода(в км):</label>
          <input
            type="number"
            name="powerReserve"
            value={carData.powerReserve}
            onChange={handleChange}
            required
          />
        </div>}
        <button className={styles.button} type="submit">Добавить</button>
      </form>
    </div>
  );
};
