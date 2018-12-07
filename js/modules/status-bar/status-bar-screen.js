import StatusBarView from './status-bar-view.js';

export const getStatusBar = (state) => {
  const template = new StatusBarView(state);

  return template.element;
};
