(function(){
  'use strict';
  console.time("Skrypcik wykonał się w");
  var Subject = function Subject (name, gradeElements, endGrade) {
    this.name = name;
    this.grades = gradeElements;
    this.endGrade = endGrade;
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
    averagesAverage: 0,
    endGradeAverage: 0,
    parsing: function() {
      for(var i = 0; i < this.tableRecords.length; i++) {
        var ocenyCzastkowe = this.tableRecords[i].querySelector('td:nth-child(2)').querySelectorAll('span.masterTooltip.ocenaCzastkowa');
          for(var j = 0; j < ocenyCzastkowe.length; j++) {
            var grade = new Grade(ocenyCzastkowe[j]);
            if(grade.gradeValue) subjectsGrades.push(grade);
          }
        var endGrade = this.tableRecords[i].querySelector('td:nth-child(4)').innerHTML;
        var subject = new Subject(this.tableRecords[i].querySelector('td:nth-child(1)').innerHTML, subjectsGrades, parseInt(endGrade, 10));
        subjectsList.push(subject);
        subjectsGrades = [];
      }
    },
    math: function() {
      var averageCount = 0,
          averageAmount = 0,
          endGradeCount = 0,
          endGradeAmount = 0;
      for(var i = 0; i < subjectsList.length; i++) {
        var weightAmount = 0,
            gradesValuesAmount = 0,
            average = 0;
          for(var j = 0; j < subjectsList[i].grades.length; j++) {
            var el = subjectsList[i].grades[j];
            weightAmount+=el.gradeWeight;
            gradesValuesAmount+=el.gradeValue * el.gradeWeight;
          }
        average = (gradesValuesAmount/weightAmount).toFixed(2);
        subjectsList[i].average = average;
      }
      for(var i = 0; i < subjectsList.length; i++) {
        if(subjectsList[i].average !== "NaN") {
          averageCount++;
          averageAmount+=parseFloat(subjectsList[i].average);
        }
        if(!isNaN(subjectsList[i].endGrade)) {
          endGradeCount++;
          endGradeAmount+=subjectsList[i].endGrade;
        }
      }
      this.endGradeAverage = (endGradeAmount / endGradeCount).toFixed(4);
      this.averagesAverage = (averageAmount / averageCount).toFixed(4);
    },
    consoleRender: function() { // Pomocnicza funkcja do debugowania
      for(var i = 0; i < subjectsList.length; i++) {
        console.log(subjectsList[i]);
        for(var j = 0; j < subjectsList[i].grades.length; j++) {
          console.log(subjectsList[i].grades[j]);
        }
      }
      console.log("Średnia średnich: " + this.averagesAverage)
      console.log("Średnia ogólna: " + this.endGradeAverage);
    },
    render: function() {
      var tableHead = document.querySelector('thead tr'),
        averageTableHeadElement = document.createElement('th'),
        averageTableHeadElementInner = document.createTextNode('Średnia');
        document.querySelector('tbody').appendChild(document.createElement('tr'));
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
      for(var i = 0; i<5;i++) {
        document.querySelector('tbody tr:last-child').appendChild(document.createElement('td'))
      }
      if(isNaN(this.endGradeAverage)) this.endGradeAverage = '-';
      if(isNaN(this.averagesAverage)) this.averagesAverage = '-';
      document.querySelector('tbody tr:last-child td:nth-child(2)').innerHTML = '<h4>Obliczone średnie: </h4>';
      document.querySelector('tbody tr:last-child td:nth-child(4)').innerHTML = '<h4>' + this.endGradeAverage + '</h4>';
      document.querySelector('tbody tr:last-child td:nth-child(5)').innerHTML = '<h4>' + this.averagesAverage + '</h4>';
    },
    init: function() {
      this.parsing();
      this.math();
      this.render();
      //this.consoleRender();
    }
  }
  Sredniaczek.init();
  console.timeEnd("Skrypcik wykonał się w");
})();
