export enum SkillLevel {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}
export const SkillLevels = [SkillLevel.HIGH, SkillLevel.MEDIUM, SkillLevel.LOW];

export enum Color {
  RED = "Red",
  BLUE = "Blue",
  GRAY = "Gray",
}
export const Colors = [Color.RED, Color.BLUE, Color.GRAY];

export enum Planet {
  MARS = "Mars",
  VENUS = "Venus",
}

export const Planets = [Planet.MARS, Planet.VENUS];

export type Spacefarer = {
  ID: string;
  name: string;
  stardustCollection: number;
  wormholeNavigationSkill: SkillLevel;
  originPlanet: Planet;
  spacesuitColor: Color;
  department_ID: string;
  position_ID: string;
  cosmicMessage?: string;
};

export type Department = {
  ID: string;
  name: string;
  spacefarers: Spacefarer[];
};

export type Position = {
  ID: string;
  title: string;
  department_ID: string;
  spacefarers: Spacefarer[];
};
