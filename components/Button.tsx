
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
  const baseClasses = "flex items-center justify-center h-20 w-20 rounded-full text-3xl font-medium focus:outline-none transition-colors duration-150";
  
  const handleClick = () => {
    onClick(label);
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
