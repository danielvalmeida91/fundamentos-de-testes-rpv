// 🛒 E-commerce (Cálculo de Frete e Cupom)Regra de Negócio: O frete é R$ 20,00 fixo. Se a compra passar de R$ 300,00, o frete é grátis. Cupons de 10% não se aplicam ao valor do frete.

// entrada -> carrinho de compras com quantidades e valores

interface IItemsDeCompra {
    id: number
    descricao: string
    valorUnitario: number
    quantidade: number
}

interface ICarrinhoDeCompras {
    items: IItemsDeCompra[]
}

const carrinho: ICarrinhoDeCompras = {
    items: [
        { id: 1, descricao: 'Teclado', quantidade: 2, valorUnitario: 50 },
        { id: 2, descricao: 'Mouse', quantidade: 3, valorUnitario: 30 },
        { id: 3, descricao: 'Gabinete', quantidade: 1, valorUnitario: 500 }
    ]
}

interface IValidarCompra {
    carrinho: ICarrinhoDeCompras
    cupom: boolean
}

function validarCompra({ carrinho, cupom }: IValidarCompra): boolean {
    const { items } = carrinho
    if (items.length === 0) {
        return false;
    }

    const totalProdutos = items.reduce((acc, cur) => {
        const quantidadeVezesValor = cur.quantidade * cur.valorUnitario
        return acc + quantidadeVezesValor
    }, 0)
    // 1- acc 0 -> 2*50 = 100 + acc (0)
    // 2- acc 100 -> 3*30 = 90 + acc (100)
    // 3- acc 190 -> 1*500 = 500 + acc (190)
    // total esperado => 690
    const frete = 20
    let possuiFreteGratis = false
    if (totalProdutos > 300) {
        possuiFreteGratis = true
    }

    const aplicaDesconto = cupom === true ? (totalProdutos * 0.9) : totalProdutos
    const valorFinal = possuiFreteGratis === true ? aplicaDesconto : (aplicaDesconto + frete)

    console.log('Valor final da compra é de : ', valorFinal)

    return true;
}

const compraRealizada = validarCompra({ carrinho, cupom: true })