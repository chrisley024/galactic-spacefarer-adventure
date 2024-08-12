import { ApplicationService, Request } from "@sap/cds";
import { SpacefarerService } from "./services/Spacefarer.service";
import { SkillLevel, Spacefarer } from "./types";

export default class GalacticSpacefarerService extends ApplicationService {
  init(): Promise<void> {
    const { Spacefarer } = this.entities;
    const spacefarerService = new SpacefarerService();

    this.before(["CREATE", "UPDATE", "PATCH"], Spacefarer, async (req) => {
      const payload = req.data as Spacefarer;

      if (payload.stardustCollection < 0) {
        req.error(400, "Stardust collection cannot be negative!");
      }
      spacefarerService.validateSpacefarer(payload);
    });

    this.before("CREATE", Spacefarer, async (req: Request) => {
      console.log("req> ", req);
      if (req?.user.id !== "admin") {
        req.error(403, "Forbidden to perform this action!");
      }

      const spacefarer = req.data;
      spacefarerService.validateDepartment(spacefarer);
      spacefarerService.validatePosition(spacefarer);

      // Enhance stardust collection & Skill
      if (spacefarer.stardustCollection < 100) {
        spacefarer.stardustCollection = 100;
      } else if (spacefarer.wormholeNavigationSkill === SkillLevel.LOW) {
        spacefarer.wormholeNavigationSkill = SkillLevel.MEDIUM;
      }
    });

    this.after("CREATE", Spacefarer, async (data) => {
      // Simulate sending an email notification
      spacefarerService.sendCosmicNotification(data as Spacefarer);
    });

    this.before("READ", Spacefarer, async (req: Request) => {
      const userPlanet = req.user.attr.planet;

      // user sees only data of own planet
      if (userPlanet) {
        const query = SELECT.from(Spacefarer).where({
          originPlanet: userPlanet,
        });

        req.query = query;
      }
    });

    this.before("DELETE", Spacefarer, async (req: Request) => {
      if (req?.user.id !== "admin") {
        req.error(403, "Forbidden to perform this action!");
      }
    });

    return super.init();
  }
}
