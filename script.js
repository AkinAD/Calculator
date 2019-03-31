var screen = document.getElementById("inpNcalcDisplay");
var toBeEval = [];
var ix=0, jy=0;
var btnOperandVal = Array.from(document.querySelectorAll('.operand'));
var btnOperatorVal = Array.from(document.querySelectorAll('.operator'));
var currOperator = "";
var	operandA, operandB, temp="";
var isStillOperand = false;
for (var i =0; i< btnOperandVal.length; i++)
 {
     btnOperandVal[i].addEventListener('click', function(e)
     {
        screen.textContent += this.value;
        temp += this.value;
        if(isStillOperand)
        {
             toBeEval[ix][1] += this.value;
        }
        else
        {
            toBeEval.push(['operand',this.value]);
            isStillOperand = true;
            ix = toBeEval.length - 1;
        }
        //toBeEval[ix][jy] = ;
       // toBeEval.push(['operand',this.value]);
     })
 }

for (var i =0; i< btnOperatorVal.length; i++)
 {
     btnOperatorVal[i].addEventListener('click', function(e)
     {
        screen.textContent += this.value;
        operandA = temp;
        temp = 0;
        currOperator = this.value;
        toBeEval.push(['operator',this.value]);
        isStillOperand = false;
        console.table(toBeEval);
     })
 }
 
function arrParser()
{
    // loop the outer array
    for (var i = 0; i < toBeEval.length; i++)
    {
        // get the size of the inner array
        var innerArrayLength = toBeEval[i].length;
        // loop the inner array
        for (var j = 0; j < innerArrayLength; j++) 
        {
             if(toBeEval[i][0] == "operand")
             {
                     toBeEval[i-1][1] toBeEval[i-1][1 ]
             }
            console.log('[' + i + ',' + j + '] = ' + toBeEval[i+1][j]);
        }
    }
}
//Keyboard support 
document.addEventListener("keydown", function (e)
{
    if (e.keyCode === 13) 
    {  
       //perform calculation
    }
    else if (e.which >= 96 && e.which <= 105 ) // numpad (0 to 9)
    {
        var ugh = String.fromCharCode(e.keyCode-48); //Numpad is misinterpreted so 48 is subrtacted to get correct key code
        screen.textContent += ugh;
        toBeEval.push(ugh);
    }
    else if (e.which >=106 && e.which <= 111 ) //numpad operators
    {
        screen.textContent += String.fromCharCode(e.which - 64); //Numpad is misinterpreted so 64 is subrtacted to get correct key code
        toBeEval.push(String.fromCharCode(e.keyCode - 64));
    }
    else if (e.which >= 48 && e.which <= 57) // NUMBAR ABOVE LETTER KEYS
    {
        screen.textContent += String.fromCharCode(e.which);
        toBeEval.push(String.fromCharCode(e.keyCode));
    }
});
function calc()
{  
	operandB = temp;
	temp = 0;
	document.getElementById("eqnDisplay").textContent = document.getElementById("inpNcalcDisplay").textContent;
    document.getElementById("inpNcalcDisplay").textContent = operate(currOperator, operandA, operandB);
//    alert(currOperator+ " " + operandA + " " + operandB) 
//    alert(operate(currOperator, operandA, operandB));
}
function operate(operator, a, b)
{	
	// var operandA, operatorA;
      // array.reduce((current, total) => total += current, 0);
    // for (var i = 0; i < arr.length; i++) 
    // {
    // 	if (!isNAN(arr[i])
    // 	{
    // 		operandA += arr[i];
    // 	}
    // 	else
    // 	{
    // 		if (arr[i] == "/" || arr[i] == "*" || arr[i] == "+" || arr[i] == "-" || arr[i] == "%")
    // 		{

    // 			 a
    // 		}
    // 	}
    // }
	if (operator == "/")
	{
		return divide(a,b);
	}
	else if (operator == "*")
	{
		return multiply(a,b);
	}
	else if (operator == "+")
	{
		return add(a,b);
	}
	else if (operator == "-")
	{
		return subtract(a,b);
	}
	else if (operator == "%")
	{
		return rem(a,b);
	}
}

function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return a - b;
}

function sum(array) {
  return array.reduce((current, total) => total + current, 0);
}

function multiply(a, b) {
	return a * b;
}
function multiplyMany(array) {
    return array.length
      ? array.reduce((accumulator, nextItem) => accumulator * nextItem)
      : 0;
}

function divide(a, b)
{
	return a / b;
}
function rem(a,b)
{
	return a % b;
}
function power(a, b) {
  return Math.pow(a, b);
}

function factorial(n) {
  if (n == 0) return 1;
  let product = 1;
  for (let i = n; i > 0; i--) {
    product *= i;
  }
  return product;
}

function clearScreen()
{
    screen.textContent = "";
    toBeEval = [];
}