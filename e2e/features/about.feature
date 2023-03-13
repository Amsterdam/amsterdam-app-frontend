Feature: Over deze app

  @included
  Scenario: Ik zie het versie nummer
    Given ik ben op het over deze app scherm
    Then ik zie het versie nummer

  @excluded
  Scenario: Waarom deze app?
    Given ik ben op het over deze app scherm
    When ik klik op 'Waarom deze app?'
    Then ik zie een scherm met uitleg over de app

  @excluded
  Scenario: About this app
    Given ik ben op het over deze app scherm
    When ik klik op 'About this app'
    Then ik zie een scherm met uitleg over deze app in het Engels

  @excluded
  Scenario: Privacyverklaring
    Given ik ben op het over deze app scherm
    When ik klik op 'Privacyverklaring'
    Then ik zie een scherm met de Privacyverklaring

  @excluded
  Scenario: Toegankelijkheidsverklaring
    Given ik ben op het over deze app scherm
    When ik klik op 'Toegankelijkheidsverklaring'
    Then ik zie een scherm met de Toegankelijkheidsverklaring
    And ik kan een mail sturen als er iets niet werkt
