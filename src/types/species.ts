// Interface para representar a estrutura de uma espécie, contendo informações como id, nome, categoria, descrição, URL da imagem, quantidade e localização (latitude, longitude, cidade e estado). Essa interface é utilizada para tipar os dados relacionados às espécies em toda a aplicação, garantindo consistência e facilitando o desenvolvimento com TypeScript.

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