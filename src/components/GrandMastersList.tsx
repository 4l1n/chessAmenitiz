import { useState, useEffect } from 'react';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 20;

const GrandMastersList = () => {
  const [grandMasters, setGrandMasters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchGrandMasters = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.chess.com/pub/titled/GM');
        
        if (!response.ok) {
          throw new Error('Failed to fetch grandmasters');
        }
        
        const data = await response.json();
        setGrandMasters(data.players || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGrandMasters();
  }, []);

  const totalPages = Math.ceil(grandMasters.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGrandMasters = grandMasters.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Chess Grandmasters</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedGrandMasters.map((username) => (
          <div 
            key={username}
            className="bg-white rounded-md shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
            onClick={() => window.location.href = `/profile/${username}`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-800">{username}</h2>
                <span className="text-primary-600 hover:text-primary-700 hover:underline text-sm">
                  View profile
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {grandMasters.length > 0 && (
        <div className="mt-8">
          <p className="text-center text-gray-600 mb-4">
            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, grandMasters.length)} of {grandMasters.length} grandmasters
          </p>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default GrandMastersList; 