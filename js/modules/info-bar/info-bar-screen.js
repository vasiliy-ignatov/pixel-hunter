import InfoBarView from './info-bar-view.js';
import Application from './../application.js';

export const getInfoBar = (state) => {
  const template = new InfoBarView(state);

  template.onClick = () => {
    Application.showIntro();
  };

  return template;
};
