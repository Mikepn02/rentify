
import React, { useState } from "react";
import { Feature, Property } from "../../@types/types";
import { Link } from "react-router-dom";


interface FeatureProps {
    i: number;
    feature: Feature;
}

export const PropertyFeature = ({ feature: { name, value, icon }, i }: FeatureProps) => {
    return (
        <div className={i !== 2 ? "flex space-x-1 items-center border-r-2 pr-2" : "flex space-x-1 items-center"}>
            {/* <img src={`/icons/${icon}.svg`} width={20} height={20} /> */}
            <h1>{icon}</h1>
            <p className="text-sm text-gray-primary/75">{value}</p>
            <p className="text-sm text-gray-primary/75">{name}</p>
        </div>
    )
}

interface PropertyCardProps {
    property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
    const { name, price, bannerImage, features, status, slug, likedBy, _id} = property
    const [isLiked, setIsLiked] = useState(false);

    const toggleIsLiked = () => {}

    return (
        <div className="flex  flex-col space-y-3 shadow-md border border-white hover:shadow-xl  rounded xl:w-[21.4vw] xl: h-[50vh]">
            <div className="relative w-full h-48">
                <Link to={`/${slug}`}>
                    <img src={bannerImage} className="cursor-pointer w-full object-cover" />
                </Link>
                <div className="absolute top-2 left-0 w-full z-20 py-2 flex items-center justify-between px-4">
                    <div className="bg-white px-2 space-x-2 flex items-center py-1 rounded-[1px]">
                        {
                            (status === "sold" || status === "rented") ? (
                                <div className="h-3 w-3 rounded-full bg-[#F21515]"> </div>
                            ) : (
                                <div className="h-3 w-3 rounded-full bg-[#15F26E]"></div>
                            )
                        }
                        <p className="text-sm text-gray-primary/75">
                            {status === "forSale" && 'For Sale'}
                            {status === "forRent" && 'For Rent'}
                            {status === "sold" && 'Sold'}
                            {status === "rented" && 'Rented'}
                        </p>
                    </div>
                    <div className="flex p-1 items-center justify-center bg-white rounded-full cursor-pointer" onClick={toggleIsLiked}>
                        {
                            !isLiked ?
                                <img src={'/icons/heart_icon.svg'} width={20} height={20} />
                                :
                                <img src={'/icons/heart_icon_filled.svg'} width={20} height={20} />
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-2 p-2">
                <Link to={`/${slug}`}>
                    <h2 className="cursor-pointer font-medium text-xl truncate">{name}</h2>
                </Link>
                <div className="flex items-center space-x-2">
                    <img src='/icons/address_icon.svg' height={20} width={20} />
                    <p className="text-sm text-gray-primary/75">address</p>
                </div>
                <div className="w-full justify-between items-center flex py-3 border-b-2 border-t-2">
                    {
                        features.slice(0, 3).map((feature, i) => (
                            <PropertyFeature key={i} feature={feature} i={i} />
                        ))
                    }
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-medium text-lg">${price}</p>
                    <Link to={`/property/${_id}`}>
                        <button className=" py-2 px-6 hover:text-white hover:bg-primary-light border border-primary-light/75 text-sm transition duration-300">
                            See Details
                        </button>
                    </Link>


                </div>
            </div>
        </div>
    )
}

export default PropertyCard;