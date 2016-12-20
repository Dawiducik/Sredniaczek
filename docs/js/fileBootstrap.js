'use strict';
var fileInput = document.querySelector('#myfileinput'),
    uploadButton = document.querySelector('#save'),
    label = document.querySelector('label');
uploadButton.addEventListener('click', function () {
  if (!window.FileReader) {
    alert('Nie kompatybilna przeglądarka!');
    return false;
  }
  var fileList = fileInput.files,
      numFiles = fileList.length;
  var reader = new FileReader(); //Stworzenie obiektu render
  if (fileInput.files.length) { // idzie dalej jeśli plik nie jest pusty
    var textFile = fileInput.files[0]; // wzięcie pliku
    reader.readAsText(textFile); // "konwertowanie" do textu
    reader.onload = function (event) {
      var file = event.target.result,
          tableStart, tableEnd, table, span;
      if (file && file.length) {
        span = file.indexOf('class="ocenaCzastkowa masterTooltip"');
        console.log(span);
        if(span === -1) {
          label.innerHTML = "Nie znaleziono ocen!";
          label.setAttribute('style', 'background-color: #d3394c');
          document.querySelector('input#save').classList.add('hidden');
        }
        else {
          tableStart = file.indexOf('<table class="ocenyZwykle-table">'); //szuka gdzie zaczyna sie tabela
          tableEnd = file.indexOf("</main>"); //ten element jest tuz po zakonczeiu tabeli
          table = file.slice(tableStart, tableEnd); //wycina kod między rozpoczeciem i zakonczeniem
          sessionStorage.setItem('table', table); //zapisanie wyciętej tabeli 
          location = "file.html"; // redirect do kolejnego pliku
        }
      }
    }
  }
  else {
    alert('Załaduj plik przed klikaniem')
  }
}, false);
fileInput.addEventListener('change', function() {
  var value = fileInput.value,
      ext = value.slice(value.length - 5, value.length);
  if(ext === '.html') {
    label.setAttribute('style', 'background-color: green');
    label.innerHTML = fileInput.files[0].name;
    document.querySelector('input#save').classList.remove('hidden');
  }
  else {
    label.setAttribute('style', 'background-color: #d3394c');
    label.innerHTML = 'Złe rozszerzenie!';
    document.querySelector('input#save').classList.add('hidden');
  }
}, false);

