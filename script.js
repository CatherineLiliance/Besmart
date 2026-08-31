// Shrink header on scroll
const header = document.getElementById('main-header');
window.addEventListener('scroll', function () {
    header.classList.toggle('shrink', window.scrollY > 50);
});

// Fade in the footer social icons when they scroll into view
document.addEventListener('DOMContentLoaded', function () {
    const homeSci = document.querySelector('.footer .home-sci');
    if (homeSci) {
        const footerObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                homeSci.classList.toggle('show', entry.isIntersecting);
            });
        }, { threshold: 0.3 });
        footerObserver.observe(homeSci);
    }
});

// Sidebar: jump to a section, highlight the matching button,
// and keep the active button in sync while scrolling.
const sidebar = document.querySelector('.custom-sidebar');
const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
const navTargets = navButtons
    .map(btn => document.querySelector(btn.getAttribute('data-target')))
    .filter(Boolean);

function setActiveButton(button) {
    navButtons.forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');
}

navButtons.forEach(button => {
    button.addEventListener('click', function () {
        setActiveButton(this);

        const target = document.querySelector(this.getAttribute('data-target'));
        if (!target) return;

        const offset = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    });
});

window.addEventListener('scroll', () => {
    let current = null;
    navTargets.forEach((target, index) => {
        const rect = target.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
            current = navButtons[index];
        }
    });
    setActiveButton(current);
});

// Quick menu: click the toggle button to expand/collapse the section list
const sidebarToggle = document.querySelector('.sidebar-toggle');
if (sidebar && sidebarToggle) {
    sidebarToggle.addEventListener('click', function () {
        const isOpen = sidebar.classList.toggle('open');
        sidebarToggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', function (event) {
        if (!sidebar.contains(event.target)) {
            sidebar.classList.remove('open');
            sidebarToggle.setAttribute('aria-expanded', 'false');
        }
    });

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Live search: filter link buttons across every section
const searchInput = document.getElementById('link-search');
const searchClear = document.getElementById('search-clear');
const searchEmpty = document.getElementById('search-empty');
const searchEmptyTerm = document.getElementById('search-empty-term');

if (searchInput) {
    const allSections = Array.from(document.querySelectorAll('main .section'));

    function normalize(text) {
        return text.trim().toLowerCase();
    }

    function filterLinks() {
        const term = normalize(searchInput.value);
        searchClear.hidden = term.length === 0;

        let anyVisible = false;

        allSections.forEach(section => {
            const titleMatches = normalize(section.querySelector('h2')?.textContent || '').includes(term);
            let sectionHasVisibleLink = false;

            section.querySelectorAll('.box').forEach(box => {
                let boxHasVisibleLink = false;
                box.querySelectorAll('.btn').forEach(link => {
                    const matches = term === '' || titleMatches || normalize(link.textContent).includes(term);
                    link.classList.toggle('is-hidden', !matches);
                    if (matches) boxHasVisibleLink = true;
                });
                box.classList.toggle('is-hidden', !boxHasVisibleLink);
                if (boxHasVisibleLink) sectionHasVisibleLink = true;
            });

            section.querySelectorAll(':scope > .btn-container > .btn').forEach(link => {
                const matches = term === '' || titleMatches || normalize(link.textContent).includes(term);
                link.classList.toggle('is-hidden', !matches);
                if (matches) sectionHasVisibleLink = true;
            });

            const show = term === '' || sectionHasVisibleLink;
            section.classList.toggle('is-hidden', !show);
            if (show) anyVisible = true;
        });

        searchEmpty.hidden = anyVisible || term === '';
        if (searchEmptyTerm) searchEmptyTerm.textContent = searchInput.value.trim();
    }

    searchInput.addEventListener('input', filterLinks);
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        filterLinks();
        searchInput.focus();
    });
}
