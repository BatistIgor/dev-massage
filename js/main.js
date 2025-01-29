// === Обработка скролла для добавления класса к хедеру ===
const header = document.querySelector(".header");

function updateHeaderClass() {
  if (window.scrollY > 50) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
}
updateHeaderClass();

window.addEventListener("scroll", updateHeaderClass);

// === Обработка открытия и закрытия меню-бургера ===
const button = document.querySelector(".hamburger");
const firstScreen = document.querySelector(".first-screen");
const headerLogo = document.querySelector(".header__logo");
const headerNavigation = document.querySelector(".header__navigation");
const links = document.querySelectorAll(".header__navigation-link");

button.addEventListener("click", () => {
  button.classList.toggle("is-active");
  firstScreen.classList.toggle("first-screen--hiden-bg");
  headerLogo.classList.toggle("header__logo--active");
  headerNavigation.classList.toggle("header__navigation--active");
  document.body.classList.toggle('no-scroll');
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove('no-scroll');
    button.classList.remove("is-active");
    firstScreen.classList.remove("first-screen--hiden-bg");
    headerLogo.classList.remove("header__logo--active");
    headerNavigation.classList.remove("header__navigation--active");
  });
});

// === Инициализация Swiper для комментариев ===
var swiper = new Swiper(".mySwiper", {
  simulateTouch: true,
  spaceBetween: 20,
  navigation: {
    nextEl: ".comments__arrow-right",
    prevEl: ".comments__arrow-left",
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

// === Подсветка активной ссылки навигации при скролле ===
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document
          .querySelectorAll(".header__navigation-link")
          .forEach((link) => {
            let id = link.getAttribute("href").replace("#", "");
            if (id === entry.target.id) {
              link.classList.add("header__navigation-link--active");
            } else {
              link.classList.remove("header__navigation-link--active");
            }
          });
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll(".anchor").forEach((section) => {
  observer.observe(section);
});

// === Инициализация AOS для анимаций ===
document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
});

// === Показ/скрытие дополнительных карточек в разделе услуг ===
const cardContainer = document.querySelector(".services__grid");
const showMoreButton = document.querySelector(".services__show-more");
const cards = cardContainer.querySelectorAll(".services-card");

if (cards.length > 6) {
  showMoreButton.classList.remove("hidden");

  cards.forEach((card, index) => {
    if (index >= 6) {
      card.classList.add("hidden");
    }
  });
}

showMoreButton.addEventListener("click", () => {
  cards.forEach((card, index) => {
    if (index >= 6) {
      card.classList.toggle("hidden");
    }
  });

  // Меняем состояние кнопки, используя атрибут data
  const isShowingMore =
    showMoreButton.getAttribute("data-state") === "show-more";

  // Обновляем атрибут состояния и текст кнопки
  showMoreButton.setAttribute(
    "data-state",
    isShowingMore ? "show-less" : "show-more"
  );
  showMoreButton.textContent = isShowingMore
    ? showMoreButton.getAttribute("data-show-less")
    : showMoreButton.getAttribute("data-show-more");
});
