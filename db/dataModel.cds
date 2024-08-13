using {cuid} from '@sap/cds/common';

namespace my.galactic.spacefarer;

entity Spacefarer  {
    key ID: UUID;
    name                    : String(100) @mandatory;
    stardustCollection      : Integer     @mandatory;
    wormholeNavigationSkill : String(50)  @mandatory;
    originPlanet            : String(50)  @mandatory;
    spacesuitColor          : String(50)  @mandatory;
    department_ID           : String      @assert.notNull;
    position_ID             : String      @assert.notNull;
    department              : Association to one Department
                                  on department.ID = department_ID;
    position                : Association to one Position
                                  on position_ID = position.ID;
    virtual cosmicMessage: LargeString;
}


@assert.unique: {Department: [name]}
entity Department  {
    key ID: UUID;
    name        : String(100) @mandatory;
    spacefarers : Composition of many Spacefarer
                      on spacefarers.department = $self;

}

@assert.unique: {Position: [title]}
entity Position {
    key ID: UUID;
    title         : String(100) @mandatory;
    department_ID : UUID        @assert.notNull;
    department    : Association to one Department
                        on department_ID = department.ID;
    spacefarers   : Composition of many Spacefarer
                        on spacefarers.position = $self;
}
