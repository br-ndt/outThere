import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoadingSpinner, ServerError } from "../../components";

import { LocationData } from "../../types/LocationData";

export interface ILocationContext {
  location?: LocationData;
}

export type LocationProviderProps = {
  children?: ReactNode;
};

export const LocationContext = createContext<ILocationContext>({});

export function LocationProvider({ children }: LocationProviderProps) {
  const [location, setLocation] = useState<LocationData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocationData = async (lat: number, lon: number) => {
      let coords = {
        lat,
        lon,
      };
      try {
        if (!location) {
          const response = await fetch(`/api/location`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(coords),
          });
          if (!response.ok) {
            throw new Error(`${response.status} (${response.statusText})`);
          }
          const json = await response.json();
          console.log("LocationData was successfully fetched from API.");
          setLocation(json);
        }
      } catch (error) {
        console.log(`Sorry, unable to fetch from API because ${error}`);
      } finally {
        setLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await fetchLocationData(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    }
  }, []);

  return (
    <>
      {!loading ? (
        location ? (
          <LocationContext.Provider value={{ location }}>
            {children}
          </LocationContext.Provider>
        ) : (
          <ServerError />
        )
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export function useLocation() {
  if (!LocationContext) {
    throw new Error("LocationContext must be defined!");
  }
  return useContext<ILocationContext>(LocationContext);
}
