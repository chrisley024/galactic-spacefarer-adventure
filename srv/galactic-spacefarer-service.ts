import { ApplicationService, Request } from "@sap/cds";
import { SpacefarerService } from "./services/Spacefarer.service";
import { wormholeNavigationSkill } from "./types/common";

export default class GalacticSpacefarerService extends ApplicationService {
  init(): Promise<void> {
    const { Spacefarer } = this.entities;
    const spacefarerService = new SpacefarerService();

    this.before("CREATE", Spacefarer, async (req: Request) => {
      const spacefarer = req.data;

      if (spacefarer.stardustCollection < 100) {
        spacefarer.stardustCollection = 100;
      }

      if (
        spacefarer.wormholeNavigationSkill === wormholeNavigationSkill.Beginner
      ) {
        spacefarer.wormholeNavigationSkill =
          wormholeNavigationSkill.Intermediate;
      }
    });

    this.after("CREATE", Spacefarer, async (data) => {
      const spacefarer = data;

      // Simulating sending an email notification
      spacefarerService.sendCosmicNotification(spacefarer);
    });

    return super.init();
  }
}
