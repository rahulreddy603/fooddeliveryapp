import React, { useState, useEffect } from "react";
import Restaurantcard from '../component/Restaurantcard.js';
import Shimmer from '../component/Shimmer.js';
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";


const Body = () => {
  const [ListofRestaurant, setListofRestaurant] = useState([]);
  const [filterListRestaurant, setFilterListRestaurant] = useState([]);
  const [SearchText , setSearchText] = useState("");
  const onLineStatus = useOnlineStatus();
 
  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.4701111&lng=73.8340192&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
        const json = await data.json();
        console.log(json);
        setListofRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilterListRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        console.log(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
};

  const filterTopRatedRestaurants = () => {
    const filteredList = ListofRestaurant.filter((rest) => rest.info.avgRating >= 4.5);
    setFilterListRestaurant(filteredList);
  };
   if (ListofRestaurant.length === 0) {
     return <Shimmer />
     }


  const handleSearch = () => {
    const filteredRestaurants = ListofRestaurant.filter((resr) =>  
      resr.info.name.toLowerCase().includes(SearchText.toLowerCase()));
    setFilterListRestaurant(filteredRestaurants);
  };

  
   
  if(onLineStatus === false) return (<h1>
     No Internet Connection Please check !!!
     </h1>);

  
 
  return (
    <div className=''>
      <div className='flex my-4'>
        <div className="">
          <input 
            type="text"  
            className=" ml-4 border-2 border-black p-1" 
            value={SearchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="border-black border-2 m-0.5 p-1 bg-gray-300" onClick={handleSearch}>Search</button>
        </div>
        <button className='mx-9 border-2 border-black p-1' onClick={filterTopRatedRestaurants}>
          Top Rated Restaurant
        </button>
        
      </div>
      <div className='flex flex-wrap'>
        {filterListRestaurant.map((res) => 
         <Link key={res.info.id} to={"/restaurants/"+ res.info.id}> 
           <Restaurantcard resData={res}/>
         </Link>
        )}
      </div>
    </div>
  );
};

export default Body;
