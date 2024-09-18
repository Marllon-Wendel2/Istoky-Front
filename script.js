let listaProdutos = []
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/istoky')
        .then(response => response.json())
        .then(data => {
            listaProdutos = data.message
            adicionarProdutos()
        })
        .catch(error => console.error('Erro:', error));
    });

    const lista = document.getElementById("lista")
const listaProdutosQtd = document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/produtos/lista')
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error('Erro:', error));
    });

// function adicionarProdutos(){
//     const table =  document.getElementById("lista-produtos").getElementsByTagName('tbody')[0]
//     console.log(listaProdutos)

    
//     listaProdutos.forEach(produto => {
//         const buttonDeletar =  document.createElement("button");
//         buttonDeletar.classList.add("button")
//         buttonDeletar.textContent = "Deletar";

//         const buttonEditar =  document.createElement("button");
//         buttonEditar.classList.add("button");
//         buttonEditar.textContent = "Editar"


        

//         const newLine = table.insertRow();

//         const celulaProduto = newLine.insertCell(0)
//         const celulaDescricao = newLine.insertCell(1)
//         const celulaDataDeValidade = newLine.insertCell(2)
//         const celulaLocalizacao = newLine.insertCell(3)
//         const celulaPreçoDeCompra = newLine.insertCell(4)
//         const celulaPreçoDeVenda = newLine.insertCell(5)
//         const celulaDataEntrada = newLine.insertCell(6)
//         const celulaDataSaida = newLine.insertCell(7)
//         const celulaAcoes = newLine.insertCell(8)

//         celulaAcoes.appendChild(buttonDeletar);
//         celulaAcoes.appendChild(buttonEditar);

//         celulaProduto.textContent = produto.produto;
//         celulaDescricao.textContent = produto.description;
//         celulaDataDeValidade.textContent = transformaDataString(produto.datadevalidade);
//         celulaLocalizacao.textContent = produto.localizacao;
//         celulaPreçoDeCompra.textContent = produto.price_buy;
//         celulaPreçoDeVenda.textContent = produto.price_seller;
//         celulaDataEntrada.textContent = transformaDataString(produto.date_created);
//         celulaDataSaida.textContent = transformaDataString(produto.date_retired);
//     })
//}

function adicionarProdutos() {
    console.log(listaProdutos)
    listaProdutos.forEach((produto) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style = "width: 12rem;"
        card.style = "margin-bottom: 1rem;"


        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body")
        card.appendChild(cardBody);


        const cardTitulo = document.createElement("h5");
        cardTitulo.classList.add("card-title");
        cardTitulo.innerText = `${produto.description}`;
        cardBody.appendChild(cardTitulo);

        const cardSubTitulo = document.createElement("h6");
        cardSubTitulo.classList.add("card-subtitle", "mb-2", "text-body-secondary");
        cardSubTitulo.innerText = `${produto.produto}`
        cardBody.appendChild(cardSubTitulo);


        const textValidade = document.createElement("p");
        textValidade.classList.add("card-text");
        textValidade.innerText = `Data de validade: ${transformaDataString(produto.datadevalidade)}`;
        cardBody.appendChild(textValidade);

        const textLocalizacao = document.createElement("p");
        textLocalizacao.classList.add("card-text");
        textLocalizacao.innerText = `Localizaoção: ${produto.localizacao}`;
        cardBody.appendChild(textLocalizacao);

        const btnDeletar = document.createElement("button");
        btnDeletar.classList.add("button");
        const imgDelete =  document.createElement("img")
        imgDelete.src = "./img/delete.svg";
        btnDeletar.appendChild(imgDelete)
        cardBody.appendChild(btnDeletar);

        btnDeletar.addEventListener("click", async () => {
            Swal.fire({
                title: "Você tem certeza que deseja deletar?",
                text: "Não poderá ser revertido",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, delete!"
              }).then(async (result) => {
                  if (result.isConfirmed) {
                    const data = await deleteProduto(produto.id)
                    console.log(data)
                    if(data.success == true) {
                       await Swal.fire({
                          title: "Deletedo!",
                          text: `${data.message}`,
                          icon: "success"
                        });
                        location.reload()
                    }
                  }
            });
              });

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("button");
        const imgEditar =  document.createElement("img");
        imgEditar.src = "./img/edit.svg";
        btnEditar.appendChild(imgEditar);
        cardBody.appendChild(btnEditar);

        btnEditar.addEventListener("click", () => abreForm(produto.id));

        const btnDetalhar = document.createElement("button");
        btnDetalhar.classList.add("button");
        const imgDetalhar = document.createElement("img");
        imgDetalhar.classList.add("imagem-icone");
        imgDetalhar.src = "./img/plus-solid.svg";
        btnDetalhar.appendChild(imgDetalhar);
        cardBody.appendChild(btnDetalhar);

        const precoDeVenda = document.createElement("p");
        precoDeVenda.style = "display: none;"
        precoDeVenda.innerText = `Comprado por: R$${produto.price_buy}`
        cardBody.appendChild(precoDeVenda)

        const precoDeCompra = document.createElement("p");
        precoDeCompra.style = "display: none;"
        precoDeCompra.innerText = `Vendido por: R$${produto.price_seller}`
        cardBody.appendChild(precoDeCompra)

        btnDetalhar.addEventListener("click", () => {
            const estilo = window.getComputedStyle(precoDeCompra)
            if(estilo.display === "none") {
                precoDeCompra.style = "display: block;"
                precoDeVenda.style = "display: block;"
            } else {
                precoDeCompra.style = "display: none;"
                precoDeVenda.style = "display: none;"
            }
        })


        lista.appendChild(card)
    })
}

async function abreForm(id) {
    await Swal.fire({
        title: "Editando produto",
        input: "select",
        inputOptions: {
            produto: "Produto",
            description: "Descrição",
            price_buy: "Preço de compra",
            price_seller: "Preço de venda",
            dataDeValidade: "Data de validade",
            localizacao: "Localiza"

        },
        html: `
          <input id="swal-input2" class="swal2-input" placeholder="Digite aqui.."">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const conteudo = document.getElementById("swal-input2").value;
            const parametro = Swal.getInput().value
            return {
                [parametro]: conteudo
            }
        }
        }).then(async (result) => {
            console.log(result)
            console.log(id, result.value)
            if(result.isConfirmed){
               await editaProduto(id,result.value)
            }
        })}

async function editaProduto(id,dto) {
    try {
        const reponse = await fetch(`http://localhost:8000/istoky/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dto)
        });
        const data =  await reponse.json();
        console.log(data);
        if(data.success == true) {
            await Swal.fire({
                title: "Editado!",
                text: `${data.message} atualize à pagina`,
                icon: "success"
              });
              location.reload()
        }
    } catch(erro) {
        console.error('Erro:', erro);
    }
}

async function deleteProduto(id) {
    try {
    const response = await fetch(`http://localhost:8000/istoky/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    const data = await response.json();
    return data
    } catch(erro) {
        console.error('Erro:', erro);
    }
}

function transformaDataString(date) {
    if(date == null) {
        return "Data não informada"
    }
    const data = new Date(date)
    const stringDate = `${String(data.getUTCDate()+1).padStart(2, '0')}/${String(data.getUTCMonth() + 1).padStart(2, '0')}/${new Date(date).getFullYear()}`
    return stringDate
}


/* <thead>
<tr>
  <th class="lista__container-titulo">Produto</th>
  <th>Descrição</th>
  <th>Quantidade</th>
  <th>Preço</th>
  <th>Localização</th>
</tr>
</thead> */