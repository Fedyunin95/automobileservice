import type { NextApiRequest, NextApiResponse } from 'next';
import { Car, carsList } from '@/pages/data/carsData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Имитация задержки в 1 секунду
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (req.method === 'GET') {
    // Возвращаем список автомобилей
    res.status(200).json(carsList);
  } else if (req.method === 'POST') {
    // Извлекаем данные нового автомобиля из тела запроса
    const {
      make,
      model,
      year,
      color,
      price,
      image,
      engine,
      transmission,
      powerReserve,
    } = req.body;

    // Проверяем обязательные поля
    if (!make || !model || !year || !color || !price || !image) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Создаем новый объект автомобиля
    const newCar: Car = {
      id: (carsList.length + 1).toString(),
      make,
      model,
      engine: engine || 'N/A',
      transmission: transmission || 'N/A',
      powerReserve: powerReserve || 'N/A',
      year: parseInt(year),
      color,
      price: parseFloat(price),
      image,
      description: 'New car added by user.',
    };

    // Добавляем автомобиль в список
    // Так как у нас идет имитация сервера то новый автомобиль не сохраняется корректно и перейти на подробную страницу о нем не получается
    carsList.push(newCar);

    // Возвращаем успешный ответ
    res.status(201).json({ message: 'Car added successfully', car: newCar });
  } else {
    // Метод не поддерживается
    res.status(405).json({ message: 'Method not allowed' });
  }
}
