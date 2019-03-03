export class Question {

  constructor(public Id: string,
    public Text: string,
    public upvotes: number = 0,
    public downvotes: number = 0
  ) { }
}
