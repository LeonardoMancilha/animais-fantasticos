export default class AnimaNumeros {
  constructor(numbers, observerClass, observerTarget) {
    this.numbers = document.querySelectorAll(numbers);
    this.observerClass = observerClass;
    this.observerTarget = document.querySelector(observerTarget);

    // bind o this do objeto ao callback da mutação
    this.handleMutation = this.handleMutation.bind(this);
  }

  // Recebe um elemento do dom. com número em seu texto
  // Incrementa a partir de 0 até o número final
  static incrementarNumber(number) {
    const total = +number.innerText;
      const incremento = Math.floor(total / 100);
      let start = 0;
      const timer = setInterval(() => {
        start += incremento;
        number.innerText = start;
        if (start > total) {
          number.innerText = total;
          clearInterval(timer);
        }
      }, 25 * Math.random());
  }

  // Ativa incrementar número para cada número selecionado no dom
  animaNumeros() {
    this.numbers.forEach(number => this.constructor.incrementarNumber(number));
  }
  
  // Função que ocorre quando as mutações ocorrer
  handleMutation(mutation) {
   if(mutation[0].target.classList.contains(this.observerClass)) {
    this.observer.disconnect();
    this.animaNumeros();
   }
  }

  // Adiciona o MutationObserver para verificar quando a classe ativo é adicionada ao elemento target
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, {attributes: true});
  }

  init() {
    if (this.numbers.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}