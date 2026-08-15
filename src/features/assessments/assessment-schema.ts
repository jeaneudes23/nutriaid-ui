import { Child } from "../children/children-schema";

export interface Assessment {
  _id: string;
  childId: Child;
  caregiverId: string;
  measuredAt: Date;
  weightKg: number;
  heightCm: number;
  muacCm: number;
  exclusiveBreastfeeding: null;
  dietaryIntakeHistory: string;
  healthAndMedicalBackground: string;
  feedingChallenges: string;
  allergiesAndPreferences: string;
  householdContext: string;
  ageMonthsAtMeasurement: number;
  nutritionalStatus: string;
  predictionProbabilities: PredictionProbabilities;
  bmi: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  insight: Insight;
  foodRecommendations: FoodRecommendation[];
}

export interface FoodRecommendation {
  _id: string;
  assessmentId: string;
  childId: string;
  caregiverId: string;
  name: string;
  why: string;
  ingredients: string[];
  howToPrepare: string;
  priority: number;
  batchId: string;
  note: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Insight {
  title: string;
  body: string;
}

export interface PredictionProbabilities {
  Healthy: string;
  Stunting: string;
  Wasting: string;
}

