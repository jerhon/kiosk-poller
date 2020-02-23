import { Resolve, Router } from '@angular/router';
import { Votes, SurveyService } from '../survey.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VotesResolver implements Resolve<Votes> {

    constructor(private survey: SurveyService, private route: Router) { }

    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): Votes | import("rxjs").Observable<Votes> | Promise<Votes> {
        let questionId = route.paramMap.get('questionId');
        if (!questionId) {
            this.route.navigate(['/']);
        }
        return this.survey.getVotes(questionId);
    }
    
}