// Variables globales
let mobileMenuOpen = false;

// Fonction principale pour le menu mobile
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileMenuBtn || !navMenu) return;

    // Toggle du menu mobile
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuOpen) {
                closeMobileMenu();
            }
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(e) {
        if (mobileMenuOpen && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOpen) {
            closeMobileMenu();
        }
    });

    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuBtn || !navMenu) return;

    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

function openMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuBtn || !navMenu) return;

    mobileMenuOpen = true;
    navMenu.classList.add('active');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    
    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenuBtn || !navMenu) return;

    mobileMenuOpen = false;
    navMenu.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    
    // Restaurer le scroll du body
    document.body.style.overflow = '';
}

// Messages pré-configurés pour chaque type de demande
const contactMessages = {
    demo: {
        title: "Demande de démonstration",
        message: `Bonjour,

Je souhaite découvrir EmailSortPro en action et bénéficier d'une démonstration personnalisée.

Informations sur mon contexte :
- Nombre d'utilisateurs : [À compléter]
- Plateforme email principale : Outlook / Gmail
- Besoins spécifiques : [À préciser]

Merci de me proposer un créneau pour une démonstration.

Cordialement,`,
        showPhone: true,
        submitText: "Demander une démonstration"
    },
    quote: {
        title: "Demande de devis",
        message: `Bonjour,

Je souhaite obtenir un devis personnalisé pour EmailSortPro.

Informations sur mon entreprise :
- Secteur d'activité : [À compléter]
- Nombre d'utilisateurs : [À sélectionner ci-dessus]
- Volume d'emails mensuel estimé : [À préciser]
- Budget prévisionnel : [Optionnel]

J'aimerais également connaître :
- Les tarifs dégressifs disponibles
- Les conditions de mise en place
- Les options de support incluses

Merci pour votre retour rapide.

Cordialement,`,
        showPhone: false,
        submitText: "Demander un devis"
    },
    trial: {
        title: "Demande d'essai gratuit",
        message: `Bonjour,

Je souhaite commencer un essai gratuit de 14 jours d'EmailSortPro.

Informations :
- Plateforme email : Outlook / Gmail
- Nombre d'utilisateurs pour l'essai : [À sélectionner]
- Objectifs de test : Gagner du temps sur le tri des emails, améliorer l'organisation

Pouvez-vous m'envoyer les informations pour démarrer l'essai ?

Merci,`,
        showPhone: false,
        submitText: "Démarrer l'essai gratuit"
    },
    support: {
        title: "Demande de support technique",
        message: `Bonjour,

J'ai besoin d'aide concernant EmailSortPro.

Nature de ma demande :
- [Précisez : Installation, Configuration, Utilisation, Bug, Autre]

Description du problème :
[Décrivez votre problème en détail]

Informations techniques :
- Version d'Outlook/Gmail : 
- Système d'exploitation : 
- Navigateur (si applicable) : 

Merci pour votre aide.

Cordialement,`,
        showPhone: true,
        submitText: "Demander de l'aide"
    },
    partnership: {
        title: "Demande de partenariat",
        message: `Bonjour,

Je suis intéressé(e) par un partenariat avec EmailSortPro.

Mon profil :
- Type d'activité : [Intégrateur, Revendeur, Consultant, Autre]
- Entreprise/Structure : [À compléter ci-dessus]
- Zone géographique d'intervention : 
- Expérience dans les solutions email/productivité : 

Objectifs du partenariat :
- Proposer EmailSortPro à mes clients
- Intégration dans mes solutions existantes
- [Autre à préciser]

Merci de me transmettre les informations sur votre programme partenaire.

Cordialement,`,
        showPhone: true,
        submitText: "Proposer un partenariat"
    },
    other: {
        title: "Autre demande",
        message: `Bonjour,

J'ai une question spécifique concernant EmailSortPro :

[Décrivez votre demande ici]

Merci pour votre réponse.

Cordialement,`,
        showPhone: false,
        submitText: "Envoyer ma demande"
    }
};

// Fonction pour sélectionner un type de contact
function selectContactType(type) {
    // Marquer la carte comme sélectionnée
    document.querySelectorAll('.contact-type-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('selected');
    
    // Afficher le formulaire avec le message pré-configuré
    setTimeout(() => {
        showContactForm(type);
    }, 300);
}

// Fonction pour afficher le formulaire avec le message pré-configuré
function showContactForm(type) {
    const config = contactMessages[type];
    if (!config) return;
    
    // Mettre à jour le titre
    document.getElementById('formTitle').textContent = config.title;
    
    // Pré-remplir le message
    document.getElementById('message').value = config.message;
    
    // Définir le type de contact
    document.getElementById('contactType').value = type;
    
    // Afficher/masquer le champ téléphone
    const phoneGroup = document.getElementById('phoneGroup');
    if (config.showPhone) {
        phoneGroup.style.display = 'block';
        document.getElementById('phone').required = true;
    } else {
        phoneGroup.style.display = 'none';
        document.getElementById('phone').required = false;
    }
    
    // Mettre à jour le texte du bouton
    document.querySelector('.submit-btn span').textContent = config.submitText;
    
    // Afficher le formulaire
    document.getElementById('contactForm').style.display = 'block';
    
    // Scroll vers le formulaire
    document.getElementById('contactForm').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Fonction pour réinitialiser le formulaire
function resetContactForm() {
    // Masquer le formulaire
    document.getElementById('contactForm').style.display = 'none';
    
    // Désélectionner toutes les cartes
    document.querySelectorAll('.contact-type-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Réinitialiser le formulaire
    document.getElementById('mainContactForm').reset();
    
    // Scroll vers les options
    document.querySelector('.contact-types-grid').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Gestion du formulaire de contact principal
function initMainContactForm() {
    const mainContactForm = document.getElementById('mainContactForm');
    if (!mainContactForm) return;

    mainContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation du formulaire
        if (!validateForm(this)) {
            return;
        }

        const submitButton = this.querySelector('.submit-btn');
        const originalContent = submitButton.innerHTML;
        
        // État de chargement
        setLoadingState(submitButton, true, 'Envoi en cours...');
        
        // Récupérer les données du formulaire
        const formData = new FormData(this);
        const contactType = formData.get('contactType');
        const config = contactMessages[contactType] || contactMessages.other;
        
        // Simulation d'envoi (remplacer par vraie logique d'envoi)
        setTimeout(() => {
            showNotification(`Votre demande de ${config.title.toLowerCase()} a été envoyée avec succès ! Nous vous répondrons sous 24h.`, 'success');
            resetContactForm();
            setLoadingState(submitButton, false);
            submitButton.innerHTML = originalContent;
        }, 2000);
    });
}

// Validation améliorée du formulaire
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Supprimer les erreurs précédentes
    form.querySelectorAll('.error-message').forEach(error => error.remove());
    form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        let errorMessage = '';
        
        if (!value) {
            errorMessage = 'Ce champ est requis';
            isValid = false;
        } else if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Veuillez saisir un email valide';
                isValid = false;
            }
        }
        
        if (errorMessage) {
            field.classList.add('error');
            showFieldError(field, errorMessage);
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#dc2626';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

// Fonction utilitaire pour gérer les états de chargement
function setLoadingState(button, isLoading, loadingText = 'Chargement...') {
    if (isLoading) {
        button.dataset.originalContent = button.innerHTML;
        button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>${loadingText}</span>`;
        button.disabled = true;
        button.style.opacity = '0.7';
    } else {
        if (button.dataset.originalContent) {
            button.innerHTML = button.dataset.originalContent;
        }
        button.disabled = false;
        button.style.opacity = '';
    }
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    document.querySelectorAll('.notification').forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        maxWidth: '400px',
        background: getNotificationColor(type),
        color: 'white',
        padding: '16px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        fontSize: '14px',
        fontWeight: '500',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#16a34a',
        error: '#dc2626',
        warning: '#f59e0b',
        info: '#667eea'
    };
    return colors[type] || colors.info;
}

// Animation au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Éléments à animer
    const animatedElements = document.querySelectorAll(
        '.step, .feature-card, .pricing-card, .advantage-item, .ai-feature'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scroll pour les liens d'ancre
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Compensation navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                if (mobileMenuOpen) {
                    closeMobileMenu();
                }
            }
        });
    });
}

// Amélioration de l'accessibilité
function initAccessibility() {
    // Focus visible pour les éléments interactifs
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Support des raccourcis clavier
    document.addEventListener('keydown', function(e) {
        // Alt + M pour ouvrir/fermer le menu mobile
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            toggleMobileMenu();
        }
        
        // Échapper pour fermer les modales/menus
        if (e.key === 'Escape') {
            if (mobileMenuOpen) {
                closeMobileMenu();
            }
        }
    });
}

// Gestion de la navigation au clavier dans le menu mobile
function initKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % navLinks.length;
                navLinks[nextIndex].focus();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                navLinks[prevIndex].focus();
            } else if (e.key === 'Home') {
                e.preventDefault();
                navLinks[0].focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                navLinks[navLinks.length - 1].focus();
            }
        });
    });
}

// Gestion des erreurs JavaScript
function initErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('Erreur JavaScript:', e.error);
        // En production, vous pourriez envoyer cette erreur à un service de monitoring
    });

    window.addEventListener('unhandledrejection', function(e) {
        console.error('Promise rejetée:', e.reason);
        // En production, vous pourriez envoyer cette erreur à un service de monitoring
    });
}

// Performance: Lazy loading des images (si utilisées)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

// Optimisation des performances
function initPerformanceOptimizations() {
    // Débounce pour les événements de redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Vérifier si le menu mobile doit être fermé
            if (window.innerWidth > 768 && mobileMenuOpen) {
                closeMobileMenu();
            }
            
            // Recalculer les hauteurs si nécessaire
            updateViewportHeight();
        }, 250);
    });

    // Mettre à jour la hauteur de viewport pour mobile
    updateViewportHeight();
}

function updateViewportHeight() {
    // Fix pour la hauteur de viewport sur mobile
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Gestion du focus trap pour le menu mobile
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Détection des préférences utilisateur
function initUserPreferences() {
    // Respecter la préférence pour les animations réduites
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
    
    // Écouter les changements de préférences
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function(e) {
        if (e.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        } else {
            document.documentElement.style.removeProperty('--animation-duration');
            document.documentElement.style.removeProperty('--transition-duration');
        }
    });
}

// Amélioration des interactions tactiles
function initTouchImprovements() {
    // Améliorer les interactions tactiles sur les cartes
    const interactiveCards = document.querySelectorAll('.feature-card, .pricing-card, .advantage-item');
    
    interactiveCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
        
        card.addEventListener('touchcancel', function() {
            this.style.transform = '';
        }, { passive: true });
    });
}

// Initialisation générale
function init() {
    // Attendre que le DOM soit complètement chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
}

function initializeApp() {
    try {
        // Initialiser tous les composants
        initMobileMenu();
        initContactForm();
        initMainContactForm(); // Nouveau formulaire de contact
        initScrollAnimations();
        initSmoothScroll();
        initAccessibility();
        initKeyboardNavigation();
        initErrorHandling();
        initLazyLoading();
        initPerformanceOptimizations();
        initUserPreferences();
        initTouchImprovements();
        
        // Focus trap pour le menu mobile
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            trapFocus(navMenu);
        }
        
        console.log('🚀 EmailSortPro - Site web chargé avec succès!');
        
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
}

// Démarrer l'application
init();

// Fonctions utilitaires exportées globalement (pour compatibilité avec l'ancien code)
window.toggleMobileMenu = toggleMobileMenu;
window.showNotification = showNotification;
window.setLoadingState = setLoadingState;
window.validateForm = validateForm;
window.selectContactType = selectContactType;
window.resetContactForm = resetContactForm;
