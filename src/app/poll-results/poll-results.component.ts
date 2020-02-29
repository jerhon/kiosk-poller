import { Component, OnInit, Input } from '@angular/core';
import { SurveyService, Votes, Question } from '../survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions } from 'chart.js';
import * as Chart from 'chart.js';



@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.scss']
})
export class PollResultsComponent implements OnInit {

  constructor(private survey: SurveyService, private route: ActivatedRoute, private router: Router) { }

  public question: Question;
  public votes: Votes;
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
    return this.question.answers.map((ans,idx) => ans.text + " - " + (this.votes[idx] | 0));
  }
  getColors() {
    return this.question.answers.map((ans, idx) => 'rgba(255,0,0,1)');
  }
  getResults() {
    return this.question.answers.map((ans,idx) => this.votes[idx] | 0);
  }


  ngOnInit(): void {
    this.route.data.subscribe((d) => {
      this.question = d.question;
      this.votes = d.votes;
    });
  }
  nextQuestion() {
    this.router.navigate(['question', this.survey.getRandomQuestionId(this.question.id)]);
  }
}
