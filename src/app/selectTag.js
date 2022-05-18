export const handleSelectContinent = () => {
  const button = document.getElementById('button');
  const dropdown = document.getElementById('dropdown');
  const selectArrow = document.querySelector('.arrow');
  const options = document.querySelectorAll('.option');
  const selectLabel = document.querySelector('#select-label');
  const startBtn = document.querySelector('.modal__button');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('hidden__dropdown');
    selectArrow.classList.toggle('arrow--active');
  });

  options.forEach((option) => {
    option.addEventListener('click', (e) => {
      const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText;
      startBtn.setAttribute('href', `/${e.target.value}.html`);
      selectLabel.innerText = labelElement;
      dropdown.classList.toggle('hidden__dropdown');
      selectArrow.classList.toggle('arrow--active');
    });
  });
};
handleSelectContinent();