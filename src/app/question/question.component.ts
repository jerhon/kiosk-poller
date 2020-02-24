import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Question, SurveyService } from '../survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  constructor(private survey: SurveyService, private route : ActivatedRoute, private router : Router) { }

  selectedAnswer: number | null;

  @Input()
  public question: Question;
  public countdown: number;
  private timer: Subscription;

  ngOnInit(): void {
    this.route.data.subscribe((d) => {
      this.question = d.question
      this.countdown = 30;
      this.selectedAnswer = null;
    });

    this.countdown = 30;

    this.timer = timer(1000, 1000).subscribe(() => this.onTick());
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  countdownWidth() {
    return (100 - (this.countdown / 30) * 100) + "%";
  }
  countdownColor() {
    if (this.countdown > 15) {
      return 'green';
    } else if (this.countdown > 5) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  onTick() {
    this.countdown -= 1;
    
    if (this.countdown <= 0) {
      this.returnHome();
    }
  }

  onSelect(i: number) {
    console.log('Selected answer: ' + i);
    this.selectedAnswer = i;
  }

  returnHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.survey.incrementVote(this.question.id, this.selectedAnswer);
    this.router.navigate(['results', this.question.id]);
  }
  
  onSkipQuestion() {
    this.router.navigate(['question', this.survey.getRandomQuestionId(this.question.id)]);
  }

}
