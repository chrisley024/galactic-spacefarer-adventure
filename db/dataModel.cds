using {cuid} from '@sap/cds/common';

namespace my.galactic.spacefarer;


entity Spacefarer : cuid {
    name                    : String(100)  @mandatory  @assert.format: '^[A-Za-z ]+$';
    stardustCollection      : Integer      @mandatory;
    wormholeNavigationSkill : Skill        @mandatory  @assert.format: '^[A-Za-z ]+$';
    originPlanet            : String(50)   @mandatory  @assert.format: '^[A-Za-z ]+$';
    spacesuitColor          : String(50)   @mandatory  @assert.format: '^[A-Za-z ]+$';
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

type Skill : String(10) enum {
    Beginner     = 'Beginner';
    Intermediate = 'Intermediate';
    Advanced     = 'Advanced';
    Expert       = 'Expert';
};
