import './styles/main.scss';

function hideElement(element: HTMLElement): void {
    element.classList.add('is-hidden');
}

function showElement(element: HTMLElement): void {
    element.classList.remove('is-hidden');
}

function navigateToSettings(): void {
    const homePage = document.getElementById('page-home');
    const settingsPage = document.getElementById('page-settings');

    if (homePage && settingsPage) {
        hideElement(homePage);
        showElement(settingsPage);
    }
}

function initNavigation(): void {
    const playBtn = document.getElementById('btn-to-settings');
    if (playBtn) {
        playBtn.addEventListener('click', navigateToSettings);
    }
}

document.addEventListener('DOMContentLoaded', initNavigation);

function updatePreviewImage(themeValue: string): void {
    const previewImg = document.getElementById('theme-preview-img') as HTMLImageElement;
    if (!previewImg) return;

    if (themeValue === 'gaming') {
        previewImg.src = '/assets/icons/preview_gaming_theme.svg';
    } else if (themeValue === 'food') {
        previewImg.src = '/assets/icons/preview_food_theme.svg';
    }
}

function getSelectedRadioValue(name: string): string | null {
    const selected = document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
    return selected ? selected.value : null;
}

function handleThemeHover(event: MouseEvent): void {
    const label = (event.currentTarget as HTMLElement).querySelector('.radio-option__label');
    const input = (event.currentTarget as HTMLElement).querySelector('input') as HTMLInputElement;
    if (input) {
        updatePreviewImage(input.value);
    }
}

function handleThemeHoverLeave(): void {
    const activeTheme = getSelectedRadioValue('theme');
    if (activeTheme) {
        updatePreviewImage(activeTheme);
    }
}

function updateSettingsSummary(): void {
    const themeInput = document.querySelector<HTMLInputElement>('input[name="theme"]:checked');
    const playerInput = document.querySelector<HTMLInputElement>('input[name="player"]:checked');
    const boardInput = document.querySelector<HTMLInputElement>('input[name="boardSize"]:checked');

    const themeText = document.getElementById('selected-theme');
    const playerText = document.getElementById('selected-player');
    const boardText = document.getElementById('selected-board-size');
    const startBtn = document.getElementById('btn-start') as HTMLButtonElement;

    if (themeText && themeInput) {
        const label = themeInput.closest('label')?.querySelector('.radio-option__label')?.textContent;
        themeText.textContent = label || 'Theme';
    }

    if (playerText && playerInput) {
        const label = playerInput.closest('label')?.querySelector('.radio-option__label')?.textContent;
        playerText.textContent = label || 'Player';
    }

    if (boardText && boardInput) {
        const label = boardInput.closest('label')?.querySelector('.radio-option__label')?.textContent;
        boardText.textContent = label || 'Board size';
    }

    if (startBtn) {
        const isComplete = Boolean(themeInput && playerInput && boardInput);
        startBtn.disabled = !isComplete;
        startBtn.classList.toggle('btn--start--active', isComplete);
    }
}

function initSettingsListeners(): void {
    const form = document.getElementById('settings-form');
    if (form) {
        form.addEventListener('change', updateSettingsSummary);
    }

    const themeOptions = document.querySelectorAll('input[name="theme"]');
    themeOptions.forEach((radio) => {
        const label = radio.closest('.radio-option');
        if (label) {
            label.addEventListener('mouseenter', handleThemeHover as EventListener);
            label.addEventListener('mouseleave', handleThemeHoverLeave);
        }
    });

    updateSettingsSummary();
}

document.addEventListener('DOMContentLoaded', () => {
    initSettingsListeners();
});