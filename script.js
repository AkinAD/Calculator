var screen = document.getElementById("inpNcalcDisplay");
var toBeEval = [], allOperator = [];
var ix=0;
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
     })
 }

for (var i =0; i < btnOperatorVal.length; i++)
 {
     btnOperatorVal[i].addEventListener('click', function(e)
     {
       
        screen.textContent += this.value;
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
    var opVal;
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

        console.log("she's here");
        console.table(allOperator)  
    
}


function assignValue(leOperator)
{ //Using BEDMAS - Brackets then Exponents then Division/Multiplication then Addition/Subtraction. 
   if (leOperator == '^'|| leOperator == '%') 
    {
        return 4;    
    }
    else if (leOperator == '*' || leOperator == '/' )
    {
        return 3;
    }
    else if (leOperator == '+' || leOperator == '-')
    {
        return 2;
    }
}

function roundTo(n, digits) 
{
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
        if( n < 0) {
        negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {    
        n = (n * -1).toFixed(2);
    }
    return n;
}
    
    function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}    
    
//Keyboard support 
document.addEventListener("keydown", function (e)
{   var keyID;
    if (e.keyCode === 13) 
    {  
      eventFire(document.getElementById('equal'), 'click');
       
    }
    else if (e.which >= 96 && e.which <= 105 ) // numpad (0 to 9)
    {
       eventFire(document.getElementById(e.code), 'click');

    }
    else if (e.which >=106 && e.which <= 111 ) //numpad operators
    {
        console.log(e.code);
        eventFire(document.getElementById(e.code), 'click');

    }
    else if (e.which >= 48 && e.which <= 57) // NUMBAR ABOVE LETTER KEYS
    {   var keyID;
        keyID = "Numpad" + String.fromCharCode(e.which);
       eventFire(document.getElementById(keyID), 'click');
    }
});

function calc()
{  
    doMath();
    console.log("After do math");
    console.table(toBeEval);
    document.getElementById("eqnDisplay").textContent = document.getElementById("inpNcalcDisplay").textContent;
    document.getElementById("inpNcalcDisplay").textContent = toBeEval[0][1];
}
function operate(operator, a, b)
{	
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
    if (b == 0)
    {
        return "Nice try! But answer is: "  + (a/b);    
    }
    else
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
//    allOperator = [];
//    isStillOperand = false; ix = 0; currOperator = "";
//    operandA, operandB, index, opVal, theOperator, result = "";
    
     allOperator = [];
    isStillOperand = false; ix = 0; 
    operandA = operandB = index =0;
    currOperator = theOperator = result = "";
}