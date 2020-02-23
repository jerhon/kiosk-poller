import { Resolve, Router } from '@angular/router';
import { Question, SurveyService } from '../survey.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QuestionResolver implements Resolve<Question> {
    
    constructor(private survey: SurveyService, private router: Router) {

    }
    
    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): Question | import("rxjs").Observable<Question> | Promise<Question> {
        const questionId = route.paramMap.get('questionId');
        let question: Question;
        if (questionId == 'random') {
            let questionId = this.survey.getRandomQuestionId('');
            this.router.navigate(['question', questionId]);
        } else {
            question = this.survey.getQuestion(questionId);
        }
        return question;
    }
    
}