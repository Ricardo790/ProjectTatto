
export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Tattoo {
  id: string;
  title: string;
  description: string;
  style: 'Realismo' | 'Tradicional' | 'Blackwork' | 'Minimalista';
  imageUrl: string;
}

export interface TattooIdea {
  title: string;
  description: string;
  style: string;
  placement_suggestion: string;
}

// Interface for Portfolio component items to fix import error in Portfolio.tsx
export interface PortfolioItem {
  id: string;
  type: string;
  url: string;
  title: string;
  category: string;
}
