import '../styles/main.scss';
import { initSettings } from './settings';

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

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSettings();
});