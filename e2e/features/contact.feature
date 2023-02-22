Feature: Contact

  #POC scenario's:
  @included
  Scenario: De contactmodule openen
    Given ik ben op het homescherm - wacht totdat welkomstscherm verdwijnt
    When ik open de 'contact' module
    Then de contact module opent

  @included
  Scenario: Contactgegevens opzoeken van het stadsloket waar ik als Amsterdammer naar toe wil
    Given ik ben op het contactscherm
    When ik verander het stadsloket naar stadsloket Nieuw-West
    Then ik zie contactgegevens en informatie van het betreffende stadsloket

  #Nieuwe scenario's:
  @included
  Scenario: Op de contactpagina zie ik een overzicht met contactmogelijkheden
    Given ik ben op het homescherm - klik zodat welkomstscherm verdwijnt
    When ik open de 'contact' module
    Then zie ik de volgende links:
  #      | Gebruik ons contactformulier, Reactie binnen 1 werkdag  |
  #      | Bel 14 020            |
  #      | WhatsApp 06 4444 0655 |
  #      | Mijn Amsterdam        |
  # Scenario's Excel die hier bijhoren:
  # Scenario: Ik kan navigeren naar het contactformulier op de website van de gemeente.
  # Scenario: Ik kan de gemeente bellen via de app.
  # Scenario: Ik kan contact opnemen met de gemeente via Whatsapp.
  # Scenario: Ik kan navigeren naar het de website van Mijn Amsterdam.

  @included
  Scenario: Op de contactpagina zie ik een informerende titel en tekst over de pagina
    Given ik ben op het contactscherm
    Then zie ik de volgende titel en tekst
      """
      Kunnen we u helpen?
      ===============
      Heeft u een vraag of wilt u iets weten?
      Neem op werkdagen contact met ons op.
      """

  @included
  Scenario Outline: Op de contactpagina vind ik informatie over de stadsloketten die ik kan bezoeken
    Given ik ben op het contactscherm
    When ik klik op het stadsloket
    Then zie ik een lijst met stadsloketten
    #   | stadsloket |
    #   | Centrum    |
    #   | Nieuw-West |
    #   | Noord      |
    #   | Oost       |
    #   | West       |
    #   | Zuid       |
    #   | Zuidoost   |
    #   | Weesp      |
    When ik selecteer een stadsloket <stadsloket>
    Then het juiste stadsloket wordt getoond <titel>
    And de bekijk routeknop wordt getoond
    Examples:
      | stadsloket | adres                                       | titel                 |
      | Centrum    | Amstel 1 1011 PN Amsterdam                  | Stadsloket Centrum    |
      | Nieuw-West | Osdorpplein 946 1068 TD Amsterdam           | Stadsloket Nieuw-West |
      | Noord      | Buikslotermeerplein 2000 1025 XL Amsterdam  | Stadsloket Noord      |
      | Oost       | Oranje-Vrijstaatplein 2 1093 NG Amsterdam   | Stadsloket Oost       |
      | West       | Bos en Lommerplein 250 1055 EK Amsterdam    | Stadsloket West       |
      | Zuid       | President Kennedylaan 923 1079 MZ Amsterdam | Stadsloket Zuid       |
      | Zuidoost   | Anton de Komplein 150 1102 CW Amsterdam     | Stadsloket Zuidoost   |
      | Weesp      | Nieuwstraat 70a 1380 BD Weesp               | Stadsloket Weesp      |

  @included
  Scenario: Als ik Weesp als stadsloket selecteer kan ik een afspraak maken
    Given ik ben op het contactscherm
    When ik selecteer stadsloket Weesp
    Then ik zie een adres van het stadsloket
    And ik zie openingstijden, Bekijk routeknop en Maak een afspraakknop

# Excel scenario's die hierbij horen
# Scenario: De melding over het open zijn van een stadsloket is correct.
# Scenario: Ik zie dat ik bij Stadsloket Weesp een afspraak moet maken.
# Scenario: Ik zie wachttijden bij andere Stadsloketten dan Weesp.
# Scenario: Ik zie uitleg over de openingstijden.
# Scenario: Ik kan een routebeschrijving naar een Stadsloket zien.
# Scenario: Ik kan een ander Stadsloket selecteren.




