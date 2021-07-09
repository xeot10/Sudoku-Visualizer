// animation

var t1=0.2;
var t2=0.3;
var t3=0.4;
var t4=0.5;
var t5=0.9;
var t6=1.1;

var id =setInterval(frame,30);

var arr = [];
var pos = [];
var i;
for(i=1;i<41;i++){

  arr.push(document.getElementById("c"+i));
  pos.push(parseFloat(arr[i-1].style.marginLeft));

}

function frame(){
  var i;
  for(i=0;i<40;i++){

  if(pos[i]<0){
      pos[i]=parseFloat(screen.width+Math.floor(Math.random()*200));

  }
  else{
    if(i<8){
      pos[i]=pos[i]-t1;
    }
    else if (i<15) {
      pos[i]=pos[i]-t2;

    }
    else if (i<25){
      pos[i]=pos[i]-t3;
      }
    else if(i<33){
      pos[i]=pos[i]-t4;
      }

    else{
      pos[i]=pos[i]-t5;

  }
  arr[i].style.marginLeft= pos[i] +"px";
}
}
// t1=t1+0.3;
// t2=t2+0.3;
// t3=t3+0.3;
// t4=t4+0.3;
// t5=t5+0.3;
}
