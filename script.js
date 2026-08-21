const form = document.getElementById("form");
const nomeInput = document.getElementById("nome-input");
const listaCompras = document.querySelector("#lista");
const pMsgVazio = document.getElementById('msg-vazio');

let totalItems = 0;

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
        <input type="checkbox" name="status" class="Lista-checkbox">
        <span class="Lista-texto">${nome}</span>
        <button type="button" class="Lista-editar">
            <img src="img/pencil.svg" alt="editar">
        </button>
        <button type="button" class="Lista-remover">
            <img src="img/trash.svg" alt="remover">
        </button>
    `;

    listaCompras.appendChild(elemento);

    riscarItem(elemento);

    form.reset();
}

function editarItem(item) {
    const spanNomeItem = item.querySelector(".Lista-texto");
    const nomeItem = spanNomeItem.textContent;

    const novoNome = prompt(`Editar item "${nomeItem}":`, nomeItem);

    if (novoNome)
        spanNomeItem.textContent = novoNome;
}

function removerItem(item) {
    const nomeItem = item.querySelector(".Lista-texto").textContent;

    if (confirm(`Remover item "${nomeItem}"?`)) {
        item.remove();
        totalItems -= 1;
        if (totalItems == 0)
            pMsgVazio.style.display = "block";
    }
}

function riscarItem(elemento) {

    const checkbox = elemento.querySelector(".Lista-checkbox");
    const titulo = elemento.querySelector(".Lista-texto");

    checkbox.addEventListener("change", function() {

        if (checkbox.checked) {
            titulo.classList.add("comprado");
        } else {
            titulo.classList.remove("comprado");
        }

    });
}
