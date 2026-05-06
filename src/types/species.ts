export interface Species {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl?: string;
  quantity: number;
  latitude?: number;
  longitude?: number;
  city?: string;   
  state?: string; 
}