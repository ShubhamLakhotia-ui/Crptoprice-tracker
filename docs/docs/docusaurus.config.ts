import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Crypto Tracker',
  tagline: 'Real-time Crypto Price Tracker',
  favicon: 'img/favicon.ico',

  // ✅ Fix: The `url` should be the root domain only
  url: 'https://ShubhamLakhotia-ui.github.io', // ✅ Corrected (No repo name here)
  
  // ✅ Fix: The `baseUrl` should contain the repo name if hosting on GitHub Pages
  baseUrl: 'https://github.com/ShubhamLakhotia-ui/Crptoprice-tracker', // ✅ Corrected (Use repo name as baseUrl)

  organizationName: 'ShubhamLakhotia-ui', // ✅ Your GitHub username
  projectName: 'Crptoprice-tracker', // ✅ Your GitHub repo name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: '/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Crypto Tracker',
      logo: {
        alt: 'Crypto Tracker Logo',
        src: 'img/favicon.ico',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/ShubhamLakhotia-ui/Crptoprice-tracker',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Setup Guide',
              to: '/docs/setup-guide',
            },
            {
              label: 'API Integration',
              to: '/docs/api-integration',
            },
            {
              label: 'State Management',
              to: '/docs/state-management',
            },{
              label: 'challenges',
              to: '/docs/challenges',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ShubhamLakhotia-ui/Crptoprice-tracker',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Crypto Tracker. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
