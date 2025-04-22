using my.galactic.spacefarer as gs from '../db/dataModel';


@(path: '/galactic-service')
service GalacticSpacefarerService @(requires: 'authenticated-user') {
    entity Department as projection on gs.Department;

    @odata.draft.enabled
    entity Spacefarer @(restrict: [
        {
            grant: ['*'],
            to   : 'Admin'
        },

        {
            grant: 'READ',
            to   : 'User',
            where: 'originPlanet = $user.planet'
        }
    ])                as projection on gs.Spacefarer;


}
