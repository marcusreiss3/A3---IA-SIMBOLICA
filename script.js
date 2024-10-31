const N = 10; // Tamanho do labirinto
const start = [0, 0]; // Ponto de partida (A1)
const end = [N - 1, N - 1]; // Ponto de chegada (J10)
let labirinto = [];
let movimentos = [];
let energiaRestante = 50;
let totalMovimentos = 0;
let energia5Restante = 5; // Contador para energia de 5 pontos
let energia10Restante = 3; // Contador para energia de 10 pontos
let animacaoId = null;

function gerarLabirinto() {
    // Limpa a animação se estiver rodando
    if (animacaoId !== null) {
        clearInterval(animacaoId);
        animacaoId = null;
    }

    labirinto = [];
    movimentos = [];
    energiaRestante = 50;
    totalMovimentos = 0;
    energia5Restante = 5; // Reiniciar o contador de células de 5 pontos
    energia10Restante = 3; // Reiniciar o contador de células de 10 pontos

    const labirintoDiv = document.getElementById("labirinto");
    labirintoDiv.innerHTML = "";

    document.getElementById("movimentos").innerHTML = "";
    document.getElementById("energia").textContent = energiaRestante;
    document.getElementById("total-movimentos").textContent = totalMovimentos;

    const table = document.createElement("table");

    // Adiciona o cabeçalho de colunas (A-J)
    const headerRow = document.createElement("tr");
    headerRow.appendChild(document.createElement("th")); // Célula vazia para o canto superior esquerdo
    for (let col = 0; col < N; col++) {
        const th = document.createElement("th");
        th.textContent = String.fromCharCode(65 + col); // Colunas A-J
        th.className = "col-label";
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (let i = 0; i < N; i++) {
        const row = [];
        const tr = document.createElement("tr");

        // Adiciona a numeração das linhas (1-10) no lado esquerdo
        const rowLabel = document.createElement("th");
        rowLabel.textContent = i + 1;
        rowLabel.className = "row-label";
        tr.appendChild(rowLabel);

        for (let j = 0; j < N; j++) {
            const td = document.createElement("td");

            if (i === 0 && j === 0) {
                row.push(0);
                td.className = "start";
                td.textContent = "S"; // Ponto de partida
            } else if (i === N - 1 && j === N - 1) {
                row.push(0);
                td.className = "end";
                td.textContent = "E"; // Ponto de chegada
            } else {
                const randomValue = Math.random();
                if (randomValue < 0.2) {
                    // 20% chance de ser obstáculo
                    row.push(1);
                    td.className = "obstacle";
                    td.textContent = "X"; // Obstáculo
                } else if (randomValue < 0.35 && energia5Restante > 0 && distribuirEnergia(i)) {
                    // Gerar células de energia de 5 pontos até esgotar o limite
                    row.push(5);
                    td.className = "energy";
                    td.textContent = 5; // Energia 5 pontos
                    energia5Restante--;
                } else if (randomValue < 0.45 && energia10Restante > 0 && distribuirEnergia(i)) {
                    // Gerar células de energia de 10 pontos até esgotar o limite
                    row.push(10);
                    td.className = "energy";
                    td.textContent = 10; // Energia 10 pontos
                    energia10Restante--;
                } else {
                    row.push(0);
                    td.className = "clear";
                }
            }
            tr.appendChild(td);
        }
        labirinto.push(row);
        table.appendChild(tr);
    }
    labirintoDiv.appendChild(table);

    // Garantir que existe um caminho viável do início ao fim
    encontrarCaminho();
}

// Função para distribuir a energia entre a metade superior e inferior
function distribuirEnergia(i) {
    const metade = Math.floor(N / 2);
    if (i < metade) {
        // Probabilidade maior de geração na metade superior
        return Math.random() < 0.6;
    } else {
        // Probabilidade maior de geração na metade inferior
        return Math.random() < 0.6;
    }
}

function encontrarCaminho() {
    const queue = [[...start]]; // Inicia na posição [0, 0]
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    visited[0][0] = true;

    while (queue.length > 0) {
        const [x, y] = queue.shift();

        if (x === end[0] && y === end[1]) {
            // Iniciar a animação de movimentação do robô
            animarMovimento();
            atualizarMovimentos();
            return;
        }

        // Movimentos possíveis: cima, baixo, esquerda, direita
        const movimentosPossiveis = [
            [x - 1, y], // Cima
            [x + 1, y], // Baixo
            [x, y - 1], // Esquerda
            [x, y + 1], // Direita
        ];

        for (const [novoX, novoY] of movimentosPossiveis) {
            if (isValido(novoX, novoY) && !visited[novoX][novoY]) {
                visited[novoX][novoY] = true;
                queue.push([novoX, novoY]);
                movimentos.push([novoX, novoY]);
                atualizarEnergia(novoX, novoY);
                totalMovimentos++;
            }
        }
    }
}

function isValido(x, y) {
    return x >= 0 && x < N && y >= 0 && y < N && labirinto[x][y] !== 1;
}

function atualizarMovimentos() {
    const listaMovimentos = document.getElementById("movimentos");
    listaMovimentos.innerHTML = ""; // Limpar a lista anterior
    movimentos.forEach(([x, y]) => {
        const li = document.createElement("li");
        li.textContent = `${indiceParaLetra(y)}${x + 1}`; // Exemplo: A1, B2
        listaMovimentos.appendChild(li);
    });
    document.getElementById("total-movimentos").textContent = totalMovimentos;
}

function atualizarEnergia(x, y) {
    if (labirinto[x][y] === 5 || labirinto[x][y] === 10) {
        energiaRestante += labirinto[x][y];
    } else {
        energiaRestante--;
    }
    document.getElementById("energia").textContent = energiaRestante;
}

function indiceParaLetra(indice) {
    return String.fromCharCode(65 + indice); // A partir do código ASCII 65 (A)
}

// Função para animar os movimentos do robô
function animarMovimento() {
    let index = 0;

    animacaoId = setInterval(() => {
        if (index >= movimentos.length) {
            clearInterval(animacaoId); // Para a animação ao chegar no final
            return;
        }

        const [x, y] = movimentos[index];
        const table = document.querySelector("table");

        // Limpa o estilo da célula anterior
        if (index > 0) {
            const [prevX, prevY] = movimentos[index - 1];
            const prevCell = table.rows[prevX + 1].cells[prevY + 1]; // +1 para compensar o header
            prevCell.classList.remove("robot"); // Remove a classe de robô
        }

        // Atualiza o estilo da célula atual
        const currentCell = table.rows[x + 1].cells[y + 1]; // +1 para compensar o header
        currentCell.classList.add("robot");

        index++;

        // Verifica se o robô chegou ao final
        if (x === end[0] && y === end[1]) {
            clearInterval(animacaoId); // Para a animação ao chegar no final
            return;
        }
    }, 500); // 0.5 segundos por movimento
}

// Gerar labirinto ao carregar a página
window.onload = gerarLabirinto;
