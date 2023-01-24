Feature: Zoekveld

    @included
    Scenario: De zoekpagina voor zoeken in werkzaamheden openen
        Given ik ben op de werkzaamheden pagina
        When ik klik op het zoekveld
        Then word er een nieuwe pagina 'Zoek in werkzaamheden' geopend
#And wordt er een zoekveld getoond

