let selectedGender = '';
let currentSystem = '';
let gameScore = 0;
let quizScore = 0;
let currentQuestion = 0;
let gameProgress = 0;

const systems = {
    skeletal: {
        title: 'Sistema Óseo',
        parts: ['Cráneo','caja torácica', 'Húmero','Húmero', 'Radio', 'Radio','Fémur','Fémur', 'Tibia','Tibia' ],
        zones: [
            {name: 'Cráneo', x: 310, y: 50, width: 50, height: 40},
            {name: 'caja torácica', x: 310, y: 150, width: 40, height: 40},
            {name: 'Húmero', x: 350, y: 150, width: 15, height: 30},
            {name: 'Húmero', x: 260, y: 150, width: 15, height: 30},
            {name: 'Radio', x: 370, y: 190, width: 40, height: 30},
            {name: 'Radio', x: 240, y: 190, width: 40, height: 30},
            {name: 'Fémur', x: 285, y: 270, width: 15, height: 50},
            {name: 'Fémur', x: 330, y: 270, width: 15, height: 50},
            {name: 'Tibia', x: 280, y: 340, width: 12, height: 45},
            {name: 'Tibia', x: 340, y: 340, width: 12, height: 45},
        ]
    },
    muscular: {
        title: 'Sistema Muscular',
        parts: ['Bíceps', 'Bíceps', 'Pectorales', 'Abdominales', 'Cuádriceps', 'Cuádriceps', 'Tibial Anterior','Tibial Anterior'],
        zones: [
            {name: 'Bíceps', x: 360, y: 130, width: 20, height: 25},
            {name: 'Bíceps', x: 270, y: 130, width: 20, height: 25},
            {name: 'Pectorales', x: 315, y: 110, width: 40, height: 25},
            {name: 'Abdominales', x: 315, y: 160, width: 30, height: 40},
            {name: 'Cuádriceps', x: 290, y: 220, width: 25, height: 40},
            {name: 'Cuádriceps', x: 340, y: 220, width: 25, height: 40},
            {name: 'Tibial Anterior', x: 290, y: 320, width: 20, height: 30},
            {name: 'Tibial Anterior', x: 340, y: 320, width: 20, height: 30}
        ]
    },
    digestive: {
        title: 'Sistema Digestivo',
        parts: ['Boca', 'Esófago', 'Estómago', 'Hígado', 'Intestino Delgado', 'Intestino Grueso'],
        zones: [
            {name: 'Boca', x: 330, y: 90, width: 40, height: 15},
            {name: 'Esófago', x: 320, y: 130, width: 8, height: 30},
            {name: 'Estómago', x: 340, y: 180, width: 30, height: 15},
            {name: 'Hígado', x: 300, y: 170, width: 20, height: 20},
            {name: 'Intestino Delgado', x: 330, y: 215, width: 30, height: 20},
            {name: 'Intestino Grueso', x: 290, y: 220, width: 20, height: 15}
        ]
    }
};

const questions = [
    {
        question: "¿Cuántos huesos tiene aproximadamente el cuerpo humano adulto?",
        options: ["206", "150", "300", "100"],
        correct: 0
    },
    {
        question: "¿Cuál es el músculo más fuerte del cuerpo humano?",
        options: ["Bíceps", "Cuádriceps", "Músculo masetero", "Tríceps"],
        correct: 2
    },
    {
        question: "¿Dónde comienza la digestión?",
        options: ["Estómago", "Boca", "Intestino", "Esófago"],
        correct: 1
    },
    {
        question: "¿Cuál es el hueso más largo del cuerpo?",
        options: ["Húmero", "Tibia", "Fémur", "Radio"],
        correct: 2
    },
    {
        question: "¿Qué órgano produce la bilis?",
        options: ["Páncreas", "Hígado", "Estómago", "Vesícula biliar"],
        correct: 1
    },
    {
        question: "¿Cuántas costillas tiene el ser humano?",
        options: ["20", "22", "24", "26"],
        correct: 2
    },
    {
        question: "¿Cuál es la función principal del sistema muscular?",
        options: ["Proteger órganos", "Permitir movimiento", "Producir sangre", "Filtrar toxinas"],
        correct: 1
    },
    {
        question: "¿En qué parte del sistema digestivo se absorben principalmente los nutrientes?",
        options: ["Estómago", "Intestino grueso", "Intestino delgado", "Boca"],
        correct: 2
    }
];

// Cambiar el avatar (Juan o Diana) según el género
function selectGender(gender) {
    selectedGender = gender;
    const avatarEmoji = document.getElementById('avatar-emoji');  // Seleccionar el contenedor del emoji
    const avatarMessage = document.getElementById('avatar-message');
    
    // Cambiar el emoji y el mensaje según el género seleccionado
    if (gender === 'boy') {
        avatarEmoji.textContent = "👦"; // Emoji de Juan
        avatarMessage.textContent = "¡Hola! Soy Juan, tu compañero de juego. ¡Vamos a aprender!";
    } else if (gender === 'girl') {
        avatarEmoji.textContent = "👧"; // Emoji de Diana
        avatarMessage.textContent = "¡Hola! Soy Diana, tu compañera de juego. ¡Vamos a aprender!";
    }

    goToScreen('menu'); // Cambiar de pantalla después de la selección
}

function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    if (screenId === 'quiz') {
        initQuiz();
    }
}

function startGame(system) {
    currentSystem = system;
    gameScore = 0;
    gameProgress = 0;
    updateGameScore();
    updateGameProgress();
    
    const gameData = systems[system];
    document.getElementById('game-title').textContent = gameData.title;

    // Cambiar la imagen según el sistema
    const bodyImage = document.getElementById('body-image');
    if (system === 'skeletal') {
        bodyImage.src = "images/sistema oseo.png"; // Imagen para el sistema óseo
    } else if (system === 'muscular') {
        bodyImage.src = "images/Sistema Muscular.png"; // Imagen para el sistema muscular
    } else {
        bodyImage.src = "images/Sistema Digestivo.png"; // Imagen para el sistema digestivo
    }

    setupGameParts(gameData);
    setupDropZones(gameData);
    goToScreen('game');
}

function setupGameParts(gameData) {
    const container = document.getElementById('parts-container');
    container.innerHTML = '';
    
    gameData.parts.forEach(part => {
        const partElement = document.createElement('div');
        partElement.className = 'draggable-part';
        partElement.textContent = part;
        partElement.draggable = true;
        partElement.addEventListener('dragstart', handleDragStart);
        container.appendChild(partElement);
    });
}

function setupDropZones(gameData) {
    const bodyOutline = document.getElementById('body-outline');
    const existingZones = bodyOutline.querySelectorAll('.drop-zone');
    existingZones.forEach(zone => zone.remove());
    
    gameData.zones.forEach(zone => {
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.style.left = `${zone.x - zone.width / 2}px`;
        dropZone.style.top = `${zone.y - zone.height / 2}px`;
        dropZone.style.width = `${zone.width}px`;
        dropZone.style.height = `${zone.height}px`;
        dropZone.textContent = zone.name;
        dropZone.dataset.target = zone.name;
        
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', handleDrop);
        dropZone.addEventListener('dragenter', handleDragEnter);
        dropZone.addEventListener('dragleave', handleDragLeave);
        
        bodyOutline.appendChild(dropZone);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = e.target;
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    e.target.classList.add('highlight');
}

function handleDragLeave(e) {
    e.target.classList.remove('highlight');
}

function handleDrop(e) {
   e.preventDefault();
    e.target.classList.remove('highlight');
    
    if (draggedElement && e.target.dataset.target === draggedElement.textContent) {
        e.target.textContent = draggedElement.textContent;
        e.target.style.background = '#d4edda';
        e.target.style.color = '#155724';
        
        draggedElement.remove();
        gameScore += 10;
        gameProgress += (100 / systems[currentSystem].parts.length);
        updateGameScore();
        updateGameProgress();
        
        checkGameComplete();
    }
}

function updateGameScore() {
    document.getElementById('game-score').textContent = `Puntos: ${gameScore}`;
}

function updateGameProgress() {
    document.getElementById('game-progress').style.width = `${gameProgress}%`;
}

function checkGameComplete() {
    const remainingParts = document.querySelectorAll('.draggable-part');
    if (remainingParts.length === 0) {
        setTimeout(() => {
            alert('¡Felicidades! Has completado el ' + systems[currentSystem].title);
            goToScreen('menu');
        }, 500);
    }
}

function initQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    updateQuizScore();
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showQuizResults();
        return;
    }
    
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    document.getElementById('next-question').style.display = 'none';
    updateQuizProgress();
}

function selectOption(selectedIndex) {
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    options.forEach((option, index) => {
        option.onclick = null;
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });
    
    if (selectedIndex === question.correct) {
        quizScore++;
    }
    
    updateQuizScore();
    document.getElementById('next-question').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function updateQuizScore() {
    document.getElementById('quiz-score').textContent = `Puntuación: ${quizScore}/${currentQuestion + 1}`;
}

function updateQuizProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('quiz-progress').style.width = `${progress}%`;
}

function showQuizResults() {
    const percentage = Math.round((quizScore / questions.length) * 100);
    let message = `¡Quiz completado!\nPuntuación: ${quizScore}/${questions.length} (${percentage}%)\n\n`;
    
    if (percentage >= 80) {
        message += "¡Excelente! Tienes un gran conocimiento del cuerpo humano.";
    } else if (percentage >= 60) {
        message += "¡Bien hecho! Tienes buenos conocimientos básicos.";
    } else {
        message += "Sigue estudiando. ¡Puedes mejorar!";
    }
    
    alert(message);
    goToScreen('menu');
}
