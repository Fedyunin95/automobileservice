import {FC} from "react";
import Image from "next/image";
import {Car} from "@/pages/data/carsData";

import styles from './carslist.module.scss';

interface CarCardProps {
  car: Car;
  click: (id: number | string) => void;
}

export const CarCard: FC<CarCardProps> = ({car, click}) => {
  return (
    <div className={styles.card} onClick={() => {
      click(car.id)
    }}>
      <h3 className={styles.name}>{car.make} {car.model} {car.year}</h3>
      <Image
        className={styles.image}
        src={car.image}
        alt={`${car.make} ${car.model}`}
        width={1280}
        height={1024}
      />
    </div>
  )
}