
const btnMenu = document.getElementById("btn-menu");
const btnFecharMenu = document.getElementById("btn-fechar-menu");
const menu = document.getElementById("menu-mobile");
const overlay = document.getElementById("overlay-menu");

function setBodyScrollLocked(locked) {
    document.body.style.overflow = locked ? "hidden" : "auto";
}

function openMobileMenu() {
    if (!menu) return;
    menu.classList.add("abrir-menu");
    menu.setAttribute("aria-hidden", "false");
    if (btnMenu) btnMenu.setAttribute("aria-expanded", "true");
    setBodyScrollLocked(true);
    const firstLink = menu.querySelector("a, button");
    if (firstLink) firstLink.focus();
}

function closeMobileMenu() {
    if (!menu) return;
    menu.classList.remove("abrir-menu");
    menu.setAttribute("aria-hidden", "true");
    if (btnMenu) btnMenu.setAttribute("aria-expanded", "false");
    setBodyScrollLocked(false);
    if (btnMenu) btnMenu.focus();
}

if (btnMenu) btnMenu.addEventListener("click", openMobileMenu);
if (btnFecharMenu) btnFecharMenu.addEventListener("click", closeMobileMenu);
if (overlay) overlay.addEventListener("click", closeMobileMenu);

// Fecha o menu ao clicar em um link
if (menu) {
    menu.querySelectorAll("a[href^='#']").forEach((a) => {
        a.addEventListener("click", () => closeMobileMenu());
    });
}

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

// ===== FORMULÁRIO WHATSAPP =====
const phoneNumber = "557592456130";
const form = document.getElementById("whatsappForm");
const formStatus = document.getElementById("formStatus");

function setFormStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message || "";
    formStatus.classList.remove("is-error", "is-success");
    if (type === "error") formStatus.classList.add("is-error");
    if (type === "success") formStatus.classList.add("is-success");
}

function onlyDigits(value) {
    return (value || "").replace(/\D/g, "");
}

function openWhatsapp(message) {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
}

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nomeEl = document.getElementById("nome");
        const emailEl = document.getElementById("email");
        const whatsappEl = document.getElementById("whatsapp");
        const mensagemEl = document.getElementById("mensagem");
        const servicoEl = document.getElementById("servico");

        const nome = (nomeEl?.value || "").trim();
        const email = (emailEl?.value || "").trim();
        const whatsapp = onlyDigits(whatsappEl?.value || "");
        const mensagem = (mensagemEl?.value || "").trim();
        const servico = (servicoEl?.value || "").trim();

        if (!nome) {
            setFormStatus("Informe seu nome para enviar a mensagem.", "error");
            nomeEl?.focus();
            return;
        }
        if (!mensagem) {
            setFormStatus("Escreva sua mensagem para enviar.", "error");
            mensagemEl?.focus();
            return;
        }
        if (!servico) {
            setFormStatus("Selecione um serviço (ou personalize na mensagem).", "error");
            servicoEl?.focus();
            return;
        }

        const linhas = [
            `Olá! Tudo bem? Me chamo ${nome}.`,
            email ? `E-mail: ${email}` : null,
            whatsapp ? `WhatsApp: ${whatsapp}` : null,
            `Serviço: ${servico}`,
            `Mensagem: ${mensagem}`,
        ].filter(Boolean);

        setFormStatus("Abrindo o WhatsApp…", "success");
        openWhatsapp(linhas.join("\n"));

        form.reset();
        setFormStatus("Pronto! Se não abriu automaticamente, verifique o bloqueio de pop-ups.", "success");
    });
}

/* ===== MODAL CV ===== */
const modalCV = document.getElementById("modalCV");
const btnCV = document.getElementById("btnCV");
const btnCVFooter = document.getElementById("btnCVFooter");
const btnCVMobile = document.getElementById("btnCVMobile");
const closeCV = document.getElementById("closeCV");

function getFocusableElements(container) {
    if (!container) return [];
    return Array.from(
        container.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])'
        )
    ).filter((el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true");
}

function trapFocus(modal, e) {
    if (!modal || e.key !== "Tab") return;
    const focusables = getFocusableElements(modal);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
}

let lastActiveElement = null;

function openModal(modal) {
    if (!modal) return;
    lastActiveElement = document.activeElement;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    setBodyScrollLocked(true);
    const focusables = getFocusableElements(modal);
    const target = focusables[0] || modal.querySelector(".modal-cv-content");
    if (target) target.focus();
}

function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    setBodyScrollLocked(false);
    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
        lastActiveElement.focus();
    }
    lastActiveElement = null;
}

if (btnCV) {
    btnCV.addEventListener("click", () => {
        openModal(modalCV);
    });
}

if (btnCVFooter) {
    btnCVFooter.addEventListener("click", () => {
        openModal(modalCV);
    });
}

if (btnCVMobile) {
    btnCVMobile.addEventListener("click", () => {
        openModal(modalCV);
        closeMobileMenu();
    });
}

if (closeCV) {
    closeCV.addEventListener("click", () => {
        closeModal(modalCV);
    });
}

// Fechar modal ao clicar no fundo
if (modalCV) {
    modalCV.addEventListener("click", (e) => {
        if (e.target === modalCV) {
            closeModal(modalCV);
        }
    });
    modalCV.addEventListener("keydown", (e) => trapFocus(modalCV, e));
}

// ===== MODAL DE PROJETOS =====
const projectModal = document.getElementById('modalProject');
const projectTitle = document.getElementById('projectTitle');
const projectDesc = document.getElementById('projectDesc');
const projectTech = document.getElementById('projectTech');
const projectLive = document.getElementById('projectLive');
const projectRepo = document.getElementById('projectRepo');
const closeProject = document.getElementById('closeProject');

function openProjectFromElement(port) {
    if (!port) return;
        const title = port.dataset.title || '';
        const desc = port.dataset.description || '';
        const tech = port.dataset.tech || '';
        const live = port.dataset.live || '#';
        const repo = port.dataset.github || '#';

        if (projectTitle) projectTitle.textContent = title;
        if (projectDesc) projectDesc.textContent = desc;
        if (projectTech) projectTech.textContent = tech;
        if (projectLive) projectLive.href = live;
        if (projectRepo) projectRepo.href = repo;

        if (projectModal) openModal(projectModal);
}

document.querySelectorAll('.img-port').forEach(port => {
    port.addEventListener('click', () => openProjectFromElement(port));
    port.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openProjectFromElement(port);
        }
    });
});

if (closeProject) {
    closeProject.addEventListener('click', () => {
        closeModal(projectModal);
    });
}

if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal(projectModal);
        }
    });
    projectModal.addEventListener("keydown", (e) => trapFocus(projectModal, e));
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (menu && menu.classList.contains("abrir-menu")) {
            closeMobileMenu();
            return;
        }
        if (modalCV && modalCV.classList.contains("active")) return closeModal(modalCV);
        if (projectModal && projectModal.classList.contains("active")) return closeModal(projectModal);
    }
});

// Scroll spy (menu ativo)
function initScrollSpy() {
    const links = Array.from(document.querySelectorAll('nav.menu-desktop a[href^="#"]'));
    if (links.length === 0) return;

    const sections = links
        .map((a) => {
            const id = a.getAttribute("href")?.slice(1);
            if (!id) return null;
            const el = document.getElementById(id);
            return el ? { id, el } : null;
        })
        .filter(Boolean);

    if (sections.length === 0) return;

    const spy = new IntersectionObserver(
        (entries) => {
            const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;
            const id = visible.target.id;
            links.forEach((a) => {
                const active = a.getAttribute("href") === `#${id}`;
                a.classList.toggle("is-active", active);
                if (active) a.setAttribute("aria-current", "page");
                else a.removeAttribute("aria-current");
            });
        },
        { root: null, threshold: [0.25, 0.4, 0.6], rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach(({ el }) => spy.observe(el));
}

initScrollSpy();
