export interface JokesResponse {
  result: Result[];
  total: number;
}

export interface Result {
  created_at: Date;
  updated_at: Date;
  categories: string[];
  icon_url: string;
  url: string;
  id: string;
  value:string
};
