import React, { useState } from "react";

interface AccessoriesSearchByKeyProps {
  onSearch: (searchKey: string) => void;
}

const AccessoriesSearchByKey: React.FC<AccessoriesSearchByKeyProps> = ({
  onSearch,
}) => {
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = () => {
    onSearch(searchKey);
  };

  return (
    <div>
      <div>
        <p className="text-lg font-medium text-gray-800">Search by Keyword</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className={
            "w-full px-3 outline-none bg-transparent border-b border-gray-300"
          }
        />
      </div>
      <button className="box-button mt-2 uppercase" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default AccessoriesSearchByKey;
