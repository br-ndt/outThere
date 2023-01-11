import React from "react";

import { LocationProvider } from "./contexts/LocationContext";

import { AppHeader, TimingRoutes } from "./components";

import styles from "./App.module.scss";

export default function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.appBody}>
        <LocationProvider>
          <TimingRoutes />
        </LocationProvider>
      </div>
    </div>
  );
}
