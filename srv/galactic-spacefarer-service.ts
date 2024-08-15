import { ApplicationService, Request } from "@sap/cds";
import { SpacefarerService } from "./services/Spacefarer.service";
import { Spacefarer } from "./types";

export default class GalacticSpacefarerService extends ApplicationService {
  init(): Promise<void> {
    const { Spacefarer } = this.entities;
    const spacefarerService = new SpacefarerService();

    this.before(
      ["CREATE", "UPDATE", "PATCH"],
      Spacefarer,
      async (req: Request) => {
        const payload = req.data as Spacefarer;

        try {
          spacefarerService.validateSpacefarer(payload);
        } catch (error: any) {
          req.reject(400, error.message);
        }
      }
    );

    this.before("CREATE", Spacefarer, async (req: Request) => {
      if (!req.user.is("admin")) {
        req.reject(403, " You're Forbidden to perform this action!");
      }

      const spacefarer = req.data as Spacefarer;
      try {
        await spacefarerService.validateDepartment(spacefarer);
        await spacefarerService.validatePosition(spacefarer);
        spacefarerService.enhanceSkillAndSawDust(spacefarer);
      } catch (error: any) {
        req.reject(400, error.message);
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
        const additionalFilter = ["originPlanet =", `'${userPlanet}'`];
        if (req.query.SELECT.where) {
          req.query.SELECT.where.push("and", ...additionalFilter);
        } else {
          req.query.where(additionalFilter);
        }
      }
    });

    this.before("DELETE", Spacefarer, async (req: Request) => {
      if (!req.user.is("admin")) {
        req.reject(403, "You're Forbidden to perform this action!");
      }
    });

    return super.init();
  }
}
