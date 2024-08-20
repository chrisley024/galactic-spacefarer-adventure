import { SkillLevel, Spacefarer } from "../types";

export class SpacefarerService {
  private departmentTable = "my.galactic.spacefarer.Department";

  public async validateDepartment(payload: Spacefarer) {
    const departmentExists = await SELECT.one
      .from(this.departmentTable)
      .where({ ID: payload.department_ID });

    if (!departmentExists)
      throw new Error(
        `Department with ID ${payload.department_ID} not found!.`
      );
  }

  /**
   * enhances wormhole skill and sawdust collection
   */
  public enhanceSkillAndSawDust(spacefarer: Spacefarer) {
    if (spacefarer.stardustCollection < 100) {
      spacefarer.stardustCollection = 100;
    }

    if (spacefarer.wormholeNavigationSkill === SkillLevel.LOW) {
      spacefarer.wormholeNavigationSkill = SkillLevel.MEDIUM;
    }
  }

  public emailNotification(spacefarer: Spacefarer) {
    console.log(
      `###################################\n Congrats ${spacefarer.name} on starting your adventurous journey!!!`
    );
  }

  private static ensureArray<T>(value: T | T[]): T[] {
    if (!Array.isArray(value)) return [value];
    return value;
  }

  public static asyncMap<T, S>(
    value: T | T[],
    callback: (values: T, index: number, array: T[]) => Promise<S>
  ): Promise<S[]> {
    value = this.ensureArray(value);
    if (value.length === 0) return Promise.resolve([]);
    return Promise.all(value.map(callback));
  }
}
