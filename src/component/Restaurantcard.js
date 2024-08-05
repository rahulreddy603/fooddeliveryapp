import { CDN_URL } from "../utils/constant";

const Restaurantcard = (props) =>  {
    const { resData } = props;
    
    // Ensure resData and resData.info are defined before destructuring
    const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } = resData?.info || {};
    
    return (
        <div className='h-[400px] w-[258px] mx-3 my-5 border-black border-2 bg-green-400 hover:bg-green-500  hover:w-[264px] cursor-pointer '>
        {cloudinaryImageId ? (
          <img className='w-full h-60 object-cover' src={CDN_URL + cloudinaryImageId} alt={name} />
        ) : (
          <div className='w-full h-60 flex items-center justify-center bg-gray-200 text-gray-700'>
            No Image Available
          </div>
        )}
        <h3 className="mt-2 text-lg font-semibold">{name || "Unknown Restaurant"}</h3>
        <h4 className="mt-1 text-sm">{cuisines ? cuisines.join(", ") : "No cuisines available"}</h4>
        <h4 className="mt-1 text-sm">Rating: {avgRating || "N/A"}</h4>
        <h4 className="mt-1 text-sm">Cost: {costForTwo || "N/A"}</h4>
      </div>
      
    );
};




export default Restaurantcard;

