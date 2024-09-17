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

const listaProdutosQtd = document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/produtos/lista')
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error('Erro:', error));
    });

function adicionarProdutos(){
    const table =  document.getElementById("lista-produtos").getElementsByTagName('tbody')[0]
    console.log(listaProdutos)

    
    listaProdutos.forEach(produto => {
        const buttonDeletar =  document.createElement("button");
        buttonDeletar.classList.add("button")
        buttonDeletar.textContent = "Deletar";

        const buttonEditar =  document.createElement("button");
        buttonEditar.classList.add("button");
        buttonEditar.textContent = "Editar"

        buttonDeletar.addEventListener("click", () => deleteProduto(produto.id));
        buttonEditar.addEventListener("click", () => abreForm());

        const newLine = table.insertRow();

        const celulaProduto = newLine.insertCell(0)
        const celulaDescricao = newLine.insertCell(1)
        const celulaDataDeValidade = newLine.insertCell(2)
        const celulaLocalizacao = newLine.insertCell(3)
        const celulaPreçoDeCompra = newLine.insertCell(4)
        const celulaPreçoDeVenda = newLine.insertCell(5)
        const celulaDataEntrada = newLine.insertCell(6)
        const celulaDataSaida = newLine.insertCell(7)
        const celulaAcoes = newLine.insertCell(8)

        celulaAcoes.appendChild(buttonDeletar);
        celulaAcoes.appendChild(buttonEditar);

        celulaProduto.textContent = produto.produto;
        celulaDescricao.textContent = produto.description;
        celulaDataDeValidade.textContent = transformaDataString(produto.datadevalidade);
        celulaLocalizacao.textContent = produto.localizacao;
        celulaPreçoDeCompra.textContent = produto.price_buy;
        celulaPreçoDeVenda.textContent = produto.price_seller;
        celulaDataEntrada.textContent = transformaDataString(produto.date_created);
        celulaDataSaida.textContent = transformaDataString(produto.date_retired);
    })
}

function deleteProduto(id) {
    console.log(id)
}

async function abreForm() {
    await Swal.fire({
        title: "Multiple inputs",
        html: `
          <input id="swal-input1" class="swal2-input">
          <input id="swal-input2" class="swal2-input">
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ];
        }
      });
      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
      }
}

async function editaProduto(dto) {
    try {
        const reponse = await fetch("http://localhost:8000/istoky", {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dto)
        });
        const data =  await reponse.json();
        const { result } = data;
        return result

    } catch(erro) {
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