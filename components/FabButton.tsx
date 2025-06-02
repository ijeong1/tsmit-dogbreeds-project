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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a1 1 0 00.86 1.5h18.64a1 1 0 00.86-1.5L13.71 3.86a1 1 0 00-1.72 0z" />
        </svg>
        <span className="sr-only">Report</span>

      </button>

      {isModalOpen && <ReportModal onClose={handleCloseModal} />}
    </>
  );
};

export default FabButton;