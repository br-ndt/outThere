import React from "react";

import styles from "./Card.module.scss";

export default function Card({ children, className }) {
  return (
    <section className={`${styles.card} ${className || ""}`}>{children}</section>
  );
}
