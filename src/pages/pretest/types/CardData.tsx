export interface CardData extends ApiCardData {
  sport: string;
  imageUrl: string | null;
}

export interface ApiCardData {
  city: string;
  distanceKm: number;
  time: string;
}
