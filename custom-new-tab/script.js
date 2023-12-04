function updateClock(){
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // var time = hours + ':' + minutes + ":" + seconds;
  var time = `${hours <10 ? "0" : ""}${hours}:${minutes <10 ? "0" : ""}${minutes}`;
  var clock = document.getElementById("clock");
  clock.innerHTML = time;    
}

setInterval(updateClock,1000);
