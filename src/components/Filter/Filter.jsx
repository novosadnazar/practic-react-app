import React, { useContext } from "react";
import { AppContext } from "../../App";

const Filter = () => {
  const { filter, handleFilter } = useContext(AppContext);

  return (
    <input type="text" name="filter" value={filter} onChange={handleFilter} />
  );
};

export default Filter;
