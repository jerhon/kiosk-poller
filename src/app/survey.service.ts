import { Injectable } from '@angular/core';
import * as surveyQuestions from './survey-questions.json';
import { stringify } from 'querystring';

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
}

export interface Votes {
  [answerIndex: number]: number;
}


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor() { }

  // TODO: make a request as the application loads to get this from a JSON file in a public GIST
  questions: Question[] = surveyQuestions.questions;

  getRandomQuestionId(lastQuestionId: string): string {
    let questionId: string;

    do {  
      const id = Math.floor(Math.random() * this.questions.length);
      questionId = this.questions[id].id;
    } while (questionId == lastQuestionId)
    
    return questionId;
  }

  getQuestion(questionId: string) {
    return this.questions.find((q) => q.id == questionId);
  }

  // Maybe use indexed DB instead, as you get more space for questions.

  incrementVote(questionId: string, answerIndex: number) {
    let votes = this.getVotes(questionId);

    votes[answerIndex] = (votes[answerIndex] | 0) + 1;
    
    this.storeVotes(questionId, votes);
  }

  private storeVotes(questionId: string, votes: Votes) {
    localStorage.setItem('q.' + questionId, JSON.stringify(votes));
  }

  getVotes(questionId: string) : Votes {
    let value = localStorage.getItem('q.' + questionId);
    let answerCount : Votes = {};
    if (value) {
      answerCount = JSON.parse(value);
    }
    return answerCount;
  }

}
