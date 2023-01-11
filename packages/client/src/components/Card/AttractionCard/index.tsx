import React from "react";
import Card from "../Card";
import { Attraction } from "../../../types/LocationData";
import styles from "./AttractionCard.module.scss";

type AttractionProps = {
  attraction: Attraction;
};

export default function AttractionCard({ attraction }: AttractionProps) {
  return (
    <Card className={styles.card} key={attraction.name}>
      <img style={{ height: "200px" }} src={attraction.images[0].url} />
      <div>
        <h3>{attraction.name}</h3>
        <p>{attraction.designation}</p>
        <ul>
          {attraction.activities?.map((activity) => (
            <li key={`${attraction.name}-${activity.name}-${activity.id}`}>{activity.name}</li>
          ))}
        </ul>
        <p>{`${attraction.addresses[0].line1}, ${attraction.addresses[0].city}, ${attraction.addresses[0].stateCode}`}</p>
        <p>{attraction.description}</p>
      </div>
    </Card>
  );
}
