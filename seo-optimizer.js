// ============================================================
// 🤖 OPTIMIZACIÓN SEO AUTOMÁTICA - Lean González Tattoo
// ============================================================

class SEOOptimizer {
    constructor() {
        this.siteName = 'Lean González Tattoo';
        this.siteUrl = 'https://lgtatoo.com';
        this.defaultImage = 'https://lgtatoo.com/images/LogoLGTatoo.png';
        this.keywords = [
            'tatuajes', 'tattoo', 'realismo', 'blackwork', 'tatuajes personalizados',
            'estudio de tatuajes', 'tatuador profesional', 'tatuajes en Santander',
            'lean gonzalez tattoo', 'diseños de tatuajes', 'tatuajes realistas'
        ];
        this.init();
    }

    // ============ INICIALIZACIÓN ============
    init() {
        this.generateMetaTags();
        this.generateJSONLD();
        this.generateOpenGraph();
        this.analyzeContent();
        this.addStructuredData();
        this.setupCanonicalUrls();
        this.addBreadcrumbs();
        console.log('✅ SEO Optimizer inicializado correctamente');
    }

    // ============ 1. META TAGS DINÁMICOS ============
    generateMetaTags() {
        const pageTitle = this.getPageTitle();
        const pageDescription = this.getPageDescription();
        const pageKeywords = this.getPageKeywords();

        // Título
        document.title = pageTitle;

        // Meta descripción
        this.updateOrCreateMeta('description', pageDescription);

        // Meta keywords
        this.updateOrCreateMeta('keywords', pageKeywords);

        // Meta robots
        this.updateOrCreateMeta('robots', 'index, follow');

        // Meta author
        this.updateOrCreateMeta('author', 'Lean González');

        // Meta viewport (ya existe, pero lo aseguramos)
        this.updateOrCreateMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes');

        // Meta charset (ya existe, pero lo aseguramos)
        this.updateOrCreateMeta('charset', 'UTF-8');
    }

    getPageTitle() {
        const page = window.location.hash.replace('#', '') || 'inicio';
        const titles = {
            'inicio': 'LG Tattoo | Estudio de Tatuajes Profesional en Santander',
            'galeria': 'Galería de Tatuajes | Realismo y Blackwork | LG Tattoo',
            'recomendaciones': 'Cuidados y Recomendaciones para Tatuajes | LG Tattoo',
            'testimonios': 'Testimonios de Clientes | LG Tattoo',
            'contacto': 'Contacto | Reserva tu Cita en LG Tattoo'
        };
        return titles[page] || titles['inicio'];
    }

    getPageDescription() {
        const page = window.location.hash.replace('#', '') || 'inicio';
        const descriptions = {
            'inicio': 'Especialistas en tatuajes de realismo y blackwork. Diseños personalizados en Santander, España. Reserva tu cita con Lean González Tattoo.',
            'galeria': 'Explora nuestra galería de tatuajes. Trabajos de realismo, blackwork, geométrico y tradicional realizados por Lean González.',
            'recomendaciones': 'Consejos profesionales para el cuidado de tu tatuaje. Guía completa de cuidados previos y posteriores.',
            'testimonios': 'Opiniones de clientes satisfechos. Conoce la experiencia de tatuarse con Lean González Tattoo.',
            'contacto': 'Contacta con Lean González Tattoo. Solicita información y reserva tu cita en nuestro estudio de Santander.'
        };
        return descriptions[page] || descriptions['inicio'];
    }

    getPageKeywords() {
        const page = window.location.hash.replace('#', '') || 'inicio';
        const baseKeywords = this.keywords.join(', ');
        const pageKeywords = {
            'inicio': baseKeywords,
            'galeria': `galería tatuajes, ${baseKeywords}`,
            'recomendaciones': `cuidados tatuajes, ${baseKeywords}`,
            'testimonios': `opiniones tatuajes, ${baseKeywords}`,
            'contacto': `contacto tatuajes, ${baseKeywords}`
        };
        return pageKeywords[page] || baseKeywords;
    }

    updateOrCreateMeta(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    // ============ 2. JSON-LD (Datos Estructurados) ============
    generateJSONLD() {
        const jsonld = document.createElement('script');
        jsonld.type = 'application/ld+json';
        jsonld.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': 'Lean González Tattoo',
            'image': 'https://lgtatoo.com/images/LogoLGTatoo.png',
            'address': {
                '@type': 'PostalAddress',
                'addressLocality': 'Santander',
                'addressCountry': 'ES'
            },
            'telephone': '+34 697 89 13 24',
            'email': 'Leangonzaleztattoo@icloud.com',
            'openingHours': 'Mo-Sa 09:00-13:00, 16:00-21:00',
            'priceRange': '€€',
            'url': 'https://lgtatoo.com',
            'sameAs': [
                'https://www.instagram.com/lean.gonzaleztattoo/'
            ],
            'description': 'Estudio profesional de tatuajes especializado en realismo, blackwork y diseños personalizados.',
            'hasMap': 'https://maps.google.com/?q=Santander+España'
        });
        document.head.appendChild(jsonld);
    }

    // ============ 3. OPEN GRAPH (Redes Sociales) ============
    generateOpenGraph() {
        const ogTags = [
            { property: 'og:title', content: this.getPageTitle() },
            { property: 'og:description', content: this.getPageDescription() },
            { property: 'og:url', content: this.siteUrl + window.location.pathname },
            { property: 'og:site_name', content: this.siteName },
            { property: 'og:type', content: 'website' },
            { property: 'og:image', content: this.defaultImage },
            { property: 'og:locale', content: 'es_ES' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: this.getPageTitle() },
            { name: 'twitter:description', content: this.getPageDescription() },
            { name: 'twitter:image', content: this.defaultImage }
        ];

        ogTags.forEach(tag => {
            const meta = document.createElement('meta');
            if (tag.property) {
                meta.setAttribute('property', tag.property);
            } else {
                meta.name = tag.name;
            }
            meta.content = tag.content;
            document.head.appendChild(meta);
        });
    }

    // ============ 4. ANÁLISIS DE CONTENIDO ============
    analyzeContent() {
        const content = document.querySelector('main')?.textContent || document.body.textContent;
        const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
        const headings = document.querySelectorAll('h1, h2, h3, h4');
        const images = document.querySelectorAll('img');
        const links = document.querySelectorAll('a');

        const analysis = {
            wordCount: wordCount,
            headings: headings.length,
            images: images.length,
            links: links.length,
            hasKeywords: this.keywords.some(kw => content.toLowerCase().includes(kw.toLowerCase()))
        };

        // Mostrar análisis en consola (solo para desarrollo)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('🔍 Análisis SEO:', analysis);
        }

        // Sugerencias automáticas si hay problemas
        this.showSuggestions(analysis);
    }

    showSuggestions(analysis) {
        const suggestions = [];
        
        if (analysis.wordCount < 300) {
            suggestions.push('📝 Añade más contenido descriptivo a la página (mínimo 300 palabras)');
        }
        if (analysis.headings < 2) {
            suggestions.push('📌 Añade más encabezados (H1, H2, H3) para estructurar mejor el contenido');
        }
        if (analysis.images < 2) {
            suggestions.push('🖼️ Agrega más imágenes a la página para mejorar el engagement');
        }
        if (!analysis.hasKeywords) {
            suggestions.push('🔑 Incluye palabras clave como "tatuajes", "realismo", "blackwork" en tu contenido');
        }

        // Mostrar sugerencias
        if (suggestions.length > 0 && window.location.hostname === 'localhost') {
            const container = document.createElement('div');
            container.style.cssText = `
                position: fixed; bottom: 20px; right: 20px; 
                background: rgba(0,0,0,0.9); color: #fff; 
                padding: 15px 20px; border-radius: 10px; 
                z-index: 9999; font-size: 14px; 
                max-width: 350px; border-left: 4px solid #c8a45c;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            `;
            container.innerHTML = `
                <strong style="color: #c8a45c;">🤖 Sugerencias SEO</strong>
                <ul style="list-style:none;padding:0;margin:10px 0 0 0;">
                    ${suggestions.map(s => `<li style="padding:4px 0;">• ${s}</li>`).join('')}
                </ul>
            `;
            document.body.appendChild(container);
            
            setTimeout(() => { container.style.opacity = '0'; }, 10000);
        }
    }

    // ============ 5. URLS CANÓNICAS ============
    setupCanonicalUrls() {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = this.siteUrl + window.location.pathname;
    }

    // ============ 6. MIGAS DE PAN (Breadcrumbs) ============
    addBreadcrumbs() {
        // Solo si no estamos en la página de inicio
        if (window.location.hash) {
            const breadcrumb = document.createElement('script');
            breadcrumb.type = 'application/ld+json';
            breadcrumb.textContent = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {
                        '@type': 'ListItem',
                        'position': 1,
                        'name': 'Inicio',
                        'item': this.siteUrl
                    },
                    {
                        '@type': 'ListItem',
                        'position': 2,
                        'name': this.getPageTitle().replace(' | LG Tattoo', ''),
                        'item': this.siteUrl + window.location.pathname + window.location.hash
                    }
                ]
            });
            document.head.appendChild(breadcrumb);
        }
    }
}

// ============ INICIALIZAR AUTOMÁTICAMENTE ============
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un momento para que el contenido se cargue
    setTimeout(() => {
        window.SEO = new SEOOptimizer();
    }, 100);
});

// ============ ACTUALIZAR SEO AL CAMBIAR DE PÁGINA (SPA) ============
window.addEventListener('hashchange', function() {
    // Recargar SEO al cambiar de sección
    setTimeout(() => {
        if (window.SEO) {
            window.SEO.generateMetaTags();
            window.SEO.generateOpenGraph();
            window.SEO.setupCanonicalUrls();
            window.SEO.analyzeContent();
        }
    }, 200);
});