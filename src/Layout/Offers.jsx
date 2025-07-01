import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; 

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/OffersData.json')
      .then(res => res.json())
      .then(data => {
        setOffers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className='w-full md:w-10/12 mx-auto my-8'>

      <h1 className="my-5 text-3xl md:text-5xl font-bold text-center text-secondary">
        Our Offers
      </h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {offers.map(data => (
              <div
                key={data.id}
                className="card bg-secondary text-accent shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <figure className="px-10 pt-10">
                  <img
                    src={data.icon}
                    alt={data.title}
                    className="rounded-full w-32 h-32 object-contain p-2"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-primary">{data.title}</h2>
                  <p>{data.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='text-end mt-6'>
            <Link
              to='/availableCars'
              className="btn btn-outline btn-secondary font-bold text-lg"
            >
              Learn More
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Offers;
