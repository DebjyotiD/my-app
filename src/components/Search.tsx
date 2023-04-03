import React from "react";

function Search() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-end py-5 pt-5 mr-5">
        <input
          className=" rounded-full border border-gray-400 py-2 px-4 placeholder-gray-400/60"
          type="search"
          placeholder="Search"
        />
      </div>
    </div>
  );
}

export default Search;
