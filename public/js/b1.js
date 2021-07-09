

// var ad=setInterval(change,20);
var i;
var x;
function change(){
var arr= ["yellow", "red", "green", "#a278b5", "orange", "pink", "black","#cd4dcc","#d77fa1","#46185f"];
document.getElementById("block1").style.backgroundColor=arr[Math.floor(Math.random()*10)];
}
