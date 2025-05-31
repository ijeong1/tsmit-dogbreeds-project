import React from 'react';

interface FabButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const FabButton: React.FC<FabButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {children}
    </button>
  );
}

export default FabButton;