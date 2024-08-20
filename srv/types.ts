export enum SkillLevel {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export enum Color {
  RED = "Red",
  BLUE = "Blue",
  GRAY = "Gray",
}

export enum Planet {
  MARS = "Mars",
  VENUS = "Venus",
}

export type Spacefarer = {
  ID: string;
  name: string;
  stardustCollection: number;
  wormholeNavigationSkill: SkillLevel;
  originPlanet: Planet;
  spacesuitColor: Color;
  department_ID: string;
  cosmicMessage?: string;
  isAdmin?: boolean;
};

export type Department = {
  ID: string;
  name: string;
  position: string;
  spacefarers: Spacefarer[];
};
