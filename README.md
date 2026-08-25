# Root Scoreboard

Aplicação web para registrar partidas de Root, gerenciar jogadores, acompanhar rankings e estatísticas e sortear configurações de partida.

## Funcionalidades atuais

- Cadastro e exclusão de jogadores
- Normalização de nomes e bloqueio de duplicidades
- Cadastro de jogadores com a tecla Enter
- Registro de partidas
- Validação de jogadores, pontuações e vencedor
- Seleção de mapa e condição de vitória
- Registro de facções e pontuações
- Ranking de jogadores
- Ranking de facções
- Gráficos de vitórias
- Histórico e exclusão de partidas
- Randomizador de mapas, jogadores e facções
- Validação de alcance mínimo das facções
- Exportação de backup em JSON
- Importação de backup com validação básica
- Armazenamento local no navegador

## Backup dos dados

A aplicação permite exportar jogadores e partidas para um
arquivo JSON e restaurá-los posteriormente.

A importação substitui os dados existentes no navegador.
Recomenda-se exportar um backup antes de realizar a
restauração.

## Versão atual

`v0.2.0`

## Tecnologias

- HTML
- CSS
- JavaScript
- Tailwind CSS
- Chart.js
- Font Awesome
- LocalStorage

## Execução local

Abra o arquivo `index.html` em um navegador moderno.

## Armazenamento dos dados

Os jogadores e as partidas são armazenados no LocalStorage do navegador. Os dados não são sincronizados entre dispositivos e podem ser perdidos caso os dados do navegador sejam apagados.

## Status

Projeto em desenvolvimento.

## Aviso

Este é um projeto não oficial criado por fãs. Root e seus elementos visuais pertencem aos respectivos titulares de direitos. O projeto não possui afiliação oficial com os criadores ou editores do jogo.