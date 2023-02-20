Feature: Comprar passagens aereas
    Por favor, carregar os dados no ambiente
    Scenario: Selecionar origem e destino do voo
        Given que acesso o site BlazeDemo
        When seleciono origem como "Boston" e seleciono destino como "Rome"
        Then exibe o titulo da guia como "BlazeDemo - reserve"