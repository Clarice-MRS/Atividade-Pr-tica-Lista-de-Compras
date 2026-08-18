const form = document.getElementById("form");


function criarItem() {}

function editarItem(id) {
    const item = document.getElementById(`item-${id}`);
}

function removerItem(id) {
    console.log(id);
    const item = document.getElementById(`item-${id}`);
    console.log(item);
    if (confirm("Remover item?"))
        item.remove();
}