
import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  const displayValue = parseFloat(value).toLocaleString('en-US', {
    maximumFractionDigits: 9,
  });

  const getFontSize = () => {
    const length = displayValue.length;
    if (length > 15) return 'text-2xl';
    if (length > 10) return 'text-4xl';
    return 'text-6xl';
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-t-lg text-right w-full mb-2">
      <div className={`font-light break-all ${getFontSize()}`} style={{ minHeight: '5rem' }}>
        {displayValue}
      </div>
    </div>
  );
};

export default Display;
