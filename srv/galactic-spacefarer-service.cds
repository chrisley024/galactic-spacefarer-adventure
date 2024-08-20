using my.galactic.spacefarer as gs from '../db/dataModel';


@(path: '/galactic-service')
service GalacticSpacefarerService @(requires: 'authenticated-user') {
    @odata.draft.enabled
    entity Spacefarer as projection on gs.Spacefarer;
    entity Department as projection on gs.Department;
}
