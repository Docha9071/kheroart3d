const menuHamburguer = document.querySelector('.menu-hamburguer');
const nav = document.querySelector('.nav-responsive');

// Evento de clique no botão hambúrguer
menuHamburguer.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
});

// Função para abrir/fechar o menu
function toggleMenu() {
    menuHamburguer.classList.toggle('change');

    if (menuHamburguer.classList.contains('change')) {
        nav.style.display = 'block';

        setTimeout(() => {
            nav.style.opacity = '1';
            nav.style.transform = 'translateY(0)';
        }, 10);

    } else {
        nav.style.opacity = '0';
        nav.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            nav.style.display = 'none';
        }, 300);
    }
}

// Fecha o menu quando clicar fora dele
document.addEventListener('click', (event) => {
    if (
        !nav.contains(event.target) &&
        !menuHamburguer.contains(event.target)
    ) {
        closeMenu();
    }
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-responsive a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Função para fechar o menu
function closeMenu() {
    if (menuHamburguer.classList.contains('change')) {
        menuHamburguer.classList.remove('change');

        nav.style.opacity = '0';
        nav.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            nav.style.display = 'none';
        }, 300);
    }
}


// ==========================================
// FORMULÁRIO DE CONTATO - WEB3FORMS
// ==========================================

const contactForm = document.querySelector('#contact-form');

if (contactForm) {

    contactForm.addEventListener('submit', async function(event) {

        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formStatus = document.querySelector('#form-status');

        const originalText = submitButton.innerText;

        submitButton.disabled = true;
        submitButton.innerText = 'Enviando...';

        if (formStatus) {
            formStatus.innerText = '';
        }

        try {

            const response = await fetch(
                'https://api.web3forms.com/submit',
                {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );

            const result = await response.json();

            if (response.ok && result.success) {

                window.location.href =
                    'https://docha9071.github.io/kheroart3d/obrigado.html';

            } else {

                if (formStatus) {
                    formStatus.innerText =
                        result.message || 'Erro ao enviar mensagem.';
                }

                submitButton.disabled = false;
                submitButton.innerText = originalText;
            }

        } catch (error) {

            if (formStatus) {
                formStatus.innerText =
                    'Falha na conexão. Tente novamente.';
            }

            submitButton.disabled = false;
            submitButton.innerText = originalText;
        }

    });

}
