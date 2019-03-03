import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Question } from '../models/Question';
import { Answer } from '../models/Answer';
import { Person } from '../models/Person';

@Injectable({ providedIn: 'root' })
export class QuestionService {

    private questionsUrl = 'https://api.myjson.com/bins/dck5b';
    private answersUrl = 'https://api.myjson.com/bins/hildr';

    constructor(private http: HttpClient) { }

    getQuestions(): Observable<Question[]> {
        //get all questions
        //filter questions to remove invalid data eq Id is null
        return this.http.get<any>(this.questionsUrl)
            .pipe(
                map(response => response["feed_questions"]
                    .filter(question => question.Id != null)
                    .map(question => {
                        question.upvotes = question.upvotes || 0;
                        question.downvotes = question.downvotes || 0;
                        return question;
                    })),
                tap(_ => console.log('fetched questions')),
                catchError(this.handleError('getQuestions', []))
            );
    }

    getQuestionById(questionId: string): Observable<Question> {
        //get question by Id retrieves all questions, as it is the only
        //api available and retures the correct one with additional data cleanup
        return this.http.get<any>(this.questionsUrl)
            .pipe(
                map(response => {
                    let question = response["feed_questions"]
                        .find(question => question.Id == questionId);
                    question.upvotes = question.upvotes || 0;
                    question.downvotes = question.downvotes || 0;
                    return question;
                }),
                catchError(this.handleError('getQuestionsById', []))
            );
    }

    getAnswersForQuestion(questionId: string): Observable<Answer[]> {
        //get answer for question retrieves all questions, as it is the only
        //api available and returnes answers with additional data cleanup
        return this.http.get(this.answersUrl)
            .pipe(
                map(response => response["feed_answers"]
                    .filter(answer => answer["Question-Id"] === questionId && answer.Answer !== null)
                    .map(answer => {
                        if (typeof answer.created_by !== "object") {
                            answer.created_by = new Person(answer.created_by);
                        }
                        answer.created_at = new Date(answer.created_at).toLocaleDateString();
                        return answer;
                    })
                    .sort((a1, a2) => new Date(a1.created_at).getTime() - new Date(a2.created_at).getTime())),
                catchError(this.handleError('getAnswersForQuestions', []))
            );
    }

    addAnswer(questionId: string, answerText: string): Answer {
        // creates new Answer and returns it
        return {
            Answer: answerText,
            "Question-Id": questionId,
            Id: "A-X",
            upvotes: 0,
            downvotes: 0,
            created_at: new Date().toLocaleDateString(),
            created_by: new Person(true)
        }
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(operation, error);
            return of(result as T);
        };
    }

}
