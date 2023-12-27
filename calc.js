const bCon = document.querySelector('#btnContainer');
const operation = document.querySelector('#displayText');
const equation = operation.textContent;
const vals = [7,8,9,'/',4,5,6,'*',1,2,3,'-',0,'.','=','+'];
vals.map(val => btnMaker(val));
let decimalUsed = false;
const clear = document.querySelector('#clear');
const del = document.querySelector('#del');
function btnMaker(val){
    const btn = document.createElement('button');
    btn.addEventListener('click',() => { add(val) });
    btn.setAttribute('class','Cbtn');
    btn.textContent = val;
    bCon.appendChild(btn);
}

function add(val){
    
    if (val == '.'){
        if(decimalUsed == false){
            if( operation.textContent == '_') {
                operation.textContent = val;
            }
            else{
            operation.textContent += val;}
            decimalUsed = true;
        }
    }
    else if (val == '='){
        operation.textContent = operate(operation.textContent.toString());}
    else{
        if( operation.textContent == '_') {
            operation.textContent = val;
        }
    else
    operation.textContent += val;}
    
}
function operate(func){
    if(func == '_' ||func == '0' ||func == null){return func.toString();}

    console.log("EQUATION: " + func);
    let result = null;
    // iterate by char, if operand add to operand array, if operator add to operator array, if % multiply prev operand by 0.01 & add to operand array, if . is present in operand mark a flag as true to prevent further . insertions then, add the floating point val as one elemnet into the array.
    const operandArr = findOperand(func);
    const operatorArr =  findOperator(func);
    if(operatorArr.length<=0){
        return func.toString();
    }
   while(operatorArr.length > 0){
    console.log("ARRAYS: " + operandArr.toString(),operatorArr.toString());
    let operand1 = operandArr.shift();
    let operand2 = operandArr.shift();
    let operator = operatorArr.shift();
    console.log("OPERANDS: " + operand1 + " " + operand2 + " OPERATOR: " + operator);
    operandArr.unshift(solve(operand1,operand2,operator));
    }
    return operandArr.pop().toString();

}

function findOperand(func){
    if(!func) {
        console.error('Invalid argument passed to findOperand');
        return [];
    }
    const operand = [];

    for(let i = 0; i < func.length; i++){
     //   console.log("OPERAND ITERATION: " + i + " SLICE: " + func.slice(i,i+1));
        if("123456789.%".includes(func.slice(i,i+1))){
                    let res = '';
                    while (i<func.length && !"*/+-()".includes(func.slice(i,i+1))){
                        if(func.slice(i,i+1) == '%'){
                            res = parseFloat(res) * 0.01;
                        }
                        else{
                        res += func.slice(i,i+1);}
                        i++;
                    }
                    console.log("RESULT: " + res);
                    operand.push(parseFloat(res));
                }

            }
    parseFloat(operand);
    console.log("FOUND OPERANDS: " +operand.toString());
    return operand;
}
function findOperator(func){
    const operator = [];

    for(let i = 0; i < func.length; i++){
    //    console.log("OPERATOR ITERATION: " + i + " SLICE: " + func.slice(i,i+1));
        if("+-/*()".includes(func.slice(i,i+1))){
            operator.push(func.slice(i,i+1));
        }
    }
    console.log("FOUND OPERATORS: " +operator.toString());
    return operator;
}

function solve(operand1, operand2, operator){
    let result = null;
    if(operator == '+'){
        console.log("ADDITION");
        result = operand1 + operand2;
    }
    else if(operator == '-'){
        console.log("SUBTRACTION");
        result = operand1 - operand2;
    }
    else if(operator == '*'){
        console.log("MULTIPLICATION");
        result = operand1 * operand2;
    }
    else if(operator == '/'){
        console.log("DIVISION");
        if (operand2 == 0){
            console.error("r u dum bud");
            return "ERROR";
        }
        result = operand1 / operand2;
    }
    console.log(operand1 + operator + operand2 + "=" + result);
    return result;
}
clear.addEventListener('click',() => {clr()});
del.addEventListener('click',() => {remove()});
function clr(){
    if(operation.textContent.includes('.')){decimalUsed=false;}
    operation.textContent = '_';
}
function remove(){
    if(operation.textContent.includes('.')){decimalUsed=false;}
    operation.textContent = operation.textContent.slice(0,-1);
    if(operation.textContent == ''){operation.textContent = '_';}
}