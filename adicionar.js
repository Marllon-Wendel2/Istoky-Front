const btnAdicionar = document.getElementById("form-container");

btnAdicionar.addEventListener("submit",(event) => {
    event.preventDefault()


    const id = document.getElementById("identificador").value;
    const produto = document.getElementById("produto").value;
    const description = document.getElementById("descricao").value;
    const price_buy = document.getElementById("precoDeCompra").value;
    const price_seller = 0;
    const dataDeValidade = document.getElementById("dataValidade").value;
    const localizacao = document.getElementById("localizacao").value;

    const dto = {id, produto, description, price_buy, price_seller, dataDeValidade, localizacao}
    console.log(dto)
    adiconarProduto(dto)
});

function adiconarProduto(dto) {
    fetch('http://localhost:8000/istoky', {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => console.error('Erro:', error));
}