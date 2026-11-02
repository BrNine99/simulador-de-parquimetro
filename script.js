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
}

const parquimetro = new Parquimetro();