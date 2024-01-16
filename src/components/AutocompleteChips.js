import React, { useState } from "react";
import "./AutocompleteChips.css";
import { names } from "../utils/constants";

const AutocompleteChips = () => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setInputValue("");
  };

  const handleChipRemove = (removedItem) => {
    const updatedItems = selectedItems.filter((item) => item !== removedItem);
    setSelectedItems(updatedItems);
  };

  return (
    <div
      className="autocomplete-container"
      aria-hidden
      onClick={() => setShow(true)}
    >
      <div className="chips-input-container">
        <div className="chips-container">
          {selectedItems.map((item) => (
            <div key={item} className="chip">
              {item} <span onClick={() => handleChipRemove(item)}>X</span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search..."
          className="autocomplete-input"
        />
      </div>

      {show ? (
        <ul className="suggestions-list">
          {names
            .filter(
              (item) =>
                !selectedItems.includes(item) &&
                item.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((item) => (
              <li key={item} onClick={() => handleItemClick(item)}>
                {item}
              </li>
            ))}
        </ul>
      ) : null}
    </div>
  );
};

export default AutocompleteChips;
