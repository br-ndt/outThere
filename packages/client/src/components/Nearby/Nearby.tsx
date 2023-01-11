import React from "react";
import { useLocation } from "../../contexts/LocationContext";

import { AttractionCard } from "../Card";
import { Attraction } from "../../types/LocationData";

export default function Nearby() {
  const { location } = useLocation();
  return (
    <>
      {location.parks.length && (
        <>
          <h2>Nearby Parks:</h2>
          {location.parks.map((park: Attraction) => (
            <AttractionCard attraction={park} key={park.name} />
          ))}
        </>
      )}
      {location.campgrounds.length && (
        <>
          <h2>Nearby Campgrounds:</h2>
          {location.campgrounds.map((campground: Attraction) => (
            <AttractionCard attraction={campground} key={campground.name} />
          ))}
        </>
      )}
    </>
  );
}
