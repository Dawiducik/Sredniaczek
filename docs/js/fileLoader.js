var table = sessionStorage.getItem('table'), //pobiera wyciętą tabele z local storage
      tableContainer = document.createElement("div"); //tworzy nowy div z klasa container
  tableContainer.innerHTML = table; //przypisuje wewnętrzny html czyli wyciętą tabele do containera
  document.querySelector('.container').appendChild(tableContainer); //wrzuca do body kontener tabeli