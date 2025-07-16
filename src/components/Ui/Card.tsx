"use client";

import { ReactNode } from "react";
import styles from "./Card.module.scss";

export function Card({ children }: { children: ReactNode }) {
  return <div className={styles.card}>{children}</div>;
}

export function CardHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className={styles.content}>{children}</div>;
}

Card.Header = CardHeader;
Card.Content = CardContent;
