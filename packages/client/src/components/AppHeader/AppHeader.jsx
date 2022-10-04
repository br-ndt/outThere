import React from "react";

import { NavBar } from "../";

import logo from "../../logo.svg";

import styles from "./AppHeader.module.scss";

export default function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerContent}>
        <section className={styles.logoSearch}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>outThere</h1>
          <form className={styles.searchBar}>
            <input
              list="places"
              type="text"
              id="city"
              name="city"
              required
              autoComplete="off"
              pattern="Amsterndam|Berlin|Dublin|London|Paris"
            />
            <datalist id="places">
              <option>Amsterdam</option>
              <option>Berlin</option>
              <option>Dublin</option>
              <option>London</option>
              <option>Paris</option>
            </datalist>
          </form>
        </section>
        <NavBar />
      </div>
    </header>
  );
}
