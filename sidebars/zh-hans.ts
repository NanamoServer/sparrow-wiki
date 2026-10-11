import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'installation',
    'commands',
    {
      type: 'category',
      label: '🧩 功能',
      collapsed: false,
      items: [
        'features/quick-shulker',
        'features/patrol',
        'features/highlight',
        'features/head',
        'features/maintenance',
        'features/player-limit',
        'features/ban',
        'features/mute',
        'features/back',
        'features/bed',
        'features/spawn',
        'features/warp',
        'features/home',
        'features/tpa',
      ],
    },
    {
      type: 'category',
      label: '🧭 传送配置',
      collapsed: false,
      items: [
        'teleport/overview',
        'teleport/processors',
      ],
    },
    'faq',
    'developer-api',
  ],
};

export default sidebars;
