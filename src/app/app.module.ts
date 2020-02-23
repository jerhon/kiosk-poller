import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { PollResultsComponent } from './poll-results/poll-results.component';
import { QuestionResolver } from './question/question.resolver';
import { VotesResolver } from './poll-results/votes-resolver.service';
import { AppPageComponent } from './app-page/app-page.component';

const routes : Routes = [
  {
    path: 'question/:questionId',
    component: QuestionComponent,
    resolve: {
      question: QuestionResolver
    }
  },
  {
    path: 'results/:questionId',
    component: PollResultsComponent,
    resolve: {
      question: QuestionResolver,
      votes: VotesResolver
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    PollResultsComponent,
    AppPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
