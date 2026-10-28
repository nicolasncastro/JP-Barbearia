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





// SEÇÃO GALERIA
function iniciarGaleria() {
  const carrossel = document.querySelector(".galeria-carrossel");
  const track = carrossel?.querySelector(".galeria-track");
  const grupoOriginal = track?.querySelector(".galeria-grupo");

  if (!carrossel || !track || !grupoOriginal) return;

  // Duplica a sequência para criar o movimento infinito
  const clone = grupoOriginal.cloneNode(true);

  clone.setAttribute("aria-hidden", "true");

  clone.querySelectorAll("img").forEach((img) => {
    img.alt = "";
  });

  track.appendChild(clone);

  const cards = [...track.querySelectorAll(".galeria-card")];

  function atualizarGaleria() {
    const area = carrossel.getBoundingClientRect();
    const centro = area.left + area.width / 2;
    const metadeLargura = area.width / 2 || 1;

    cards.forEach((card) => {
      const visual = card.querySelector(".galeria-card__visual");
      const rect = card.getBoundingClientRect();

      // Distância horizontal do centro do carrossel
      const posicao =
        (rect.left + rect.width / 2 - centro) / metadeLargura;

      const distancia = Math.min(Math.abs(posicao), 1.2);

      // Cartões inclinam para fora conforme chegam às laterais
      const rotacao = Math.max(
        -44,
        Math.min(44, posicao * 50)
      );

      // Laterais ficam ligeiramente mais baixas e menores
      const vertical = distancia * 250;
      const escala = 1 - distancia * 0.09;

      // Efeito de profundidade nas extremidades
      const opacidade = Math.max(0.42, 1 - distancia * 0.42);
      const brilho = Math.max(0.48, 1 - distancia * 0.40);

      visual.style.transform = `
        translateY(${vertical}px)
        rotate(${rotacao}deg)
        scale(${escala})
      `;

      visual.style.opacity = opacidade;
      visual.style.filter = `brightness(${brilho})`;
    });

    requestAnimationFrame(atualizarGaleria);
  }

  requestAnimationFrame(atualizarGaleria);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarGaleria);
} else {
  iniciarGaleria();
}