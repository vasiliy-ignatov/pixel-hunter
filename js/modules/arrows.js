export const Arrows = {
  show: () => {
    const template = `<div class="arrows__wrap"><style>
                      .arrows__wrap { position: absolute; top: 95px; left: 50%; margin-left: -56px; }
                      .arrows__btn { background: none; border: 2px solid black; padding: 5px 20px; }
                      </style><button class="arrows__btn"><-</button><button class="arrows__btn">-></button></div>`;

    const el = document.createElement(`div`);
    el.innerHTML = template;

    const pageBody = document.querySelector(`body`);
    pageBody.appendChild(el);
  }
};
