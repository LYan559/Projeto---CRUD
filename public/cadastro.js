document.getElementById('btnCadastrar').addEventListener('click', cadastrarUsuario);

function cadastrarUsuario() {
    // 1. Coleta de dados
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const rua = document.getElementById('rua').value;
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const telefone = document.getElementById('telefone').value;

    // Validação básica
    if (!nome || !cpf || !email || !senha) {
        alert("Preencha todos os campos obrigatórios (Nome, CPF, Email, Senha).");
        return;
    }

    // 2. Monta o objeto de dados
    const novoUsuario = {
        nome, sobrenome, cpf, email, senha, rua, cep, cidade, estado, telefone
    };

    // 3. Requisição POST para o json-server
    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            // Em caso de erro do servidor
            throw new Error('Erro ao cadastrar. Verifique se o CPF já existe ou se o json-server está rodando.');
        }
    })
    .then(() => {
        alert("Cadastro realizado com sucesso!");
        // Redireciona para a página de login
        window.location.href = "index.html"; 
    })
    .catch(error => {
        console.error('Erro no cadastro:', error);
        alert(`Falha no cadastro: ${error.message}`);
    });
}