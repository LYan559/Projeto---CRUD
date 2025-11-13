// URL da API (JSON-Server)
const urlAPI = 'http://localhost:3000/usuarios';

// Variável para armazenar o ID do usuário sendo atualizado
let idAtualizacao = null;

// =======================================================================
// R - READ: Função para carregar e exibir todos os usuários (GET)
// D - DELETE: Esta função também inclui o botão "Excluir"
// =======================================================================
function carregarUsuarios() {
    fetch(urlAPI)
        .then(res => res.json())
        .then(dados => {
            const tabelaCorpo = document.getElementById('tabelaCorpo');
            tabelaCorpo.innerHTML = ''; // Limpa a tabela antes de inserir novos dados

            dados.forEach(usuario => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.sobrenome}</td>
                    <td>${usuario.cpf}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.senha}</td>
                    <td>${usuario.rua}</td>
                    <td>${usuario.cep}</td>
                    <td>${usuario.cidade}</td>
                    <td>${usuario.estado}</td>
                    <td>${usuario.telefone}</td>
                    <td><button onclick="excluirUsuario('${usuario.id}')">Excluir</button></td>
                `;

                tabelaCorpo.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar usuários:', error);
            alert('Não foi possível conectar à API. Verifique se o json-server está rodando na porta 3000.');
        });
}

// =======================================================================
// C - CREATE: Função para cadastrar um novo usuário (POST)
// =======================================================================
function cadastrarUsuario() {
    // 1. Coleta de dados dos inputs (usando os IDs do POST)
    const nome = document.getElementById('nomePost').value;
    const sobrenome = document.getElementById('sobrenomePost').value;
    const cpf = document.getElementById('cpfPost').value;
    const email = document.getElementById('emailPost').value;
    const senha = document.getElementById('senhaPost').value;
    const rua = document.getElementById('ruaPost').value;
    const cep = document.getElementById('cepPost').value;
    const cidade = document.getElementById('cidadePost').value;
    const estado = document.getElementById('estadoPost').value;
    const telefone = document.getElementById('telefonePost').value;

    // Validação básica (garante que o nome não está vazio)
    if (!nome || !email || !cpf) {
        alert("Por favor, preencha os campos obrigatórios (Nome, CPF e Email).");
        return;
    }

    // 2. Monta o objeto de dados
    const novoUsuario = {
        nome, sobrenome, cpf, email, senha, rua, cep, cidade, estado, telefone
    };

    // 3. Requisição POST
    fetch(urlAPI, {
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
            throw new Error('Erro ao cadastrar. Verifique os dados.');
        }
    })
    .then(() => {
        alert("Usuário cadastrado com sucesso!");
        document.getElementById('formPost').reset(); // Limpa o formulário
        carregarUsuarios(); // Atualiza a tabela
    })
    .catch(error => {
        console.error('Erro no cadastro:', error);
        alert(error.message);
    });
}

// =======================================================================
// D - DELETE: Função para excluir um usuário (DELETE)
// =======================================================================
function excluirUsuario(id) {
    if (confirm("Tem certeza que deseja excluir este cadastro?")) {
        fetch(`${urlAPI}/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                alert("Usuário excluído com sucesso!");
                carregarUsuarios(); // Atualiza a tabela
            } else {
                alert("Erro ao excluir o usuário.");
            }
        })
        .catch(error => console.error('Erro na exclusão:', error));
    }
}

// =======================================================================
// U - UPDATE: Funções para atualizar (PUT)
// =======================================================================
function buscarDados() {
    const cpfBusca = document.getElementById('identificadorCPF').value;
    if (!cpfBusca) {
        alert("Por favor, digite o CPF para buscar.");
        return;
    }

    // Busca o usuário com base no CPF (json-server permite buscas assim)
    fetch(`${urlAPI}?cpf=${cpfBusca}`)
        .then(res => res.json())
        .then(dados => {
            if (dados.length === 0) {
                alert("Usuário com este CPF não encontrado.");
                return;
            }

            const usuario = dados[0];
            
            // Preenche o formulário de atualização
            idAtualizacao = usuario.id; // Salva o ID
            document.getElementById('identificadorPut').value = usuario.id;
            document.getElementById('nomeAtualizar').value = usuario.nome;
            document.getElementById('sobrenomeAtualizar').value = usuario.sobrenome;
            document.getElementById('emailAtualizar').value = usuario.email;
            document.getElementById('senhaAtualizar').value = usuario.senha;
            document.getElementById('ruaAtualizar').value = usuario.rua;
            document.getElementById('cepAtualizar').value = usuario.cep;
            document.getElementById('cidadeAtualizar').value = usuario.cidade;
            document.getElementById('estadoAtualizar').value = usuario.estado;
            document.getElementById('telefoneAtualizar').value = usuario.telefone;
            
            alert(`Dados do usuário ${usuario.nome} carregados para atualização.`);
        })
        .catch(error => console.error('Erro na busca:', error));
}

function atualizarDados() {
    if (!idAtualizacao) {
        alert("Primeiro, busque um usuário pelo CPF.");
        return;
    }
    
    // 1. Coleta de dados dos inputs (usando os IDs do PUT)
    const nome = document.getElementById('nomeAtualizar').value;
    const sobrenome = document.getElementById('sobrenomeAtualizar').value;
    const email = document.getElementById('emailAtualizar').value;
    const senha = document.getElementById('senhaAtualizar').value;
    const rua = document.getElementById('ruaAtualizar').value;
    const cep = document.getElementById('cepAtualizar').value;
    const cidade = document.getElementById('cidadeAtualizar').value;
    const estado = document.getElementById('estadoAtualizar').value;
    const telefone = document.getElementById('telefoneAtualizar').value;

    // O CPF não pode ser atualizado se o PUT for por ID, mas o json-server é flexível.
    // Vamos manter a estrutura de dados atualizada.

    // 2. Monta o objeto de dados (o CPF não muda se a busca foi por CPF)
    const usuarioAtualizado = {
        id: idAtualizacao, // O ID é necessário no corpo, dependendo do backend
        nome, sobrenome, email, senha, rua, cep, cidade, estado, telefone
        // Note: O CPF original é omitido aqui se não for um campo de input.
        // Se você precisa manter o CPF original, deve buscá-lo junto com os dados.
    };
    
    // 3. Requisição PUT
    fetch(`${urlAPI}/${idAtualizacao}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioAtualizado)
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Erro ao atualizar. O servidor não aceitou a requisição.');
        }
    })
    .then(() => {
        alert("Usuário atualizado com sucesso!");
        document.getElementById('formPut').reset(); // Limpa o formulário
        idAtualizacao = null;
        carregarUsuarios(); // Atualiza a tabela
    })
    .catch(error => {
        console.error('Erro na atualização:', error);
        alert(error.message);
    });
}


// =======================================================================
// Inicialização: Liga as funções aos botões e carrega os dados
// =======================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Carrega a tabela de usuários ao abrir a página
    carregarUsuarios(); 
    
    // 2. Liga os botões às funções:
    document.getElementById('btnCadastrar').addEventListener('click', cadastrarUsuario);
    document.getElementById('btnBuscar').addEventListener('click', buscarDados);
    document.getElementById('btnAtualizar').addEventListener('click', atualizarDados);
    
    // Os botões de Excluir (DELETE) são ligados diretamente na função carregarUsuarios()
});