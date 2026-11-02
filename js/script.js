const menuHamburguer = document.querySelector('.menu-hamburguer');
const nav = document.querySelector('.nav-responsive');

// Evento de clique no botão hambúrguer
menuHamburguer.addEventListener('click', (event) => {
    event.stopPropagation(); // Impede que o clique no botão feche imediatamente o menu
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
        }, 300); // Tempo para animação antes de esconder
    }
}

// Fecha o menu quando clicar fora dele
document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuHamburguer.contains(event.target)) {
        closeMenu();
    }
});

// Fecha o menu ao clicar em um botão dentro dele
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