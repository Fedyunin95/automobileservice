'use client'

import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import axios from 'axios';
import {Car} from "@/pages/data/carsData";
import Image from 'next/image';


import styles from './car.module.scss';

export const CarDetails: React.FC = () => {
  const [car, setCar] = useState<Car | null>(null);
  const params = useParams();

  const id: string | string[] | undefined = params?.id;

  useEffect(() => {
    async function fetchCar() {
      if (id) {
        const response = await axios.get(`/api/cars/${id}`);
        setCar(response.data);
      }
    }

    fetchCar();
  }, [id]);

  if (!car) {
    return (<div className={styles.car}>
      <h1>Loading...</h1>
    </div>)
  }

  return (
    <div className={styles.car}>
      <div className={styles.content}>
        <Image
          className={styles.image}
          src={car.image}
          alt={`${car.make} ${car.model}`}
          width={1280}
          height={1024}
        />
        <h1 className={styles.name}>{car.make} {car.model}</h1>
        <div className={styles.info}>
          {/* Можно заменить на проход по ключам если будет прописан заголовок в каждом ключе */}
          <p className={styles.infoText}>
            <span>Год выпуска:</span>
            <span className={styles.value}>{car.year}</span>
          </p>
          <p className={styles.infoText}>
            <span>Тип двигателя:</span>
            <span className={styles.value}>{car.engine}</span>
          </p>
          {car.transmission && <p className={styles.infoText}>
            <span>Трансмиссия:</span>
            <span className={styles.value}>{car.transmission}</span>
          </p>}
          {car.powerReserve && <p className={styles.infoText}>
            <span>Запас хода:</span>
            <span className={styles.value}>{car.powerReserve} км</span>
          </p>}
          <p className={styles.infoText}>
            <span>Цвет:</span>
            <span className={styles.value}>{car.color.label}</span>
            <span className={styles.color_preview} style={{backgroundColor: car.color.hex}}/>
          </p>
          <p className={styles.infoText}>
            <span>Стоимость:</span>
            <span className={styles.value}>{car.price} $</span>
          </p>
          <p className={styles.infoText}>
            <span>Описание:</span>
            <span className={styles.value}>{car.description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
