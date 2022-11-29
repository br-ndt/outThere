import React from "react";
import Card from "../Card/Card";

interface NearbyProps {
  campgrounds: any[];
  parks: any[];
}

interface Activity {
  name: string;
}

export default function Nearby({ campgrounds, parks }: NearbyProps) {
  return (
    <>
      <h2>Nearby Parks:</h2>
      {parks.map((park) => (
        <Card>
          <img style={{ height: "200px" }} src={park.images[0].url} />
          <div>
            <h3>{park.fullName}</h3>
            <p>{park.designation}</p>
            <ul>
              {park.activities.map((activity: Activity) => (
                <li>{activity.name}</li>
              ))}
            </ul>
            <p>{`${park.addresses[0].line1}, ${park.addresses[0].city}, ${park.addresses[0].stateCode}`}</p>
            <p>{park.description}</p>
          </div>
        </Card>
      ))}
      <h2>Nearby Campgrounds:</h2>
      {campgrounds.map((campground) => (
        <Card>
          <img style={{ height: "200px" }} src={campground.images[0].url} />
          <div>
            <h3>{campground.name}</h3>
            <p>{campground.designation}</p>
            <ul>
              {campground.activities?.map((activity: Activity) => (
                <li>{activity.name}</li>
              ))}
            </ul>
            <p>{`${campground.addresses[0].line1}, ${campground.addresses[0].city}, ${campground.addresses[0].stateCode}`}</p>
            <p>{campground.description}</p>
          </div>
        </Card>
      ))}
    </>
  );
}
