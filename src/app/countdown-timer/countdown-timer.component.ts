import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    this.countdown = this.countdownLength;

    timer(1000, 1000).subscribe(() => {
      this.countdown -= 1
      if (this.countdown <= 0) {
        this.countdownFinished.next(this.countdown);
      }
    });
  }

  ngOnDestroy() {

  }

  @Input()
  public subtitle: string;

  @Input()
  public countdownLength: number;

  @Output()
  public countdownFinished: Subject<number> = new Subject<number>();

  countdown: number;
  
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
  reset() {
    this.countdown = this.countdownLength;
  }

}
