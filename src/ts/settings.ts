import { createGameBoard, GameSettings } from './gameBoard';

function updatePreviewImage(themeValue: string): void {
    const previewImg = document.getElementById('theme-preview-img') as HTMLImageElement;
    if (!previewImg) return;
    previewImg.src = themeValue === 'food'
        ? 'assets/icons/preview_food_theme.svg'
        : 'assets/icons/preview_gaming_theme.svg';
}

function getSelectedRadioValue(name: string): string | null {
    const selected = document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
    return selected ? selected.value : null;
}

function handleThemeHover(event: MouseEvent): void {
    const input = (event.currentTarget as HTMLElement).querySelector('input') as HTMLInputElement;
    if (input) updatePreviewImage(input.value);
}

function handleThemeHoverLeave(): void {
    const activeTheme = getSelectedRadioValue('theme');
    if (activeTheme) updatePreviewImage(activeTheme);
}

function updateFieldLabel(name: string, targetId: string, fallbackText: string): void {
    const input = document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const labelText = input?.closest('label')?.querySelector('.radio-option__label')?.textContent;
    targetEl.textContent = labelText || fallbackText;
}

function updateStartButtonState(): void {
    const themeInput = document.querySelector<HTMLInputElement>('input[name="theme"]:checked');
    const playerInput = document.querySelector<HTMLInputElement>('input[name="player"]:checked');
    const boardInput = document.querySelector<HTMLInputElement>('input[name="boardSize"]:checked');
    const startBtn = document.getElementById('btn-start') as HTMLButtonElement;

    if (!startBtn) return;
    const isComplete = Boolean(themeInput && playerInput && boardInput);
    startBtn.disabled = !isComplete;
    startBtn.classList.toggle('btn--start--active', isComplete);
}

function updateSettingsSummary(): void {
    updateFieldLabel('theme', 'selected-theme', 'Theme');
    updateFieldLabel('player', 'selected-player', 'Player');
    updateFieldLabel('boardSize', 'selected-board-size', 'Board size');
    updateStartButtonState();
}

function attachThemeHoverListeners(): void {
    const themeOptions = document.querySelectorAll('input[name="theme"]');
    themeOptions.forEach((radio) => {
        const label = radio.closest('.radio-option');
        if (!label) return;
        label.addEventListener('mouseenter', handleThemeHover as EventListener);
        label.addEventListener('mouseleave', handleThemeHoverLeave);
    });
}

function handleFormSubmit(event: Event, form: HTMLFormElement): void {
    event.preventDefault();
    const formData = new FormData(form);
    const settings: GameSettings = {
        theme: (formData.get('theme') as 'gaming' | 'food') || 'gaming',
        player: (formData.get('player') as 'blue' | 'orange') || 'blue',
        boardSize: parseInt(formData.get('boardSize') as string, 10) as 16 | 24 | 36
    };

    const pageSettings = document.getElementById('page-settings');
    const pageGame = document.getElementById('page-game');

    if (pageGame) pageGame.setAttribute('data-theme', settings.theme);
    createGameBoard(settings);

    pageSettings?.classList.add('is-hidden');
    pageGame?.classList.remove('is-hidden');
}

export function initSettings(): void {
    const form = document.getElementById('settings-form') as HTMLFormElement | null;
    if (form) {
        form.addEventListener('change', updateSettingsSummary);
        form.addEventListener('submit', (e) => handleFormSubmit(e, form));
    }

    attachThemeHoverListeners();
    updateSettingsSummary();
}