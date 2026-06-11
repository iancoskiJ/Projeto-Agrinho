// Aguarda o documento HTML carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. MENU RESPONSIVO (HAMBÚRGUER)
    // ==========================================
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
        // Adiciona ou remove a classe 'ativo' que exibe o menu lateral
        navLinks.classList.toggle("ativo");
        
        // Altera o ícone dinamicamente entre barras e "X"
        const icone = menuToggle.querySelector("i");
        if(navLinks.classList.contains("ativo")) {
            icone.classList.remove("fa-bars");
            icone.classList.add("fa-xmark");
        } else {
            icone.classList.remove("fa-xmark");
            icone.classList.add("fa-bars");
        }
    });

    // Fecha o menu automaticamente ao clicar em qualquer link dele
    const links = document.querySelectorAll(".nav-links a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("ativo");
            menuToggle.querySelector("i").classList.remove("fa-xmark");
            menuToggle.querySelector("i").classList.add("fa-bars");
        });
    });


    // ==========================================
    // 2. CONTADORES NUMÉRICOS ANIMADOS
    // ==========================================
    const contadores = document.querySelectorAll(".contador");
    const tempoAnimacao = 2000; // Tempo total da animação em milissegundos

    const iniciarContagem = (contador) => {
        const valorAlvo = +contador.getAttribute("data-alvo");
        const incremento = valorAlvo / (tempoAnimacao / 16); // Baseado em ~60fps

        let valorAtual = 0;

        const atualizarNumero = () => {
            valorAtual += incremento;
            if (valorAtual < valorAlvo) {
                contador.innerText = Math.ceil(valorAtual);
                requestAnimationFrame(atualizarNumero);
            } else {
                contador.innerText = valorAlvo; // Garante que termine no valor exato
            }
        };

        atualizarNumero();
    };


    // ==========================================
    // 3. ANIMAÇÃO DE APARECIMENTO NO SCROLL
    // ==========================================
    const elementosParaAnimar = document.querySelectorAll(".animar-scroll");
    const secaoImpacto = document.querySelector(".impacto-section");
    let contadoresIniciados = false;

    const checarScroll = () => {
        const gatilhoJanela = window.innerHeight * 0.85; // 85% da tela visível

        // Animação dos cards de jornal
        elementosParaAnimar.forEach(elemento => {
            const topoElemento = elemento.getBoundingClientRect().top;
            
            if (topoElemento < gatilhoJanela) {
                elemento.classList.add("aparecer");
            }
        });

        // Disparador dos contadores numéricos ao chegar na seção correspondente
        if (secaoImpacto) {
            const topoSecao = secaoImpacto.getBoundingClientRect().top;
            if (topoSecao < gatilhoJanela && !contadoresIniciados) {
                contadores.forEach(contador => iniciarContagem(contador));
                contadoresIniciados = true; // Impede que anime mais de uma vez
            }
        }
    };

    // Executa uma vez ao carregar a página e adiciona o evento de rolagem
    window.addEventListener("scroll", checarScroll);
    checarScroll(); 
});