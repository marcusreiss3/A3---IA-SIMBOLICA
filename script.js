const tamanho = 10;
const labirinto = [];
let energia = 50;
let movimentos = 0;
const movimentosDisplay = document.getElementById("total-movimentos");
const energiaDisplay = document.getElementById("energia");

// Função para gerar o labirinto com obstáculos e posições de energia
function gerarLabirinto() {
    labirinto.length = 0;  // Resetar labirinto
    energia = 50;  // Resetar energia
    movimentos = 0;  // Resetar movimentos
    document.getElementById("labirinto").innerHTML = "";  // Limpar o labirinto na interface
    atualizarInterface();

    // Criar matriz base e definir posições
    for (let i = 0; i < tamanho; i++) {
        labirinto.push(new Array(tamanho).fill("clear"));
    }

    // Definir entrada e saída
    labirinto[0][0] = "start";
    labirinto[tamanho - 1][tamanho - 1] = "end";

    // Adicionar obstáculos aleatórios (entre 10 e 25)
    let obstaculos = Math.floor(Math.random() * 16) + 10;
    while (obstaculos > 0) {
        let x = Math.floor(Math.random() * tamanho);
        let y = Math.floor(Math.random() * tamanho);
        if (labirinto[x][y] === "clear") {
            labirinto[x][y] = "obstacle";
            obstaculos--;
        }
    }

    // Adicionar pontos de energia
    let energia5 = 5;
    let energia10 = 3;
    while (energia5 > 0 || energia10 > 0) {
        let x = Math.floor(Math.random() * tamanho);
        let y = Math.floor(Math.random() * tamanho);
        if (labirinto[x][y] === "clear") {
            labirinto[x][y] = energia5 > 0 ? "energy5" : "energy10";
            energia5 > 0 ? energia5-- : energia10--;
        }
    }

    // Renderizar o labirinto na interface
    renderizarLabirinto();
}

// Renderizar o labirinto na interface
function renderizarLabirinto() {
    const tabela = document.createElement("table");
    for (let i = 0; i < tamanho; i++) {
        const linha = document.createElement("tr");
        for (let j = 0; j < tamanho; j++) {
            const celula = document.createElement("td");
            celula.className = labirinto[i][j];
            if (labirinto[i][j] === "start") celula.textContent = "S";
            if (labirinto[i][j] === "end") celula.textContent = "E";
            if (labirinto[i][j] === "energy5") celula.textContent = "+5";
            if (labirinto[i][j] === "energy10") celula.textContent = "+10";
            linha.appendChild(celula);
        }
        tabela.appendChild(linha);
    }
    document.getElementById("labirinto").appendChild(tabela);
}

// Atualizar a interface com o caminho percorrido e energia
function atualizarInterface() {
    movimentosDisplay.textContent = movimentos;
    energiaDisplay.textContent = energia;
}

// Função para aplicar os movimentos, perder energia e ganhar se pisar em pontos verdes
function moverEAtualizarEnergia(x, y, novaEnergia, caminho) {
    const tabela = document.querySelector("table");

    caminho.forEach(({ x, y }, index) => {
        setTimeout(() => {
            const celula = tabela.rows[x].cells[y];

            // Remover qualquer animação antiga
            celula.classList.remove("robot-animacao");

            // Adicionar classe para animar
            celula.className = "robot robot-animacao";

            // Aumentar energia conforme o tipo de célula
            if (labirinto[x][y] === "energy5") energia += 5;
            if (labirinto[x][y] === "energy10") energia += 10;

            // Atualizar interface após movimento
            atualizarInterface();
        }, index * 300);  // Intervalo de tempo para cada movimento
    });

    // Atualizar o total de movimentos com o tamanho do caminho
    movimentos += caminho.length;
    energia = novaEnergia;

    atualizarInterface(); // Atualizar interface com os valores finais
}


// Algoritmo de Busca em Largura (BFS)
function buscaLargura() {
    const fila = [{ x: 0, y: 0, energia: energia, caminho: [] }];
    const visitado = Array.from({ length: tamanho }, () => Array(tamanho).fill(false));
    visitado[0][0] = true;

    while (fila.length > 0) {
        const { x, y, energia, caminho } = fila.shift();

        // Verificar se chegou ao final
        if (x === tamanho - 1 && y === tamanho - 1) {
            moverEAtualizarEnergia(x, y, energia, caminho);
            return;
        }

        // Movimentos possíveis
        const movimentos = [
            { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
            { dx: 0, dy: -1 }, { dx: 0, dy: 1 }
        ];

        for (const { dx, dy } of movimentos) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < tamanho && ny >= 0 && ny < tamanho && !visitado[nx][ny] && labirinto[nx][ny] !== "obstacle") {
                visitado[nx][ny] = true;

                // Calcular nova energia
                let novaEnergia = energia - 1;
                if (labirinto[nx][ny] === "energy5") novaEnergia += 5;
                if (labirinto[nx][ny] === "energy10") novaEnergia += 10;

                if (novaEnergia > 0) {
                    fila.push({ x: nx, y: ny, energia: novaEnergia, caminho: [...caminho, { x: nx, y: ny }] });
                }
            }
        }
    }
}

// Algoritmo de Busca A*
function buscaAEstrela() {
    const fila = [{ x: 0, y: 0, energia: energia, caminho: [], custo: 0 }];
    const visitado = Array.from({ length: tamanho }, () => Array(tamanho).fill(false));
    visitado[0][0] = true;

    while (fila.length > 0) {
        fila.sort((a, b) => (a.custo - b.custo));
        const { x, y, energia, caminho } = fila.shift();

        // Verificar se chegou ao final
        if (x === tamanho - 1 && y === tamanho - 1) {
            moverEAtualizarEnergia(x, y, energia, caminho);
            return;
        }

        // Movimentos possíveis
        const movimentos = [
            { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
            { dx: 0, dy: -1 }, { dx: 0, dy: 1 }
        ];

        for (const { dx, dy } of movimentos) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < tamanho && ny >= 0 && ny < tamanho && !visitado[nx][ny] && labirinto[nx][ny] !== "obstacle") {
                visitado[nx][ny] = true;

                // Calcular nova energia e custo
                let novaEnergia = energia - 1;
                let custo = caminho.length + Math.abs(tamanho - 1 - nx) + Math.abs(tamanho - 1 - ny);
                if (labirinto[nx][ny] === "energy5") novaEnergia += 5;
                if (labirinto[nx][ny] === "energy10") novaEnergia += 10;

                if (novaEnergia > 0) {
                    fila.push({ x: nx, y: ny, energia: novaEnergia, caminho: [...caminho, { x: nx, y: ny }], custo });
                }
            }
        }
    }
}

gerarLabirinto();
