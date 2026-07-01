/**
 * PredictSF Ranking MVP
 * Static ranking page with automatic data loading and sorting.
 */

const RANKING_URL = './ranking.json';

// Medals for top 3 positions
const MEDALS = {
  1: '🥇',
  2: '🥈',
  3: '🥉'
};

const POINTS_FORMATTER = new Intl.NumberFormat('pt-BR');

/**
 * Loads ranking data from ranking.json.
 * @returns {Promise<{players: Array, error: Error|null}>}
 */
async function loadRanking() {
  const response = await fetch(RANKING_URL, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Falha ao carregar o ranking (${response.status})`);
  }

  const players = await response.json();

  if (!Array.isArray(players)) {
    throw new Error('O arquivo ranking.json precisa conter uma lista de jogadores.');
  }

  return players;
}

/**
 * Checks whether a player has the required fields to be rendered.
 * @param {Object} player - Player object candidate
 * @returns {boolean} True when player is valid
 */
function isValidPlayer(player) {
  return Boolean(
    player &&
      typeof player.name === 'string' &&
      player.name.trim() &&
      typeof player.avatar === 'string' &&
      player.avatar.trim() &&
      Number.isFinite(player.points)
  );
}

/**
 * Sorts players by points in descending order and then by name.
 * @param {Array} players - Array of player objects
 * @returns {Array} Sorted array of valid players
 */
function sortPlayers(players) {
  return players
    .filter(isValidPlayer)
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name, 'pt-BR'));
}

/**
 * Formats a point value for display.
 * @param {number} points - Player points
 * @returns {string} Formatted points
 */
function formatPoints(points) {
  return POINTS_FORMATTER.format(points);
}

/**
 * Creates a player card HTML element.
 * @param {Object} player - Player object with id, name, avatar, points.
 * @param {number} position - Player's generated ranking position (1-indexed).
 * @returns {HTMLElement} List item element.
 */
function createPlayerCard(player, position) {
  const card = document.createElement('article');
  card.className = 'player-card';
  card.setAttribute('aria-label', `${position}º lugar: ${player.name} com ${formatPoints(player.points)} pontos`);

  // Position or Medal
  const positionElement = document.createElement('div');
  if (MEDALS[position]) {
    positionElement.className = 'medal';
    positionElement.textContent = MEDALS[position];
    positionElement.setAttribute('aria-hidden', 'true');
  } else {
    positionElement.className = 'position';
    positionElement.textContent = position;
  }

  const avatar = document.createElement('span');
  avatar.className = 'avatar';
  avatar.textContent = player.avatar.trim().slice(0, 2).toUpperCase();
  avatar.setAttribute('aria-hidden', 'true');

  const info = document.createElement('div');
  info.className = 'player-info';

  const name = document.createElement('h3');
  name.className = 'player-name';
  name.textContent = player.name.trim();

  const positionLabel = document.createElement('div');
  positionLabel.className = 'player-points';
  positionLabel.textContent = `${position}º lugar`;

  info.appendChild(name);
  info.appendChild(positionLabel);

  const pointsDisplay = document.createElement('div');
  pointsDisplay.className = 'points-display';
  pointsDisplay.setAttribute('aria-hidden', 'true');

  const pointsValue = document.createElement('span');
  pointsValue.className = 'points-value';
  pointsValue.textContent = formatPoints(player.points);

  const pointsUnit = document.createElement('span');
  pointsUnit.className = 'points-label';
  pointsUnit.textContent = player.points === 1 ? 'ponto' : 'pontos';

  pointsDisplay.append(pointsValue, pointsUnit);
  item.append(positionElement, avatar, info, pointsDisplay);

  return item;
}

/**
 * Renders a ranking status message inside the ordered list.
 * @param {string} message - Message to display.
 */
function renderStatus(message) {
  const container = document.getElementById(RANKING_CONTAINER_ID);
  container.replaceChildren();

  const item = document.createElement('li');
  item.className = 'ranking-status';
  item.textContent = message;
  container.appendChild(item);
}

/**
 * Renders a status message in the ranking container.
 * @param {string} message - Message to show
 * @param {string} type - Status type used for styling
 */
function renderStatus(message, type = 'info') {
  const container = document.getElementById('rankingContainer');
  container.innerHTML = '';

  const status = document.createElement('p');
  status.className = `status-message status-${type}`;
  status.textContent = message;
  container.appendChild(status);
}

/**
 * Renders the complete ranking list
 * @param {Array} players - Array of sorted player objects
 */
function renderRanking(players) {
  const container = document.getElementById(RANKING_CONTAINER_ID);
  container.replaceChildren();

  if (players.length === 0) {
    renderStatus('Nenhum dado disponível no momento.');
    return;
  }

  const fragment = document.createDocumentFragment();

  players.forEach((player, index) => {
    const position = index + 1;
    const card = createPlayerCard(player, position);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

/**
 * Updates the timestamp displayed in the footer.
 */
function renderUpdatedAt() {
  const updatedAt = document.getElementById('updatedAt');

  if (!updatedAt) {
    return;
  }

  updatedAt.textContent = `Revisado em ${new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date())}`;
}

/**
 * Initializes the ranking page.
 * Loads data, sorts by points, and renders the list.
 */
async function init() {
  renderStatus('Carregando ranking...');

  try {
    const players = await loadRanking();
    const sortedPlayers = sortPlayers(players);

    if (sortedPlayers.length === 0) {
      renderStatus('Nenhum dado disponível no momento.');
      return;
    }

    renderRanking(sortedPlayers);
    renderUpdatedAt();
  } catch (error) {
    console.error('Error loading ranking:', error);
    renderStatus('Não foi possível carregar o ranking. Tente novamente em instantes.', 'error');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
