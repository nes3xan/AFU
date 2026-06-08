var SERVICES_KEY = 'afu_services';

function getServices() {
    var raw = localStorage.getItem(SERVICES_KEY);
    if (raw) return JSON.parse(raw);
    var defaults = [
        { id: 1, title: 'Instagram реклама', description: 'Налаштування таргетованих рекламних кампаній в Instagram з детальним підбором аудиторії та цілей просування.', price: '5 000 грн' },
        { id: 2, title: 'TikTok реклама', description: 'Запуск рекламних кампаній у TikTok Ads Manager з урахуванням алгоритмів платформи та поведінки аудиторії.', price: '4 500 грн' },
        { id: 3, title: 'Створення Reels', description: 'Розробка сценарію, організація зйомки та монтаж коротких відео для Instagram та TikTok.', price: '3 000 грн' },
        { id: 4, title: 'Контент-план', description: 'Детальний контент-план на місяць: теми, формати, рубрики та рекомендовані дні для публікацій.', price: '1 500 грн' },
        { id: 5, title: 'Дизайн постів', description: 'Створення візуального оформлення постів у єдиному стилі бренду: шаблони, кольорова палітра, типографіка.', price: '2 000 грн' },
        { id: 6, title: 'Ведення сторінок', description: 'Повне ведення Instagram або TikTok: публікації, відповіді на коментарі, щомісячна аналітика.', price: '8 000 грн' }
    ];
    localStorage.setItem(SERVICES_KEY, JSON.stringify(defaults));
    return defaults;
}

var servicesData = {
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

var modal       = document.getElementById('service-modal');
var modalTitle  = document.getElementById('modal-title');
var modalDesc   = document.getElementById('modal-description');
var modalFor    = document.getElementById('modal-for-whom');
var modalResult = document.getElementById('modal-result');
var modalClose  = document.getElementById('modal-close');

function openModal(serviceKey) {
    var service = servicesData[serviceKey];
    if (!service || !modal) return;
    modalTitle.textContent  = service.title;
    modalDesc.textContent   = service.description;
    modalFor.textContent    = service.forWhom;
    modalResult.textContent = service.result;
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-open-modal]').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var key = btn.getAttribute('data-open-modal');
        openModal(key);
    });
});

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

var toastContainer = document.getElementById('toast-container');

function showToast(message, type) {
    if (!toastContainer) return;
    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    requestAnimationFrame(function() {
        toast.classList.add('toast--visible');
    });
    setTimeout(function() {
        toast.classList.remove('toast--visible');
        setTimeout(function() {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 400);
    }, 4000);
}

var contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var name    = document.getElementById('user-name').value.trim();
        var email   = document.getElementById('user-email').value.trim();
        var message = document.getElementById('user-message').value.trim();
        if (name.length < 2) {
            showToast('Будь ласка, введіть ваше ім\'я (мінімум 2 символи).', 'error');
            return;
        }
        if (!email.includes('@')) {
            showToast('Введіть коректну email-адресу (має містити @).', 'error');
            return;
        }
        if (message.length === 0) {
            showToast('Будь ласка, напишіть коротко про ваш проєкт.', 'error');
            return;
        }
        showToast('Заявку надіслано! Ми зв\'яжемось із вами найближчим часом.', 'success');
        contactForm.reset();
    });
}
