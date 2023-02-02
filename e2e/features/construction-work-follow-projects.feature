Feature: Werkzaamheden

    @included
    Scenario: Ik kan een project volgen
        Given ik ben op het werkzaamheden scherm
        And ik open het project Stadhouderskade
        When ik volg een project
        Then het project krijgt de status 'volgend'
#    And het project komt bovenaan de lijst met projecten

