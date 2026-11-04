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
        'features/elevator',
        'features/patrol',
        'features/head',
        'features/maintenance',
        'features/online-time',
        'features/player-limit',
        'features/death-messages',
        'features/ban',
        'features/back',
        'features/rtp',
        'features/spawn',
        'features/warp',
        'features/home',
        'features/economy',
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
        'api/waypoint',
        'api/highlight',
        'api/economy',
      ],
    },
  ],
};

export default sidebars;
