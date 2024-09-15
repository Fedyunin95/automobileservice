import type { NextApiRequest, NextApiResponse } from 'next';
import {carsList as cars} from "@/pages/data/carsData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // Найти автомобиль по ID
  const car = cars.find((car) => car.id === id);

  if (!car) {
    res.status(404).json({ message: 'Car not found' });
    return;
  }

  // Имитация задержки в 1 секунду
  await new Promise((resolve) => setTimeout(resolve, 1000));

  res.status(200).json(car);
}
