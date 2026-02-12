
let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* SCROLL REVEAL PROFISSIONAL */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        } else {
            /* Remove quando sai → anima de novo ao voltar */
            entry.target.classList.remove("active");
        }
    });
}, {
    threshold: 0.18,        // porcentagem visível antes de animar
    rootMargin: "0px 0px -60px 0px"
});

/* Observa todos elementos marcados */
document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
});

//Àrea de contato
const phoneNumber = "557592456130";
// ===== FORMULÁRIO WHATSAPP =====
const form = document.getElementById("whatsappForm");
if (form) {
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const mensagem = document.getElementById("mensagem").value;
    const servico = document.getElementById("servico").value;

});
};

// ===== BOTÕES WHATSAPP =====
const whatsappBtn = document.getElementById("whatsappBtn");
if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
        window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            `Olá! Tudo bem! Me chamo ${nome.value} (e-mail: ${email.value}): "${servico.value} - ${mensagem.value}"`,
        )}`,"_blank",
        );
        nome.value = "";
        email.value = "";
        whatsapp.value = "";
        mensagem.value = "";
        });
};

/* ===== MODAL CV ===== */
const modalCV = document.getElementById("modalCV");
const btnCV = document.getElementById("btnCV");
const btnCVFooter = document.getElementById("btnCVFooter");
const btnCVMobile = document.getElementById("btnCVMobile");
const closeCV = document.getElementById("closeCV");

if (btnCV) {
    btnCV.addEventListener("click", () => {
        modalCV.classList.add("active");
        document.body.style.overflow = "hidden";
    });
}

if (btnCVFooter) {
    btnCVFooter.addEventListener("click", () => {
        modalCV.classList.add("active");
        document.body.style.overflow = "hidden";
    });
}

if (btnCVMobile) {
    btnCVMobile.addEventListener("click", () => {
        modalCV.classList.add("active");
        document.body.style.overflow = "hidden";
        menu.classList.remove('abrir-menu');
    });
}

if (closeCV) {
    closeCV.addEventListener("click", () => {
        modalCV.classList.remove("active");
        document.body.style.overflow = "auto";
    });
}

// Fechar modal ao clicar no fundo
if (modalCV) {
    modalCV.addEventListener("click", (e) => {
        if (e.target === modalCV) {
            modalCV.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
}

// Fechar com ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalCV.classList.contains("active")) {
        modalCV.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});
