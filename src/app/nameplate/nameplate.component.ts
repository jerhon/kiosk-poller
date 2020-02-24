import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nameplate',
  templateUrl: './nameplate.component.html',
  styleUrls: ['./nameplate.component.scss']
})
export class NameplateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    timer(30000).subscribe((x) => this.router.navigate(['/question', 'random']));
  }

}
