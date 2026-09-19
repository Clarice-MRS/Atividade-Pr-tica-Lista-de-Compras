const form = document.getElementById("form");
const nomeInput = document.getElementById("nome-input");
const listaCompras = document.querySelector("#lista");
const pMsgVazio = document.getElementById('msg-vazio');
const botaoApagar = document.getElementById("Lista-apagar");

let totalItems = 0;

let dados = {
    itens: [
        // {
        //     id: crypto.randomUUID(),
        //     nome: "Produto 1",
        //     // quantidade: 1
        //     isComprado: false
        // },
        // {
        //     id: crypto.randomUUID(),
        //     nome: "Produto 2",
        //     // quantidade: 6
        //     isComprado: true
        // },
    ]
};

/**
 * Configura todos os eventListeners ao carregar a página.
 */
document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        criarItem();
    });

    listaCompras.addEventListener("click", (evento) => {
        const botaoEditar = evento.target.closest(".Lista-editar");
        const botaoRemover = evento.target.closest(".Lista-remover");

        if (botaoEditar)
            editarItem(botaoEditar.closest(".Lista-item"));

        if (botaoRemover)
            removerItem(botaoRemover.closest(".Lista-item"));
    });

    listaCompras.addEventListener("change", (evento) => {
        if (!evento.target.matches(".Lista-checkbox"))
            return;

        alternarStatusItem(evento.target.closest(".Lista-item"));
    });

    botaoApagar.addEventListener("click", () => {
        apagarLista();
    });
    dados = carregarDados();
    console.log(dados);
    renderizarLista();
});

/**
 * Cria um item novo e adiciona à lista.
 */
function criarItem() {
    const nome = nomeInput.value.trim();

    if (!nome)
        return;

    // totalItems++;

    // if (totalItems === 1) {
    //     pMsgVazio.style.display = "none";
    //     botaoApagar.style.display = "block";

    //     const pTotal = document.createElement("p");
    //     pTotal.id = "totalItens";
    //     pTotal.textContent = `Total: ${totalItems}`;

    //     listaCompras.prepend(pTotal);
    // } else {
    //     const pTotal = document.getElementById("totalItens");
    //     pTotal.textContent = `Total: ${totalItems}`;
    // }

    form.reset();

    /*********************** PARTE PARA O LOCALSTORAGE ************************/
    novoRegistro = {
        id: crypto.randomUUID(),
        nome: nome,
        // quantidade: quantidade
        isComprado: false
    }
    dados.itens.push(novoRegistro);
    console.log(dados);
    salvarDados();
    renderizarLista();
}

/**
 * Faz o procedimento de edição para o item passado por parâmetro.
 */
function editarItem(item) {
    const spanNomeItem = item.querySelector(".Lista-texto");
    const nomeItem = spanNomeItem.textContent;

    const novoNome = prompt(`Editar item "${nomeItem}":`, nomeItem);

    if (novoNome)
        spanNomeItem.textContent = novoNome;
}

/**
 * Remove o item passado por parâmetro da lista.
 */
function removerItem(item) {
    const id = item.dataset.id;

    console.log(id);

    try {
        const dados = JSON.parse(localStorage.getItem("dados"));

        elemento = dados.itens.filter(registro => registro.id == id)[0];
        console.log(elemento);
    } catch (error) {
        console.log("Erro ao remover:", error);
    }

    if (!confirm(`Remover item "${elemento.nome}"?`))
        return;

    /*********************** PARTE PARA O LOCALSTORAGE ************************/
    dados.itens = dados.itens.filter(registro => registro.id !== id)
    salvarDados();
    renderizarLista()
}

/**
 * Altera a exibição do item passado por parâmetro (toggle).
 */
function alternarStatusItem(elemento) {
    const checkbox = elemento.querySelector(".Lista-checkbox");
    const titulo = elemento.querySelector(".Lista-texto");

    if (checkbox.checked)
        titulo.classList.add("comprado");
    else
        titulo.classList.remove("comprado");
}

/**
 * Apaga todos os itens da lista.
 */
function apagarLista() {
const itens = listaCompras.querySelectorAll(".Lista-item");

    if (!confirm("Apagar lista?"))
        return;

    for (const item of itens) {
        item.remove();
        totalItems--;
    }

    const pTotal = document.getElementById("totalItens");

    if (pTotal) {
        pTotal.remove();
    }

    // pMsgVazio.style.display = "block";
    botaoApagar.style.display = "none";

    /*********************** PARTE PARA O LOCALSTORAGE ************************/
    dados.itens = [];
    salvarDados();
    renderizarLista();
}

/******************************* LOCALSTORAGE *********************************/
function carregarDados() {
    const dados = JSON.parse(localStorage.getItem("dados"));

    if (dados == null)
        return ({
        itens: [
            // {
            //     id: crypto.randomUUID(),
            //     nome: "Exemplo de produto",
            //     // quantidade: 1
            //     isComprado: false
            // },
            // {
            //     id: crypto.randomUUID(),
            //     nome: "Mais um produto",
            //     // quantidade: 6
            //     isComprado: true
            // },
        ]
    });

    return (dados);
}

function salvarDados() {
    try {
        const json = JSON.stringify(dados);
        localStorage.setItem("dados", json);
        return (true);
    } catch (error) {
        console.log("Não foi possível salvar os dados devido a: ", error);
        return (false);
    }
}

function renderizarLista() {
    console.log("Renderizando", dados.itens.length, "itens");

    const sapo = pMsgVazio;

    listaCompras.replaceChildren();

    if (dados.itens.length == 0)
        listaCompras.append(sapo);

    dados.itens.forEach(produto => {
        const elemento = document.createElement("li");

        elemento.classList.add("Lista-item");
        // elemento.id = `item-${totalItems}`; // retirar dps
        elemento.dataset.id = produto.id;

        elemento.innerHTML = `
            <input type="checkbox" name="status" class="Lista-checkbox">
            <span class="Lista-texto">${produto.nome}</span>
            <button type="button" class="Lista-editar">
                <img src="img/pencil.svg" alt="editar">
            </button>
            <button type="button" class="Lista-remover">
                <img src="img/trash.svg" alt="remover">
            </button>
        `;

        listaCompras.appendChild(elemento);

        console.log(produto.nome);
    });

    botaoApagar.style.display = dados.itens.length == 0 ? "none" : "block";
}
