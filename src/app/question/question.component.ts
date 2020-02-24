import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Question, SurveyService } from '../survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private survey: SurveyService, private route : ActivatedRoute, private router : Router) { }

  selectedAnswer: number | null;

  @ViewChild('countdown')
  public countdown: ElementRef<CountdownTimerComponent>;

  @Input()
  public question: Question;

  ngOnInit(): void {
    this.route.data.subscribe((d) => {
      this.question = d.question
      this.selectedAnswer = null;
      this.countdown.nativeElement.reset();
    });

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
    this.countdown.nativeElement.reset();
    this.router.navigate(['question', this.survey.getRandomQuestionId(this.question.id)]);
  }

}
