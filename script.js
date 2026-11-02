// Regras de Negócio

class Parquimetro {
    constructor(valorInserido){
        this.valorInserido = valorInserido;
    }
    
    calcularTempo() {
        if(this.valorInserido < 1){
            return "Valor Insuficiente";
        } else if(this.valorInserido < 1.75){
            return 30;
        } else if(this.valorInserido < 3){
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
            tarifa = 1;
        } else if(tempo === 60){
            tarifa = 1.75;
        } else {
            tarifa = 3;
        }

        return this.valorInserido - tarifa;
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

    const valorInserido = Number(inputValor.value);

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
});