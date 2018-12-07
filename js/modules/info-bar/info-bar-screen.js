import {changeScreen} from './../util.js';
import InfoBarView from './info-bar-view.js';
import {getIntroScreen} from './../intro/intro-screen.js';

export const getInfoBar = (state) => {
  const template = new InfoBarView(state);
  template.onClick = () => {
    changeScreen(getIntroScreen());
  };

  return template.element;
};
