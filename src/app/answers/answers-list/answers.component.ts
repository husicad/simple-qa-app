import { Component, OnInit, Input } from '@angular/core';

import { Answer } from '../../models/Answer';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'answers-list',
  templateUrl: './answers.component.html',
  styleUrls: ['../answers.component.css']
})

export class AnswersComponent implements OnInit {

  @Input() id: string;
  answers: Answer[];
  vote: number = 0;
  answerText: string = "";

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getAnswers(this.id);
  }

  getAnswers(id: string): void {
    this.questionService.getAnswersForQuestion(id)
      .subscribe(answers => { this.answers = answers; console.log(this.answers) },
        error => error.log(error));
  }

  add(): void {
    if (!this.answerText.length) return;

    let answer = this.questionService.addAnswer(this.id, this.answerText)
    this.answers.unshift(answer)
    this.answerText = "";
  }
}
