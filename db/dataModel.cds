using {cuid} from '@sap/cds/common';

namespace my.galactic.spacefarer;

entity Spacefarer : cuid {
    name               : String(50) @mandatory;
    stardustCollection : Integer    @mandatory;
    wormholeNavigation : Integer    @mandatory;
    originPlanet       : String     @mandatory;
    spacesuitColor     : String enum {
        Navy;
        Grey;
        Blue;
        Black;
        White;
    };
    department         : Association to Department;
    position           : Association to Position;
}

entity Department : cuid {
    name        : String(50) @mandatory;
    description : String(150);
    spacefarers : Composition of many Spacefarer
                      on spacefarers.department = $self;
}

entity Position : cuid {
    title       : String(50) @mandatory;
    description : String(150);
    spacefarers : Composition of many Spacefarer
                      on spacefarers.position = $self;
}
