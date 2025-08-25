export interface Material {
  name: string;
  url: string;
}

export interface Materials {
  [key: string]: Material[];
}
