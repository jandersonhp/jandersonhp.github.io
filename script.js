document.addEventListener('DOMContentLoaded', function() {
    // Navegação entre views
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    
    function switchView(viewId) {
        // Atualiza botões
        navItems.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-view') === viewId) {
                btn.classList.add('active');
            }
        });
        
        // Atualiza views
        views.forEach(view => {
            view.classList.remove('active');
            if (view.id === viewId + '-view') {
                view.classList.add('active');
            }
        });
    }
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetView = this.getAttribute('data-view');
            switchView(targetView);
            
            // Scroll suave para o topo do conteúdo
            document.querySelector('.content').scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
    
    // Botão de contato - copiar email
    const contactButton = document.getElementById('contactButton');
    const emailCard = document.getElementById('emailCard');
    const email = 'jandersonduarte@yahoo.com.br';
    
    function copyEmail(event) {
        event.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
            // Feedback visual
            const originalText = contactButton.innerHTML;
            contactButton.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg><span>Email copiado!</span>';
            
            setTimeout(() => {
                contactButton.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            prompt('Copie o email manualmente:', email);
        });
    }
    
    if (contactButton) {
        contactButton.addEventListener('click', copyEmail);
    }
    
    if (emailCard) {
        emailCard.addEventListener('click', copyEmail);
    }
    
    // Modal para imagens
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const loadingEl = document.querySelector('.modal-loading');
    
    function openModal(src) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (loadingEl) loadingEl.style.display = 'block';
        modalImg.style.display = 'none';
        
        const img = new Image();
        img.onload = function() {
            modalImg.src = src;
            modalImg.style.display = 'block';
            if (loadingEl) loadingEl.style.display = 'none';
        };
        img.onerror = function() {
            if (loadingEl) loadingEl.textContent = 'Erro ao carregar imagem';
            setTimeout(() => closeModal(), 1500);
        };
        img.src = src;
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalImg.src = '';
        if (loadingEl) {
            loadingEl.style.display = 'none';
            loadingEl.textContent = 'Carregando...';
        }
    }
    
    // Abrir modal ao clicar nas imagens dos projetos
    document.querySelectorAll('.project-image img').forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openModal(this.src);
        });
    });
    
    // Fechar modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    modalImg.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    const avatar = document.getElementById('profileAvatar');
    if (avatar) {
        avatar.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            openModal(imgSrc);
        });
    }

    // Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Carrega tema salvo ou do sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }
});