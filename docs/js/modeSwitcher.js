
var table = document.querySelector('table'),
    button = document.querySelector('#modeSwitcher'), 
    body = document.querySelector('body'),
    spans = document.querySelectorAll('span');

button.addEventListener('click', function(){
  if(table.classList && table.classList.contains('table-inverse')) { 
    table.classList.remove('table-inverse');
    body.setAttribute('style', 'background-color: #fff');
    colorChanger("black");
  } else { 
    table.classList.add('table-inverse'); 
    body.setAttribute('style', 'background-color: #242728');
    colorChanger("white");
  }
});
function colorChanger(color) {
  if(color === "white") {
    spans.forEach(function(el) {
      if(el.style.color === "rgb(0, 0, 0)") {
        el.setAttribute('style','color: #fff');
      } 
    });
  }
  else {
    spans.forEach(function(el) {
      if(el.style.color === "rgb(255, 255, 255)")
      el.setAttribute('style','color: #000');
    });
  }
}

