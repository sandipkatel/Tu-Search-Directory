// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  private translations: { [key: string]: { [key: string]: any } } = {
    en: {
      // Header
      name: 'Tribhuvan University (TU)',
      title: 'TRIBHUVAN UNIVERSITY DIRECTORY',
      searchButton: 'Search Directory',
      signInButton: 'Admin Login',

      // About Section
      aboutTitle: 'About Tribhuvan University',
      aboutText:
        "Tribhuvan University (TU), established in 1959, stands as Nepal's premier and largest educational institution. Located in the serene setting of Kirtipur, Kathmandu, TU has grown to become a cornerstone of higher education in Nepal...",

      // Leadership Section
      leadershipTitle: 'University Leadership',
      positions: {
        chancellor: {
          title: 'Chancellor',
          honorific: 'Rt. Hon.',
          name: 'KP Sharma Oli',
          position: 'Prime Minister of Nepal',
        },
        proChancellor: {
          title: 'Pro-Chancellor',
          honorific: 'Hon.',
          name: 'Biddha Bhattarai',
          position: 'Minister of Education',
        },
        viceChancellor: {
          title: 'Vice Chancellor',
          honorific: 'Prof. Dr.',
          name: 'Keshar Jung Baral',
          position: 'Academic Head',
        },
        dean: {
          title: 'Dean, IOE',
          honorific: 'Prof. Dr.',
          name: 'Sushil B. Bajracharya',
          position: 'Institute of Engineering',
        },
      },

      // Footer
      institutesTitle: 'INSTITUTES AND FACULTIES',
      contactTitle: 'CONTACT INFORMATION',
      address: 'Kirtipur, Kathmandu, Nepal',
      phone: 'Phone: +977-1-4330346',
      email: 'Email: info@tu.edu.np',
      copyright: '© 2024 Tribhuvan University. All rights reserved.',
    },
    np: {
      // Header
      name: 'त्रिभुवन विश्वविद्यालय (त्रि.वि.)',
      title: 'त्रिभुवन विश्वविद्यालय निर्देशिका',
      searchButton: 'निर्देशिका खोज्नुहोस्',
      signInButton: 'एडमिन लगइन',

      // About Section
      aboutTitle: 'त्रिभुवन विश्वविद्यालयको बारेमा',
      aboutText:
        'त्रिभुवन विश्वविद्यालय (त्रिवि), वि.सं. २०१६ सालमा स्थापित, नेपालको सबैभन्दा पुरानो र ठूलो शैक्षिक संस्था हो। कीर्तिपुर, काठमाडौंको शान्त वातावरणमा अवस्थित, त्रिवि नेपालको उच्च शिक्षाको मूल आधार बनेको छ...',

      // Leadership Section
      leadershipTitle: 'विश्वविद्यालय नेतृत्वकर्ता ',
      positions: {
        chancellor: {
          title: 'कुलपति',
          honorific: 'सम्माननीय',
          name: 'केपी शर्मा ओली',
          position: 'नेपालको प्रधानमन्त्री',
        },
        proChancellor: {
          title: 'सह-कुलपति',
          honorific: 'माननीय',
          name: 'विद्या भट्टराई',
          position: 'शिक्षा मन्त्री',
        },
        viceChancellor: {
          title: 'उप-कुलपति',
          honorific: 'प्रा.डा.',
          name: 'केशर जङ्ग बराल',
          position: 'शैक्षिक प्रमुख',
        },
        dean: {
          title: 'डीन, ई.अ.सं.',
          honorific: 'प्रा.डा.',
          name: 'सुशील बि. बज्राचार्य',
          position: 'ईन्जिनियरिङ अध्ययन संस्थान',
        },
      },

      // Footer
      institutesTitle: 'संस्थान तथा संकायहरू',
      contactTitle: 'सम्पर्क जानकारी',
      address: 'कीर्तिपुर, काठमाडौं, नेपाल',
      phone: 'फोन: +९७७-१-४३३०३४६',
      email: 'इमेल: info@tu.edu.np',
      copyright: '© २०२४ त्रिभुवन विश्वविद्यालय। सर्वाधिकार सुरक्षित।',
    },
  };

  constructor() {}

  switchLanguage(lang: string) {
    this.currentLang.next(lang);
  }

  getTranslation(key: string): string {
    const currentLang = this.currentLang.value;
    return this.getNestedTranslation(this.translations[currentLang], key);
  }

  private getNestedTranslation(obj: any, path: string): string {
    return path.split('.').reduce((p, c) => p && p[c], obj) || '';
  }
}
