# Histórico de versões

As principais alterações do Root Scoreboard serão registradas
neste arquivo.

## [0.2.0]

### Adicionado

- Exportação de jogadores e partidas em JSON
- Importação de backup com validação básica
- Cadastro de jogadores com a tecla Enter
- Mensagens para cadastro vazio ou duplicado

### Alterado

- CSS próprio movido para `css/main.css`
- JavaScript próprio movido para `js/app.js`
- Normalização dos espaços nos nomes dos jogadores
- Comparação de nomes sem diferença entre maiúsculas e minúsculas
- Validação dos dados antes do registro de partidas

### Corrigido

- Bloqueio do mesmo jogador em múltiplas posições da partida
- Bloqueio de pontuações fora do intervalo permitido
- Bloqueio de partidas sem exatamente um vencedor

## [0.1.0]

### Adicionado

- Cadastro de jogadores
- Registro de partidas
- Ranking de jogadores e facções
- Gráficos de vitórias
- Histórico de partidas
- Randomizador com validação de Reach
- Persistência por `localStorage`
- Publicação inicial no GitHub Pages