import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
// load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
// learn more: https://github.com/i18next/i18next-http-backend
// want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
	.use(Backend)
// detect user language
// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
// pass the i18n instance to react-i18next.
	.use(initReactI18next)
// init i18next
// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		debug: true,
		supportedLngs: ['en', 'uk'],
		fallbackLng: 'en',
		detection: {
			order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
			caches: ['cookie'],
		},
		backend: {
			loadPath: '/locales/{{lng}}/translation.json',
		},
		react: { useSuspense: false },
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		// resources: {
		// 	en: {
		// 		translation: {
		// 			heading: {
		// 				name: 'Bobomuratov Rajab',
		// 				position: 'Junior Front End Developer',
		// 				description: {
		// 					part1: 'I write code no matter what I do. If I’m writing music, doing design, video, or just doing routine work I write scripts or even entire tools to simplify my work. I like it',
		// 					part2: 'I have experience in developing and writing scripts and tools of different complexity in different languages (Javascript: After Effects, Figma, Illustrator, Studio One, Lua: Reaper, AHK: windows automation, etc.)',
		// 				},
		// 			},
		// 		},
		// 	},
		// 	uk: {
		// 		translation: {
		// 			heading: {
		// 				name: 'Бобомуратов Раджаб',
		// 				position: 'Junior Front End Developer',
		// 				description: {
		// 					part1: 'Я пишу код незалежно від того, що я роблю. Якщо я пишу музику, займаюся дизайном, відео або просто виконую рутинну роботу, я пишу скрипти або навіть цілі інструменти, які спрощують мою роботу. Мені подобається',
		// 					part2: 'Маю досвід розробки та написання скриптів та інструментів різної складності на різних мовах (Javascript: After Effects, Figma, Illustrator, Studio One, Lua: Reaper, AHK: автоматизація Windows та ін.).',
		// 				},
		// 			},
		// 		},
		// 	},
		// },
	});

export default i18n;
