import { ApplicationService, Request } from "@sap/cds";
import { SpacefarerService } from "./services/Spacefarer.service";
import { SkillLevel, Spacefarer } from "./types";

export default class GalacticSpacefarerService extends ApplicationService {
  init(): Promise<void> {
    const { Spacefarer } = this.entities;
    const spacefarerService = new SpacefarerService();

    this.before(
      ["CREATE", "UPDATE", "PATCH"],
      Spacefarer,
      async (req: Request) => {
        const payload = req.data as Spacefarer;

        if (payload.stardustCollection < 0) {
          req.error(400, "Stardust collection cannot be negative!");
        }

        try {
          spacefarerService.validateSpacefarer(payload);
        } catch (error: any) {
          req.reject(400, error.message);
        }
      }
    );

    this.before("CREATE", Spacefarer, async (req: Request) => {
      if (req?.user.id !== "admin") {
        req.reject(403, " You're Forbidden to perform this action!");
      }

      const spacefarer = req.data as Spacefarer;
      try {
        await spacefarerService.validateDepartment(spacefarer);
        await spacefarerService.validatePosition(spacefarer);
      } catch (error: any) {
        req.reject(400, error.message);
      }

      // Enhance stardust collection & Skill
      if (spacefarer.stardustCollection < 100) {
        spacefarer.stardustCollection = 100;
      }

      if (spacefarer.wormholeNavigationSkill === SkillLevel.LOW) {
        spacefarer.wormholeNavigationSkill = SkillLevel.MEDIUM;
      }
    });

    this.after("CREATE", Spacefarer, async (data) => {
      const spacefarer = data as Spacefarer;
      // Simulate sending a notification
      data.cosmicMessage = `Congrats ${spacefarer.name} on starting your adventurous journey!!!`;

      console.log(
        `###################################\n cosmicMsg sent to ${spacefarer.name}: `,
        spacefarer.cosmicMessage
      );
    });

    this.before("READ", Spacefarer, async (req: any) => {
      const userPlanet = req.user.attr.planet;

      // User sees only data from their planet
      if (userPlanet) {
        req.query.SELECT.where = [
          { ref: ["originPlanet"] },
          "=",
          { val: userPlanet },
        ];
      }
    });

    this.before("DELETE", Spacefarer, async (req: Request) => {
      if (req?.user.id !== "admin") {
        req.reject(403, "You're Forbidden to perform this action!");
      }
    });

    return super.init();
  }
}
