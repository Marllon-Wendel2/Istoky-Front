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
        const newLine = table.insertRow();

        const celulaProduto = newLine.insertCell(0)
        const celulaDescricao = newLine.insertCell(1)
        const celulaDataDeValidade = newLine.insertCell(2)
        const celulaLocalizacao = newLine.insertCell(3)
        const celulaPreçoDeCompra = newLine.insertCell(4)
        const celulaPreçoDeVenda = newLine.insertCell(5)
        const celulaDataEntrada = newLine.insertCell(6)
        const celulaDataSaida = newLine.insertCell(7)

        celulaProduto.textContent = produto.produto
        celulaDescricao.textContent = produto.description
        celulaDataDeValidade.textContent = transformaDataString(produto.datadevalidade)
        celulaLocalizacao.textContent = produto.localizacao
        celulaPreçoDeCompra.textContent = produto.price_buy
        celulaPreçoDeVenda.textContent = produto.price_seller
        celulaDataEntrada.textContent = transformaDataString(produto.date_created)
        celulaDataSaida.textContent = transformaDataString(produto.date_retired)
    })
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