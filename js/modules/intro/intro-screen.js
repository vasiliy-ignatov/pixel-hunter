import {changeScreen} from './../util.js';
import IntroView from './intro-view.js';
import {getGreetingScreen} from './../greeting/greeting-screen.js';

export const getIntroScreen = () => {
  const template = new IntroView();
  template.onClick = () => {
    changeScreen(getGreetingScreen());
  };

  return template.element;
};
