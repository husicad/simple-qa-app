import { Component, OnInit } from '@angular/core';

import { Question } from '../../models/Question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'questions-list',
  templateUrl: './questions.component.html',
  styleUrls: ['../questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions: Question[];
  
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions()
      .subscribe(questions => this.questions = questions,
        error => console.error(error));
  }
}
