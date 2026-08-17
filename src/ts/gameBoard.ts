export interface GameSettings {
    theme: 'gaming' | 'food';
    player: 'blue' | 'orange';
    boardSize: 16 | 24 | 36;
}

export function createGameBoard(settings: GameSettings): void {
    const boardElement = document.getElementById('game-board');
    if (!boardElement) return;

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

function handleMatch(cardOne: HTMLElement, cardTwo: HTMLElement): void {
    cardOne.classList.add('is-matched');
    cardTwo.classList.add('is-matched');
    resetTurn();
}

function handleMismatch(cardOne: HTMLElement, cardTwo: HTMLElement): void {
    isLockBoard = true;
    setTimeout(() => {
        cardOne.classList.remove('is-flipped');
        cardTwo.classList.remove('is-flipped');
        resetTurn();
    }, 1000);
}

function resetTurn(): void {
    flippedCards = [];
    isLockBoard = false;
}