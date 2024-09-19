const token = localStorage.getItem("authToken");
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async(event) => {
    event.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

   const data = await autenticaUsuario(email,password)

   if(data.success === false) {
    await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email ou senha incorretos",
      });
      
   }
   if(data.success === true) {
    await Swal.fire({
        icon: "success",
        title: "Logando",
        text: "Tudo certo",
      });
      localStorage.setItem('authToken', data.token);
      window.location.href = "index.html"
   }
})

async function autenticaUsuario(email, password) {
    const dto = {
        email, password
    }
    try {
        const response = await fetch('https://collab-sooty.vercel.app/usuario/auth', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dto)
        });
        

        const data = await response.json();
        if(data.error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email não cadastrado",
              });
        }
        return data
    } catch (erro) {
        console.error('Erro:', erro);
    }
}