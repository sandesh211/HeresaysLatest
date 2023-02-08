import React, { useState } from "react";

const FilterComponent =({suggestion})=>{
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
              if (index === activeSuggestionIndex) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      };
      const onClick = (e) => {
        setFilteredSuggestions([]);
        setInput(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
      };
      const onChange = (e) => {
        const userInput = e.target.value;
    
        const unLinked = filteredSuggestions.filter(
          (suggestion) =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        setInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
      };

    return(
        <>
        <input
          type="text"
          onChange={onChange}
          // onKeyDown={onKeyDown}
          value={input}
        />
        {showSuggestions && input && <SuggestionsListComponent />}
      </>
    )

}
export default FilterComponent