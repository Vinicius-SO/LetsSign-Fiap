const tabDigitar = document.getElementById("tab-digitar");
const tabDesenhar = document.getElementById("tab-desenhar");
const conteudoDigitar = document.getElementById("conteudo-digitar");
const conteudoDesenhar = document.getElementById("conteudo-desenhar");

if (tabDigitar) {
  tabDigitar.addEventListener("click", () => {
    tabDigitar.classList.add("active");
    tabDesenhar.classList.remove("active");
    conteudoDigitar.style.display = "block";
    conteudoDesenhar.style.display = "none";
    const instructionText = document.getElementById("instructionText");
    if (instructionText) {
      instructionText.textContent = "Assine no campo abaixo";
    }
  });
}

if (tabDesenhar) {
  tabDesenhar.addEventListener("click", () => {
    tabDesenhar.classList.add("active");
    tabDigitar.classList.remove("active");
    conteudoDesenhar.style.display = "block";
    conteudoDigitar.style.display = "none";
    const instructionText = document.getElementById("instructionText");
    if (instructionText) {
      instructionText.textContent = "Rubrique no campo abaixo";
    }
    resizeCanvas();
  });
}

// Assinatura por texto
const assinaturaPreview = document.getElementById("assinaturaPreview");
const nomeInput = document.getElementById("nomeInput");

if (nomeInput) {
  nomeInput.addEventListener("input", () => {
    assinaturaPreview.textContent = nomeInput.value.toUpperCase();
  });
}

const botoesEstilo = document.querySelectorAll(".style-button");

botoesEstilo.forEach((btn) => {
  btn.addEventListener("click", () => {
    botoesEstilo.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const estilo = btn.id.replace("btn-", "");
    if (assinaturaPreview) {
      assinaturaPreview.className = `signature-preview ${estilo}`;
    }
  });
});

// Canvas
const canvas = document.getElementById("assinaturaCanvas");
let ctx;
let desenhando = false;

if (canvas) {
  ctx = canvas.getContext("2d");
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("DOMContentLoaded", resizeCanvas);

  // Botão Limpar (para ambas as páginas)
  const btnLimpar = document.getElementById("btn-limpar");
  if (btnLimpar) {
    btnLimpar.addEventListener("click", limparCanvas);
  }
  // Botão "Apagar Tudo" (específico da rubrica.html)
  const btnClearRubrica = document.getElementById("clear");
  if (btnClearRubrica) {
    btnClearRubrica.addEventListener("click", limparCanvas);
  }
}

function resizeCanvas() {
  if (!canvas || !ctx) return;
  canvas.width = canvas.offsetWidth;
  canvas.height = 150;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
}

function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches && e.touches.length > 0) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: e.offsetX,
      y: e.offsetY
    };
  }
}

function startDrawing(e) {
  e.preventDefault(); // Previne a rolagem da página no mobile
  desenhando = true;
  const pos = getPosition(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  e.preventDefault();
  if (!desenhando) return;
  const pos = getPosition(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function stopDrawing() {
  desenhando = false;
  ctx.beginPath();
}

function limparCanvas() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Adiciona os Eventos de Mouse e Toque
if (canvas) {
  // Mouse
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  // Touch
  canvas.addEventListener("touchstart", startDrawing);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", stopDrawing);
}
