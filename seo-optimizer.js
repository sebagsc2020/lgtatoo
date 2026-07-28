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
        try {
            console.log('🚀 Iniciando SEO Optimizer...');
            this.generateMetaTags();
            this.generateJSONLD();
            this.generateOpenGraph();
            this.analyzeContent();
            this.setupCanonicalUrls();
            this.addBreadcrumbs();
            console.log('✅ SEO Optimizer inicializado correctamente');
        } catch (error) {
            console.error('❌ Error en SEO Optimizer:', error.message);
        }
    }

    // ============ 1. META TAGS DINÁMICOS ============
    generateMetaTags() {
        const pageTitle = this.getPageTitle();
        const pageDescription = this.getPageDescription();
        const pageKeywords = this.getPageKeywords();

        document.title = pageTitle;
        this.updateOrCreateMeta('description', pageDescription);
        this.updateOrCreateMeta('keywords', pageKeywords);
        this.updateOrCreateMeta('robots', 'index, follow');
        this.updateOrCreateMeta('author', 'Lean González');
        this.updateOrCreateMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes');
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
        try {
            const jsonld = document.createElement('script');
            jsonld.type = 'application/ld+json';
            jsonld.textContent = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                'name': 'Lean González Tattoo',
                'image': this.defaultImage,
                'address': {
                    '@type': 'PostalAddress',
                    'addressLocality': 'Santander',
                    'addressCountry': 'ES'
                },
                'telephone': '+34 697 89 13 24',
                'email': 'Leangonzaleztattoo@icloud.com',
                'openingHours': 'Mo-Sa 09:00-13:00, 16:00-21:00',
                'priceRange': '€€',
                'url': this.siteUrl,
                'sameAs': ['https://www.instagram.com/lean.gonzaleztattoo/'],
                'description': 'Estudio profesional de tatuajes especializado en realismo, blackwork y diseños personalizados.'
            });
            document.head.appendChild(jsonld);
        } catch (error) {
            console.warn('⚠️ Error al generar JSON-LD:', error.message);
        }
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
            { property: 'og:image:width', content: '512' },
            { property: 'og:image:height', content: '512' },
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
        try {
            const content = document.querySelector('main')?.textContent || document.body.textContent;
            const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
            const headings = document.querySelectorAll('h1, h2, h3, h4');
            const images = document.querySelectorAll('img');

            const analysis = {
                wordCount: wordCount,
                headings: headings.length,
                images: images.length,
                hasKeywords: this.keywords.some(kw => content.toLowerCase().includes(kw.toLowerCase()))
            };

            this.showSuggestions(analysis);
        } catch (error) {
            console.warn('⚠️ Error al analizar contenido:', error.message);
        }
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

        if (suggestions.length > 0) {
            console.log('📊 Sugerencias SEO:', suggestions);
        }
    }

    // ============ 5. URLS CANÓNICAS ============
    setupCanonicalUrls() {
        try {
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.rel = 'canonical';
                document.head.appendChild(canonical);
            }
            canonical.href = this.siteUrl + window.location.pathname;
        } catch (error) {
            console.warn('⚠️ Error al configurar URLs canónicas:', error.message);
        }
    }

    // ============ 6. MIGAS DE PAN (Breadcrumbs) ============
    addBreadcrumbs() {
        try {
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
        } catch (error) {
            console.warn('⚠️ Error al agregar breadcrumbs:', error.message);
        }
    }
}

// ============ INICIALIZAR AUTOMÁTICAMENTE ============
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        try {
            window.SEO = new SEOOptimizer();
        } catch (error) {
            console.error('❌ Error al inicializar SEO:', error.message);
        }
    }, 100);
});

// ============ ACTUALIZAR SEO AL CAMBIAR DE PÁGINA ============
window.addEventListener('hashchange', function() {
    setTimeout(function() {
        if (window.SEO) {
            try {
                window.SEO.generateMetaTags();
                window.SEO.generateOpenGraph();
                window.SEO.setupCanonicalUrls();
                window.SEO.analyzeContent();
            } catch (error) {
                console.warn('⚠️ Error al actualizar SEO:', error.message);
            }
        }
    }, 200);
});
