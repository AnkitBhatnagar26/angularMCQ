import { Injectable } from '@angular/core';
import { QuestionArray } from '../QuestionArray';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  private isUserLoggedIn: boolean = false;
  private questionsData: QuestionArray[] = [];
  constructor() { }

  /**
   * Setting the loggedIn user
   */
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  /**
   * Getting the loggedIn user
   */
  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  /**
   * Setting the questions
   * @param questions 
   */
  setQuestionsData(questions: QuestionArray[]) {
    this.questionsData = questions
  }

  /**
   * Getting the questions
   */
  getQuestionsData() {
    return this.questionsData;
  }
}
