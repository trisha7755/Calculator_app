
import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
        setDisplayValue('0.');
        setWaitingForSecondOperand(false);
        return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
    setDisplayValue((prev) => (parseFloat(prev) * -1).toString());
  };

  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;
    setDisplayValue((currentValue / 100).toString());
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }
    
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '×':
        return first * second;
      case '÷':
        if (second === 0) return NaN; // handle division by zero
        return first / second;
      default:
        return second;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      if (isNaN(result)) {
        setDisplayValue('Error');
      } else {
        setDisplayValue(String(result));
      }
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  };


  const handleButtonClick = (label: string) => {
    if (label >= '0' && label <= '9') {
      inputDigit(label);
    } else if (label === '.') {
      inputDecimal();
    } else if (label === 'AC') {
      clearDisplay();
    } else if (label === '+/-') {
      toggleSign();
    } else if (label === '%') {
      inputPercent();
    } else if (['+', '-', '×', '÷'].includes(label)) {
      performOperation(label);
    } else if (label === '=') {
      handleEquals();
    }
  };

  const renderButton = (label: string, className: string, customClasses: string = '') => (
    <div className={customClasses}>
      <Button label={label} onClick={handleButtonClick} className={className} />
    </div>
  );

  const topRowStyle = 'bg-gray-400 hover:bg-gray-500 text-black';
  const operatorStyle = 'bg-orange-500 hover:bg-orange-600 text-white';
  const numberStyle = 'bg-gray-600 hover:bg-gray-700 text-white';

  return (
    <div className="bg-black p-2 rounded-3xl shadow-2xl">
      <Display value={displayValue} />
      <div className="grid grid-cols-4 gap-2">
        {renderButton('AC', topRowStyle)}
        {renderButton('+/-', topRowStyle)}
        {renderButton('%', topRowStyle)}
        {renderButton('÷', operatorStyle)}

        {renderButton('7', numberStyle)}
        {renderButton('8', numberStyle)}
        {renderButton('9', numberStyle)}
        {renderButton('×', operatorStyle)}

        {renderButton('4', numberStyle)}
        {renderButton('5', numberStyle)}
        {renderButton('6', numberStyle)}
        {renderButton('-', operatorStyle)}

        {renderButton('1', numberStyle)}
        {renderButton('2', numberStyle)}
        {renderButton('3', numberStyle)}
        {renderButton('+', operatorStyle)}

        {renderButton('0', numberStyle, 'col-span-2')}
        {renderButton('.', numberStyle)}
        {renderButton('=', operatorStyle)}
      </div>
    </div>
  );
};

export default Calculator;
