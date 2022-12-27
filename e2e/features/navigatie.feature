Feature: Navigatie/homepagina met modules


  Scenario: 
    Given ik ben op de navigatiepagina
    When ik open de contact pagina
    Then de contact pagina opent

  Scenario: Contactgegevens opzoeken van het stadsloket waar ik als Amsterdammer naar toe wil
    Given ik ben op de contactpagina
    When ik verander het stadsloket naar stadsloket Nieuw-West
    Then ik zie contactgegevens en informatie van het betreffende stadsloket