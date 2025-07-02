import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Recent = () => {
  const [loadedCar, setLoadedCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios('https://car-ride-server.vercel.app/addcar')
      .then(res => {
        setLoadedCar(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatPostedDate = (dateString) => {
    const postedDate = new Date(dateString);
    const diffInDays = Math.floor((new Date() - postedDate) / (1000 * 60 * 60 * 24));
    return `Added ${diffInDays === 0 ? 'today' : `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`}`;
  };

  const onlyAvailableCars = loadedCar?.filter(car => car.availability === 'Available') || [];
  const sortedCars = onlyAvailableCars.sort((a, b) => new Date(b.date) - new Date(a.date));
  const recentCars = sortedCars.slice(0, 6);

  return (
    <div className='w-full md:w-10/12 mx-auto my-8'>
      <h1 className="my-5 text-3xl md:text-5xl font-bold text-center text-secondary">
        Our Recent Cars
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0'>
          {recentCars.map(car => (
            <div
              key={car?._id}
              className="card bg-secondary text-accent shadow-md rounded-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <figure className="h-[250px] overflow-hidden rounded-t-lg">
                <img
                  src={car?.Imageurl}
                  alt={car?.CarModel}
                  className='object-cover w-full h-full'
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-primary">
                  {car.CarModel}
                  <div className="badge badge-success text-white">{car.availability}</div>
                </h2>
                <p>Daily Rent: <span className='font-semibold text-white'>${car?.DailyRentalPrice}/day</span></p>
                <p>Bookings: {car?.bookingCount}</p>
                <p>{formatPostedDate(car?.date)}</p>
                <div className="card-actions justify-end">
                  <Link to={`/carDetails/${car?._id}`} className="btn btn-outline btn-primary">
                    See Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recent;
