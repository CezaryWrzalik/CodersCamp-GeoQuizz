import { doc } from 'prettier';
import { ModalWindow } from './ModalWindow';

export class Quiz {
  points;
  countriesInfo;
  shuffledCountries;
  actualCountry;
  acutalCountryId;
  modal;

  constructor(countriesList, modalW, continent) {
    this.countriesInfo = countriesList;
    this.shuffledCountries = countriesList.slice(0).sort(() => Math.random() - 0.5);
    this.points = 0;
    this.actualCountryId = 0;
    this.actualCountry = this.shuffledCountries[this.actualCountryId];
    this.modal = modalW;
    this.continent = continent;
  }

  startQuiz(context) {
    this.nextQuestion(context);
  }

  nextQuestion(context) {
    if (context.actualCountryId < context.shuffledCountries.length) {
      context.actualCountry = context.shuffledCountries[context.actualCountryId];
      let instruction = document.createElement('div');
      let instructionText = document.createElement('p');

      instructionText.innerHTML = `Find ${context.actualCountry.country}`;
      instruction.appendChild(instructionText);

      context.actualCountryId += 1;

      this.modal.replaceContent(instruction);
    } else {
      let summary = document.createElement('div');
      let summaryText = document.createElement('p');
      summaryText.innerHTML = `Congrats! You know  countries of ${context.continent}`;
      summary.appendChild(summaryText);

      this.modal.replaceContent(summary);
    }
  }

  addOnClickListeners = (toExecute, context) => {
    let toObserve = document.getElementsByClassName('country');
    for (var i = 0; i < toObserve.length; i++) {
      let id = toObserve[i].id;
      toObserve[i].addEventListener('click', () => toExecute(id, context));
    }
  };

  hasNextQuestion = () => {
    return this.actualCountryId === this.shuffledCountries.length;
  };

  addOnClickToSolution(context, toExecute) {
    let toFind = document.getElementById(context.actualCountry.country.toLowerCase());
    toFind.addEventListener('click', () => toExecute(toFind.id, context));
  }

  verifyAnswer(element, context) {
    if (element.id.replace("-"," ").toUpperCase() === context.actualCountry.country.toUpperCase()) {
      context.nextQuestion(context);
      context.checkMoreParts(element.id)
      element.classList.add('done');
    } else {
      element.classList.add('wrong');
      setTimeout(function () {
        element.classList.remove('wrong');
      }, 500);
    }
  }

  checkMoreParts(classToCheck) {
    const parts = document.getElementsByClassName(classToCheck)
    for(let i = 0 ; i < parts.length ; i++){
      parts[i].classList.add('done')
    }
  }
}
