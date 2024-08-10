using my.galactic.spacefarer as gs from '../db/dataModel';


@(path: '/galactic-service')
service GalacticSpacefarerService @(requires: 'authenticated-user') {
    entity Spacefarer as projection on gs.Spacefarer;
    entity Department as projection on gs.Department;
    entity Position   as projection on gs.Position;

}
