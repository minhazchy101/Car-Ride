import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const TheNavBar = () => {

  const {user , logOut , load} = useAuth()
  // console.log(user)
  // console.log(user?.accessToken)



  const navigate = useNavigate()

  const handleLogOut =()=>{


    Swal.fire({
  title: "Are you sure ?",
  text: "Logging out will end your current session.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, log out!"
}).then((result) => {
  if (result.isConfirmed) {
    navigate('/')

    logOut().then(() => {
   Swal.fire({
      title: "Goodbye!",
      text: "You’ve Been Logged Out!",
      icon: "success"
    });
}).catch((error) => {
  // console.log(error)
  if (error) {
    Swal.fire({
    icon: "error",
    title: "Something went wrong!",
    text: "Logout Failed!",
    
  });
  }
});

    
   
  }
});




    // console.log('logOut')
  }

    const link =   <>
        <li><NavLink className={({isActive}) => isActive ? 'text-[#00C2FF] font-bold underline underline-offset-8 underline-[#00C2FF]' : 'text-[#FFFFFF] font-semibold text-md'} to='/'>Home</NavLink></li>
        <li><NavLink className={({isActive}) => isActive ? 'text-[#00C2FF] font-bold underline underline-offset-8 underline-[#00C2FF] ' : 'text-[#FFFFFF] font-semibold text-md'} to='/availableCars'>Available Cars </NavLink></li>
        <li><NavLink className={({isActive}) => isActive ? 'text-[#00C2FF] font-bold underline underline-offset-8 underline-[#00C2FF] ' : 'text-[#FFFFFF] font-semibold text-md'} to='/addCar'>Add Car </NavLink></li>
        {
          user && <>
          <li><NavLink className={({isActive}) => isActive ? 'text-[#00C2FF] font-bold underline underline-offset-8 underline-[#00C2FF] ' : 'text-[#FFFFFF] font-semibold text-md'} to='allCars'>All Cars </NavLink></li>
          <li><NavLink className={({isActive}) => isActive ? 'text-[#00C2FF] font-bold underline underline-offset-8 underline-[#00C2FF] ' : 'text-[#FFFFFF] font-semibold text-md'} to={`/myCars/${user.email}`}>My Cars </NavLink></li>
          <li><NavLink className={({isActive}) => isActive ? 'text-[#00C2FF] font-bold underline underline-offset-8 underline-[#00C2FF] ' : 'text-[#FFFFFF] font-semibold text-md'} to={`/bookedcars/${user.email}`}>My Bookings</NavLink></li>
          
          </>
        } 
        </>
    return (
        <div className='bg-[#1A1F36] shadow-lg sticky top-0 z-50'>
     <div className="navbar w-full md:w-10/12 mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-outline btn-info lg:hidden mx-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-md dropdown-content bg-[#323b64] rounded-box z-10 mt-3 w-52 p-2 shadow-lg space-y-2">
        {link}
        {/* Mobile-only nav-end */}
        <li className="block lg:hidden border-t border-gray-500 pt-2">
          {
            load ? <span className="loading loading-spinner text-info"></span> :
            user ? (
              <>
                <div className="flex items-center gap-2 px-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user?.photoURL} alt="user" />
                    </div>
                  </div>
                  <span className="text-white">{user?.displayName}</span>
                </div>
                <button onClick={handleLogOut} className="btn btn-sm btn-outline btn-[#00C4FF] w-full mt-2">LogOut</button>
              </>
            ) : (
              <>
                <div className="avatar">
                  <div className="w-10 rounded-full mx-auto">
                    <img src="https://i.ibb.co/qFWd7DTV/istockphoto-1270368615-612x612.jpg" alt="guest" />
                  </div>
                </div>
                <NavLink to='/login' className="btn btn-sm btn-outline btn-[#00C4FF] w-full mt-2">Login</NavLink>
              </>
            )
          }
        </li>
      </ul>
    </div>
    <NavLink className="flex items-center gap-2 text-[#00C2FF] text-2xl font-bold">
      <img src="https://i.ibb.co/21Bgv5x2/istockphoto-1431411681-612x612.jpg" className='w-14 rounded-full' alt="logo"/> CarRide
    </NavLink>
  </div>

  {/* Main nav links center */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {link}
    </ul>
  </div>

  {/* Desktop only nav-end */}
  <div className="navbar-end hidden lg:flex">
    {
      load ? <span className="loading loading-spinner text-info"></span> :
      user ? (
        <>
          <div className="flex items-center">
            <div className="relative flex flex-col group">
              <div className="avatar">
                <div className="w-14 mx-3 rounded-full">
                  <img src={user?.photoURL} alt="user" />
                </div>
              </div>
              <div className="text-md font-semibold mt-6 opacity-0 bg-base-100 text-[#00C4FF] rounded-box shadow p-2 w-32 text-center group-hover:opacity-100 transition-opacity duration-200 absolute right-2.5">
                {user?.displayName}
              </div>
            </div>
            <button onClick={handleLogOut} className="btn btn-outline btn-primary text-[#FFFFFF] font-semibold text-md">LogOut</button>
          </div>
        </>
      ) : (
        <>
          <div className="avatar">
            <div className="w-16 rounded-full mx-3">
              <img src="https://i.ibb.co/qFWd7DTV/istockphoto-1270368615-612x612.jpg" alt="guest" />
            </div>
          </div>
          <NavLink to='/login' className="btn btn-outline btn-primary text-[#FFFFFF] font-semibold text-md">Login</NavLink>
        </>
      )
    }
  </div>
</div>

        </div>
    );
};

export default TheNavBar;