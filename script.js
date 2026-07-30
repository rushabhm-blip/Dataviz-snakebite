/**
 * PANIC VS POISON: THE SILENT CRISIS
 * Interactive Scrollytelling & Graphic Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
});

/**
 * Initialize IntersectionObserver to reveal elements on scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optionally unobserve if single reveal is desired
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.reveal-on-scroll, .story-section, .hero-content'
    );

    animatedElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Observer for embedded chart iframe to trigger animation on scroll reveal
    const chartSection = document.getElementById('section-mortality-chart');
    if (chartSection) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = chartSection.querySelector('.chart-iframe');
                    if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage('animateChart', '*');
                    }
                }
            });
        }, { threshold: 0.2 });
        chartObserver.observe(chartSection);
    }
}

/**
 * Utility function to embed an HTML file or raw HTML code into a specific slot
 * @param {string} slotId - The ID of the target container element
 * @param {string} content - HTML string or URL to iframe
 * @param {boolean} isUrl - True if content is a file path/URL to load in iframe
 */
window.embedIllustration = function(slotId, content, isUrl = false) {
    const container = document.getElementById(slotId);
    if (!container) return;

    if (isUrl) {
        container.innerHTML = `
            <iframe 
                src="${content}" 
                title="Interactive Snakebite Data Visualization"
                style="width: 100%; height: 600px; border: none; border-radius: 8px;"
                loading="lazy">
            </iframe>
        `;
    } else {
        container.innerHTML = content;
    }
};
