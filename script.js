const form = document.getElementById("form");

function criarItem() {
	// Cancelar o comportamento padrão do form de redirecionar a página
	// Ocultar pMsgVazio se estiver visível
	// Remover min-height do style da .Lista caso exista
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

    if (confirm(`Remover item "${nomeItem}"?`))
        item.remove();

	const numItens = document.getElementsByClassName("Lista-item").length;
	const lista = document.getElementById("lista");
	const pMsgVazio = lista.firstElementChild;

	if (numItens === 0)
		pMsgVazio.style.display = "block";
}
