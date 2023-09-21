class Transaction {
    private readonly id: string;
    private readonly title: string;
    private readonly category: string;
    private readonly date: Date;
    private readonly description?: string;
    private readonly amount: number;
  
    constructor(
      id: string,
      title: string,
      category: string,
      date: Date,
      amount: number,
      description?: string
    ) {
      this.id = id;
      this.title = title;
      this.category = category;
      this.date = date;
      this.description = description;
      this.amount = amount;
    }
  
    getId(): string {
      return this.id;
    }
  
    getTitle(): string {
      return this.title;
    }
  
    getCategory(): string {
      return this.category;
    }
  
    getDate(): Date {
      return this.date;
    }
  
    getDescription(): string | undefined {
      return this.description;
    }
  
    getAmount(): number {
      return this.amount;
    }
}

export default Transaction;