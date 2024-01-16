import React, { useState } from "react";
import "./AutocompleteChips.css";
import { names } from "../utils/constants";
import img from "../no-result-found.jpg";

const AutocompleteChips = () => {
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

  const filteredItems = names.filter(
    (item) =>
      !selectedItems.includes(item) &&
      item.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="autocomplete-container">
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

      {filteredItems.length > 0 ? (
        <ul className="suggestions-list">
          {filteredItems.map((item) => (
            <li key={item} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="img">
          <img src={img} alt="/" width="100%" />
        </div>
      )}
    </div>
  );
};

export default AutocompleteChips;
