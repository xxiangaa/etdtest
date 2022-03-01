import React from "react";

import styles from "../styles/Home.module.css";

interface Props {
  title: string;
  link: string;
  content: string;
  color: string;
}

export default function Title({ color, title, content, link }: Props) {
  return (
    <div>
      <h1 className={styles.title} style={{ color: color }}>
        {title}
        <a>{link}</a>吧！
      </h1>

      <p className={styles.description}>{content}</p>
    </div>
  );
}
