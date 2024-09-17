const btnAdicionar = document.getElementById("form-container");

btnAdicionar.addEventListener("submit",async (event) => {
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
    const result = await adicionarProduto(dto);
    console.log(result)

    if(result.success == true) {
        Swal.fire({
            title: "Muito bem!",
            text: "O produto foi registrado!",
            icon: "success"
          });
          document.getElementById("identificador").value = "";
          document.getElementById("produto").value = "";
          document.getElementById("descricao").value = "";
          document.getElementById("precoDeCompra").value = "";
          document.getElementById("dataValidade").value = "";
          document.getElementById("localizacao").value = "";
    }
    if(result.success == false) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.message,
          });
    }
});

async function adicionarProduto(dto) {
    try {
        const response = await fetch('http://localhost:8000/istoky', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dto)
        });

        const data = await response.json();
        const { result } = data;

        return result;
    } catch (error) {
        console.error('Erro:', error);
    }
}
