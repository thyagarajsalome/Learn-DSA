export interface DSATopic {
  id: string;
  title: string;
  difficulty: "Fundamental" | "Medium" | "Advanced";
  explanation: string;
  useCases: string[];
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
}