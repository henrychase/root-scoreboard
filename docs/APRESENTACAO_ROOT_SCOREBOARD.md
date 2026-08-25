# Root Scoreboard: apresentação do projeto

## O que estamos construindo

Estamos desenvolvendo o **Root Scoreboard**, uma aplicação web não oficial feita por fãs para organizar partidas de Root. A ideia surgiu a partir de um protótipo funcional criado em um único arquivo HTML com auxílio de inteligência artificial. Agora o objetivo é transformar esse protótipo em um projeto bem organizado, bonito, confiável e fácil de evoluir em conjunto.

A primeira versão já está publicada no GitHub Pages e foi testada com sucesso. Ela funciona diretamente no navegador, sem instalação e sem servidor próprio.

## O que já funciona

Atualmente, a aplicação permite cadastrar jogadores, registrar partidas, escolher mapa e condição de vitória, associar jogadores a facções, informar pontuações e marcar o vencedor. Ela também gera rankings de jogadores e facções, exibe gráficos, mantém um histórico de partidas e oferece um randomizador.

O randomizador sorteia mapa, jogadores e facções e verifica o Reach mínimo exigido para a quantidade selecionada de jogadores. Os dados permanecem salvos no navegador por meio do `localStorage`.

## Em que ponto estamos

A primeira etapa foi concluída. O projeto recebeu uma estrutura inicial de repositório, o HTML original foi preservado como contingência, a versão funcional foi enviada ao GitHub e a publicação no GitHub Pages foi validada.

Essa primeira versão será nossa referência estável. A partir de agora, as melhorias serão feitas em etapas pequenas para evitar que mudanças visuais ou técnicas quebrem funções já existentes.

## Próximos passos

A próxima mudança será puramente estrutural: retirar o CSS que ainda está dentro do HTML e colocá-lo em um arquivo próprio. O comportamento e o visual devem continuar idênticos nessa etapa.

Depois disso, o JavaScript será movido para um arquivo externo e, somente após essa validação, dividido em módulos menores. Com a base organizada, começará a reformulação gráfica, seguida por recursos como exportação e importação de dados, perfis individuais, estatísticas avançadas e uma futura versão instalável no celular.

## Organização prevista

```text
root-scoreboard/
├── index.html
├── css/
├── js/
├── assets/
├── docs/
└── archive/
```

A branch `main` será reservada para a versão estável. O desenvolvimento acontecerá em uma branch de integração e em branches específicas para cada funcionalidade. Isso permitirá revisar e testar uma mudança antes de ela entrar na versão pública.

## Ideias para a evolução

O backlog inclui uma identidade visual mais próxima da atmosfera de Root, cards de facções e mapas, navegação mobile refinada, mensagens e confirmações próprias, backup em JSON, restauração de dados, filtros do histórico, perfis individuais, desempenho por mapa e facção, sequências de vitórias e eventual ranking Elo.

Também queremos melhorar as validações. Entre os exemplos estão impedir jogadores duplicados em uma partida, garantir um vencedor válido, editar registros e proteger o histórico contra exclusões acidentais.

## Imagens e materiais de fãs

Temos acesso a vários recursos visuais encontrados no [Workshop do Root Database](https://www.therootdatabase.com/workshop/). Eles serão usados de forma seletiva, e não como um pacote integral copiado para o repositório. Antes de publicar cada imagem, verificaremos autoria e condições de uso, manteremos os créditos e separaremos claramente a licença do código dos direitos sobre artes, marcas e elementos de terceiros.

O projeto é não oficial e não possui afiliação com os titulares dos direitos de Root.

## Como colaborar

Quem quiser ajudar poderá:

- testar a versão publicada em computador e celular;
- relatar erros com os passos necessários para reproduzi-los;
- sugerir melhorias de usabilidade;
- revisar regras, nomes de facções e valores utilizados;
- ajudar a conferir a origem e as permissões dos recursos visuais;
- contribuir com código em branches específicas;
- revisar mudanças antes da integração na versão estável.

Ao relatar um erro, o ideal é informar o navegador, o dispositivo, o que estava sendo feito, o resultado esperado, o resultado observado e, se possível, uma captura de tela do console.

## Princípio do desenvolvimento

A prioridade não é acumular funcionalidades rapidamente. Primeiro vamos garantir uma base organizada e recuperável. Cada mudança será pequena, testável e documentada. A versão estável continuará disponível enquanto as novidades são desenvolvidas separadamente.
