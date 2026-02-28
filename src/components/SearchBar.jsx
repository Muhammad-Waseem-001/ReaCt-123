import React from "react";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      className="input search-input"
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      type="search"
      value={value}
    />
  );
}
