import { Component, OnInit, Input } from '@angular/core';
import { SurveyService, Votes, Question } from '../survey.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.scss']
})
export class PollResultsComponent implements OnInit {

  constructor(private survey: SurveyService, private route: ActivatedRoute, private router: Router) { }

  public question: Question;
  public votes: Votes;

  ngOnInit(): void {
    this.route.data.subscribe((d) => {
      this.question = d.question;
      this.votes = d.votes;
    });
  }

  maxVotes() {
    if (this.votes) {
      let keys = Object.getOwnPropertyNames(this.votes);
      if (keys.length > 0) {
        return keys.map((k) => this.votes[k]).reduce((pv, cv) => Math.max(pv, cv));
      } else {
        return 0;
      }
    }
    else {
      return 0;
    }
  }

  barSize(idx: number) {
    if ( this.maxVotes() && this.votes[idx] ) {
      return (this.votes[idx] / this.maxVotes() * 100) + '%';
    } else {
      return '200px';
    }
  }

  nextQuestion() {
    this.router.navigate(['question', this.survey.getRandomQuestionId(this.question.id)]);
  }

  getVotes(i: number) {
    return this.votes[i] | 0;
  }

}
