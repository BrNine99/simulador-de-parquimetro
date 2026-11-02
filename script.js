// Regras de Negócio

class Parquimetro {
    #valorInserido;

    // Criando uma estrutura para armazenar as tarifas        
    #tarifas = [
        { valor: 100, tempo: 30 },
        { valor: 175, tempo: 60 },
        { valor: 300, tempo: 120 }
    ];

    constructor(valorInserido){
        // Validando o valor recebido
        if (!Number.isFinite(valorInserido) || valorInserido < 0) {
            throw new Error("Valor de pagamento inválido.");
        }

        this.#valorInserido = Math.round(valorInserido * 100); // Convertendo o pagamento em centavos
    }

    // Criando um método para identificar a tarifa aplicável        
    #obterTarifa() {
        let tarifaSelecionada = null; // cria variável para armazenar a tarifa encontrada.

        for (const tarifa of this.#tarifas) {
            if (this.#valorInserido >= tarifa.valor) {
                tarifaSelecionada = tarifa;
            }
        }

        return tarifaSelecionada;
    }
    
    calcularTempo() {
        const tarifa = this.#obterTarifa();

        if (tarifa === null) {
            return "Valor Insuficiente";
        }

        return tarifa.tempo;
    }

    calcularTroco() {
        const tarifa = this.#obterTarifa();

        if (tarifa === null) {
            return 0;
        }

        const trocoCentavos = this.#valorInserido - tarifa.valor;

        return trocoCentavos / 100; // Convertendo o pagamento em reais.
    }
}

// Obter Elementos HTML

const formulario = document.getElementById("form-parquimetro");
const inputValor = document.getElementById("valor-inserido");
const resultadoTempo = document.getElementById("tempo-estacionamento");
const resultadoTroco = document.getElementById("troco");
const mensagemResultado = document.getElementById("mensagem-resultado");

// Manipulação do DOM

formulario.addEventListener("submit", function(event){
    event.preventDefault(); //Impede carregamento da pagina

    try {
        const valorInserido = Number(inputValor.value);

        if (!Number.isFinite(valorInserido) || valorInserido < 0) {
            throw new Error("Informe um valor válido.");
        }

        // Nova instância da classe Parquimetro
        const parquimetro = new Parquimetro(valorInserido);

        const tempo = parquimetro.calcularTempo();
        const troco = parquimetro.calcularTroco();

        // Tratando o pagamento insuficiente
        if(tempo === "Valor Insuficiente") {
            resultadoTempo.textContent = "--";
            resultadoTroco.textContent = "--";
            mensagemResultado.textContent = "Valor insuficiente para estacionar.";
            return;
        }

        // Tratando os pagamentos válidos
        resultadoTempo.textContent = `${tempo} minutos`;

        const formataMoeda = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        resultadoTroco.textContent = formataMoeda.format(troco);

        mensagemResultado.textContent = "Pagamento calculado com sucesso!";

        inputValor.value = "";        
        
    } catch (error) {
        resultadoTempo.textContent = "--";
        resultadoTroco.textContent = "--";
        mensagemResultado.textContent = error.message;        
    }    
});