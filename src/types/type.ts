export type CardItem = {
  id: number;
  word: string;
  category: string;
  definition: string;
  example: string;
  memoryProcess: string;
  hide: boolean;
  options: [
    {
      definition: string;
      isCorrect: boolean;
    }
  ];
};