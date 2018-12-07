import StatisticsView from './statistics-view.js';

export const getStatictics = (state) => {
  const template = new StatisticsView(state);

  return template.element;
};
