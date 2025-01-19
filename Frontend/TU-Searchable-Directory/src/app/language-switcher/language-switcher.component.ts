// language-switcher.component.ts
import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-language-switcher',
  template: `
    <button class="lang-switch" (click)="toggleLanguage()">
      <i class="fas fa-globe"></i>
      {{ currentLang === 'en' ? 'नेपाली' : 'English' }}
    </button>
  `,
  styles: [
    `
      .lang-switch {
        position: fixed;
        top: 1rem;
        right: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 9999px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .lang-switch:hover {
        background: rgba(255, 255, 255, 1);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      }
    `,
  ],
})
export class LanguageSwitcherComponent {
  currentLang = 'en';

  constructor(private languageService: LanguageService) {
    this.languageService.currentLang$.subscribe(
      (lang) => (this.currentLang = lang)
    );
  }

  toggleLanguage() {
    const newLang = this.currentLang === 'en' ? 'np' : 'en';
    this.languageService.switchLanguage(newLang);
  }
}
