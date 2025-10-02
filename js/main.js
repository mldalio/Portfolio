document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = 150;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function setActiveLink() {
    const scrollPosition = window.scrollY + 200;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition + windowHeight >= documentHeight - 50) {
        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'font-bold');
            if (link.getAttribute('href') === '#Contacto') {
                link.classList.add('text-primary', 'font-bold');
            }
        });
        return;
    }
    
    let currentSection = null;
    let maxVisibleArea = 0;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        
        const visibleTop = Math.max(0, Math.min(sectionBottom, windowHeight) - Math.max(sectionTop, 0));
        const visibleArea = visibleTop;
        
        if (visibleArea > maxVisibleArea && sectionTop < windowHeight / 2) {
            maxVisibleArea = visibleArea;
            currentSection = section;
        }
    });
    
    if (currentSection) {
        const sectionId = currentSection.getAttribute('id');
        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'font-bold');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('text-primary', 'font-bold');
            }
        });
    }
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

window.addEventListener('load', function() {
    const allLinks = document.querySelectorAll('a');
    let copyButton = null;
    
    allLinks.forEach(link => {
        const spanText = link.querySelector('span');
        if (spanText && spanText.textContent.trim() === 'Copiar mail') {
            copyButton = link;
        }
    });
    
    if (copyButton) {
        copyButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            navigator.clipboard.writeText('marialauradalio@gmail.com')
                .then(() => {
                    const spanElement = this.querySelector('span');
                    const textoOriginal = spanElement.textContent;
                    
                    spanElement.textContent = '¡Copiado!';
                    this.classList.add('text-green-400');
                    
                    setTimeout(() => {
                        spanElement.textContent = textoOriginal;
                        this.classList.remove('text-green-400');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Error al copiar:', err);
                });
        });
    }
});

const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('shadow-2xl');
    } else {
        navbar.classList.remove('shadow-2xl');
    }
});

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-hidden');
    observer.observe(section);
});

document.querySelectorAll('.grid > div').forEach(card => {
    card.classList.add('fade-in-hidden');
    observer.observe(card);
});