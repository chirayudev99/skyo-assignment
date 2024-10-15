import React, { useState, useEffect, useRef } from "react";
import styles from './task1.module.css';

function Autocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  // Refs to track the active suggestion element
  const activeSuggestionRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedQuery}`
          );
          const data = await response.json();
          setSuggestions(data.meals || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
    e.preventDefault(); 
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
    e.preventDefault(); 
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      setQuery(suggestions[activeSuggestionIndex].strMeal);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (activeSuggestionRef.current) {
      activeSuggestionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeSuggestionIndex]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.strMeal);
    setSuggestions([]);
  };

  return (
    <div className={styles.autocompleteContainer}>
     <h2>Task 1 - Autocomplete</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for meals..."
        onKeyDown={handleKeyDown}
        className={styles.inputField}
      />
      {suggestions.length > 0 ? (
        <ul className={styles.suggestionsList}>
          {suggestions.map((meal, index) => (
            <li
              key={meal.idMeal}
              ref={index === activeSuggestionIndex ? activeSuggestionRef : null}
              className={
                index === activeSuggestionIndex
                  ? `${styles.suggestionItem} ${styles.active}`
                  : styles.suggestionItem
              }
              onMouseDown={() => handleSuggestionClick(meal)} // Use onMouseDown to avoid losing focus
            >
              {meal.strMeal}
            </li>
          ))}
        </ul>
      ) : query && debouncedQuery && <p className={styles.noSuggestions}>No suggestions found</p>}
    </div>
  );
}

export default Autocomplete;
