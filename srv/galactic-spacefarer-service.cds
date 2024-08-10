using my.galactic.spacefarer as gs from '../db/dataModel';


@(path: '/galactic-service')
service GalacticSpacefarerService {
    entity Spacefarer @(restrict: [{
        grant: '*',
        to   : 'SpacefarerAdmin'
    }]) as projection on gs.Spacefarer;

    entity Department @(restrict: [{
        grant: '*',
        to   : 'SpacefarerAdmin'
    }]) as projection on gs.Department;

    entity Position @(restrict: [{
        grant: '*',
        to   : 'SpacefarerAdmin'
    }]) as projection on gs.Position;

}
