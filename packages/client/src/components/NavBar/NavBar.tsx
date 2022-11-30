import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.scss";

export default function NavBar() {
  return (
    <section className={styles.navbar}>
      <NavLink to="/">Current</NavLink>
      {"-"}
      <NavLink to="/today">Today</NavLink>
      {"-"}
      <NavLink to="/week">This Week</NavLink>
    </section>
  );
}
