const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const leftPage = document.querySelector('.left-page');
const rightPage = document.querySelector('.right-page');
const pageDotsContainer = document.querySelector('.dots');
const book = document.querySelector('.book');


function openBook() {
    book.classList.remove('closed');
    book.removeEventListener('click', openBook);
}

const pages = [
    { 
        title: "Introdução", 
        content: "No começo, Deus criou o céu e a terra. Tudo estava vazio e escuro, mas Deus disse: 'Haja luz!' E a luz apareceu. Foi assim que começou o mundo.", 
        illustration: "🌍",
        audio: "/audios/1.mp3"
    },
    { 
        title: "Dias da Criação", 
        content: "Deus criou o céu, o mar e a terra. Ele fez o sol, a lua e as estrelas para iluminarem o mundo. Depois, fez as árvores, as flores e os animais. Deus viu que tudo era muito bom!", 
        illustration: "🌞",
        audio: "/audios/2.mp3"
    },
    { 
        title: "O Homem e a Mulher", 
        content: "No sexto dia, Deus criou o homem e a mulher à sua imagem e semelhança. Ele deu a eles um lindo jardim chamado Éden para viverem felizes. Deus descansou no sétimo dia e nos ensinou a também descansar.", 
        illustration: "👫",
        audio: "/audios/3.mp3"
    },
    { 
        title: "A Arca de Noé", 
        content: "O mundo estava cheio de maldade, mas Noé era um homem bom. Deus disse: 'Construa uma grande arca, pois um dilúvio virá para cobrir a terra. Coloque sua família e dois de cada animal nela.'", 
        illustration: "🚢",
        audio: "/audios/4.mp3"
    },
    { 
        title: "A Obediência de Noé", 
        content: "Noé obedeceu a Deus e construiu a arca. Ele colocou sua família e os animais dentro dela. Então, a chuva começou e durou quarenta dias e quarenta noites.", 
        illustration: "🌧️",
        audio: "/audios/5.mp3"
    },
    { 
        title: "O Arco-íris", 
        content: "Depois da chuva, Deus fez o sol brilhar novamente. Noé saiu da arca e agradeceu a Deus. Deus colocou um arco-íris no céu como sinal de sua promessa.", 
        illustration: "🌈",
        audio: "/audios/6.mp3"
    },
    { 
        title: "Deus Fala com Moisés", 
        content: "No alto do monte Sinai, Deus falou com Moisés e deu a ele os Dez Mandamentos. Eles são ensinamentos para vivermos em paz com Deus e com as pessoas.", 
        illustration: "📜",
        audio: "/audios/7.mp3"
    },
    { 
        title: "Os 10 mandamentos", 
        content: "1.Amar a Deus sobre todas as coisas.\n2.Não tomar o Seu santo Nome em vão.\n3.Guardar os domingos e dias santos.\n4.Honrar pai e mãe.\n5.Não matar.\n6.Não pecar contra a castidade.\n7.Não furtar.\n8.Não levantar falso testemunho.\n9. Não desejar a mulher do próximo.\n10.Não cobiçar as coisas alheias.", 
        illustration: "❤️",
        audio: "/audios/8.mp3"
    },
    { 
        title: "Jesus e as Crianças", 
        content: "Jesus disse: 'Deixem as crianças virem a mim, pois o reino dos céus pertence a elas.' Jesus ama todas as crianças.", 
        illustration: "👶",
        audio: "/audios/9.mp3"
    },
    { 
        title: "Obrigado por sua Jornada!", 
        content: `"Lâmpada para os meus pés é a tua palavra e luz para o meu caminho." 
                    <strong>Salmos 119:105</strong>
    
        `,
        illustration: "🎉",
        isLastPage: true,
        audio: "/audios/10.mp3"
    }

];

let currentPage = 0;
let currentAudio = null;

function createPageDots() {
    pageDotsContainer.innerHTML = '';
    const totalDots = Math.ceil(pages.length / 2);
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentPage) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(i));
        pageDotsContainer.appendChild(dot);
    }
}

function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}

function updateBook() {
    openBook();
    const leftIndex = currentPage * 2;
    const rightIndex = leftIndex + 1;

    function updatePage(pageElement, pageData) {
        if (pageData) {
            stopCurrentAudio();

            if (pageData.title === "Os 10 mandamentos") {
                const mandamentos = pageData.content.split('\n')
                    .map((linha, index) => `<li>${linha.slice(2)}</li>`)
                    .join('');

                let audioElement = '';
                if (pageData.audio) {
                    audioElement = `
                        <audio id="page-audio">
                            <source src="${pageData.audio}" type="audio/mpeg">
                            Seu navegador não suporta áudio.
                        </audio>
                        <button class="play-audio">🔊 Ouvir Áudio</button>
                    `;
                }

                pageElement.innerHTML = `
                    <div class="page-content">
                        <h2>${pageData.title}</h2>
                        <div class="illustration">${pageData.illustration}</div>
                        <ol class="mandamentos-list">
                            ${mandamentos}
                        </ol>
                        ${audioElement}
                    </div>
                `;

                if (pageData.audio) {
                    const playAudioBtn = pageElement.querySelector('.play-audio');
                    const audioEl = pageElement.querySelector('#page-audio');
                    
                    playAudioBtn.addEventListener('click', () => {
                        stopCurrentAudio();
                        audioEl.play();
                        currentAudio = audioEl;
                    });
                }
            } else {
                let audioElement = '';
                if (pageData.audio) {
                    audioElement = `
                        <audio id="page-audio">
                            <source src="${pageData.audio}" type="audio/mpeg">
                            Seu navegador não suporta áudio.
                        </audio>
                        <button class="play-audio">🔊 Ouvir Áudio</button>
                    `;
                }

                pageElement.innerHTML = `
                    <div class="page-content">
                        <h2>${pageData.title}</h2>
                        <div class="illustration">${pageData.illustration}</div>
                        <p>${pageData.content}</p>
                        ${audioElement}
                    </div>
                `;

                if (pageData.audio) {
                    const playAudioBtn = pageElement.querySelector('.play-audio');
                    const audioEl = pageElement.querySelector('#page-audio');
                    
                    playAudioBtn.addEventListener('click', () => {
                        stopCurrentAudio();
                        audioEl.play();
                        currentAudio = audioEl;
                    });
                }
            }
            pageElement.style.display = 'flex';
        } else {
            pageElement.style.display = 'none';
        }
    }

    updatePage(leftPage, pages[leftIndex]);
    updatePage(rightPage, pages[rightIndex]);

    createPageDots();
    updateNavigationButtons();
    book.classList.remove('closed');
}

function updateNavigationButtons() {
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= Math.ceil(pages.length / 2) - 1;
}

function goToPage(pageNumber) {
    currentPage = pageNumber;
    updateBook();
    animatePageTurn();
}

function animatePageTurn() {
    book.style.animation = 'pageFlip 0.6s ease-in-out';
    
    setTimeout(() => {
        book.style.animation = '';
        book.style.transform = `rotateX(10deg) rotateY(${currentPage % 2 === 0 ? '-' : ''}3deg)`;
    }, 600);
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updateBook();
        animatePageTurn();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(pages.length / 2) - 1) {
        currentPage++;
        updateBook();
        animatePageTurn();
    }
});

updateBook();

book.addEventListener('click', openBook);

window.addEventListener('load', () => {
    book.classList.add('closed');
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    book.addEventListener('click', openBook);
});

