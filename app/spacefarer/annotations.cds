using GalacticSpacefarerService as service from '../../srv/galactic-spacefarer-service';

annotate service.Spacefarer with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Name',
                Value: name,
            },
            {
                $Type: 'UI.DataField',
                Value: department_ID,
                Label: 'Position',
            },
            {
                $Type: 'UI.DataField',
                Label: 'Stardust Collection',
                Value: stardustCollection,
            },
            {
                $Type: 'UI.DataField',
                Label: 'wormhole Navigation Skill',
                Value: wormholeNavigationSkill,

            },
            {
                $Type: 'UI.DataField',
                Label: 'Origin Planet',
                Value: originPlanet,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Spacesuit Color',
                Value: spacesuitColor,

            },
            {
                $Type                  : 'UI.DataField',
                Value                  : department.name,
                Label                  : 'Department',
                ![@Common.FieldControl]: #ReadOnly,
            },
        ],
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup',
    }, ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Label: 'Name',
            Value: name,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Stardust Collection',
            Value: stardustCollection,

        },
        {
            $Type: 'UI.DataField',
            Label: 'Spacesuit Color',
            Value: spacesuitColor,
        },
    ],
);


annotate service.Spacefarer with @(
    UI.HeaderInfo: {
        TypeName      : 'Spacefarer',
        TypeNamePlural: 'Spacefarers',
        Title         : {Value: name}
    },
    Capabilities : {Deletable: false}
);

annotate service.Department with {
    ID @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Department',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: ID,
                ValueListProperty: 'ID',
            }, ],
        },
        Common.ValueListWithFixedValues: true,
        Common.Text                    : {
            $value                : position,
            ![@UI.TextArrangement]: #TextOnly
        }
    )
};

annotate service.Spacefarer with {
    department_ID @(
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Department',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: department_ID,
                ValueListProperty: 'ID',
            }, ],
        },
        Common.ValueListWithFixedValues: true,
        Common.Text                    : {
            $value                : department.position,
            ![@UI.TextArrangement]: #TextOnly,
        }

    )
};

annotate service.Spacefarer {
    wormholeNavigationSkill @UI.Placeholder: 'Pls provide skill level: LOW, MEDIUM, or HIGH';
    spacesuitColor          @UI.Placeholder: 'Pls provide color: Red, Gray, or Blue';
    originPlanet            @UI.Placeholder: 'Pls provide origin planet: Mars or Venus';
    stardustCollection      @UI.Placeholder: 'Pls provide a numeric value';
    name                    @UI.Placeholder: 'Pls provide name';
}
