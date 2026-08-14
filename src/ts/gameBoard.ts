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
}

function createCardElement(cardId: number, theme: 'gaming' | 'food'): HTMLElement {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.cardId = cardId.toString();

    const backSrc = `/assets/cards/${theme}/card_back.svg`;
    const frontSrc = `/assets/cards/${theme}/card_${cardId}.svg`;

    card.innerHTML = `
        <div class="card__inner">
            <div class="card__face card__face--back">
                <img src="${backSrc}" alt="Card Back">
            </div>
            <div class="card__face card__face--front">
                <img src="${frontSrc}" alt="Card Front ${cardId}">
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