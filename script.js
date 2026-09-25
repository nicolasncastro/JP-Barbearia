/* ============================================================
   JP BARBEARIA — JavaScript
   Funcionalidades:
   1. Menu hambúrguer (abrir/fechar no celular)
   2. Fechar o menu ao clicar em um link
   3. Sombra no header ao rolar a página
   ============================================================ */

// ---------- 1. Selecionar os elementos do HTML ----------
const menuToggle = document.getElementById('menu-toggle'); // botão hambúrguer
const nav = document.getElementById('nav');                // menu de navegação
const header = document.getElementById('header');          // cabeçalho
const navLinks = document.querySelectorAll('.nav-link');   // todos os links do menu

// ---------- 2. Abrir/fechar o menu ao clicar no hambúrguer ----------
menuToggle.addEventListener('click', () => {
  // A classe "aberto" faz o menu aparecer (ver o CSS em .nav.aberto)
  nav.classList.toggle('aberto');

  // Troca o ícone: barras <-> X
  const icone = menuToggle.querySelector('i');
  if (nav.classList.contains('aberto')) {
    icone.classList.remove('fa-bars');
    icone.classList.add('fa-xmark');
  } else {
    icone.classList.remove('fa-xmark');
    icone.classList.add('fa-bars');
  }
});

// ---------- 3. Fechar o menu ao clicar em qualquer link ----------
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('aberto');

    // Volta o ícone para as barras
    const icone = menuToggle.querySelector('i');
    icone.classList.remove('fa-xmark');
    icone.classList.add('fa-bars');
  });
});

// ---------- 4. Sombra no header quando a página é rolada ----------
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.5)';
  } else {
    header.style.boxShadow = 'none';
  }
});
