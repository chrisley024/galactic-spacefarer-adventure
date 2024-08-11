import { Request } from "@sap/cds";

export class SpacefarerService {
  public async sendCosmicNotification(spacefarer: any) {
    console.log(`Sending cosmic notification to ${spacefarer.name}`);
    console.log(`Congratulations, ${spacefarer.name}!`);
    console.log(
      `You have successfully embarked on your cosmic journey with a stardust collection of ${spacefarer.stardustCollection} and a wormhole navigation skill of ${spacefarer.wormholeNavigationSkill}.`
    );
  }
}
