import React from "react";

import styles from "./LocationSearch.module.scss";

interface LocationSearchProps {}

export default function LocationSearch({}: LocationSearchProps) {
  return (
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
  );
}
