Feature: Werkzaamheden

  @excluded
  Scenario: Werkzaamheden UI checks
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

  @excluded
  Scenario: Vanuit de module 'Werkzaamheden' kan ik terug navigeren naar het home screen
    Given ik ben op de de werkzaamheden detail pagina van project Middenweg
    When ik klik op de terug knop
    Then ik ben in het werkzaamheden scherm
    When ik klik op project Amstel
    Then ik ben op het detailscherm van project Amstel
    When ik klik op de terug knop
    Then ik ben in het werkzaamheden scherm
    When ik klik op de terug knop
    Then ik ben op het homescherm

  @excluded
  Scenario: Ik kan een project volgen en ontvolgen
    Given ik ben op het werkzaamheden scherm
    And ik open het project Stadhouderskade
    When ik volg een project
    Then het project krijgt de status 'volgend'
    When ik ontvolg een project
    Then de status 'volgend' verdwijnt

  @included
  Scenario: Projectdetailscherm UI checks
    Given ik ben op het projectdetailscherm van project 'Amstel III'
    Then ik zie een afbeelding
    And Een volgen knop
    And Het aantal volgers
    And Een titel van het project
    And Een subtitel met korte uitleg over het project
    #And Een link naar 'Over dit project'
    #And Een link naar 'Contact'
    And Een nieuwsoverzicht met titel Nieuws
    And Een datum van het nieuwsbericht
    And Een titel van het nieuwsbericht
    And Een afbeelding bij het nieuwsbericht
