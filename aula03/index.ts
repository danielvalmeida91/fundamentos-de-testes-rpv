import { validar } from '../framework-teste'

// Sistema de Parcelamento

// Requisito: "O sistema deve parcelar compras em até 12x. Se for em 1x, tem 5%
// de desconto. De 2x a 6x é sem juros. De 7x a 12x tem juros simples de 2% 
// ao mês sobre o valor total. O valor mínimo da parcela deverá ser de R$20,00."

interface IParcelar {
    valor: number
    numeroParcelas: number
}

interface IResponseParcelar {
    valorFinal: number
    quantidadeParcelas: number
    valorParcela: number
    ehParcelamentoValido: boolean
}

function parcelar({ valor, numeroParcelas }: IParcelar): IResponseParcelar {
    // range de 1 a 12x 
    // 1x -> 5% de desconto
    // 2 a 6x -> sem juros
    // 7 a 12x -> 2% de juros simples sobre o valor 
    // parcela mínima de R$ 20,00

    let response: IResponseParcelar = {
        valorFinal: 0,
        valorParcela: 0,
        quantidadeParcelas: 0,
        ehParcelamentoValido: false
    }

    if (valor < 20 || numeroParcelas > 12 || numeroParcelas < 1) {
        return response
    }

    if (numeroParcelas === 1) {
        const valorComDesconto = valor * 0.95
        if (valorComDesconto < 20) {
            return response
        }
        response = {
            ehParcelamentoValido: true,
            valorFinal: valorComDesconto,
            valorParcela: valorComDesconto,
            quantidadeParcelas: numeroParcelas
        }
    }

    if (numeroParcelas > 1 && numeroParcelas < 7) {
        if ((valor / numeroParcelas) < 20) {
            return response
        }

        return response = {
            ehParcelamentoValido: true,
            valorFinal: valor,
            valorParcela: valor / numeroParcelas,
            quantidadeParcelas: numeroParcelas
        }
    }

    const valorParcela = (valor / numeroParcelas) * 1.02

    if (valorParcela < 20) {
        return response;
    }

    const valorFinal = valorParcela * numeroParcelas

    response = {
        ehParcelamentoValido: true,
        valorFinal,
        valorParcela,
        quantidadeParcelas: numeroParcelas
    }
    return response;

}

const teste = parcelar({ numeroParcelas: 12, valor: 119 })