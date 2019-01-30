import React from "react";

const Search = props => (
  <div className="search">
    Search by keyword...
    <input type="text" name="search" onChange={props.handleSearchInput} />
    <button onClick={props.handleSearchClick}>Search</button>
  </div>
);

export default Search;
