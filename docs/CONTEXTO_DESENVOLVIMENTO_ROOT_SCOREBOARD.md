# Contexto de Desenvolvimento: Root Scoreboard

> Documento de continuidade técnica para retomada do projeto em uma nova sessão de IA ou por outro desenvolvedor.

**Atualizado em:** 25/08/2026  
**Status atual:** baseline funcional publicada e validada no GitHub Pages  
**Próxima etapa:** Sprint 2, extração controlada do CSS, sem alteração visual

---

## 1. Objetivo do projeto

O **Root Scoreboard** é uma aplicação web não oficial criada por fãs para apoiar partidas do jogo de tabuleiro Root. O sistema registra jogadores e partidas, calcula rankings e estatísticas, mantém um histórico e oferece um randomizador de mapa, jogadores e facções com validação de Reach.

O projeto nasceu de um único arquivo HTML produzido com auxílio de IA. A estratégia de evolução é preservar o MVP funcional, organizar gradualmente o código e melhorar a experiência visual e as funcionalidades sem quebrar o que já foi validado.

---

## 2. Estado confirmado do projeto

A preparação inicial e o Passo 12 do roteiro foram concluídos com sucesso. O projeto foi organizado em um repositório GitHub, publicado pelo GitHub Pages e testado no endereço público. A versão hospedada está funcionando corretamente.

A baseline atual deve ser tratada como **v0.1.0 estável**, mesmo que a tag ou release ainda não tenha sido criada no GitHub. Não alterar diretamente a branch `main` durante o desenvolvimento das próximas sprints.

### Funcionalidades validadas

- carregamento da página e do cabeçalho;
- navegação entre as quatro abas;
- cadastro e exclusão de jogadores;
- uso dos jogadores cadastrados no formulário de partida;
- registro de partidas com mapa, condição de vitória, jogador, facção, pontuação e vencedor;
- persistência de jogadores e partidas no `localStorage`;
- ranking de jogadores;
- ranking de facções;
- gráficos com Chart.js;
- histórico de partidas;
- exclusão de partidas;
- randomizador de mapa, jogadores e facções;
- validação de alcance mínimo das facções no randomizador;
- funcionamento geral após recarregar a página publicada.

---

## 3. Tecnologias atuais

- HTML5;
- CSS incorporado no próprio HTML;
- JavaScript incorporado no próprio HTML;
- Tailwind CSS carregado por CDN;
- Chart.js carregado por CDN;
- Font Awesome carregado por CDN;
- `localStorage` para persistência local;
- Git e GitHub para versionamento;
- GitHub Pages para hospedagem estática.

Neste momento não há backend, banco de dados remoto, autenticação, sincronização entre dispositivos ou processo de build.

---

## 4. Estrutura planejada do repositório

```text
root-scoreboard/
│
├── index.html
├── README.md
├── LICENSE
├── .gitignore
│
├── css/
│   ├── main.css
│   ├── components.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── storage.js
│   ├── players.js
│   ├── matches.js
│   ├── stats.js
│   ├── charts.js
│   └── randomizer.js
│
├── assets/
│   ├── branding/
│   ├── factions/
│   ├── maps/
│   ├── icons/
│   └── backgrounds/
│
├── docs/
│   ├── screenshots/
│   └── attribution.md
│
└── archive/
    └── original.html
```

A existência efetiva de cada arquivo e pasta deve ser conferida no repositório antes de qualquer modificação. Não presumir que arquivos vazios tenham sido preservados pelo Git, pois o Git não versiona diretórios vazios.

---

## 5. Arquivo original

O MVP original foi preservado em:

```text
archive/original.html
```

O arquivo serve como referência funcional e contingência. Ele não deve ser sobrescrito durante a refatoração. O `index.html` atualmente contém o MVP funcional e continua sendo o ponto de entrada do GitHub Pages.

---

## 6. Dados e regras atuais

### Armazenamento

A aplicação usa as seguintes chaves no `localStorage`:

```text
root_players
root_matches
```

Alterar os nomes dessas chaves sem migração fará a aplicação aparentar perda de dados existentes.

### Mapas cadastrados

```text
Base
Inverno
Lago
Montanha
```

### Requisitos de Reach

```javascript
{
  2: 17,
  3: 18,
  4: 21,
  5: 25,
  6: 28
}
```

### Facções existentes no MVP

O JavaScript atual contém uma constante `FACTIONS` com nome, identificador e valor de Reach de cada facção. Antes de alterar nomes ou valores, conferir a fonte adotada pelo grupo e evitar mudanças silenciosas, pois esses campos alimentam formulários, histórico e estatísticas.

### Limitação de persistência

Os dados ficam apenas no navegador e na origem em que o site está sendo executado. Dados gerados ao abrir um arquivo HTML localmente não são automaticamente compartilhados com a versão GitHub Pages. Diferentes navegadores ou dispositivos também possuem armazenamentos separados.

---

## 7. Estratégia de branches

Fluxo recomendado:

```text
main
└── develop
    ├── feature/separar-css
    ├── feature/separar-javascript
    ├── feature/tema-visual
    ├── feature/exportar-dados
    └── feature/perfil-jogador
```

### Regras

- `main`: versão estável e publicada;
- `develop`: integração das mudanças aprovadas;
- `feature/*`: uma alteração delimitada por branch;
- não desenvolver diretamente na `main`;
- realizar um commit pequeno e descritivo por mudança lógica;
- testar localmente e na versão de preview antes do merge;
- preservar a compatibilidade dos dados do `localStorage`.

Se a branch `develop` ainda não existir, ela deve ser criada a partir da `main` estável antes da Sprint 2.

---

## 8. Padrão de commits sugerido

Adotar mensagens curtas no estilo Conventional Commits:

```text
chore: organiza estrutura inicial do projeto
refactor: extrai estilos para arquivo externo
refactor: move logica principal para app.js
feat: adiciona exportacao de dados em JSON
feat: cria perfil individual do jogador
fix: impede jogadores duplicados na mesma partida
docs: atualiza instrucoes de execucao
style: aplica tema visual do placar
```

Não misturar refatoração estrutural, redesign e nova funcionalidade no mesmo commit.

---

## 9. Roadmap aprovado

### Sprint 1: baseline e publicação

**Status: concluída e validada.**

- criação da estrutura inicial;
- preservação do HTML original;
- criação da documentação básica;
- envio ao GitHub;
- ativação do GitHub Pages;
- validação do MVP publicado.

### Sprint 2: extração controlada do CSS

**Status: próxima etapa.**

Objetivo: mover apenas os estilos atualmente escritos no bloco `<style>` do HTML para `css/main.css`, sem redesenhar a aplicação.

Procedimento esperado:

1. criar a branch `feature/separar-css` a partir de `develop`;
2. copiar integralmente o conteúdo do bloco `<style>` para `css/main.css`;
3. remover apenas o bloco `<style>` já copiado;
4. incluir no `<head>`:

```html
<link rel="stylesheet" href="./css/main.css">
```

5. manter Tailwind, Chart.js e Font Awesome como estão;
6. abrir a aplicação localmente;
7. validar todas as abas e funções;
8. comparar visualmente com a baseline;
9. fazer commit somente após confirmar que nada mudou;
10. integrar em `develop` após revisão.

Observação: o HTML usa muitas classes utilitárias do Tailwind. Nesta sprint, não converter essas classes para CSS próprio.

### Sprint 3: extração inicial do JavaScript

Objetivo: mover o bloco `<script>` da aplicação para `js/app.js`, ainda sem modularizar internamente.

Referência de inclusão:

```html
<script src="./js/app.js"></script>
```

O script deve permanecer no final do `<body>` ou ser carregado com estratégia equivalente que preserve o momento de execução atual. Somente depois de validar essa migração o código será dividido em módulos como `storage.js`, `players.js`, `matches.js`, `stats.js`, `charts.js` e `randomizer.js`.

### Sprint 4: design system e identidade visual

- definição de tokens de cor, tipografia, sombra, raio e espaçamento;
- melhoria do cabeçalho e da navegação;
- cards de facções e mapas;
- layout responsivo refinado;
- estados de hover, foco, sucesso, alerta e erro;
- substituição gradual de `alert()` e `confirm()` por componentes acessíveis;
- preservação da legibilidade e da usabilidade em celular.

### Sprint 5: segurança e portabilidade dos dados

- exportação em JSON;
- importação com validação de estrutura;
- cópia de segurança;
- restauração;
- tratamento de dados inválidos;
- confirmação reforçada antes de apagar dados.

### Sprint 6: estatísticas avançadas

- perfil individual do jogador;
- partidas, vitórias, derrotas e taxa de vitória;
- desempenho por facção;
- desempenho por mapa;
- facção mais utilizada;
- sequência de vitórias;
- filtros de histórico;
- avaliação futura de ranking Elo.

### Sprint 7: experiência instalável

- `manifest.webmanifest`;
- ícones da aplicação;
- `service-worker.js`;
- cache dos recursos necessários;
- funcionamento offline;
- instalação como PWA.

---

## 10. Recursos visuais e direitos de uso

Há interesse em utilizar PNGs, SVGs e outros materiais disponíveis no Workshop do Root Database:

[Workshop do Root Database](https://www.therootdatabase.com/workshop/)

O acervo não deve ser copiado integralmente para o repositório. Antes de publicar cada recurso, conferir autoria, licença e condições de redistribuição. Recursos de terceiros não devem ser tratados automaticamente como cobertos pela licença do código.

Diretrizes adotadas:

- enviar apenas imagens efetivamente utilizadas;
- registrar origem e atribuição em `docs/attribution.md`;
- não versionar PSD, XCF, SAI ou grandes arquivos-fonte sem necessidade;
- usar SVG para vetores quando permitido;
- usar WebP para fundos e ilustrações otimizadas;
- usar nomes minúsculos, sem espaços ou acentos;
- não usar o repositório como espelho do acervo externo;
- manter aviso de projeto não oficial criado por fãs.

Estrutura sugerida:

```text
assets/
├── branding/
├── factions/
│   ├── cats/
│   ├── birds/
│   └── alliance/
├── maps/
├── icons/
└── backgrounds/
```

---

## 11. Melhorias técnicas já identificadas

As seguintes melhorias são desejáveis, mas não devem ser implementadas todas de uma vez:

- impedir jogador repetido em uma mesma partida;
- impedir facção repetida quando a regra da partida assim exigir;
- exigir exatamente um vencedor;
- validar pontuação e condição de vitória de forma coerente;
- permitir editar uma partida registrada;
- permitir editar o nome de um jogador;
- impedir exclusão acidental de jogador relacionado ao histórico ou definir comportamento explícito;
- usar identificadores estáveis para jogadores e facções, em vez de depender apenas do nome exibido;
- incluir versão do esquema no JSON exportado;
- substituir concatenações inseguras em `innerHTML` quando houver entrada do usuário;
- usar embaralhamento mais adequado do que `array.sort(() => 0.5 - Math.random())`;
- melhorar mensagens vazias dos gráficos;
- garantir acessibilidade por teclado e foco visível;
- adicionar testes das funções independentes;
- considerar dependências locais ou processo de build somente em etapa futura.

Esses itens são backlog. Não assumir que já foram implementados.

---

## 12. Checklist obrigatório após cada mudança

1. página inicia sem erro no console;
2. cabeçalho e navegação aparecem corretamente;
3. todas as abas alternam;
4. cadastro e exclusão de jogador funcionam;
5. jogadores aparecem no formulário;
6. partida pode ser registrada;
7. vencedor, pontuação, mapa e facção são preservados;
8. ranking de jogadores atualiza;
9. ranking de facções atualiza;
10. gráficos renderizam sem duplicação;
11. histórico aparece na ordem esperada;
12. exclusão de partida funciona;
13. randomizador executa para as quantidades disponíveis;
14. Reach mínimo continua sendo respeitado;
15. dados permanecem após recarregar;
16. interface continua utilizável em tela móvel;
17. não há caminhos quebrados para CSS, JS ou imagens;
18. a versão estável da `main` não foi alterada prematuramente.

---

## 13. Instruções para uma nova sessão de IA

Ao retomar o projeto, fornecer este documento e, de preferência, os arquivos atuais do repositório. A IA deve:

1. considerar a baseline publicada como funcional;
2. não reescrever o projeto inteiro sem necessidade;
3. trabalhar em uma sprint por vez;
4. preservar `archive/original.html`;
5. não alterar regras ou valores sem validação;
6. não inventar nomes de arquivos que não tenham sido conferidos;
7. entregar arquivos completos quando uma alteração for extensa;
8. indicar exatamente quais arquivos devem ser substituídos;
9. separar refatoração, redesign e nova funcionalidade;
10. conduzir validação funcional após cada etapa;
11. preservar as chaves `root_players` e `root_matches`, salvo migração explícita;
12. respeitar os direitos e atribuições dos assets de terceiros.

### Prompt de retomada sugerido

```text
Estou continuando o desenvolvimento do Root Scoreboard. Leia integralmente o arquivo CONTEXTO_DESENVOLVIMENTO.md antes de propor mudanças. A baseline v0.1.0 está publicada e funcional no GitHub Pages. O próximo trabalho é a Sprint 2: extrair somente o CSS incorporado para css/main.css, sem alterar o visual nem as funcionalidades. Vou fornecer os arquivos atuais do repositório. Não reescreva o projeto inteiro, preserve archive/original.html e conduza a implementação em passos verificáveis.
```

---

## 14. Próxima ação exata

Retomar pela **Sprint 2: extração controlada do CSS**. Antes de editar qualquer arquivo, conferir se `develop` existe e está sincronizada com `main`. Criar `feature/separar-css`, extrair exclusivamente o bloco `<style>` existente, incluir `./css/main.css`, executar o checklist de regressão e então registrar o commit.

Não iniciar redesign, importação de imagens ou modularização do JavaScript antes de concluir e validar essa etapa.
