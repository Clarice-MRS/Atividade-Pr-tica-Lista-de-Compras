const form = document.getElementById("form");
const nomeInput = document.getElementById("nome-input");
const listaCompras = document.querySelector("#lista");
const botaoAdicionar = document.querySelector('button[type="submit"]');
const pMsgVazio = document.getElementById('msg-vazio');

let totalItems = 0;

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        criarItem();
    });

    botaoAdicionar.addEventListener("click", criarItem());
});

function criarItem() {
    const nome = nomeInput.value;

    if (!nome)
        return;

    if (totalItems++ == 0)
        pMsgVazio.style.display = 'none';

    const elemento = document.createElement("li");

    elemento.classList.add("Lista-item");
    elemento.id = `item-${totalItems}`;
    elemento.innerHTML = `
        <input type="checkbox" name="status" id="status-input" class="Lista-checkbox">
        <span class="Lista-texto">${nome}</span>
        <button class="Lista-editar" onclick="editarItem(${totalItems})">
            <img src="img/pencil.svg" alt="editar">
        </button>
        <button class="Lista-remover" onclick="removerItem(${totalItems})">
            <img src="img/trash.svg" alt="remover">
        </button>
    `;

    listaCompras.appendChild(elemento);

    form.reset();
}

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

    if (confirm(`Remover item "${nomeItem}"?`)) {
        item.remove();
        totalItems -= 1;
    }

    if (totalItems == 0)
        pMsgVazio.style.display = "block";
}
