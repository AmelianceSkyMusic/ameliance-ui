import React from 'react';
import { useEffect, useState } from 'react';
import { addChangeThemeListener, getThemeState } from '../scripts';

export function ThemeButton() {
  const currentTheme = getThemeState();

  const [theme, setTheme] = useState(currentTheme);
  useEffect(() => {
    const themeButton$ = document.querySelector('.theme-button') as HTMLButtonElement;
    addChangeThemeListener(themeButton$, 'light');
  });

  return (
    <button
      type="button"
      className="theme-button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <span className="icon icon--sun"></span>
      ) : (
        <span className="icon icon--moon"></span>
      )}
    </button>
  );
}
