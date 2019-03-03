import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions-list/questions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionComponent } from './questions/question/question.component';
import { AnswerComponent } from './answers/answer/answer.component';
import { AnswersComponent } from './answers/answers-list/answers.component';
import {MaterialModule} from '../material-module';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    AnswerComponent,
    AnswersComponent,
    QuestionsComponent,
    QuestionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
