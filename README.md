# IA Simbólica
Este projeto é um trabalho semestral para a matéria de Inteligência artificial.

## Especificações do trabalho
Considere o problema do labirinto: um robô deve caminhar da entrada do labirinto, até sua saída. O labirinto é representado como uma matriz de tamanho 10x10.
A entrada do labirinto está na posição (1,1) da matriz (estado inicial), e a saída na posição (10,10) da matriz (estado final). Os possíveis movimentos do robô são: dada à posição atual (i, j), mover-se para a acima (i-1, j), mover-se para baixo (i+1, j), direita (i, j+1) e esquerda (i, j-1).

O robô somente enxerga as posições imediatamente acima, abaixo, direta e esquerda. Implemente os algoritmos de busca em largura e busca pelo algoritmo A*, que faça o robô caminhar da posição (1,1), até a posição (10,10), considerando as seguintes situações:

a. As posições da matriz podem ser divididas em dois tipos: posições com obstáculos
pelos quais o robô não poderá passar (posições obscuras) e sem obstáculos (posições
claras) pelas quais o robô caminha. As posições obscuras são aleatórias, e o número
delas são entre 10 e 25 posições. As posições (1,1) e (10, 10) devem ser claras.

b. O robô inicia sua caminhada pelo labirinto, com 50 “pontos” de energia, e a cada
movimento, perde 1 ponto, quando chega a zero ele “morre”. No entanto, existem
pelo caminho posições onde ele recupera energia (5 posições onde recupera 5 pontos
em cada uma e 3 onde recupera 10 pontos), estas posições são aleatórias. 

![image](https://github.com/user-attachments/assets/fd5b50fa-eeca-4b34-bf89-c90f74cfc058)

Entregar documento explicando o algoritmo utilizado e mostrando exemplos de labirintos
gerados pelo programa e caminhos percorridos pelo robô. Entregar o código fonte
documentado. O labirinto e os pontos de energia devem ser gerados de forma aleatória. 


## 🚀 Instalação e Execução  
### **Pré-requisitos:**  
- [Visual Studio Code](https://code.visualstudio.com/).  
- Um navegador web (ex.: Google Chrome).  

### **Passos para rodar o projeto:**  
1. Faça o download do repositório:  
   ```bash
   git clone https://github.com/marcusreiss3/A3---IA-SIMBOLICA.git
   
Abra o Visual Studio Code.
No VS Code, clique em File > Open Folder e selecione a pasta do projeto.
Localize o arquivo index.html.
Clique com o botão direito no arquivo e escolha Open with Live Server (se o plugin estiver instalado) ou simplesmente abra o arquivo index.html em um navegador.

## 🔧 Tecnologias

**Linguagens:**
  - [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  
  - [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)  
  - [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

## 👥 Autores

- [Marcus Vinícius Reis](https://github.com/marcusreiss3)
- [Lucas Dal Jovem Neyssinger](https://github.com/lucasdaljovem)
- [Gustavo Abreu Pereira](https://github.com/GustavoAbreuuu)
- [Sammuel Sobieski de Orleans](https://github.com/Bochica21)
- [Vinicius Gomes Penetra](https://github.com/penetraz)
