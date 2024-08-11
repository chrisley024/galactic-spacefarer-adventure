sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'my/galactic/spacefarer/spacefarer/test/integration/FirstJourney',
		'my/galactic/spacefarer/spacefarer/test/integration/pages/SpacefarerList',
		'my/galactic/spacefarer/spacefarer/test/integration/pages/SpacefarerObjectPage'
    ],
    function(JourneyRunner, opaJourney, SpacefarerList, SpacefarerObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('my/galactic/spacefarer/spacefarer') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSpacefarerList: SpacefarerList,
					onTheSpacefarerObjectPage: SpacefarerObjectPage
                }
            },
            opaJourney.run
        );
    }
);