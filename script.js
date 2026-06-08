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

var modal       = document.getElementById('service-modal');
var modalTitle  = document.getElementById('modal-title');
var modalDesc   = document.getElementById('modal-description');
var modalFor    = document.getElementById('modal-for-whom');
var modalResult = document.getElementById('modal-result');
var modalClose  = document.getElementById('modal-close');

function openModal(serviceKey) {
    var services = getServices();
    var service = null;
    for (var i = 0; i < services.length; i++) {
        if (services[i].id === serviceKey) {
            service = services[i];
            break;
        }
    }
    if (!service || !modal) return;
    modalTitle.textContent  = service.title;
    modalDesc.textContent   = service.description;
    if (modalFor)    modalFor.textContent    = '';
    if (modalResult) modalResult.textContent = service.price ? 'Ціна: ' + service.price : '';
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
        openModal(Number(key));
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
