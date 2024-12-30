import React from 'react';

const Button: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white rounded px-4 py-2">
      {children}
    </button>
  );
};

export default Button; 