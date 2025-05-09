const tabDigitar = document.getElementById("tab-digitar");
const tabDesenhar = document.getElementById("tab-desenhar");
const conteudoDigitar = document.getElementById("conteudo-digitar");
const conteudoDesenhar = document.getElementById("conteudo-desenhar");

tabDigitar.addEventListener("click", () => {
  tabDigitar.classList.add("active");
  tabDesenhar.classList.remove("active");
  conteudoDigitar.style.display = "block";
  conteudoDesenhar.style.display = "none";
  document.getElementById("instructionText").textContent = "Assine no campo abaixo";
});

tabDesenhar.addEventListener("click", () => {
  tabDesenhar.classList.add("active");
  tabDigitar.classList.remove("active");
  conteudoDesenhar.style.display = "block";
  conteudoDigitar.style.display = "none";
  document.getElementById("instructionText").textContent = "Rubrique no campo abaixo";
  resizeCanvas();
});

tabDigitar.addEventListener("click", () => {
  tabDigitar.classList.add("active");
  tabDesenhar.classList.remove("active");
  conteudoDigitar.style.display = "block";
  conteudoDesenhar.style.display = "none";
});

tabDesenhar.addEventListener("click", () => {
  tabDesenhar.classList.add("active");
  tabDigitar.classList.remove("active");
  conteudoDesenhar.style.display = "block";
  conteudoDigitar.style.display = "none";
  resizeCanvas();
});

// Assinatura por texto
const assinaturaPreview = document.getElementById("assinaturaPreview");
const nomeInput = document.getElementById("nomeInput");

nomeInput.addEventListener("input", () => {
  assinaturaPreview.textContent = nomeInput.value.toUpperCase();
});

const botoesEstilo = document.querySelectorAll(".style-button");

botoesEstilo.forEach((btn) => {
  btn.addEventListener("click", () => {
    botoesEstilo.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const estilo = btn.id.replace("btn-", "");
    assinaturaPreview.className = `signature-preview ${estilo}`;
  });
});

// Canvas
const canvas = document.getElementById("assinaturaCanvas");
const ctx = canvas.getContext("2d");
let desenhando = false;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = 150;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
}

window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("mousedown", (e) => {
  desenhando = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (!desenhando) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
  desenhando = false;
  ctx.beginPath();
});

canvas.addEventListener("mouseout", () => {
  desenhando = false;
});

function limparCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById("btn-limpar").addEventListener("click", limparCanvas);

document.addEventListener("DOMContentLoaded", () => {
  resizeCanvas();
});
