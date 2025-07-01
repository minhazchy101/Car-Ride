import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import { FaSearch } from 'react-icons/fa';

const AllCars = () => {
  const allCarsData = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Filter
  const filteredCars = allCarsData.filter(car =>
    car.CarModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.Location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortOption === 'lowToHigh') return a.DailyRentalPrice - b.DailyRentalPrice;
    if (sortOption === 'highToLow') return b.DailyRentalPrice - a.DailyRentalPrice;
    if (sortOption === 'availableFirst')
      return a.availability === 'Available' ? -1 : 1;
    return 0;
  });

  return (
    <div className="w-full md:w-11/12 lg:w-10/12 mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-secondary text-center mb-6">
        All Cars
      </h1>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by model or location"
            className="input input-bordered pl-10 w-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/3">
          <select
            className="select select-bordered w-full"
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="availableFirst">Availability: Available First</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-accent bg-secondary rounded-xl shadow-md">
        <table className="table w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-primary text-sm md:text-base uppercase">
              <th>Image</th>
              <th>Model</th>
              <th>Location</th>
              <th>Rent/Day</th>
              <th>Availability</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedCars.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-accent font-semibold">
                  No cars found.
                </td>
              </tr>
            ) : (
              sortedCars.map(car => (
                <tr
                  key={car._id}
                  className="hover:shadow-md hover:bg-secondary even:bg-gray-600 odd:bg-gray-500 transition duration-200"
                >
                  <th className="p-2">
                    <img
                      src={car.Imageurl}
                      alt={car.CarModel}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                  </th>
                  <td className="p-2 font-medium">{car.CarModel}</td>
                  <td className="p-2">{car.Location}</td>
                  <td className="p-2">${car.DailyRentalPrice}</td>
                  <td className="p-2">
                    <span
                      className={`badge badge-sm ${
                        car.availability === 'Available'
                          ? 'badge-success'
                          : 'badge-error'
                      }`}
                    >
                      {car.availability}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <Link
                      to={`/carDetails/${car._id}`}
                      className="btn btn-outline btn-primary btn-sm"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCars;
