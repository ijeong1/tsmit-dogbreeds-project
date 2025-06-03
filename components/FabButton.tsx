import React, { useState } from 'react';
import ReportModal from '@/components/ReportModal';

const FabButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFabClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleFabClick}
        className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 z-50"
        aria-label="Report"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            d="M12 4L4 20h16L12 4z"
          />
          <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>


        <span className="sr-only">Report</span>

      </button>

      {isModalOpen && <ReportModal onClose={handleCloseModal} />}
    </>
  );
};

export default FabButton;