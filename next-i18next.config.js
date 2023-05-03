module.exports = {
	i18n: {
		locales: ['en', 'ru'],
		defaultLocale: 'ru',
	},
	reloadOnPrerender: process.env.NEXT_PUBLIC_ENV === "development"
};