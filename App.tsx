
import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <main className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Calculator</h1>
        <Calculator />
      </div>
    </main>
  );
};

export default App;