/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				outfit: ['var(--font-sans)', ...fontFamily.sans],
			},
			colors: {
				gold: '#D6AD76',
				violet: '#75459F',
				imaginary: '#F3DF32',
				three: {
					from: '#4981C6',
					to: '#3D3E69',
				},
				four: {
					from: '#9C65D7',
					to: '#3F4064',
				},
				five: {
					from: '#D0AA6E',
					to: '#A35D55',
				},
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')],
	daisyui: {
		themes: [
			'dark',
			{
				main: {
					accent: '#002554',
				},
			},
		],
	},
};
