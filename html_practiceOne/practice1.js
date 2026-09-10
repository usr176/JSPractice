document.getElementById("demo").innerHTML = "Hello from Javascript innerHTML !!!";

let numList = [1, 2, 3, 4, 23, 2, 3, 23, 89]
let noRepeat = []

for(let i = 0; i < numList.length; i++){
    let current = numList[i];
    if (!(noRepeat.includes(current))){
        noRepeat.push(current)
    }   
}
document.getElementById("noDupe").innerHTML = noRepeat

let count = 1;
function incCount(){
    count++;
    document.getElementById("BDiv").innerHTML = count;
}

function sayHello(){
    alert("Hello from javascript fuction");
}