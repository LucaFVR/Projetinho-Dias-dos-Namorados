// ============================================================
// CONFIGURAÇÕES FÁCEIS DE ALTERAR
// ============================================================

// As 5 fotos ficam aqui.
// Basta trocar "caminho/da/foto.jpg" pelo caminho do arquivo.
// Exemplo: "fotos/nosso-dia.jpg"
const photos = [
  {
    src: "fotos/foto1.jpeg",
    caption: "Eu amo muito essa foto porque é a que mais me remete a quem você é, e me faz lembrar dos nossos melhores momentos."
  },
  {
    src: "fotos/foto2.jpeg",
    caption: "Todo natal que passei contigo só me fez perceber que você é meu maior presente."
  },
  {
    src: "fotos/foto3.jpeg",
    caption: "Eu quero estar para ver todas as suas conquista, e te quero nas minhas."
  },
  {
    src: "fotos/foto4.jpeg",
    caption: "Você sempre fez minha vida mais feliz."
  },
  {
    src: "fotos/foto5.jpeg",
    caption: "As duas coisas que eu mais gosto, minha futura esposa e pokemon."
  }
];

// Texto final.
// Você também pode alterar diretamente no index.html.
const finalTitle = "Para você ❤️";
const finalText = "        Antes da primeiro mensagem que você me enviou eu não fazia ideia do que me aguardava, do quanto eu ia amar e me importar tanto com qualquer outra pessoa. Eu não conseguia nem imaginar o que a vida tinha pra mim e eu agradeço por ter você na minha vida todos os dias. Depois de todo esse tempo tudo o que eu sinto por você só cresce e tudo o que eu mais desejo é essa vida linda que eu sei que se ficar ao seu lado eu vou ter. Você não é só tudo o que eu mais amo mas ja é tambem uma das melhores e mais importantes partes de mim, Feliz dia dos Namorados minha Principessa!❤️";


// ============================================================
// NAVEGAÇÃO ENTRE TELAS
// ============================================================

const screens = {
  start: document.getElementById("start-screen"),
  menu: document.getElementById("menu-screen"),
  quiz: document.getElementById("quiz-screen"),
  surprise: document.getElementById("surprise-screen"),
  end: document.getElementById("end-screen")
};

function showScreen(screen) {
  Object.values(screens).forEach(item => item.classList.remove("active"));

  // Pequeno atraso para permitir a transição visual.
  requestAnimationFrame(() => {
    screen.classList.add("active");
  });
}


// ============================================================
// CORAÇÕES DO FUNDO
// ============================================================

const heartsContainer = document.getElementById("hearts-container");

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

  const size = Math.floor(Math.random() * 32) + 18;
  const duration = Math.random() * 8 + 8;

  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

setInterval(createHeart, 700);

for (let i = 0; i < 12; i++) {
  setTimeout(createHeart, i * 250);
}


// ============================================================
// BOTÕES PRINCIPAIS
// ============================================================

document.getElementById("start-btn").addEventListener("click", () => {
  showScreen(screens.menu);
});

document.getElementById("quiz-btn").addEventListener("click", () => {
  startQuiz();
  showScreen(screens.quiz);
});

document.getElementById("surprise-btn").addEventListener("click", () => {
  currentPhoto = 0;
  updatePhoto();
  showScreen(screens.surprise);
});

document.getElementById("end-btn").addEventListener("click", () => {
  showScreen(screens.end);
  launchConfetti();
});

document.getElementById("gallery-back").addEventListener("click", () => {
  showScreen(screens.menu);
});

document.getElementById("final-back").addEventListener("click", () => {
  showScreen(screens.menu);
});


// ============================================================
// QUIZ
// ============================================================

const quizIntro = document.getElementById("quiz-intro");
const questionContainer = document.getElementById("question-container");
const questionTitle = document.getElementById("question-title");
const answersContainer = document.getElementById("answers-container");
const quizMessage = document.getElementById("quiz-message");
const questionProgress = document.getElementById("question-progress");

const quizQuestions = [
  {
    question: "Quando foi o dia em que nos começamos a namorar?",
    answers: [
      "21/05/2023",
      "25/05/2023",
      "28/05/2023",
      "30/05/2023",
      "02/06/2023"
    ],
    correct: 2,
    successMessage:
      "Exatamente, já fazem 1180 dias que eu me tornei a pessoa mais feliz e sortuda do mundo!"
  },
  {
    question: "Qual meu maior sonho?",
    answers: [
      "Casar com você",
      "Viver com você",
      "Viajar com você",
      "Ter você pelo resto da vida",
      "Sapecagens com você todos os dias"
    ],
    // Todas são corretas.
    correct: "all",
    successMessage: "Todas sempre estiveram corretas"
  },
  {
    question: "Quanto tempo eu quero você do meu lado?",
    answers: [
      "20 anos",
      "30 anos",
      "50 anos",
      "70 anos",
      "N/A"
    ],
    correct: 4,
    successMessage:
      "Qualquer tempo que eu passe vivo ao seu lado não vai ser o suficiente."
  }
];

let currentQuestion = 0;

document.getElementById("ready-btn").addEventListener("click", () => {
  quizIntro.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  currentQuestion = 0;
  showQuestion();
});

function startQuiz() {
  quizIntro.classList.remove("hidden");
  questionContainer.classList.add("hidden");
  quizMessage.textContent = "";
  currentQuestion = 0;
}

function showQuestion() {
  const question = quizQuestions[currentQuestion];

  questionProgress.textContent = `${currentQuestion + 1} / ${quizQuestions.length}`;
  questionTitle.textContent = question.question;
  quizMessage.textContent = "";
  answersContainer.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      handleAnswer(index, button);
    });

    answersContainer.appendChild(button);
  });
}

function handleAnswer(selectedIndex, selectedButton) {
  const question = quizQuestions[currentQuestion];

  // Segunda pergunta: todas as alternativas estão corretas.
  if (question.correct === "all") {
    document.querySelectorAll(".answer-button").forEach(button => {
      button.disabled = true;
      button.classList.add("correct");
    });

    quizMessage.textContent = question.successMessage;

    setTimeout(nextQuestion, 3000);
    return;
  }

  // Resposta correta.
  if (selectedIndex === question.correct) {
    document.querySelectorAll(".answer-button").forEach(button => {
      button.disabled = true;
    });

    selectedButton.classList.add("correct");
    quizMessage.textContent = question.successMessage;

    // A primeira pergunta fica 5 segundos na tela.
    const delay = currentQuestion === 0 ? 5000 : 3500;

    setTimeout(nextQuestion, delay);
  } else {
    // Resposta errada.
    selectedButton.classList.add("wrong");

    // Não revela a resposta; permite tentar novamente.
    setTimeout(() => {
      selectedButton.classList.remove("wrong");
    }, 500);
  }
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    // Terminou as três perguntas.
    showScreen(screens.menu);
  }
}


// ============================================================
// GALERIA
// ============================================================

let currentPhoto = 0;

const galleryImage = document.getElementById("gallery-image");
const photoPlaceholder = document.getElementById("photo-placeholder");
const photoCaption = document.getElementById("photo-caption");
const photoCounter = document.getElementById("photo-counter");

function updatePhoto() {
  const photo = photos[currentPhoto];

  photoCounter.textContent = `${currentPhoto + 1} / ${photos.length}`;

  // Se a foto ainda não existir, mostra o espaço reservado.
  galleryImage.src = photo.src;
  galleryImage.alt = photo.caption;

  galleryImage.onload = () => {
    galleryImage.style.display = "block";
    photoPlaceholder.style.display = "none";
  };

  galleryImage.onerror = () => {
    galleryImage.style.display = "none";
    photoPlaceholder.style.display = "block";
  };

  photoCaption.textContent = photo.caption;
}

document.getElementById("next-photo").addEventListener("click", () => {
  if (currentPhoto < photos.length - 1) {
    currentPhoto++;
    updatePhoto();
  } else {
    // Depois da quinta foto, volta para o menu principal.
    showScreen(screens.menu);
  }
});

document.getElementById("prev-photo").addEventListener("click", () => {
  if (currentPhoto > 0) {
    currentPhoto--;
    updatePhoto();
  }
});


// ============================================================
// CONFETES
// ============================================================

const confettiContainer = document.getElementById("confetti-container");

function launchConfetti() {
  confettiContainer.innerHTML = "";

  for (let i = 0; i < 130; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDuration = `${Math.random() * 2 + 2}s`;
    piece.style.animationDelay = `${Math.random() * 1.2}s`;

    // Variações de formato sem precisar definir cores manualmente.
    if (i % 3 === 0) {
      piece.style.width = "6px";
      piece.style.height = "12px";
    }

    confettiContainer.appendChild(piece);
  }

  setTimeout(() => {
    confettiContainer.innerHTML = "";
  }, 5000);
}


// ============================================================
// TEXTO FINAL
// ============================================================

document.getElementById("final-title").textContent = finalTitle;
document.getElementById("final-text").textContent = finalText;
