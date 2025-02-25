export interface InvestmentBenefitProportion {
    solutionName: string;
    proportion: number;
}

export interface InvestmentBenefitSummary {
    realInvestment: number;
    benefit: number;
}

export interface DepartmentTotalSolutions {
    department: string;
    solutions: number;
}

export interface GeneralStatusInsight {
    completed: number;
    onGoing: number;
    awaiting: number; 
    idea: number;
}