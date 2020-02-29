import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Vote, SurveyService } from '../survey.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VotesResolver implements Resolve<Vote[]> {

    constructor(private survey: SurveyService, private route: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Vote[] {
        let questionId = route.paramMap.get('questionId');
        if (!questionId) {
            this.route.navigate(['/']);
        }
        return this.survey.getVotes(questionId);
    }
    
}