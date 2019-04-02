var screen = document.getElementById("inpNcalcDisplay");
var toBeEval = [], allOperator = [];
var ix=0, jy=0;
var btnOperandVal = Array.from(document.querySelectorAll('.operand'));
var btnOperatorVal = Array.from(document.querySelectorAll('.operator'));
var currOperator = "";
var	operandA, operandB, index, opVal, theOperator, result = "";
var isStillOperand = false;
for (var i =0; i< btnOperandVal.length; i++)
 {
     btnOperandVal[i].addEventListener('click', function(e)
     {
        screen.textContent += this.value;
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

for (var i =0; i < btnOperatorVal.length; i++)
 {
     btnOperatorVal[i].addEventListener('click', function(e)
     {
       
        screen.textContent += this.value;
      //  operatorCount += 1;
        currOperator = this.value;
        if ( currOperator == "-")
        {
            currOperator = "+";
            toBeEval.push(['operator',currOperator]);
            allOperator.push([toBeEval.length-1, assignValue(currOperator), currOperator])
          
            toBeEval.push(['operand', "-"]);
            isStillOperand = true;
            ix = toBeEval.length-1;
            console.table(toBeEval);
            console.table(allOperator); 
            //remember to prevent users from entering multiple operators at once 
        }
         else
             {
                 toBeEval.push(['operator',currOperator]);
                 allOperator.push([toBeEval.length-1, assignValue(this.value), this.value])
                 isStillOperand = false;
                 console.table(toBeEval);
                 console.table(allOperator);
             }
         
     })
 }
 
//function arrParser()
//{
//    // loop the outer array
//    for (var i = 0; i < toBeEval.length; i++)
//    {
//        // get the size of the inner array
//        var innerArrayLength = toBeEval[i].length;
//        // loop the inner array
//        for (var j = 0; j < innerArrayLength; j++) 
//        {
//             if(toBeEval[i][0] == "operator")
//             { 
//                
//                 
//             }
//        }
//        
//    }
//}
function updateOperatorList()
{   
    allOperator=[]; var updateTo;
    for (var i=0; i < toBeEval.length; i ++)
    {  
            
            if (toBeEval[i][0] == 'operator')
            {
                updateTo = toBeEval[i][1];
                allOperator.push([i, assignValue(updateTo), updateTo])
            }
    }
}




function assignCalc()
{
            currOperator = theOperator;
            operandA = toBeEval[index-1][1];
            operandB = toBeEval[index+1][1];
            result = operate(currOperator, operandA, operandB);
            console.log("before splice");
            console.table(toBeEval); 
            toBeEval.splice(index-1, 2);
            toBeEval[index-1][1] = result;
            updateOperatorList();
            console.log("after splice");
            console.table(toBeEval);
            console.log(currOperator); console.log(operandA); console.log(operandB);
}
function solvePriority(pri)
{ 
    if (allOperator.length >=1)
    {    var i = allOperator.length - 1;
        for (i ;i >= 0; i--)
        {
            opVal = allOperator[i][1];
            
            if(opVal == pri)
            {    console.log("index before: "+ index)
                index = allOperator[i][0];
                console.log("index after: "+ index)
                theOperator = allOperator[i][2];
                console.log("atleast we got here");        
                assignCalc();
                console.log("before operator spice")
                console.table(allOperator);                
             //   allOperator.splice(i,1);
                 console.log("After operator spice")
                console.table(allOperator);
              //  i--;
             //  i = allOperator.length -1;
                //splice element out
                         //rerun and find others 
            }  
           // else return;
         }
    }
    else return;
}
function doMath()
{  
   // var x = allOperator.length - 1;
    console.log("before while loop");
//    console.log(x);
//    console.log(allOperator[x][0], allOperator[x][1], allOperator[x][2])
    while ( allOperator.length - 1 >= 0)
    {
        solvePriority(4);
        solvePriority(3);
        solvePriority(2);
        solvePriority(1);
       
        
    }
        
//        if(opVal == 4 )  
//        {
//            assignCalc();
//        }
//        else if(opVal == 3 )  
//        {
//            assignCalc();
//        }
//        else if(opVal == 2 )  
//        {
//            assignCalc();
//        }
//        else if(opVal == 1 )  
//        {
//             assignCalc();
//        }
        //var x = allOperator.length - 1;
        console.log("she's here");
        console.table(allOperator)  
    
}


function assignValue(leOperator)
{ //Using BEDMAS - Brackets then Exponents then Division/Multiplication then Addition/Subtraction. 
   if (leOperator == '^') 
    {
        return 4;    
    }
    else if (leOperator == '*' || leOperator == '/' || leOperator == '/')
    {
        return 3;
    }
    else if (leOperator == '+' || leOperator == '-')
    {
        return 2;
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
    doMath();
    console.log("After do math");
    console.table(toBeEval);
    document.getElementById("eqnDisplay").textContent = document.getElementById("inpNcalcDisplay").textContent;
    document.getElementById("inpNcalcDisplay").textContent = toBeEval[0][1];
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
  return a - b ;
}
function otherSubtract(a, b) {
  return parseFloat(a) + (Math.abs(parseFloat(b)) * -1) ;
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
    allOperator=[];
}