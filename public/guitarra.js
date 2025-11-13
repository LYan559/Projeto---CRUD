function comprar() {
    event.preventDefault();
    Swal.fire({
        title:"Parabéns!",
        text: "Guitarra comprada com sucesso!",
        icon: "success"
      });
}


document.getElementById('adm-button').addEventListener('click', function(e) {
    e.preventDefault(); 

    const senhaCorreta = "95310"; 

    let senha = prompt("Digite a senha para acessar a página ADM:");

    if(senha === senhaCorreta) {
        window.location.href = "adm.html";
    } else if (senha !== null) {
        alert("Senha incorreta!");
    }
});





