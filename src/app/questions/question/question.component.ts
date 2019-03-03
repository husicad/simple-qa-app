import { Component, OnInit, Input } from '@angular/core';

import { Question } from '../../models/Question';
import { QuestionService } from '../../services/question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    styleUrls: ['../questions.component.css']
})
export class QuestionComponent implements OnInit {

    @Input() question: Question;
    vote: number = 0;

    questionDetailPage: boolean = false;

    constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

    ngOnInit() {
        this.questionDetailPage = !this.question;
        if (!this.question) { this.getQuestion(this.route.snapshot.params.id) }
    }

    getQuestion(questionId: string): void {
        this.questionService.getQuestionById(questionId)
            .subscribe(
                question => this.question = question,
                error => console.error(error));
    }

    upvote(): void {
        //handle if user has already voted and update data
        if (this.vote == -1) {
            this.question.upvotes++;
            this.question.downvotes--;
        } else if (this.vote == 1) {
            this.question.upvotes--;
        } else if (this.vote == 0) {
            this.question.upvotes++;
        }
        this.vote == 1 ? this.vote = 0 : this.vote = 1;
    }

    downvote(): void {
        //handle if user has already voted and update data
        if (this.vote == 1) {
            this.question.downvotes++;
            this.question.upvotes--;
        } else if (this.vote == -1) {
            this.question.downvotes--;
        } else if (this.vote == 0) {
            this.question.downvotes++;
        }
        this.vote == -1 ? this.vote = 0 : this.vote = -1;
    }
}
