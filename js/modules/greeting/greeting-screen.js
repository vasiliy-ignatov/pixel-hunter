import {changeScreen} from './../util.js';
import GreetingView from './greeting-view.js';
import {getRulesScreen} from './../rules/rules-screen.js';

export const getGreetingScreen = () => {
  const template = new GreetingView();
  template.onClick = () => {
    changeScreen(getRulesScreen());
  };

  return template.element;
};
