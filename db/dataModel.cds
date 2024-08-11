using {cuid} from '@sap/cds/common';

namespace my.galactic.spacefarer;

entity Spacefarer : cuid {
    name                    : String(100)                @mandatory;
    stardustCollection      : Integer                   @mandatory;
    wormholeNavigationSkill : Integer                   @mandatory;
    originPlanet            : Planet                    @mandatory;
    spacesuitColor          : Color                     @mandatory;
    department              : Association to Department @assert.notNull;
    position                : Association to Position   @assert.notNull;
}


entity Department : cuid {
    name        : String(100) @mandatory;
    description : String(255);
    spacefarers : Composition of many Spacefarer
                      on spacefarers.department = $self;
}

entity Position : cuid {
    title       : String(100) @mandatory;
    description : String(255);
    department  : Association to Department;
    spacefarers : Composition of many Spacefarer
                      on spacefarers.position = $self;
}

type Color  : String enum {
    NAVY    = 'Navy';
    BLUE    = 'Blue';
    GRAY    = 'Gray'
}

type Planet : String enum {
    MERCURY = 'Mercury';
    JUPITER = 'Jupiter';
    VENUS   = 'Venus'
}
