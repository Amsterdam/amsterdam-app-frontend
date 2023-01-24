Feature: Navigatie/homepagina met modules


  Scenario: Open de app en verifieer dat je een lijst van modules ziet
  Given ik ben op de homepagina
  When ik verstuur een request naar het modules_by_app endpoint/check de status via de api
  Then ik krijg een status 1 terug bij alle module/ik verwacht dat alle modules de status actief hebben
  When ik klik op de betreffende module op de homepagina
  Then de betreffende module wordt geopend

  Scenario: 
    Given ik ben op de homepagina
    When ik open de contact pagina
    Then de contact pagina opent

  Scenario: Contactgegevens opzoeken van het stadsloket waar ik als Amsterdammer naar toe wil
    Given ik ben op de contactpagina
    When ik verander het stadsloket naar stadsloket Nieuw-West
    Then ik zie contactgegevens en informatie van het betreffende stadsloket

