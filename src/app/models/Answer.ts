import { Person } from "./Person";

export class Answer {
  Id: string;
  "Question-Id": string;
  Answer: string;
  upvotes?: number = 0;
  downvotes?: number = 0;
  created_at: string = Date.now().toLocaleString();
  created_by: Person = new Person(false);
}