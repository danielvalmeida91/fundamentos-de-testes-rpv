import { validar } from '../framework-teste'

interface IUsuario {
    id: number
    nome: string
}

interface ILivro {
    id: number
    titulo: string
}

interface IEmprestar {
    usuario: IUsuario
    livros: ILivro[]
}

// Sistema de Empréstimo de Livros
// Requisitos:
// 1. Prazo -> O empréstimo padrão é de 7 dias.
// 2. Multa -> Se o livro for entregue com atraso, cobra-se uma multa fixa de R$5,00 + R$1,00 por dia de atraso.
// 3. Limite -> Cada aluno pode pega no máximo 3 livros simultaneamente.
// 4. Empréstimo -> O usuário deverá estar previamente cadastrado.

const usuarios = [
    {
        id: 1,
        nome: 'Daniel',
    },
    {
        id: 2,
        nome: 'Joel'
    }
]

const emprestar = ({ livros, usuario }: IEmprestar): boolean => {
    const usuarioExiste = usuarios.filter(user => user.id === usuario.id)
    if (!(usuarioExiste.length > 0)) return false
    if (livros.length > 3) return false
    // Criar empréstimo -> Salvar no local Storage ( Criar testes para isso !)
    // id unico do emprestimo, id usuario, livros, data, 
    return true
}

// criar o cenário de devolução
// levar em consideração que eu estou devolvendo realmente o que peguei
// const devolver = (idUnico do emprestimo) => {
//  Comparar se o id do emprestimo existe nos emprestimos do localStorage
//  Verificar se a data do emprestimo subtraida da data atual é menor ou igual a 7 dias
//  se a data acima verificada for maior que 7 dias, (R$ 5,00 + ($diasDeAtraso * 1,00))
//  console.log com as informações de multa, caso exista.
//  se tudo der certo retorna verdadeiro
// }
//

// validar({
//     descricao: 'emprestar() - Usuário previamente cadastrado e Quantidade de livros menor que o máximo',
//     esperado: true,
//     atual: emprestar({
//         usuario: { id: 1, nome: 'Daniel' },
//         livros: [
//             { id: 1, titulo: 'O Senhor dos Anéis - A Sociedade do Anel' },
//             { id: 2, titulo: 'O Senhor dos Anéis - As Duas Torres' },
//             { id: 3, titulo: 'O Senhor dos Anéis - O Retorno do Rei' },
//         ]
//     }
//     )
// })
// validar({
//     descricao: 'emprestar() - Usuário previamente cadastrado e Quantidade de livros maior que o máximo',
//     esperado: false,
//     atual: emprestar({
//         usuario: { id: 1, nome: 'Daniel' },
//         livros: [
//             { id: 1, titulo: 'O Senhor dos Anéis - A Sociedade do Anel' },
//             { id: 2, titulo: 'O Senhor dos Anéis - As Duas Torres' },
//             { id: 3, titulo: 'O Senhor dos Anéis - O Retorno do Rei' },
//             { id: 4, titulo: 'O Hobbit' },
//         ]
//     }
//     )
// })
// validar({
//     descricao: 'emprestar() - Usuário não cadastrado e Quantidade de livros menor que o máximo',
//     esperado: false,
//     atual: emprestar({
//         usuario: { id: 10, nome: 'Daniel' },
//         livros: [
//             { id: 1, titulo: 'O Senhor dos Anéis - A Sociedade do Anel' },
//             { id: 2, titulo: 'O Senhor dos Anéis - As Duas Torres' },
//             { id: 3, titulo: 'O Senhor dos Anéis - O Retorno do Rei' },
//         ]
//     }
//     )
// })