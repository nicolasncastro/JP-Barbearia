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

      // Efeito de profundidade nas extremidades
      const opacidade = Math.max(0.42, 1 - distancia * 0.42);
      const brilho = Math.max(0.48, 1 - distancia * 0.40);

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

// Entrada sequencial dos textos da seção Sobre ao chegar nela
function iniciarAnimacaoSobre() {
  const bloco = document.querySelector(".sobre-texto");
  if (!bloco) return;

  const itens = bloco.querySelectorAll(
    ":scope > .secao-tag, :scope > h2, :scope > p, :scope > .sobre-lista li"
  );

  itens.forEach((item, indice) => {
    item.classList.add("sobre-reveal-item");
    item.style.setProperty("--sobre-atraso", `${indice * 130}ms`);
  });

  bloco.classList.add("sobre-reveal-ready");

  let observador;
  let revelado = false;
  let quadroPendente = false;

  function revelar() {
    if (revelado) return;
    revelado = true;
    bloco.classList.add("sobre-reveal-visivel");
    observador?.disconnect();
    window.removeEventListener("scroll", verificarPosicao);
    window.removeEventListener("resize", verificarPosicao);
  }

  function verificarPosicao() {
    if (quadroPendente) return;
    quadroPendente = true;

    requestAnimationFrame(() => {
      quadroPendente = false;
      const retangulo = bloco.getBoundingClientRect();
      const faixaVisivel =
        retangulo.top < window.innerHeight * 0.75 &&
        retangulo.bottom > window.innerHeight * 0.15;

      if (faixaVisivel) revelar();
    });
  }

  if ("IntersectionObserver" in window) {
    observador = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) revelar();
    }, { threshold: 0.01, rootMargin: "-15% 0px -25% 0px" });

    observador.observe(bloco);
  }

  // Garante o gatilho também em navegadores/visualizações onde o observer falhe.
  window.addEventListener("scroll", verificarPosicao, { passive: true });
  window.addEventListener("resize", verificarPosicao);
  verificarPosicao();
}

iniciarAnimacaoSobre();

// Seleção dos serviços e links de agendamento pelo WhatsApp
function iniciarAgendamentoServicos() {
  const linhas = [...document.querySelectorAll(".servico-linha")];
  const linkAgendar = document.querySelector(".servico-agendar");
  if (!linhas.length || !linkAgendar) return;

  const numeroWhatsApp = "5511999999999";

  linhas.forEach((linha) => {
    linha.addEventListener("click", () => {
      const jaSelecionada = linha.classList.contains("is-selected");

      linhas.forEach((outraLinha) => {
        outraLinha.classList.remove("is-selected");
        outraLinha.setAttribute("aria-pressed", "false");
      });

      if (jaSelecionada) {
        linkAgendar.classList.remove("is-visible");
        linkAgendar.setAttribute("aria-hidden", "true");
        linkAgendar.tabIndex = -1;
        return;
      }

      const nomeServico = linha.dataset.servico;
      linha.classList.add("is-selected");
      linha.setAttribute("aria-pressed", "true");
      linkAgendar.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
        `Olá, quero agendar "${nomeServico}"`
      )}`;
      linkAgendar.setAttribute("aria-label", `Agendar ${nomeServico} pelo WhatsApp`);
      linkAgendar.removeAttribute("aria-hidden");
      linkAgendar.tabIndex = 0;
      linkAgendar.classList.add("is-visible");
    });
  });
}

iniciarAgendamentoServicos();

// Entrada alternada das linhas de serviço ao aparecerem na tela
function iniciarAnimacaoLinhasServicos() {
  const lista = document.querySelector(".servicos-lista");
  const linhas = lista ? [...lista.querySelectorAll(".servico-linha")] : [];
  if (!lista || !linhas.length) return;

  lista.classList.add("servicos-revelar");
  linhas.forEach((linha, indice) => {
    linha.style.setProperty("--atraso-servico", `${indice * 55}ms`);
    linha.style.setProperty(
      "--direcao-entrada",
      indice % 2 === 0 ? "-42px" : "42px"
    );
  });

  if (!("IntersectionObserver" in window)) {
    linhas.forEach((linha) => linha.classList.add("is-visible"));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;

      entrada.target.classList.add("is-visible");
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });

  linhas.forEach((linha) => observador.observe(linha));
}

iniciarAnimacaoLinhasServicos();

// Reveal dos títulos H2 das seções ao entrarem na tela
function iniciarRevealTitulosSecoes() {
  const titulos = [...document.querySelectorAll(".secao h2")];

  if (!titulos.length) return;

  titulos.forEach((titulo) => titulo.classList.add("titulo-reveal"));

  let observador;
  if ("IntersectionObserver" in window) {
    observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) revelarTitulo(entrada.target);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -4% 0px" });

    titulos.forEach((titulo) => observador.observe(titulo));
  }

  function revelarTitulo(titulo) {
    titulo.classList.add("is-visible");
    observador?.unobserve(titulo);
  }

  let quadroPendente = false;
  function verificarTitulosVisiveis() {
    if (quadroPendente) return;
    quadroPendente = true;

    requestAnimationFrame(() => {
      quadroPendente = false;
      titulos.forEach((titulo) => {
        if (titulo.classList.contains("is-visible")) return;

        const retangulo = titulo.getBoundingClientRect();
        if (retangulo.top < window.innerHeight * 0.88 && retangulo.bottom > 0) {
          revelarTitulo(titulo);
        }
      });
    });
  }

  window.addEventListener("scroll", verificarTitulosVisiveis, { passive: true });
  window.addEventListener("resize", verificarTitulosVisiveis);
  verificarTitulosVisiveis();
}

iniciarRevealTitulosSecoes();
