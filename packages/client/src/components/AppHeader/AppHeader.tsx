import React from "react";

import { NavBar } from "..";
import { LocationSearch } from "..";

import { CityInfo } from "../../types/LocationData";

import logo from "../../logo.svg";

import styles from "./AppHeader.module.scss";

interface AppHeaderProps {
  city?: CityInfo;
}

export default function AppHeader({ city }: AppHeaderProps) {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerContent}>
        <section className={styles.logoSearch}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>outThere</h1>
          <LocationSearch />
        </section>
        <NavBar />
      </div>
    </header>
  );
}
