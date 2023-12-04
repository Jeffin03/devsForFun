var number = 0;

function count(){
    number=number+1;
    var text=document.getElementById("counter"); 
     // document is the object that references to the html doc,
    //  getElementById is the method.
    
    text.innerHTML = number;
}

function countbck(){
    number = number-1;
    var text=document.getElementById("counter");
    text.innerHTML = number;
}

count();
countbck();