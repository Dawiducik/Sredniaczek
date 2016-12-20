'use strict';
console.time("test");
var Subject = function Subject (name, gradeElements) {
  this.name = name;
  this.grades = gradeElements;
  this.average = 0;
}
var Grade = function Grade(element) {
  this.element = element;
  this.gradeValue = 0;
  this.gradeWeight = 0;
  this.getGradeValue = function(element) {
    var innerElement = element.innerHTML,
        liczba = parseInt(innerElement, 10);
    if(isNaN(liczba) || liczba > 6 || liczba < 0) {
      return false;
    }
    else {
      switch(innerElement[1]) {
          case '+':
            liczba += 0.25;
            return liczba;
          case '-':
            liczba -= 0.25;
            return liczba;
          default:
            return liczba;
      }
    }
  }
  this.getGradeWeight = function(element) {
    var altAttribute = element.getAttribute('alt'),
      weightStringIndex = altAttribute.indexOf("Waga: ");
    return parseInt(altAttribute.slice(weightStringIndex + 6, weightStringIndex + 7), 10);
  }
  if(this.getGradeValue(element)) {
    this.gradeValue = this.getGradeValue(element);
    this.gradeWeight = this.getGradeWeight(element);
  } else {
    this.gradeValue = false;
    this.gradeWeight = false;
  }
}
var subjectsList = [],
  subjectsGrades = [];
var Sredniaczek = {
  tableRecords: document.querySelectorAll("tbody tr"),
  init: function() {
    this.tableRecords.forEach(function(el) {
    var ocenyCzastkowe = el.querySelector('td:nth-child(2)').querySelectorAll('span.masterTooltip.ocenaCzastkowa');
      ocenyCzastkowe.forEach(function(el) {
        var grade = new Grade(el);
        if(grade.gradeValue) subjectsGrades.push(grade);
      });
    var subject = new Subject(el.querySelector('td:nth-child(1)').innerHTML, subjectsGrades);
    subjectsList.push(subject);
    subjectsGrades = [];
    });
    this.math();
  },
  math: function() {
    subjectsList.forEach(function(el) {
      var weightAmount = 0,
          gradesValuesAmount = 0,
          average = 0;
        el.grades.forEach(function(el) {
          weightAmount+=el.gradeWeight;
          gradesValuesAmount+=el.gradeValue * el.gradeWeight;
        });
      average = (gradesValuesAmount/weightAmount).toFixed(2);
      el.average = average;
    });
    //this.consoleRender();
    this.render();
  },
  consoleRender: function() { // Pomocnicza funkcja do debugowania
    subjectsList.forEach(function(el) {
      console.log(el);
        el.grades.forEach(function(el) {
          console.log(el);
        });
    });
  },
  render: function() {
    var tableHead = document.querySelector('thead tr'),
      averageTableHeadElement = document.createElement('th'),
      averageTableHeadElementInner = document.createTextNode('Średnia');
      averageTableHeadElement.appendChild(averageTableHeadElementInner);
      tableHead.appendChild(averageTableHeadElement);
    
    for(var i = 0; i < this.tableRecords.length; i++) {
      var td = document.createElement('td');
      if(!isNaN(subjectsList[i].average)) {
        var tdInner = document.createTextNode(subjectsList[i].average);
      } else {
        var tdInner = document.createTextNode(' - ');
      }
        td.appendChild(tdInner);
        this.tableRecords[i].appendChild(td);
    }
  }
}
Sredniaczek.init();

console.timeEnd("test");
