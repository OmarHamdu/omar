// تهيئة الموقع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحديث سنة الخبرة تلقائياً
    updateExperienceYear();
    
    // تحديث السنة الحالية في التذييل
    updateCurrentYear();
    
    // إعداد تبديل الوضع الداكن/الفاتح
    setupThemeToggle();
    
    // إعداد تبديل اللغة
    setupLanguageSwitcher();
    
    // إعداد القائمة المختصرة للهواتف
    setupMobileMenu();
    
    // إعداد زر عرض أقسام الأعمال
    setupWorkSectionsToggle();
    
    // إضافة تأثيرات تفاعلية للبطاقات
    setupCardInteractions();
});

// تحديث سنوات الخبرة تلقائياً
function updateExperienceYear() {
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - startYear;
    
    const experienceElement = document.getElementById('experienceYears');
    if (experienceElement) {
        experienceElement.textContent = yearsOfExperience;
        
        // إضافة تأثير عد متحرك
        animateCounter(experienceElement, 0, yearsOfExperience, 1000);
    }
}

// تأثير عد متحرك للأرقام
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// تحديث السنة الحالية في التذييل
function updateCurrentYear() {
    const currentYearElements = document.querySelectorAll('#currentYear');
    const currentYear = new Date().getFullYear();
    
    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// إعداد تبديل الوضع الداكن/الفاتح
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // التحقق من التفضيل السابق
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.className = savedTheme;
    updateThemeButton(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('light-mode')) {
                body.className = 'dark-mode';
                localStorage.setItem('theme', 'dark-mode');
            } else {
                body.className = 'light-mode';
                localStorage.setItem('theme', 'light-mode');
            }
            updateThemeButton(body.className);
        });
    }
}

// تحديث زر تبديل الوضع
function updateThemeButton(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');
    
    if (theme === 'dark-mode') {
        icon.className = 'fas fa-sun';
        text.textContent = 'الوضع الفاتح';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'الوضع الداكن';
    }
}

// إعداد تبديل اللغة
function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // إزالة النشاط من جميع الأزرار
            langButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            // تغيير اللغة (يمكن إضافة منطق حقيقي لتغيير اللغة هنا)
            changeLanguage(lang);
        });
    });
}

// دالة تغيير اللغة (تظاهرية - يمكن تطويرها لتدعم الترجمة الفعلية)
function changeLanguage(lang) {
    // هذا مثال مبسط، في التطبيق الحقيقي ستكون هناك مكتبة ترجمة
    const messages = {
        'ar': {
            'themeToggle': 'تبديل الوضع',
            'home': 'الرئيسية',
            'about': 'معلومات عني',
            'contact': 'تواصل معي'
        },
        'en': {
            'themeToggle': 'Toggle Theme',
            'home': 'Home',
            'about': 'About Me',
            'contact': 'Contact Me'
        },
        'fr': {
            'themeToggle': 'Changer le thème',
            'home': 'Accueil',
            'about': 'À propos',
            'contact': 'Contactez-moi'
        }
    };
    
    // تحديث النصوص حسب اللغة المختارة
    console.log(`تم تغيير اللغة إلى: ${lang}`);
    
    // حفظ اللغة المختارة
    localStorage.setItem('language', lang);
}

// إعداد القائمة المختصرة للهواتف
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // تحويل شكل زر القائمة إلى X عند النشاط
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    }
}

// إعداد زر عرض أقسام الأعمال
function setupWorkSectionsToggle() {
    const showWorkSectionsBtn = document.getElementById('showWorkSections');
    const workSections = document.getElementById('workSections');
    
    if (showWorkSectionsBtn && workSections) {
        // إخفاء أقسام الأعمال في البداية
        workSections.style.display = 'none';
        
        showWorkSectionsBtn.addEventListener('click', function() {
            if (workSections.style.display === 'none') {
                workSections.style.display = 'block';
                
                // تأثير ظهور سلس
                workSections.style.opacity = '0';
                workSections.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    workSections.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    workSections.style.opacity = '1';
                    workSections.style.transform = 'translateY(0)';
                }, 10);
                
                this.innerHTML = '<i class="fas fa-eye-slash"></i> إخفاء أقسام أعمالي';
            } else {
                workSections.style.opacity = '0';
                workSections.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    workSections.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-briefcase"></i> استعرض أقسام أعمالي';
                }, 500);
            }
        });
    }
}

// إضافة تأثيرات تفاعلية للبطاقات
function setupCardInteractions() {
    const cards = document.querySelectorAll('.work-card, .service-card, .skill-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        // إضافة تأثير اهتزاز خفيف عند النقر
        card.addEventListener('click', function(e) {
            if (this.tagName === 'A' && this.getAttribute('href').startsWith('http')) {
                return; // لا تنفذ التأثير إذا كان الرابط خارجيًا
            }
            
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// دالة للتنقل السلس بين أقسام الصفحة
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// إعداد التنقل السلس للروابط الداخلية
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        smoothScrollTo(targetId);
    });
});