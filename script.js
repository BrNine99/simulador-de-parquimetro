// Regras de Negócio

class Parquimetro {
    #valorInserido;

    constructor(valorInserido){
        // Validando o valor recebido
        if (!Number.isFinite(valorInserido) || valorInserido < 0) {
            throw new Error("Valor de pagamento inválido.");
        }

        this.#valorInserido = Math.round(valorInserido * 100); // Convertendo o pagamento em centavos
    }
    
    calcularTempo() {
        if(this.#valorInserido < 100){
            return "Valor Insuficiente";
        } else if(this.#valorInserido < 175){
            return 30;
        } else if(this.#valorInserido < 300){
            return 60;
        } else {
            return 120;
        }
    }

    calcularTroco() {
        const tempo = this.calcularTempo();

        if(tempo === "Valor Insuficiente"){
            return 0;
        }

        let tarifa = 0;

        if(tempo === 30){
            tarifa = 100;
        } else if(tempo === 60){
            tarifa = 175;
        } else {
            tarifa = 300;
        }

        const trocoCentavos = this.#valorInserido - tarifa;

        return trocoCentavos / 100; // devolve o resultado em reais
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