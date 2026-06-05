// =============================================
//  AdsForYou — Лабораторна робота №3
//  Динамічні елементи: модальне вікно + toast
// =============================================


// -----------------------------------------------
// 1. ДАНІ ДЛЯ МОДАЛЬНОГО ВІКНА
// -----------------------------------------------

const servicesData = {
  'instagram-ads': {
    title: 'Instagram реклама',
    description: 'Налаштовуємо таргетовану рекламу в Instagram, яка показується саме тим користувачам, яким цікавий ваш продукт.',
    forWhom: 'Підходить для інтернет-магазинів, локального бізнесу, брендів одягу та краси, кафе та ресторанів.',
    result: 'Збільшення охоплення цільової аудиторії та зростання переходів на сайт або профіль.'
  },
  'tiktok-ads': {
    title: 'TikTok реклама',
    description: 'Запускаємо рекламні кампанії в TikTok Ads Manager з урахуванням специфіки алгоритмів і поведінки аудиторії.',
    forWhom: 'Підходить для брендів, які хочуть охопити молоду аудиторію від 16 до 35 років.',
    result: 'Широке органічне охоплення та залучення нової аудиторії з мінімальними витратами.'
  },
  'reels': {
    title: 'Створення Reels',
    description: 'Розробляємо сценарії, організовуємо зйомку та монтаж коротких відео для Instagram та TikTok.',
    forWhom: 'Підходить для всіх, хто хоче бути присутнім у відеоформаті без самостійного виробництва контенту.',
    result: 'Готові Reels, які органічно поширюються та підвищують впізнаваність бренду.'
  },
  'content-plan': {
    title: 'Контент-плани',
    description: 'Складаємо детальні контент-плани на місяць: теми, формати, рубрики та рекомендовані дні для публікацій.',
    forWhom: 'Підходить для тих, хто веде сторінку самостійно і хоче мати чітку структуру та стратегію.',
    result: 'Систематична присутність у соцмережах без постійного «а що сьогодні публікувати?».'
  },
  'post-design': {
    title: 'Дизайн постів',
    description: 'Створюємо візуальне оформлення для постів у єдиному стилі: шаблони, кольорова палітра, типографіка.',
    forWhom: 'Підходить для брендів, яким важлива естетика профілю та впізнаваний візуальний стиль.',
    result: 'Акуратний та єдиний стиль сторінки, який справляє гарне перше враження.'
  },
  'smm': {
    title: 'Ведення сторінок',
    description: 'Беремо на себе повне ведення Instagram або TikTok: публікації, відповіді на коментарі, аналітика.',
    forWhom: 'Підходить для власників бізнесу, яким немає часу займатися соцмережами самостійно.',
    result: 'Активна та жива сторінка без особистих зусиль — ви займаєтесь бізнесом, ми займаємось соцмережами.'
  }
};


// -----------------------------------------------
// 2. МОДАЛЬНЕ ВІКНО
// -----------------------------------------------

const modal        = document.getElementById('service-modal');
const modalTitle   = document.getElementById('modal-title');
const modalDesc    = document.getElementById('modal-description');
const modalFor     = document.getElementById('modal-for-whom');
const modalResult  = document.getElementById('modal-result');
const modalClose   = document.getElementById('modal-close');

// Відкрити модалку з потрібними даними
function openModal(serviceKey) {
  const service = servicesData[serviceKey];
  if (!service || !modal) return;

  modalTitle.textContent  = service.title;
  modalDesc.textContent   = service.description;
  modalFor.textContent    = service.forWhom;
  modalResult.textContent = service.result;

  modal.classList.add('is-open');
  document.body.classList.add('modal-open'); // блокуємо скрол
}

// Закрити модалку
function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open'); // повертаємо скрол
}

// Кліки на кнопки «Дізнатися більше»
document.querySelectorAll('[data-open-modal]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var key = btn.getAttribute('data-open-modal');
    openModal(key);
  });
});

// Кнопка закриття всередині модалки
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

// Клік поза вмістом модалки — закриває її
if (modal) {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Клавіша Escape — теж закриває
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});


// -----------------------------------------------
// 3. TOAST-ПОВІДОМЛЕННЯ
// -----------------------------------------------

var toastContainer = document.getElementById('toast-container');

// Показати toast
function showToast(message, type) {
  if (!toastContainer) return;

  var toast = document.createElement('div');
  toast.className = 'toast toast--' + type;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // Запускаємо анімацію появи після вставки в DOM
  requestAnimationFrame(function() {
    toast.classList.add('toast--visible');
  });

  // Автоматичне зникнення через 4 секунди
  setTimeout(function() {
    toast.classList.remove('toast--visible');
    // Видаляємо елемент після завершення анімації (0.4s)
    setTimeout(function() {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, 4000);
}


// -----------------------------------------------
// 4. ВАЛІДАЦІЯ ФОРМИ НА СТОРІНЦІ CONTACTS
// -----------------------------------------------

var contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // зупиняємо стандартне надсилання

    var name    = document.getElementById('user-name').value.trim();
    var email   = document.getElementById('user-email').value.trim();
    var message = document.getElementById('user-message').value.trim();

    // Перевірка імені
    if (name.length < 2) {
      showToast('Будь ласка, введіть ваше ім\'я (мінімум 2 символи).', 'error');
      return;
    }

    // Перевірка email
    if (!email.includes('@')) {
      showToast('Введіть коректну email-адресу (має містити @).', 'error');
      return;
    }

    // Перевірка повідомлення
    if (message.length === 0) {
      showToast('Будь ласка, напишіть коротко про ваш проєкт.', 'error');
      return;
    }

    // Усі поля коректні — показуємо успіх і очищуємо форму
    showToast('Заявку надіслано! Ми зв\'яжемось із вами найближчим часом.', 'success');
    contactForm.reset();
  });
}
