const form = document.getElementById("form");
const nomeInput = document.getElementById("nome-input");
const listaCompras = document.querySelector("#lista");
const botaoAdicionar = document.querySelector('button[type="submit"]');

let totalItems = 0;

document.addEventListener("DOMContentLoaded", () => {
    botaoAdicionar.addEventListener("click", criarItem(evento));
})

function criarItem(evento) {
    evento.preventDefault();

    totalItems += 1;

    const valor = nomeInput.value;
    const elemento = document.createElement("li");

    elemento.classList.add("Lista-item");
    elemento.id = `item-${totalItems}`;
    elemento.innerHTML = `
        <input type="checkbox" name="status" id="status-input" class="Lista-checkbox">
        <span class="Lista-texto">${valor}</span>
        <button class="Lista-editar" onclick="editarItem(${totalItems})">
            <img src="img/pencil.svg" alt="editar">
        </button>
        <button class="Lista-remover" onclick="removerItem(${totalItems})">
            <img src="img/trash.svg" alt="remover">
        </button>
    `;

    listaCompras.appendChild(elemento);

    document.getElementById('msg-vazio').style.display = 'none';

    document.getElementById("form").reset();

    // Remover min-height do style da .Lista caso exista
    // Arrumar botoes editar e remover
}

form.addEventListener("submit", criarItem);

function editarItem(id) {
    const item = document.getElementById(`item-${id}`);
    const nomeItem = item.children[1].textContent;

    const novoNome = prompt(`Editar item "${nomeItem}":`, nomeItem);

    const spanNomeItem = item.getElementsByClassName("Lista-texto")[0];

    if (novoNome)
        spanNomeItem.textContent = novoNome;
}

function removerItem(id) {
    const item = document.getElementById(`item-${id}`);
    const nomeItem = item.children[1].textContent;

    if (confirm(`Remover item "${nomeItem}"?`))
        item.remove();

    const numItens = document.getElementsByClassName("Lista-item").length;
    const lista = document.getElementById("lista");
    const pMsgVazio = lista.firstElementChild;

    if (numItens === 0)
        pMsgVazio.style.display = "block";
}
