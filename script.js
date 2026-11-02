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

const parquimetro = new Parquimetro();