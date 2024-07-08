export default class Funcionamento {
  constructor(funcionamento, activeClass) {
    this.funcionamento = document.querySelector(funcionamento);
    this.activeClass = activeClass;
  }

  dadosFuncionamento() {
    this.diasSemana = this.funcionamento.dataset.semana.split(',').map(Number);
    this.horarioSemana = this.funcionamento.dataset.horario.split(',').map(Number);
  }
  
  dadosAtuais() {
    this.dataAtual = new Date();
    this.diaAtual = this.dataAtual.getDay();
    this.horarioAtual = this.dataAtual.getUTCHours() - 3;
  }

  isOpen() {
    this.semanaAberto = this.diasSemana.indexOf(this.diaAtual) !== -1;
    this.horarioAberto = (this.horarioAtual >= this.horarioSemana[0] && this.horarioAtual < this.horarioSemana[1]);

    return this.semanaAberto && this.horarioAberto;
  }

  activeOpen() {
    if (this.isOpen()) {
      this.funcionamento.classList.add(this.activeClass);
    }
  }
  
  init() {
    if (this.funcionamento) {
      this.dadosFuncionamento();
      this.dadosAtuais();
      this.activeOpen();
    }
    return this;
  }
}