import noUiSlider from '../vendor/nouislider/nouislider.js';

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 900;
const RANGE_LIMIT_MIN = 0;
const RANGE_LIMIT_MAX = 1000;
const STEP_VALUE = 1;

const initRangeSlider = () => {
  // Поиск элементов один раз
  const sliderElement = document.querySelector('.filter__range');
  const inputMinElement = document.querySelector('#min-price');
  const inputMaxElement = document.querySelector('#max-price');

  // Б2: Проверка на существование
  if (!sliderElement || !inputMinElement || !inputMaxElement) {
    return;
  }

  // Создаем слайдер
  noUiSlider.create(sliderElement, {
    start: [DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE],
    connect: true,
    step: STEP_VALUE,
    range: {
      'min': RANGE_LIMIT_MIN,
      'max': RANGE_LIMIT_MAX,
    },
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value),
    },
  });

  // Обработчик обновления слайдера
  const onSliderUpdate = (values, handle) => {
    const value = values[handle];
    if (handle === 0) {
      inputMinElement.value = value;
    } else {
      inputMaxElement.value = value;
    }
  };

  // Обработчик изменения инпутов
  const onInputChange = () => {
    sliderElement.noUiSlider.set([inputMinElement.value, inputMaxElement.value]);
  };

  sliderElement.noUiSlider.on('update', onSliderUpdate);
  inputMinElement.addEventListener('change', onInputChange);
  inputMaxElement.addEventListener('change', onInputChange);
};

export { initRangeSlider };
