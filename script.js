const form = document.getElementById("form");
const nomeInput = document.getElementById("nome-input");
const listaCompras = document.querySelector("#lista");
const pMsgVazio = document.getElementById('msg-vazio');

let totalItems = 0;

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
});

/**
 * Cria um item novo e adiciona à lista.
 */
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

    form.reset();
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
    const nomeItem = item.querySelector(".Lista-texto").textContent;

    if (confirm(`Remover item "${nomeItem}"?`)) {
        item.remove();
        totalItems -= 1;
        if (totalItems == 0)
            pMsgVazio.style.display = "block";
    }
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
