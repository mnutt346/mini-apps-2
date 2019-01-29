import React from "react";

const Search = props => (
  <form>
    Search by keyword...
    <input type="text" name="search" onChange={props.handleSearchInput} />
    <button>Search</button>
  </form>
);

export default Search;
