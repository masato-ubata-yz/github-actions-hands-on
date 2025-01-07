import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [
  //   {type: 'autogenerated', dirName: '.'}
  // ],

  // But you can create a sidebar manually
  githubActionsHandsOnSidebar: [
    // 'intro',
    // 'hello',
    // {
    //   type: 'autogenerated',
    //   dirName: '.'
    // },
    'lesson/introduction',
    {
      type: 'category',
      label: '基礎構造を理解する',
      items: [
        'lesson/components',
        'lesson/workflow_elements',
        'exercises/exercise-1',
        'exercises/exercise-2',
      ]
    },
    {
      type: 'category',
      label: 'イベントを試す',
      items: [
        'lesson/events',
        'exercises/exercise-3',
        'exercises/exercise-4',
      ]
    },
    {
      type: 'category',
      label: '使用方法',
      items: [
        'how-to-use/dev-env',
        'how-to-use/manually-run-the-workflow',
      ]
    }
  ],
};

export default sidebars;
