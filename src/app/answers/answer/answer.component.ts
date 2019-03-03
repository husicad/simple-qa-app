import { Component, Input } from '@angular/core';
import { Answer } from '../../models/Answer';

@Component({
    selector: 'answer',
    templateUrl: './answer.component.html',
    styleUrls: ['../answers.component.css']
})

export class AnswerComponent {

    @Input() answer: Answer;
    avatar = "https://cdn4.iconfinder.com/data/icons/follower/512/login-man-person-human-body-512.png";

    constructor() { }

}
