/* ==========================================================
   ROOT SCOREBOARD
   Lógica principal da aplicação
   ========================================================== */
    // VALORES OFICIAIS DE ALCANCE (REACH) DA IMAGEM
    const FACTIONS = [
      { id: 'gatos', name: 'Marquesa de Cat (Gatos)', reach: 10 },
      { id: 'ratos', name: 'Empresa Florestal S.A. (Senhor das Centenas)', reach: 9 },
      { id: 'guardioes', name: 'Guardiões em Ferro', reach: 8 },
      { id: 'toupeiras', name: 'Ducado Subterrâneo', reach: 8 },
      { id: 'passaros', name: 'Dinastia Rapina (Pássaros)', reach: 7 },
      { id: 'vagabundo', name: 'Malandro (Vagabundo)', reach: 5 },
      { id: 'ribeirinhos', name: 'Cia. dos Ribeirinhos', reach: 5 },
      { id: 'alianca', name: 'Aliança da Floresta', reach: 3 },
      { id: 'corvideos', name: 'Conspiração dos Corvídeos', reach: 3 },
      { id: 'lagartos', name: 'Culto dos Reptilianos', reach: 2 }
    ];

    const MAPS = ["Base", "Inverno", "Lago", "Montanha"];

    const REACH_REQUIREMENTS = {
      2: 17,
      3: 18,
      4: 21,
      5: 25,
      6: 28
    };

    // ESTADO DA APLICAÇÃO (LOCALSTORAGE)
    let players = JSON.parse(localStorage.getItem('root_players')) || ['Jogador 1', 'Jogador 2', 'Jogador 3', 'Jogador 4'];
    let matches = JSON.parse(localStorage.getItem('root_matches')) || [];

    // Instâncias de Gráficos
    let playerChartInstance = null;
    let factionChartInstance = null;

    // INICIALIZAÇÃO
    document.addEventListener('DOMContentLoaded', () => {
      renderPlayersList();
      resetMatchForm();
    });

    // SISTEMA DE ABAS
    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('bg-amber-600');
        el.classList.add('bg-gray-700');
      });

      document.getElementById(tabId).classList.remove('hidden');
      const activeBtn = document.getElementById('btn-' + tabId.replace('tab-', ''));
      activeBtn.classList.remove('bg-gray-700');
      activeBtn.classList.add('bg-amber-600');

      if (tabId === 'tab-stats') {
        renderStats();
      }
    }

    // --- GERENCIAMENTO DE JOGADORES ---
    function renderPlayersList() {
      const list = document.getElementById('players-list');
      list.innerHTML = '';
      players.forEach((player, index) => {
        list.innerHTML += `
          <li class="flex justify-between items-center p-3">
            <span class="font-medium text-amber-300">${player}</span>
            <button onclick="removePlayer(${index})" class="text-red-400 hover:text-red-300">
              <i class="fa-solid fa-trash"></i>
            </button>
          </li>
        `;
      });
      localStorage.setItem('root_players', JSON.stringify(players));
    }

    function addPlayer() {
      const input = document.getElementById('new-player-name');
      const name = input.value.trim();
      if (name && !players.includes(name)) {
        players.push(name);
        input.value = '';
        renderPlayersList();
      }
    }

    function removePlayer(index) {
      players.splice(index, 1);
      renderPlayersList();
    }

    // --- FORMULÁRIO DE REGISTRO DE PARTIDA ---
    function resetMatchForm() {
      const container = document.getElementById('match-players-container');
      container.innerHTML = '';
      for (let i = 0; i < 4; i++) {
        addPlayerToMatchRow();
      }
    }

    function addPlayerToMatchRow() {
      const container = document.getElementById('match-players-container');
      const rowId = container.children.length;

      let playerOptions = players.map(p => `<option value="${p}">${p}</option>`).join('');
      let factionOptions = FACTIONS.map(f => `<option value="${f.name}">${f.name}</option>`).join('');

      const row = document.createElement('div');
      row.className = 'grid grid-cols-1 md:grid-cols-12 gap-2 items-center bg-gray-800 p-3 rounded';
      row.innerHTML = `
        <div class="md:col-span-3">
          <label class="text-xs text-gray-400">Jogador</label>
          <select class="match-player-select w-full bg-gray-700 text-white p-2 rounded">
            ${playerOptions}
          </select>
        </div>
        <div class="md:col-span-4">
          <label class="text-xs text-gray-400">Facção Escolhida</label>
          <select class="match-faction-select w-full bg-gray-700 text-white p-2 rounded">
            ${factionOptions}
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="text-xs text-gray-400">Pontos</label>
          <input type="number" min="0" max="30" value="0" class="match-score-input w-full bg-gray-700 text-white p-2 rounded text-center">
        </div>
        <div class="md:col-span-2 flex items-center pt-4 md:pt-0">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="match-winner" class="match-winner-radio form-radio text-amber-500" ${rowId === 0 ? 'checked' : ''}>
            <span class="text-sm font-bold text-amber-400">Vencedor</span>
          </label>
        </div>
        <div class="md:col-span-1 text-right pt-2 md:pt-0">
          <button onclick="this.parentElement.parentElement.remove()" class="text-red-400 hover:text-red-300">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `;
      container.appendChild(row);
    }

    function saveMatch() {
  const map = document.getElementById('match-map').value;
  const winCondition = document.getElementById(
    'match-win-condition'
  ).value;

  const rows = Array.from(
    document.querySelectorAll('#match-players-container > div')
  );

  // Uma partida precisa ter pelo menos dois participantes.
  if (rows.length < 2) {
    alert(
      'É necessário ter pelo menos 2 jogadores para registrar uma partida.'
    );
    return;
  }

  // Converte cada linha do formulário em um objeto de resultado.
  const results = rows.map((row) => {
    const playerSelect = row.querySelector('.match-player-select');
    const factionSelect = row.querySelector('.match-faction-select');
    const scoreInput = row.querySelector('.match-score-input');
    const winnerRadio = row.querySelector('.match-winner-radio');

    return {
      player: playerSelect.value,
      faction: factionSelect.value,
      score: Number(scoreInput.value),
      isWinner: winnerRadio.checked
    };
  });

  // Confere se todas as linhas possuem jogador e facção.
  const hasEmptyFields = results.some((result) => {
    return !result.player || !result.faction;
  });

  if (hasEmptyFields) {
    alert('Todas as linhas precisam ter um jogador e uma facção.');
    return;
  }

  // Confere se as pontuações estão entre 0 e 30.
  const hasInvalidScore = results.some((result) => {
    return (
      !Number.isInteger(result.score) ||
      result.score < 0 ||
      result.score > 30
    );
  });

  if (hasInvalidScore) {
    alert('A pontuação de cada jogador deve ser um número entre 0 e 30.');
    return;
  }

  // Compara o total de jogadores com o total de nomes únicos.
  const playerNames = results.map((result) => result.player);
  const uniquePlayerNames = new Set(playerNames);

  if (uniquePlayerNames.size !== playerNames.length) {
    alert('O mesmo jogador não pode aparecer mais de uma vez na partida.');
    return;
  }

  // Uma partida precisa ter exatamente um vencedor.
  const winners = results.filter((result) => result.isWinner);

  if (winners.length !== 1) {
    alert('Selecione exatamente um vencedor para registrar a partida.');
    return;
  }

  const matchData = {
    id: Date.now(),
    date:
      new Date().toLocaleDateString('pt-BR') +
      ' ' +
      new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      }),
    map,
    winCondition,
    results
  };

  matches.push(matchData);

  localStorage.setItem(
    'root_matches',
    JSON.stringify(matches)
  );

  alert('Partida registrada com sucesso!');

  resetMatchForm();
}

    // --- EXCLUIR PARTIDA ---
    function deleteMatch(matchId) {
      if (confirm("Tem certeza que deseja apagar esta partida do histórico?")) {
        matches = matches.filter(m => m.id !== matchId);
        localStorage.setItem('root_matches', JSON.stringify(matches));
        renderStats();
      }
    }

    // --- ESTATÍSTICAS E DASHBOARD ---
    function renderStats() {
      let playerStats = {};
      let factionStats = {};

      players.forEach(p => playerStats[p] = { games: 0, wins: 0 });
      FACTIONS.forEach(f => factionStats[f.name] = { games: 0, wins: 0 });

      matches.forEach(m => {
        m.results.forEach(res => {
          if (!playerStats[res.player]) playerStats[res.player] = { games: 0, wins: 0 };
          playerStats[res.player].games += 1;
          if (res.isWinner) playerStats[res.player].wins += 1;

          if (!factionStats[res.faction]) factionStats[res.faction] = { games: 0, wins: 0 };
          factionStats[res.faction].games += 1;
          if (res.isWinner) factionStats[res.faction].wins += 1;
        });
      });

      // Leaderboard Jogadores
      const playerBody = document.getElementById('player-leaderboard-body');
      playerBody.innerHTML = '';
      Object.keys(playerStats)
        .sort((a,b) => playerStats[b].wins - playerStats[a].wins)
        .forEach(p => {
          const st = playerStats[p];
          const winRate = st.games > 0 ? ((st.wins / st.games) * 100).toFixed(1) : '0.0';
          playerBody.innerHTML += `
            <tr class="hover:bg-gray-800">
              <td class="p-2 font-medium text-amber-300">${p}</td>
              <td class="p-2 text-center">${st.games}</td>
              <td class="p-2 text-center text-emerald-400 font-bold">${st.wins}</td>
              <td class="p-2 text-center">${winRate}%</td>
            </tr>
          `;
        });

      // Leaderboard Facções
      const factionBody = document.getElementById('faction-leaderboard-body');
      factionBody.innerHTML = '';
      Object.keys(factionStats)
        .sort((a,b) => factionStats[b].wins - factionStats[a].wins)
        .forEach(f => {
          const st = factionStats[f];
          if (st.games > 0) {
            const winRate = ((st.wins / st.games) * 100).toFixed(1);
            factionBody.innerHTML += `
              <tr class="hover:bg-gray-800">
                <td class="p-2 font-medium text-amber-300">${f}</td>
                <td class="p-2 text-center">${st.games}</td>
                <td class="p-2 text-center text-emerald-400 font-bold">${st.wins}</td>
                <td class="p-2 text-center">${winRate}%</td>
              </tr>
            `;
          }
        });

      // Histórico de Partidas
      const historyContainer = document.getElementById('match-history-list');
      historyContainer.innerHTML = '';

      if (matches.length === 0) {
        historyContainer.innerHTML = `<p class="text-gray-400 text-sm">Nenhuma partida registrada até o momento.</p>`;
      } else {
        [...matches].reverse().forEach(m => {
          const winner = m.results.find(r => r.isWinner);
          const winnerName = winner ? `${winner.player} (${winner.faction})` : 'Indefinido';

          let playersDetails = m.results.map(r => 
            `<span class="${r.isWinner ? 'text-amber-400 font-bold' : 'text-gray-300'}">${r.player} (${r.faction}): ${r.score}pts</span>`
          ).join(' | ');

          historyContainer.innerHTML += `
            <div class="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="bg-amber-600 text-xs px-2 py-0.5 rounded font-bold">${m.map}</span>
                  <span class="text-xs text-gray-400">${m.date}</span>
                  <span class="text-xs bg-gray-700 px-2 py-0.5 rounded text-emerald-400">Vitória por ${m.winCondition}</span>
                </div>
                <p class="text-sm font-semibold text-white">Vencedor: <span class="text-amber-400">${winnerName}</span></p>
                <div class="text-xs text-gray-400 mt-1">${playersDetails}</div>
              </div>
              <button onclick="deleteMatch(${m.id})" class="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded font-bold transition">
                <i class="fa-solid fa-trash"></i> Apagar
              </button>
            </div>
          `;
        });
      }

      renderCharts(playerStats, factionStats);
    }

    function renderCharts(playerStats, factionStats) {
      const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#6366f1', '#14b8a6', '#f97316'];

      const playerLabels = Object.keys(playerStats).filter(p => playerStats[p].wins > 0);
      const playerData = playerLabels.map(p => playerStats[p].wins);

      if (playerChartInstance) playerChartInstance.destroy();
      const ctxPlayer = document.getElementById('playerPieChart').getContext('2d');
      playerChartInstance = new Chart(ctxPlayer, {
        type: 'pie',
        data: {
          labels: playerLabels,
          datasets: [{ data: playerData, backgroundColor: colors }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#fff' } } } }
      });

      const factionLabels = Object.keys(factionStats).filter(f => factionStats[f].wins > 0);
      const factionData = factionLabels.map(f => factionStats[f].wins);

      if (factionChartInstance) factionChartInstance.destroy();
      const ctxFaction = document.getElementById('factionPieChart').getContext('2d');
      factionChartInstance = new Chart(ctxFaction, {
        type: 'pie',
        data: {
          labels: factionLabels,
          datasets: [{ data: factionData, backgroundColor: colors }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#fff' } } } }
      });
    }

    // --- RANDOMIZADOR DE FACÇÕES COM ALCANCE E MAPA ---
    function runRandomizer() {
      const count = parseInt(document.getElementById('rand-player-count').value);
      const requiredReach = REACH_REQUIREMENTS[count];
      const container = document.getElementById('randomizer-results');
      container.innerHTML = '';

      if (players.length < count) {
        alert(`Você precisa ter pelo menos ${count} jogadores cadastrados na aba 'Jogadores' para realizar o sorteio.`);
        return;
      }

      // 1. Sorteio do Mapa
      const selectedMap = MAPS[Math.floor(Math.random() * MAPS.length)];

      // 2. Sorteio das Facções respeitando o Alcance Mínimo
      let selectedFactions = [];
      let totalReach = 0;
      let attempts = 0;

      while (attempts < 2000) {
        attempts++;
        const shuffled = [...FACTIONS].sort(() => 0.5 - Math.random()).slice(0, count);
        const sumReach = shuffled.reduce((acc, f) => acc + f.reach, 0);

        if (sumReach >= requiredReach) {
          selectedFactions = shuffled;
          totalReach = sumReach;
          break;
        }
      }

      if (selectedFactions.length === 0) {
        alert('Não foi possível encontrar um conjunto válido de facções.');
        return;
      }

      // 3. Sorteio dos Jogadores
      const shuffledPlayers = [...players].sort(() => 0.5 - Math.random()).slice(0, count);

      // Renderização
      let html = `
        <div class="bg-gray-800 p-4 rounded-lg border border-amber-500/30 mb-4">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <div>
              <span class="text-xs text-gray-400">Mapa Sorteado:</span>
              <h4 class="text-lg font-bold text-amber-400"><i class="fa-solid fa-map"></i> Mapa ${selectedMap}</h4>
            </div>
            <div class="text-right">
              <span class="text-xs text-gray-400">Alcance do Jogo:</span>
              <h4 class="text-lg font-bold text-emerald-400">${totalReach} / ${requiredReach}+</h4>
            </div>
          </div>
        </div>

        <div class="space-y-2">
      `;

      shuffledPlayers.forEach((player, index) => {
        const faction = selectedFactions[index];
        html += `
          <div class="flex justify-between items-center bg-gray-800 p-3 rounded border-l-4 border-amber-500">
            <div>
              <span class="font-bold text-white">${player}</span>
            </div>
            <div class="text-right">
              <span class="text-amber-400 font-medium block">${faction.name}</span>
              <span class="text-xs text-gray-400">Alcance: ${faction.reach}</span>
            </div>
          </div>
        `;
      });

      html += `</div>`;
      container.innerHTML = html;
    }