export const render = (template) => {
  const el = document.createElement(`div`);
  el.innerHTML = template;
  return el;
};

const content = document.querySelector(`#main`);

export const changeScreen = (node) => {
  content.innerHTML = ``;
  content.appendChild(node);
};
