import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
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
        'features/maintenance',
        'features/player-limit',
        'features/ban',
        'features/back',
        'features/rtp',
        'features/spawn',
        'features/warp',
        'features/home',
        'features/tpa',
      ],
    },
    {
      type: 'category',
      label: '🧭 Teleport configuration',
      collapsed: false,
      items: [
        'teleport/overview',
        'teleport/processors',
      ],
    },
    {
      type: 'category',
      label: '🛠️ API usage',
      collapsed: false,
      items: [
        'api/teleport',
      ],
    },
  ],
};

export default sidebars;
