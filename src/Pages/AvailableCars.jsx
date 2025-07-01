import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { FaSearch, FaList, FaThLarge } from 'react-icons/fa';

const AvailableCars = () => {
  const [myView, setMyview] = useState('Grid');
  const [sort, setSort] = useState('');
  const [searchCars, setSearchCars] = useState('');

  const loadedAvailableCars = useLoaderData();
  const onlyAvailableCars = loadedAvailableCars.filter(avCars => avCars.availability === "Available");

  const filteredCars = onlyAvailableCars.filter(car =>
    car.CarModel.toLowerCase().includes(searchCars.toLowerCase()) ||
    car.Location?.toLowerCase().includes(searchCars.toLowerCase())
  );

  const sortedCars = [...filteredCars];
  if (sort === 'lowToHigh') {
    sortedCars.sort((a, b) => a.DailyRentalPrice - b.DailyRentalPrice);
  } else if (sort === 'highToLow') {
    sortedCars.sort((a, b) => b.DailyRentalPrice - a.DailyRentalPrice);
  }

  return (
    <div className='w-full md:w-10/12 mx-auto'>
      <h1 className="text-2xl md:text-3xl text-center font-bold my-4">Available Cars</h1>

      {/* Filters: Search | Sort | View Toggle */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center my-6 mx-4">
        
        {/* Search with icon */}
        <div className="relative w-full">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by model or location"
            className="input input-bordered pl-10 w-full"
            value={searchCars}
            onChange={(e) => setSearchCars(e.target.value)}
          />
        </div>

        {/* Sort dropdown */}
        <div className="w-full md:w-auto">
          <select
            className="select select-bordered w-full md:w-48"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Lowest First</option>
            <option value="highToLow">Highest First</option>
          </select>
        </div>

        {/* Toggle view */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {myView === 'Grid' ? (
            <button
              className="btn btn-sm btn-outline flex items-center gap-2"
              onClick={() => setMyview('List')}
            >
              <FaList /> List
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline flex items-center gap-2"
              onClick={() => setMyview('Grid')}
            >
              <FaThLarge /> Grid
            </button>
          )}
        </div>
      </div>

      {/* Grid View */}
      {myView === 'Grid' ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4 px-4'>
          {sortedCars.map(car => (
            <div key={car._id} className="card bg-secondary shadow-lg rounded-lg">
              <figure>
                <img src={car?.Imageurl} alt={car?.CarModel} className='object-cover h-48 w-full rounded-t-lg' />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold text-primary">{car?.CarModel}</h2>
                <p className='text-accent'>{car?.Description}</p>
                <div className="text-accent text-sm">Price/Day: ${car?.DailyRentalPrice}</div>
                <div className="text-accent text-sm">Location: {car?.Location}</div>
                <div className="card-actions justify-end">
                  <Link to={`/carDetails/${car?._id}`} className="btn btn-primary btn-outline btn-sm">Book Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className='my-5 px-4'>
          <ul className="space-y-4">
            {sortedCars.map(car => (
              <li
                key={car._id}
                className="bg-secondary text-accent rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center gap-4"
              >
                {/* Image */}
                <div className="w-full md:w-1/4 flex-shrink-0">
                  <img
                    className="rounded-lg object-cover h-40 w-full md:h-24"
                    src={car?.Imageurl}
                    alt="car"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-3 gap-2 text-sm md:text-base">
                  <div>
                    <span className="font-semibold">Model:</span>
                    <div>{car?.CarModel}</div>
                  </div>
                  <div>
                    <span className="font-semibold">Price:</span>
                    <div>${car?.DailyRentalPrice}</div>
                  </div>
                  <div>
                    <span className="font-semibold">Location:</span>
                    <div>{car?.Location}</div>
                  </div>
                </div>

                {/* Button */}
                <div className="w-full md:w-auto">
                  <Link
                    to={`/carDetails/${car?._id}`}
                    className="btn btn-primary btn-sm md:btn-md btn-outline w-full md:w-auto mt-2 md:mt-0"
                  >
                    Book Now
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
