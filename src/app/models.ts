export interface ICategory {
    Id: number,
    descrip: string,
    active: boolean
}

export interface IExpense {
    id: number,
    date: Date,
    amount: number,
    descrip: string,
    category: ICategory,
    active: boolean
}
export interface IIncome {
    id: number,
    date: Date,
    amount: number,
    descrip: string,
    mode: string,
    confirmed: boolean,
    active: boolean
}

export interface ISummary {
    frec: string,
    budget: number,
    daily_budget: number,
    inicio: Date,
    fin: Date,
    savings: number,
    incomes_nc: number,
    incomes: number,
    expenses: number,
    daily_expenses: number,
}
