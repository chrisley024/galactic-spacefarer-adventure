using GalacticSpacefarerService as service from '../../srv/galactic-spacefarer-service';

annotate service.Spacefarer with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type                  : 'UI.DataField',
                Label                  : 'Name',
                Value                  : name,
                ![@Common.FieldControl]: #ReadOnly,
            },
            {
                $Type                  : 'UI.DataField',
                Value                  : position.title,
                Label                  : 'Position',
                ![@Common.FieldControl]: #ReadOnly,

            },
            {
                $Type: 'UI.DataField',
                Label: 'Stardust Collection',
                Value: stardustCollection,
            },
            {
                $Type                  : 'UI.DataField',
                Label                  : 'wormhole Navigation Skill',
                Value                  : wormholeNavigationSkill,
                ![@Common.FieldControl]: #ReadOnly,
            },
            {
                $Type                  : 'UI.DataField',
                Label                  : 'Origin Planet',
                Value                  : originPlanet,
                ![@Common.FieldControl]: #ReadOnly,

            },
            {
                $Type: 'UI.DataField',
                Label: 'Spacesuit Color',
                Value: spacesuitColor,

            },
            {
                $Type : 'UI.DataField',
                Value : position.department.name,
                Label : 'Department',
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
