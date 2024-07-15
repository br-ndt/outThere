import React, { ReactNode } from "react";

import styles from "./Card.module.scss";

interface CardProps {
  children: ReactNode;
  className?: string;
  scroll?: boolean;
}

export default function Card({ children, className, scroll }: CardProps) {
  return (
    <section
      className={`${styles.card} ${scroll ? styles.scroll : ""} ${
        className || ""
      }`}
    >
      {children}
    </section>
  );
}
