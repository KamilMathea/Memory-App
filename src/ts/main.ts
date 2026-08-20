/**
 * @fileoverview Application entry point handling DOM initialization and navigation.
 */

import { initSettings } from './settings';

/**
 * Hides a target HTML element by adding the hidden CSS class.
 * @param element - The HTML element to hide.
 */
function hideElement(element: HTMLElement): void {
    element.classList.add('is-hidden');
}

/**
 * Displays a target HTML element by removing the hidden CSS class.
 * @param element - The HTML element to show.
 */
function showElement(element: HTMLElement): void {
    element.classList.remove('is-hidden');
}

/**
 * Navigates the user from the home page to the settings page.
 */
function navigateToSettings(): void {
    const homePage = document.getElementById('page-home');
    const settingsPage = document.getElementById('page-settings');

    if (homePage && settingsPage) {
        hideElement(homePage);
        showElement(settingsPage);
    }
}

/**
 * Binds event listeners for main navigation controls.
 */
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