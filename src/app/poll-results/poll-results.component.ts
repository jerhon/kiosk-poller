import { Component, OnInit, Input } from '@angular/core';
import { SurveyService, Vote, Question } from '../survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions } from 'chart.js';
import * as Chart from 'chart.js';
import * as _ from 'underscore';


@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.scss']
})
export class PollResultsComponent implements OnInit {

  constructor(private survey: SurveyService, private route: ActivatedRoute, private router: Router) { }

  public question: Question;
  public votes: Vote[];
  public chartOptions: ChartOptions = {
    responsive: false,
    legend: {
      position: 'right',
      labels: {
        fontSize: 20,
        fontColor: 'white',
        fontFamily: 'Oxanium'
      }
    }
  };
  
  getLabels() {
    return this.votes.map((ans) => ans.answer + " - " + ans.votes);
  }
  getColors() {
    return this.votes.map((ans, idx) => 'rgba(255,0,0,1)');
  }
  getResults() {
    return this.votes.map((v) => v.votes);
  }


  ngOnInit(): void {
    this.route.data.subscribe((d) => {
      this.question = d.question;
      this.votes = _.sortBy(d.votes, (v) => v.votes).reverse();
    });
  }
  nextQuestion() {
    this.router.navigate(['question', this.survey.getRandomQuestionId(this.question.id)]);
  }
}
