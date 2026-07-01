document.addEventListener('DOMContentLoaded', () => {
  // ===== Локализация =====
  const translations = {
    ru: {
      nav_about: 'О себе',
      nav_skills: 'Навыки',
      nav_projects: 'Проекты',
      nav_contact: 'Контакты',
      hero_name: 'Александр',
      hero_cta: 'Связаться',
      about_title: 'О себе',
      about_edu: 'Студент колледжа по направлению «Компьютерная инженерия». Изучаю фронтенд-разработку, углубляюсь в современные технологии и принципы построения интерфейсов.',
      about_hobby: 'В свободное время увлекаюсь видеоиграми (Valorant, Minecraft) и слушаю lo‑fi / drum’n’bass. Это помогает переключиться и поддерживать творческий тонус.',
      about_belief: 'Верю, что хороший код — чистый, поддерживаемый и ориентированный на пользователя. Сейчас активно изучаю React и анимации.',
      stat_years: 'года обучения',
      stat_projects: 'учебных проектов',
      stat_hours: 'часов практики',
      skills_title: 'Навыки',
      projects_title: 'Проекты',
      proj_main_title: 'Скоро здесь появятся мои проекты',
      proj_main_desc: 'Я активно работаю над несколькими идеями. Пока портфолио пополняется — следите за обновлениями на GitHub.',
      proj_tag_process: 'В процессе',
      proj_tag_planned: 'Планируется',
      proj_dev_title: 'В разработке',
      proj_dev_desc: 'Пара учебных проектов, которые скоро увидит свет.',
      proj_tag_soon: 'Скоро',
      proj_ideas_title: 'Идеи',
      proj_ideas_desc: 'Экспериментирую с React, API и игровыми механиками.',
      contact_title: 'Контакты',
      discord_server: 'Discord сервер',
      reply_time: 'Обычно отвечаю в течение 1–2 часов в будние дни.',
      footer_text: '© 2026 ALEX.DEV — создаю удобные интерфейсы',
      // Фразы для печати
      typewriter_1: 'Студент • Фронтенд-разработчик',
      typewriter_2: 'Пишу чистый код',
      typewriter_3: 'Люблю технологии и игры'
    },
    en: {
      nav_about: 'About',
      nav_skills: 'Skills',
      nav_projects: 'Projects',
      nav_contact: 'Contact',
      hero_name: 'Alexander',
      hero_cta: 'Get in touch',
      about_title: 'About me',
      about_edu: 'College student majoring in Computer Engineering. I study frontend development, diving into modern technologies and interface building principles.',
      about_hobby: 'In my free time I enjoy video games (Valorant, Minecraft) and listen to lo‑fi / drum’n’bass. It helps me switch gears and stay creative.',
      about_belief: 'I believe good code is clean, maintainable, and user-focused. Currently learning React and animations.',
      stat_years: 'years of study',
      stat_projects: 'academic projects',
      stat_hours: 'hours of practice',
      skills_title: 'Skills',
      projects_title: 'Projects',
      proj_main_title: 'My projects will appear here soon',
      proj_main_desc: 'I am actively working on several ideas. While the portfolio is being filled, follow updates on GitHub.',
      proj_tag_process: 'In progress',
      proj_tag_planned: 'Planned',
      proj_dev_title: 'In development',
      proj_dev_desc: 'A couple of study projects that will see the light soon.',
      proj_tag_soon: 'Soon',
      proj_ideas_title: 'Ideas',
      proj_ideas_desc: 'Experimenting with React, APIs and game mechanics.',
      contact_title: 'Contacts',
      discord_server: 'Discord server',
      reply_time: 'I usually respond within 1–2 hours on weekdays.',
      footer_text: '© 2026 ALEX.DEV — crafting user-friendly interfaces',
      typewriter_1: 'Student • Frontend Developer',
      typewriter_2: 'Writing clean code',
      typewriter_3: 'Passionate about tech & games'
    }
  };

  let currentLang = localStorage.getItem('lang') || 'ru';
  let currentTheme = localStorage.getItem('theme') || 'light';

  // Применить тему
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.getElementById('themeToggle').innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      document.body.classList.remove('dark');
      document.getElementById('themeToggle').innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  // Применить язык
  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    // Обновить текст кнопки языка
    document.getElementById('langToggle').textContent = lang.toUpperCase();
    // Перезапустить печатание
    if (window._typewriterTimeout) clearTimeout(window._typewriterTimeout);
    startTypewriter();
  }

  // Переключение темы
  document.getElementById('themeToggle').addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
  });

  // Переключение языка
  document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    applyLang(currentLang);
  });

  // Инициализация
  applyTheme(currentTheme);
  applyLang(currentLang);

  // ===== Печатающийся текст =====
  function startTypewriter() {
    const typewriterEl = document.getElementById('typewriter');
    if (!typewriterEl) return;
    const phrases = [
      translations[currentLang].typewriter_1,
      translations[currentLang].typewriter_2,
      translations[currentLang].typewriter_3
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      window._typewriterTimeout = setTimeout(type, typeSpeed);
    }

    typewriterEl.textContent = ''; // сброс
    charIndex = 0;
    isDeleting = false;
    phraseIndex = 0;
    if (window._typewriterTimeout) clearTimeout(window._typewriterTimeout);
    type();
  }
  startTypewriter();

  // ===== Появление секций при скролле =====
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const skillBars = entry.target.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          if (width) {
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          }
        });
      }
    });
  }, { threshold: 0.2 });

  fadeEls.forEach(el => observer.observe(el));
});