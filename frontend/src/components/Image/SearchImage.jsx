import React, { useEffect, useState } from 'react';
import { getUserImages } from '../../utils/api';

const SearchImage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Dummy search results for demonstration
  
useEffect(()=>{
  if(!searchTerm){
    getUserImages(searchTerm).then((res)=>setSearchResults(res?.data))
    .catch((error)=>console.log(error))
  }
},[searchTerm])
  const handleSearch = (e) => {
    e.preventDefault()
    getUserImages(searchTerm).then((res)=>{setSearchResults(res?.data)})
  };

  return (
    <div className="container mx-auto max-w-[800px] px-4 py-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by image name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={(e)=>handleSearch(e)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Search
      </button>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {searchResults?.map((result) => (
          <div key={result.id} className="bg-white shadow-md rounded p-4">
            <img src={result.imageUrl} alt={result.name} className="w-full h-auto mb-4" />
            <p className="text-gray-800 font-bold text-lg">{result.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchImage;
