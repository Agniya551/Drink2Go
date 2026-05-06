const ACTIVE_SLIDE_CLASS = 'hero__slide--active';
const CURRENT_STEP_CLASS = 'hero__step--current';

//Инициализирует слайдер в блоке Hero
const initHeroSlider = () => {
  const heroElement = document.querySelector('.hero');

  // Проверка на существование элемента, чтобы не возникало ошибок
  if (!heroElement) {
    return;
  }

  const slides = heroElement.querySelectorAll('.hero__slide');
  const stepElements = heroElement.querySelectorAll('.hero__step');
  const prevButtonElement = heroElement.querySelector('.hero__arrow--prev');
  const nextButtonElement = heroElement.querySelector('.hero__arrow--next');

  let currentSlideIndex = 0;
  const lastSlideIndex = slides.length - 1;

  //Обновляет состояние слайдов, точек пагинации и кнопок
  const updateSlider = () => {
    slides.forEach((slide, index) => {
      slide.classList.toggle(ACTIVE_SLIDE_CLASS, index === currentSlideIndex);
    });

    stepElements.forEach((stepElement, index) => {
      const isCurrent = index === currentSlideIndex;
      stepElement.classList.toggle(CURRENT_STEP_CLASS, isCurrent);

      if (isCurrent) {
        stepElement.setAttribute('aria-current', 'true');
      } else {
        stepElement.removeAttribute('aria-current');
      }
    });

    if (prevButtonElement && nextButtonElement) {
      const isFirstSlide = currentSlideIndex === 0;
      const isLastSlide = currentSlideIndex === lastSlideIndex;

      // Управление состоянием доступности кнопок
      prevButtonElement.disabled = isFirstSlide;
      nextButtonElement.disabled = isLastSlide;
      prevButtonElement.setAttribute('aria-disabled', isFirstSlide.toString());
      nextButtonElement.setAttribute('aria-disabled', isLastSlide.toString());
    }
  };

  // Обработчик клика по кнопке "Назад"
  const onPrevButtonClick = (evt) => {
    evt.preventDefault();
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSlider();
    }
  };

  // Обработчик клика по кнопке "Вперед"
  const onNextButtonClick = (evt) => {
    evt.preventDefault();
    if (currentSlideIndex < lastSlideIndex) {
      currentSlideIndex++;
      updateSlider();
    }
  };

  // Обработчик клика по точке пагинации
  const onStepClick = (evt, index) => {
    evt.preventDefault();
    currentSlideIndex = index;
    updateSlider();
  };

  // Обработчик нажатия клавиш на документе
  const onDocumentKeydown = (evt) => {
    const isInputActive = evt.target.tagName === 'INPUT' || evt.target.tagName === 'TEXTAREA';

    if (isInputActive) {
      return;
    }

    if (evt.key === 'ArrowLeft' && currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSlider();
    } else if (evt.key === 'ArrowRight' && currentSlideIndex < lastSlideIndex) {
      currentSlideIndex++;
      updateSlider();
    }
  };

  if (prevButtonElement) {
    prevButtonElement.addEventListener('click', onPrevButtonClick);
  }

  if (nextButtonElement) {
    nextButtonElement.addEventListener('click', onNextButtonClick);
  }

  stepElements.forEach((stepElement, index) => {
    stepElement.addEventListener('click', (evt) => onStepClick(evt, index));
  });

  document.addEventListener('keydown', onDocumentKeydown);
  updateSlider();
};

export { initHeroSlider };
