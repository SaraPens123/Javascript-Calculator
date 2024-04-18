import {useState} from 'react';
import './App.css';

const isOperator = (symbol) => {
  return /[*/+-]/.test(symbol);
}

function add(num1, num2) {
  console.log(num1)
  console.log(num2)
  return num1 + num2
}

function subtract(num1, num2) {
  return num1 - num2
}

function multiply(num1, num2) {
  return num1 * num2
}

function divide(num1,num2) {
  return num1 / num2 
}

let result = null;

function execute(expression){
  console.log(expression)
  let calculation = expression.split(" ")
  console.log(calculation)

  let number1 = null;
  let operator = null;
  let negativenum = null

  for(let i=0; i < calculation.length; i++) {
    let val = calculation[i]
    if(!isOperator(val)) {
      val = new Number(val);
      if(negativenum){
        val = val * -1;
        negativenum = null;
      }
      if(number1 === null) {
        number1 = val;
      }  else {
          if (operator === "+") { 
              result = add(number1, val); 
          } else if (operator === "-") { 
              result = subtract(number1, val); 
          } else if (operator === "*") { 
              result = multiply(number1, val); 
          } else if (operator === "/") { 
              result = divide(number1, val); 
       }
         number1 = result  
         operator = null;
      }
    } else {
      if(val === "-" && operator) {
        negativenum = true
        continue
      }
      operator = val
    }

  }
  return result;
  console.log(result)
}

function App() {

const [answer, setAnswer] = useState('');
const [expression, setExpression] = useState(''); 
const et = expression.trim();

const buttonPress = (symbol) => {
  if(symbol === "clear") {
    setAnswer('');
    setExpression('0');
  } else if(symbol === "negative") {
    if(answer === "") return;
    setAnswer(
      answer.toString().charAt(0) === "-" ? answer.slice(1) :"-" + answer
      );
  } else if(symbol === "percent") {
    if(answer === "") return;
    setAnswer((parseFloat(answer) / 100).toString());
  } else if(isOperator(symbol)) {
    setExpression( et + " " + symbol + " ");
  } else if (symbol === "=") {
    calculate()
  } else if(symbol === "0") {
    if(expression.charAt(0) !== "0"){
      setExpression(expression + symbol)
    }
  } else if (symbol === ".") {
    const lastNumber = expression.split(/[-+*/]/g).pop();
    if(lastNumber?.includes(".")) return;
    setExpression(expression + symbol);
  } else {
    if(expression.charAt(0) === "0") {
      setExpression(expression.slice(1) + symbol)
    } else {
      setExpression(expression + symbol)
    }
  }
}

const calculate = () => {
  if(isOperator(et.charAt(et.length - 1))) return;

  const parts = et.split(" ");
  const newParts = [];

  for (let i = parts.length - 1; i >= 0; i--) {
    if(["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
      newParts.unshift(parts[i]);

      let j = 0;
      let k = i - 1;

      while(isOperator(parts[k])) {
        k--;
        j++;
      }
      i -= j;
    } else {
      newParts.unshift(parts[i]);
    }
  }
  const newExpression = newParts.join(" ")
  if(isOperator(newExpression.charAt(0))) {
    setAnswer(execute(answer + ' ' + newExpression));
  } else {
    setAnswer(execute(newExpression));
  }
  setExpression("");
}

  return (
     <div className="container">
        <div id="calculator">
             <div id="display">
                 <div id="answer">{answer}</div>
                 <div id="expression">{expression}</div>
             </div>
             <button id="clear" onClick={() => buttonPress("clear")} className="color1">C</button>
             <button id="negative" onClick={() => buttonPress("negative")} className="color1">+/-</button>
             <button id="percentage" onClick={() => buttonPress("percentage")} className="color1">%</button>
             <button id="divide" onClick={() => buttonPress("/")} className="color2">/</button>
             <button id="seven" onClick={() => buttonPress("7")} className="color3">7</button>
             <button id="eight" onClick={() => buttonPress("8")} className="color3">8</button>
             <button id="nine" onClick={() => buttonPress("9")} className="color3">9</button>
             <button id="multiply" onClick={() => buttonPress("*")} className="color2">*</button>
             <button id="four" onClick={() => buttonPress("4")} className="color3">4</button>
             <button id="five" onClick={() => buttonPress("5")} className="color3">5</button>
             <button id="six" onClick={() => buttonPress("6")} className="color3">6</button>
             <button id="subtract" onClick={() => buttonPress("-")} className="color2">-</button>
             <button id="one" onClick={() => buttonPress("1")} className="color3">1</button>
             <button id="two" onClick={() => buttonPress("2")} className="color3">2</button>
             <button id="three" onClick={() => buttonPress("3")} className="color3">3</button>
             <button id="add" onClick={() => buttonPress("+")} className="color2">+</button>
             <button id="zero" onClick={() => buttonPress("0")} className="color3">0</button>
             <button id="decimal" onClick={() => buttonPress(".")} className="color3">.</button>
             <button id="equals" onClick={() => buttonPress("=")} className="color2">=</button>
        </div>
    </div>
  );
}

export default App;