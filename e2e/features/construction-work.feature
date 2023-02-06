Feature: Werkzaamheden Module

    @included
    Scenario: Werkzaamheden weergave checks
        Given ik ben op het werkzaamheden scherm
        Then de werkzaamheden worden weergegeven met een afbeelding
        And een titel van het project
        And een ondertitel met een korte beschrijving van het project


    @included
    Scenario: De zoekpagina voor zoeken in werkzaamheden openen
        Given ik ben op het werkzaamheden scherm
        When ik klik op het zoekveld
        Then wordt er een nieuw scherm 'Zoek in werkzaamheden' geopend
        And wordt er een zoekveld getoond
