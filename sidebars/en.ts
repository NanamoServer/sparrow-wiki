import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'installation',
    'commands',
    {
      type: 'category',
      label: '🧩 Features',
      collapsed: false,
      items: [
        'features/quick-shulker',
        'features/patrol',
        'features/highlight',
        'features/head',
      ],
    },
    'faq',
    'developer-api',
  ],
};

export default sidebars;
