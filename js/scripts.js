/*!
    Title: Dev Portfolio Template
    Version: 1.2.2
    Last Change: 03/25/2020
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    function applyTheme(theme) {
        var isDark = theme === 'dark';
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        // Mirror on body for any future selectors/debugging
        try {
            if (isDark) document.body && document.body.setAttribute('data-theme', 'dark');
            else document.body && document.body.removeAttribute('data-theme');
        } catch (e) {}

        var btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.setAttribute('aria-pressed', String(isDark));
            btn.setAttribute('title', isDark ? '밝게' : '야간');
            var $icon = btn.querySelector('i.fa');
            if ($icon) {
                $icon.classList.remove('fa-moon-o', 'fa-sun-o');
                $icon.classList.add(isDark ? 'fa-sun-o' : 'fa-moon-o');
            }
        }
    }

    (function initTheme() {
        var saved = null;
        try {
            saved = localStorage.getItem('theme');
        } catch (e) {}
        if (saved !== 'dark' && saved !== 'light') {
            var prefersDark = false;
            try {
                prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            } catch (e) {}
            saved = prefersDark ? 'dark' : 'light';
        }
        applyTheme(saved === 'dark' ? 'dark' : 'light');
    })();

    $(document).on('click', '#theme-toggle', function () {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        var next = isDark ? 'light' : 'dark';
        applyTheme(next);
        try {
            localStorage.setItem('theme', next === 'dark' ? 'dark' : 'light');
        } catch (e) {}
        this.blur();
    });

    function yForElement(el) {
        if (!el) {
            return 0;
        }
        var margin = parseFloat(getComputedStyle(el).scrollMarginTop);
        if (isNaN(margin)) {
            margin = 0;
        }
        return el.getBoundingClientRect().top + window.pageYOffset - margin;
    }

    // Navigate to section when nav is clicked (instant jump; scroll-margin respected)
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var target = heading && document.querySelector(heading);
        if (!target) {
            return;
        }
        window.scrollTo(0, Math.max(0, yForElement(target)));

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        window.scrollTo(0, 0);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var $next = $('#lead').next();
        if (!$next.length) {
            return;
        }
        var el = $next.get(0);
        window.scrollTo(0, Math.max(0, yForElement(el)));
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

})(jQuery);
