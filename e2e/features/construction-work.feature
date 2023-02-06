Feature: Werkzaamheden Module

    @excluded
    Scenario: Werkzaamheden weergave checks
        Given ik ben op het werkzaamheden scherm
        Then de werkzaamheden worden weergegeven met een afbeelding
        And een titel van het project
        And een ondertitel met een korte beschrijving van het project


    @excluded
    Scenario: De zoekpagina voor zoeken in werkzaamheden openen
        Given ik ben op het werkzaamheden scherm
        When ik klik op het zoekveld
        Then wordt er een nieuw scherm 'Zoek in werkzaamheden' geopend
        And wordt er een zoekveld getoond

    @included
    Scenario: Vanuit de werkzaamhedenmodule kan ik terug navigeren naar het homescreen
        Given ik ben op de de werkzaamheden detail pagina van project Middenweg
        When ik klik op de terug knop
        Then ik ben in het werkzaamheden scherm
        When ik klik op project Amstel
        Then ik ben op het detailscherm van project Amstel
        When ik klik op de terug knop
        Then ik ben in het werkzaamheden scherm
        When ik klik op de terug knop
        Then ik ben op het homescherm
