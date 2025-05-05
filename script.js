let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function Comprar(nome, preco) {
    let item = carrinho.find(item => item.nome === nome);
    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function calcularTotal() {
    let total = 0;
    for (let item of carrinho) {
        total += item.preco * item.quantidade;
    }
    return total.toFixed(2); // converte o valor total em ponto flutuante
}

function exibirCarrinho() {
    let divCarrinho = document.getElementById('carrinho');
    divCarrinho.innerHTML = '';

    // editar como aparece no carrinho
    let mapeamentoTexto = {
        'Maçã': 'Pct. Preço Por Pct',
        'Banana Prata': 'Dz. Preço Por Dz:',
        'Arroz Integral': 'Pacote 5Kg',
        'Carne costelinha suína': 'Kg',
        'Morango': 'Cxs. Preço Por Caixa',
        'Melancia': 'Un. Preço Por Kg',
        'Uva Verde': 'Cxs. Preço Por Caixa',
        'Laranja': 'Un. Preço Por Kg',
        'Manga': 'Un. Preço Por Kg',
        'Frango SuperFrango': 'Pct. Preço Por Kg',
        'Steak de Frango': 'Un. Preço Por Unidade',
        'Nuggets Tradicional': 'Cxs. Preço Por Caixa',
        'Lasanha de Frango': 'Cxs. Preço Por Caixa',
        'Bolo Chocolate': 'Un. Preço Por Unidade',
        'Pão Tradicional': 'Pct. Preço Por Unidade',
        'Pão de Queijo': 'Un. Preço Por Kg',
        'Filézinho Frango': 'Un. Preço Por Kg',
        'Peixe Tilapía': 'Un. Preço Por Kg',
        'Linguiça Tosc': 'Un. Preço Por Kg',
        'Bacon Fatiado': 'Un. Preço Por Kg',
        'Coxas de Frango': 'Un. Preço Por Kg',
        'Filé Mignon': 'Un. Preço Por Kg',
        'Almondegas': 'Un. Preço Por Kg',
    };

    for (let item of carrinho) {
        let p = document.createElement('p');
        p.className = 'texto-carrinho';

        let textoItem = mapeamentoTexto[item.nome] || '';

        // Verifica e ajusta pluralização
        if (item.quantidade > 1) {
            if (textoItem.includes('Pct.')) {
                textoItem = textoItem.replace('Pct.', 'Pcts.');
            }
            if (textoItem.includes('Dz.')) {
                textoItem = textoItem.replace('Dz.', 'Dzs.');
            }
        }

        // Calcula o total por item
        let totalPorItem = (item.preco * item.quantidade).toFixed(2);

        // Define o texto para exibição
        p.textContent = `${item.nome}: ${item.quantidade} ${textoItem} | Preço Unitário: ${item.preco} R$ | Total: ${totalPorItem} R$`;
        divCarrinho.appendChild(p);
    }

    divCarrinho.innerHTML += '<br>';

    let pTotal = document.createElement('p');
    pTotal.className = 'texto-carrinho';
    pTotal.textContent = `Total Da Compra: ${calcularTotal()} R$`;
    divCarrinho.appendChild(pTotal);
}

// Botão para limpar o carrinho
function limparCarrinho() {
    carrinho = [];
    localStorage.removeItem('carrinho');
    exibirCarrinho();
}

let btnLimpar = document.getElementById('btnLimpar');
if (btnLimpar) {
    btnLimpar.addEventListener('click', limparCarrinho);
} else {
    console.error("Botão com ID 'btnLimpar' não encontrado.");
}

// Função para voltar à página anterior
function voltar() {
    window.history.back();
}

const btnVoltar1 = document.getElementById('btnVoltar1');
if (btnVoltar1) {
    btnVoltar1.addEventListener('click', voltar);
} else {
    console.warn("Botão com ID 'btnVoltar1' não encontrado.");
}

const btnVoltar = document.getElementById('btnVoltar');
if (btnVoltar) {
    btnVoltar.addEventListener('click', voltar);
} else {
    console.warn("Botão com ID 'btnVoltar' não encontrado.");
}

window.onload = exibirCarrinho;
