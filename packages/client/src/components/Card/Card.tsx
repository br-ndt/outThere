import React, { ReactNode } from "react";

import styles from "./Card.module.scss";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <section className={`${styles.card} ${className || ""}`}>
      {children}
    </section>
  );
}
