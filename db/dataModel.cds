using {cuid} from '@sap/cds/common';

namespace my.galactic.spacefarer;

entity Spacefarer : cuid {
    name                    : String(100) @mandatory;
    stardustCollection      : Integer     @mandatory;
    wormholeNavigationSkill : String(50)  @mandatory  @assert.range  enum {
        HIGH;
        MEDIUM;
        LOW;
    };
    originPlanet            : String(50)  @mandatory  @assert.range  enum {
        Mars;
        Venus;
    };
    spacesuitColor          : String(50)  @mandatory  @assert.range  enum {
        Red;
        Blue;
        Gray;
    };
    department_ID           : UUID        @mandatory  @assert.notNull;
    department              : Association to one Department
                                  on department.ID = department_ID;
    isAdmin                 : Boolean default false;
    virtual cosmicMessage   : LargeString;
}


@assert.unique: {Department: [
    name,
    position
]}
entity Department : cuid {
    name        : String(100) @mandatory;
    position    : String(100) @mandatory;
    spacefarers : Composition of many Spacefarer
                      on spacefarers.department = $self;
}
