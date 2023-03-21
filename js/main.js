const form = document.getElementById('novoItem');
const table = document.getElementById('listaObjetos');
const itemStorage = JSON.parse(localStorage.getItem("itens")) || [];

if(itemStorage.length > 0){
    itemStorage.forEach(e => adicionarObjeto(e))
}else{
    console.log("vazio")
}

form.addEventListener("submit",(event) => {
    event.preventDefault();
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    let item = {
        nome:nome.value.trimEnd(),
        quantidade:quantidade.value.trimEnd()
    };
    let index = itemStorage.findIndex(i => i.nome == item.nome)
    if(index === -1){
        itemStorage.push(item);
        localStorage.setItem("itens",JSON.stringify(itemStorage));

        adicionarObjeto(item);
    }else{
        itemStorage[index] = item;
        localStorage.setItem("itens",JSON.stringify(itemStorage));
        table.querySelector("[data-" + item.nome.replace(" ","-")).querySelector("strong").textContent = item.quantidade
    }

    nome.value = '';
    quantidade.value = '';
})

function adicionarObjeto(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    novoItem.setAttribute("data-" + item.nome.replace(" ","-").replace(" ",""),"");
    const numeroItem = document.createElement('strong');
    numeroItem.textContent = item.quantidade;
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    table.appendChild(novoItem);
}





