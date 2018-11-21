export const render = (string) => {
  const el = document.createElement(`div`);
  el.innerHTML = string.trim();
  return el;
};

const content = document.querySelector(`#main`);
export const changeScreen = (node) => {
  content.innerHTML = ``;
  content.appendChild(node);
};
