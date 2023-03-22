Feature: Home

  Scenario: Open de app en verifieer dat je een lijst van modules ziet
    Given ik ben op de homepagina
    When ik verstuur een request naar het modules_by_app endpoint/check de status via de api
    Then ik krijg een status 1 terug bij alle module/ik verwacht dat alle modules de status actief hebben
    When ik klik op de betreffende module op de homepagina
    Then de betreffende module wordt geopend

  Scenario: Als ik in het instellingen scherm een module uitzet, verdwijnt deze uit het module overzichtsscherm
    Given ik ben in het module instellingen scherm
    When ik zet module <module> uit
    And ik ga terug naar de homepagina
    Then de module ontbreekt
    When ik kil de app
    And ik start de app
    Then de module ontbreekt nog steeds

  Scenario: Ik kan mijn adres invoeren. Deze wordt onthouden wanneer de app afgesloten is geweest
    Given ik ben op de homepagina
    And ik navigeer naar mijn profiel pagina
    And ik zoek een adres
    Then het juiste adres wordt gevonden en getoond op de profielpagina
    When ik kil de app
    And ik start de app
    Then ik zie dat het juiste adres nog steeds wordt getoond

  Scenario: Als OM/CA heb ik toegang tot de module plaats berichten
    Given ik ben aangemeld als omgevingsmanager
    When ik open de app
    Then ik zie de plaats berichten knop

  # Scenario's die ik voor de POC had gemaakt
  Scenario: De contactpagina openen
    Given ik ben op de homepagina
    When ik open de contact pagina
    Then de contact pagina opent

  Scenario: Contactgegevens opzoeken van het stadsloket waar ik als Amsterdammer naar toe wil
    Given ik ben op de contactpagina
    When ik verander het stadsloket naar stadsloket Nieuw-West
    Then ik zie contactgegevens en informatie van het betreffende stadsloket

