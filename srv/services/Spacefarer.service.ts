import { Colors, Planets, SkillLevels, Spacefarer } from "../types";

export class SpacefarerService {
  private departmentTable = "my.galactic.spacefarer.Department";
  private positionTable = "my.galactic.spacefarer.Position";

  public async validateDepartment(payload: Spacefarer) {
    if (!payload.department_ID) throw new Error("No department_ID provided!");

    const departmentExists = await SELECT.one
      .from(this.departmentTable)
      .where({ ID: payload.department_ID });

    if (!departmentExists)
      throw new Error(
        `Department with ID ${payload.department_ID} not found!.`
      );
  }

  public async validatePosition(payload: Spacefarer) {
    if (!payload.position_ID) throw new Error("No position_ID provided!");

    const positionExists = await SELECT.one
      .from(this.positionTable)
      .where({ ID: payload.position_ID });

    if (!positionExists) {
      throw new Error(`Position with ID ${payload.position_ID} not found!.`);
    }
  }

  public validateSpacefarer(payload: Spacefarer) {
    this.validatePlanet(payload);
    this.validateSkill(payload);
    this.validateColor(payload);
  }

  private validateSkill(spacefarer: Spacefarer) {
    if (!spacefarer.wormholeNavigationSkill)
      throw new Error("No wormholeNavigationSkill_code provided!");

    if (!SkillLevels.includes(spacefarer.wormholeNavigationSkill)) {
      throw new Error(
        `wormholeNavigationSkill must be one of: ${SkillLevels.join(", ")}`
      );
    }
  }

  private validateColor(spacefarer: Spacefarer) {
    if (!Colors.includes(spacefarer.spacesuitColor)) {
      throw new Error(`Color must be one of: ${Colors.join(", ")}`);
    }
  }

  private validatePlanet(spacefarer: Spacefarer) {
    if (!Planets.includes(spacefarer.originPlanet)) {
      throw new Error(`Planet must be one of: ${Planets.join(", ")}`);
    }
  }
}
