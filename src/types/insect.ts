export interface CropInsectData {
  id: number;
  commonName: string;
  scientificName?: string;
  insects: {
    name: string;
    effect: string;
  }[];
  solution: string[];
  prevention?: string[];
  biologicalControl?: string[];
}
