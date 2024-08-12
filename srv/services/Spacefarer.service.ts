import { Colors, Planets, SkillLevels, Spacefarer } from "../types";

export class SpacefarerService {
  private departmentTable = "my.galactic.spacefarer.Department";
  private positionTable = "my.galactic.spacefarer.Position";

  public async positionExists(payload: Spacefarer) {
    if (!payload.position_ID) throw new Error("No position_ID provided!");

    return await SELECT.one
      .from(this.positionTable)
      .where({ ID: payload.position_ID });
  }

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
        `wormholeNavigationSkill must be of: ${SkillLevels.join(", ")}`
      );
    }
  }

  private validateColor(spacefarer: Spacefarer) {
    if (!Colors.includes(spacefarer.spacesuitColor)) {
      throw new Error(`Color must be of: ${Colors.join(", ")}`);
    }
  }

  private validatePlanet(spacefarer: Spacefarer) {
    if (!Planets.includes(spacefarer.originPlanet)) {
      throw new Error(`Planet must be of: ${Planets.join(", ")}`);
    }
  }

  public sendCosmicNotification(spacefarer: Spacefarer) {
    console.log("\n############################################\n");
    console.log(`Sending cosmic notification to ${spacefarer.name}`);
    console.log(`Congratulations, ${spacefarer.name}!`);
    console.log(
      `You have successfully embarked on your cosmic journey with a stardust collection of ${spacefarer.stardustCollection} and a wormhole navigation skill of ${spacefarer.wormholeNavigationSkill}.\n`
    );
    console.log("############################################");
  }
}
