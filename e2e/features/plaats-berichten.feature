Feature: Als omgevingsmanager kan ik berichten plaatsen

    

    Background: Ik heb een bericht klaar staan voor het Amstel III project
        Given ik ben op de homepagina
        And ik ga naar de plaats berichten module
        And ga naar het Amstel III project
        And voeg een titel en tekst in

    Scenario: Wanneer ik mij succesvol heb aangemeld kan ik een bericht schrijven voor mijn projecten
        Then het aantal tekens wordt geteld en ik kan de tekst verwijderen
        And ik ga naar de volgende pagina
        And ik klik op de plaats berichten knop
        Then ik zie een bevestingsmelding dat het bericht geplaatst is
        And op de homepagina staat bij de module werkzaamheden een melding voor het aantal nieuwe berichten (rode stip met het aantal nieuwe ongelezen berichten)
        When ik open de module werkzaamheden
        Then staat er een melding voor het aantal nieuwe berichten
        When ik klik op het project
        Then het bericht staat bovenaan de pagina van het betreffende project onder de sectie 'Nieuws' met een label 'Nieuw'
        When ik open het bericht
        Then de titel en tekst van het bericht klopt
        And als ik terug ga naar het nieuwsoverzicht
        Then het label 'Nieuw' is verdwenen
        And als ik terug ga naar werkzaamheden
        Then is het symbool voor het aantal nieuwe berichten verdwenen
        And als ik terugga naar de homepagina
        Then is bij werkzaamheden het symbool voor het aantal nieuwe berichten verdwenen
            | pagina | module           | projectnaam | titel | tekst |
            | home   | plaats berichten | Amstel III  |       |       |

    Scenario: Ik kan Amsterdammers informeren over een nieuw bericht middels een pushnotificatie
        Then het aantal tekens wordt geteld en ik kan de tekst verwijderen
        And ik ga naar de volgende pagina
        And ik check de checkbox bij 'Wil je ook een pushbericht versturen?'
        And ik klik op de plaats berichten knop
        Then ik ontvang een pushnotificatie met titel en tekst

    Scenario: Als OM/CA kan ik een foto toevoegen bij het bericht dat ik schrijf voor een project
        And ik klik op foto toevoegen
        And ik selecteer een foto
        And ik bewerk de foto
        And ik bevestig het foto bewerken
        Then de foto staat bij foto toevoegen
        And er staat een prullenbakje symbool
        And ik beschrijf wat er op de foto staat
        And ik klik op volgende
        And ik klik op plaats bericht
        And ik open het project binnen de module werkzaamheden
        Then het bericht staat bovenaan met de foto als thumbnail
        When ik open het bericht
        Then de foto staat bovenin het bericht
