import React, { useEffect, useState } from 'react';
import Shimmer from './Shimmer';
import { MENU_URL } from '../utils/constant';
import { useParams } from 'react-router-dom';

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    
    const { resId } = useParams();

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const data = await fetch(MENU_URL + resId);
            const json = await data.json();
            console.log(json);
            setResInfo(json.data);
        } catch (error) {
            //setError(error);
        }
    };

    if (resInfo === null) return <Shimmer />;

    const restaurantInfo = resInfo?.cards[2]?.card?.card?.info || {};
    const { name, cuisines, costForTwo } = restaurantInfo;

    const itemCards = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards || [];

    

    return (
        <div className="  mt-2 text-center">
            <h1 className='text-2xl  font-bold  '>{name || "Restaurant"}</h1>
            <p  className='mt-2 text-lg'>{cuisines ? cuisines.join(", ") : "Various Cuisines"} - Rs. {costForTwo ? costForTwo / 100 : "N/A"}</p>
            <h2>Menu</h2>
            <ul className="Rec">
                {Array.isArray(itemCards) && itemCards.length > 0 ? (
                    itemCards.map((item) => (
                        <li className="box3" key={item.card.info.id}>
                            {item.card.info.name} - Rs. {(item.card.info.price || item.card.info.defaultPrice) / 100}
                            
                        </li>
                    ))
                ) : (
                    <li>No items available</li>
                )}
            </ul>
            
           
        </div>
    );
};

export default RestaurantMenu;
