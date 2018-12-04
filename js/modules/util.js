export const getElementFromTemplate = (string) => {
  const el = document.createElement(`div`);
  el.innerHTML = string.trim();
  return el;
};

export const content = document.querySelector(`#main`);

export const changeScreen = (node) => {
  content.innerHTML = ``;
  content.appendChild(node);
};
