import { ApplicationService, Request } from "@sap/cds";
import { SpacefarerService } from "./services/Spacefarer.service";

export default class GalacticSpacefarerService extends ApplicationService {
  init(): Promise<void> {
    const { Spacefarer } = this.entities;
    const spacefarerService = new SpacefarerService();

    this.before("CREATE", Spacefarer, async (req) => {
      const spacefarer = req.data;

      if (spacefarer.stardustCollection < 100) {
        spacefarer.stardustCollection = 100;
      }
      if (spacefarer.wormholeNavigationSkill < 50) {
        spacefarer.wormholeNavigationSkill = 50;
      }
    });

    this.after("CREATE", Spacefarer, async (data, req) => {
      const spacefarer = data;

      // Simulating sending an email notification
      await spacefarerService.sendCosmicNotification(spacefarer);
    });

    this.before("READ", Spacefarer, async (req: Request) => {
      const userPlanet = req.user.attr.planet;

      if (!userPlanet) {
        req.reject(403, "You do not have permission to view this data.");
      }

      if (req.query.SELECT) {
        const query = SELECT.from(Spacefarer).where({
          originPlanet: userPlanet,
        });

        req.query = query;
      }
    });

    return super.init();
  }
}
