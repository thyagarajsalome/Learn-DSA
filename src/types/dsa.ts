export interface DSACodeSnippet {
  language: string;
  code: string;
}

export interface DSAQuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface DSATopic {
  id: string;
  title: string;
  difficulty: "Fundamental" | "Medium" | "Advanced";
  explanation: string;
  useCases: string[];
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  examTips: string[];
  codeSnippets: DSACodeSnippet[];
  quiz: DSAQuizQuestion[];
}