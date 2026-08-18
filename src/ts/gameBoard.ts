let scores: Record<'blue' | 'orange', number> = { blue: 0, orange: 0 };
let activePlayer: 'blue' | 'orange' = 'blue';

export interface GameSettings {
    theme: 'gaming' | 'food';
    player: 'blue' | 'orange';
    boardSize: 16 | 24 | 36;
}

export function createGameBoard(settings: GameSettings): void {
    const boardElement = document.getElementById('game-board');
    if (!boardElement) return;

    resetScores(settings.player);
    updateCurrentPlayerDisplay(settings.player);

    boardElement.innerHTML = '';
    boardElement.setAttribute('data-size', settings.boardSize.toString());

    const pairCount = settings.boardSize / 2;
    const cardIndices: number[] = Array.from({ length: pairCount }, (_, i) => i + 1);
    const deck = shuffleArray([...cardIndices, ...cardIndices]);

    const fragment = document.createDocumentFragment();

    deck.forEach((cardId) => {
        const cardElement = createCardElement(cardId, settings.theme);
        fragment.appendChild(cardElement);
    });

    boardElement.appendChild(fragment);

    setupCardFlipLogic(boardElement);
    setupExitDialogLogic();
}

export function updateCurrentPlayerDisplay(player: 'blue' | 'orange'): void {
    const badge = document.querySelector('.current-player__badge');
    const icon = document.getElementById('current-player-icon') as HTMLImageElement | null;
    if (!badge || !icon) return;

    badge.className = `current-player__badge current-player__badge--${player}`;
    icon.src = `/assets/icons/chess_pawn_${player}.svg`;
    icon.alt = `${player} player icon`;
}

function resetScores(startingPlayer: 'blue' | 'orange'): void {
    scores = { blue: 0, orange: 0 };
    activePlayer = startingPlayer;
    updateScoreDisplay();
}

function updateScoreDisplay(): void {
    const blueScore = document.getElementById('score-player-blue');
    const orangeScore = document.getElementById('score-player-orange');
    if (blueScore) blueScore.textContent = scores.blue.toString();
    if (orangeScore) orangeScore.textContent = scores.orange.toString();
}

function createCardElement(cardId: number, theme: 'gaming' | 'food'): HTMLElement {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.cardId = cardId.toString();

    const backContent = theme === 'food'
        ? `<img src="/assets/icons/DA_logo.svg" alt="Developer Akademie Logo">`
        : '';

    const frontSrc = `/assets/cards/${theme}/card_${cardId}.svg`;

    card.innerHTML = `
        <div class="card__inner">
            <div class="card__face card__face--back">
                ${backContent}
            </div>
            <div class="card__face card__face--front">
                <img src="${frontSrc}" alt="Card Icon ${cardId}">
            </div>
        </div>
    `;

    return card;
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let flippedCards: HTMLElement[] = [];
let isLockBoard = false;

export function setupCardFlipLogic(boardElement: HTMLElement): void {
    boardElement.addEventListener('click', handleCardClick);
}

function handleCardClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const card = target.closest('.card') as HTMLElement | null;

    if (!card || isLockBoard || isCardDisabled(card)) return;

    flipCard(card);
}

function isCardDisabled(card: HTMLElement): boolean {
    const isFlipped = card.classList.contains('is-flipped');
    const isMatched = card.classList.contains('is-matched');
    return isFlipped || isMatched || flippedCards.includes(card);
}

function flipCard(card: HTMLElement): void {
    card.classList.add('is-flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch(): void {
    const [cardOne, cardTwo] = flippedCards;
    const isMatch = cardOne.dataset.cardId === cardTwo.dataset.cardId;

    if (isMatch) {
        handleMatch(cardOne, cardTwo);
    } else {
        handleMismatch(cardOne, cardTwo);
    }
}

function switchPlayer(): void {
    activePlayer = activePlayer === 'blue' ? 'orange' : 'blue';
    updateCurrentPlayerDisplay(activePlayer);
}

function handleMatch(cardOne: HTMLElement, cardTwo: HTMLElement): void {
    cardOne.classList.add('is-matched');
    cardTwo.classList.add('is-matched');
    scores[activePlayer]++;
    updateScoreDisplay();
    resetTurn();
}

function handleMismatch(cardOne: HTMLElement, cardTwo: HTMLElement): void {
    isLockBoard = true;
    setTimeout(() => {
        cardOne.classList.remove('is-flipped');
        cardTwo.classList.remove('is-flipped');
        switchPlayer();
        resetTurn();
    }, 1000);
}

function resetTurn(): void {
    flippedCards = [];
    isLockBoard = false;
}

export function setupExitDialogLogic(): void {
    const btnExit = document.getElementById('btn-exit-game');
    const dialog = document.getElementById('exit-dialog') as HTMLDialogElement | null;
    const btnCancel = document.getElementById('btn-cancel-exit');
    const btnConfirm = document.getElementById('btn-confirm-exit');
    if (!btnExit || !dialog || !btnCancel || !btnConfirm) return;

    btnExit.addEventListener('click', () => dialog.showModal());
    btnCancel.addEventListener('click', () => dialog.close());
    btnConfirm.addEventListener('click', () => handleGameQuit(dialog));
    dialog.addEventListener('click', (e) => handleBackdropClick(e, dialog));
}

function handleBackdropClick(event: MouseEvent, dialog: HTMLDialogElement): void {
    const rect = dialog.getBoundingClientRect();
    const isOutside = event.clientX < rect.left || event.clientX > rect.right ||
                      event.clientY < rect.top || event.clientY > rect.bottom;
    if (isOutside) dialog.close();
}

function handleGameQuit(dialog: HTMLDialogElement): void {
    dialog.close();
    const pageSettings = document.getElementById('page-settings');
    const pageGame = document.getElementById('page-game');
    if (pageGame && pageSettings) {
        pageGame.classList.add('is-hidden');
        pageSettings.classList.remove('is-hidden');
    }
}