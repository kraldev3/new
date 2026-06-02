/* ==========================================================================
   Shaderzone — i18n (language switcher)
   Default language: English. Persists choice to localStorage.
   - Navigation links are translated by their href (no markup change needed).
   - Any element with [data-i18n] gets its text/HTML replaced by the key value.
   ========================================================================== */

(function () {
    'use strict';

    var LANGS = ['en', 'tr', 'ru', 'de', 'fr', 'es'];
    var LABEL = { en: 'EN', tr: 'TR', ru: 'RU', de: 'DE', fr: 'FR', es: 'ES' };

    /* Map nav/footer hrefs to dictionary keys so links translate automatically */
    var NAV_MAP = {
        '/': 'nav.home',
        'features': 'nav.features',
        'compare': 'nav.compare',
        'install': 'nav.install',
        'documentation': 'nav.docs',
        'about': 'nav.about',
        'contact': 'nav.contact'
    };

    var I18N = {
        en: {
            'nav.home': 'Home', 'nav.features': 'Features', 'nav.compare': 'Compare',
            'nav.install': 'Install', 'nav.docs': 'Docs', 'nav.about': 'About', 'nav.contact': 'Contact',

            'footer.tagline': 'Cinematic, realistic and performant visuals for Roblox. Since 2024.',
            'footer.product': 'Product', 'footer.resources': 'Resources', 'footer.company': 'Company',
            'footer.faq': 'FAQ', 'footer.download': 'Download', 'footer.documentation': 'Documentation',
            'footer.presets': 'Presets', 'footer.troubleshooting': 'Troubleshooting', 'footer.changelog': 'Changelog',
            'footer.privacy': 'Privacy', 'footer.terms': 'Terms',
            'footer.rights': 'All rights reserved.', 'footer.disclaimer': 'Not affiliated with Roblox Corporation.',
            'legal.privacy': 'Privacy Policy', 'legal.terms': 'Terms of Service',

            'hero.badge': 'Version 2.4 · Optimized for Roblox',
            'hero.title': 'Experience Roblox<br>in <span class="accent">cinematic</span> quality.',
            'hero.subtitle': 'Shaderzone brings RTX-level realistic lighting, reflections and color depth to Roblox. Without modifying any game, it elevates your visual experience to a whole new level.',
            'hero.btnDownload': 'Download Free', 'hero.btnCompare': 'See Before / After',
            'hero.meta1': 'Windows 10/11 support', 'hero.meta2': 'One-click install', 'hero.meta3': 'Roblox ToS friendly',
            'hero.live': 'Real-time render',

            'trust.label': 'Trusted by 200,000+ players worldwide',
            'trust.1': 'Roblox Studio compatible', 'trust.2': 'Instant activation',
            'trust.3': 'Safe install', 'trust.4': '24/7 support',

            'inside.eyebrow': "What's inside",
            'inside.title': 'Three reasons to <span class="gradient-text">install today</span>',
            'inside.subtitle': 'Everything Shaderzone offers — at a glance. Click any card to dive deeper.',
            'inside.c1t': 'Cinematic features', 'inside.c1d': 'Path-traced lighting, RTX-style reflections, HDR tone mapping and volumetric fog. All in one place.', 'inside.c1l': 'Explore features',
            'inside.c2t': 'See the difference', 'inside.c2d': 'Side-by-side before / after slider. Same scene, same hardware — only the renderer changes.', 'inside.c2l': 'View comparison',
            'inside.c3t': 'Three-minute install', 'inside.c3d': 'No terminal, no admin rights. Download, click install, launch Roblox — Shaderzone takes over.', 'inside.c3l': 'Install guide',

            'stats.users': 'Active users', 'stats.rating': 'User rating', 'stats.presets': 'Preset packs', 'stats.uptime': 'Uptime',

            'faq.eyebrow': 'Frequently asked questions',
            'faq.title': 'Got questions? We have answers',
            'faq.subtitle': "The most common things players ask. Can't find your answer? Reach out through the contact page.",
            'faq.q1': 'Is Shaderzone really free?',
            'faq.a1': 'Yes — the core version is 100% free. Shaderzone Pro, which includes advanced cinematic presets and additional lighting modules, is an optional upgrade.',
            'faq.q2': 'Can my Roblox account get banned?',
            'faq.a2': "No. Shaderzone does not touch Roblox files or its memory. It only applies a post-process pass to the GPU's render output, which is a method that aligns with the Roblox Terms of Service.",
            'faq.q3': 'Will I lose FPS?',
            'faq.a3': 'Depending on your hardware, expect a 5–15% FPS variance. The "Performance" preset is designed for lower-end machines and adds visual polish with virtually no measurable FPS impact.',
            'faq.q4': 'Which GPUs are supported?',
            'faq.a4': 'NVIDIA GTX 750 and newer, AMD RX 460 and newer, plus most modern Intel integrated graphics (HD 4000+). DirectX 11 is required.',
            'faq.q5': 'Is there Mac or mobile support?',
            'faq.a5': "Currently Windows-only. A macOS build is on our roadmap for 2026. Mobile platforms (iOS/Android) are not supported because Roblox's rendering pipeline on mobile is closed.",
            'faq.q6': 'How do I uninstall it?',
            'faq.a6': 'Open Windows "Apps & features", select Shaderzone, and click Uninstall. All files are removed cleanly — no leftover folders or registry traces.'
        },

        tr: {
            'nav.home': 'Anasayfa', 'nav.features': 'Özellikler', 'nav.compare': 'Karşılaştır',
            'nav.install': 'Kurulum', 'nav.docs': 'Belgeler', 'nav.about': 'Hakkımızda', 'nav.contact': 'İletişim',

            'footer.tagline': "Roblox için sinematik, gerçekçi ve performanslı görseller. 2024'ten beri.",
            'footer.product': 'Ürün', 'footer.resources': 'Kaynaklar', 'footer.company': 'Şirket',
            'footer.faq': 'SSS', 'footer.download': 'İndir', 'footer.documentation': 'Dokümantasyon',
            'footer.presets': 'Hazır Ayarlar', 'footer.troubleshooting': 'Sorun Giderme', 'footer.changelog': 'Değişiklikler',
            'footer.privacy': 'Gizlilik', 'footer.terms': 'Şartlar',
            'footer.rights': 'Tüm hakları saklıdır.', 'footer.disclaimer': 'Roblox Corporation ile bağlantılı değildir.',
            'legal.privacy': 'Gizlilik Politikası', 'legal.terms': 'Kullanım Şartları',

            'hero.badge': 'Sürüm 2.4 · Roblox için optimize',
            'hero.title': "Roblox'u <span class=\"accent\">sinematik</span><br>kalitede yaşa.",
            'hero.subtitle': "Shaderzone, Roblox'a RTX seviyesinde gerçekçi ışıklandırma, yansıma ve renk derinliği getirir. Hiçbir oyunu değiştirmeden görsel deneyimini bambaşka bir seviyeye taşır.",
            'hero.btnDownload': 'Ücretsiz İndir', 'hero.btnCompare': 'Önce / Sonra Gör',
            'hero.meta1': 'Windows 10/11 desteği', 'hero.meta2': 'Tek tıkla kurulum', 'hero.meta3': 'Roblox ToS uyumlu',
            'hero.live': 'Gerçek zamanlı render',

            'trust.label': 'Dünya çapında 200.000+ oyuncu güveniyor',
            'trust.1': 'Roblox Studio uyumlu', 'trust.2': 'Anında aktivasyon',
            'trust.3': 'Güvenli kurulum', 'trust.4': '7/24 destek',

            'inside.eyebrow': 'İçeriğinde ne var',
            'inside.title': 'Bugün kurmak için <span class="gradient-text">üç neden</span>',
            'inside.subtitle': "Shaderzone'un sunduğu her şey — bir bakışta. Detay için bir karta tıkla.",
            'inside.c1t': 'Sinematik özellikler', 'inside.c1d': 'Path-traced ışıklandırma, RTX yansımalar, HDR ton eşleme ve volumetrik sis. Hepsi tek yerde.', 'inside.c1l': 'Özellikleri keşfet',
            'inside.c2t': 'Farkı gör', 'inside.c2d': 'Yan yana önce / sonra kaydırıcısı. Aynı sahne, aynı donanım — sadece render değişir.', 'inside.c2l': 'Karşılaştırmayı gör',
            'inside.c3t': 'Üç dakikada kurulum', 'inside.c3d': "Terminal yok, yönetici izni yok. İndir, kur'a tıkla, Roblox'u başlat — gerisini Shaderzone halleder.", 'inside.c3l': 'Kurulum rehberi',

            'stats.users': 'Aktif kullanıcı', 'stats.rating': 'Kullanıcı puanı', 'stats.presets': 'Hazır paket', 'stats.uptime': 'Çalışma süresi',

            'faq.eyebrow': 'Sıkça sorulan sorular',
            'faq.title': 'Soruların mı var? Cevaplarımız hazır',
            'faq.subtitle': 'Oyuncuların en çok sorduğu sorular. Cevabını bulamadıysan iletişim sayfasından bize ulaş.',
            'faq.q1': 'Shaderzone gerçekten ücretsiz mi?',
            'faq.a1': 'Evet — temel sürüm %100 ücretsiz. Gelişmiş sinematik presetler ve ek ışıklandırma modülleri içeren Shaderzone Pro ise opsiyonel bir yükseltmedir.',
            'faq.q2': 'Roblox hesabım banlanabilir mi?',
            'faq.a2': "Hayır. Shaderzone, Roblox dosyalarına veya belleğine dokunmaz. Yalnızca GPU'nun render çıktısına bir post-process katmanı uygular; bu yöntem Roblox Hizmet Şartları'na uygundur.",
            'faq.q3': 'FPS kaybeder miyim?',
            'faq.a3': 'Donanımına bağlı olarak %5–15 arası bir FPS değişimi olabilir. "Performance" preseti düşük donanımlar için tasarlanmıştır ve neredeyse ölçülemez FPS etkisiyle görsel iyileştirme katar.',
            'faq.q4': "Hangi GPU'lar destekleniyor?",
            'faq.a4': 'NVIDIA GTX 750 ve üzeri, AMD RX 460 ve üzeri, ayrıca çoğu modern Intel tümleşik grafik (HD 4000+). DirectX 11 gereklidir.',
            'faq.q5': 'Mac veya mobil desteği var mı?',
            'faq.a5': "Şu an yalnızca Windows. macOS sürümü 2026 yol haritamızda. Mobil platformlar (iOS/Android), Roblox'un mobil render hattı kapalı olduğu için desteklenmiyor.",
            'faq.q6': 'Nasıl kaldırırım?',
            'faq.a6': 'Windows "Uygulamalar ve özellikler" bölümünü aç, Shaderzone\'u seç ve Kaldır\'a tıkla. Tüm dosyalar temizce silinir — artık klasör veya kayıt defteri izi kalmaz.'
        },

        ru: {
            'nav.home': 'Главная', 'nav.features': 'Возможности', 'nav.compare': 'Сравнить',
            'nav.install': 'Установка', 'nav.docs': 'Документация', 'nav.about': 'О нас', 'nav.contact': 'Контакты',

            'footer.tagline': 'Кинематографичная, реалистичная и производительная графика для Roblox. С 2024 года.',
            'footer.product': 'Продукт', 'footer.resources': 'Ресурсы', 'footer.company': 'Компания',
            'footer.faq': 'ЧаВо', 'footer.download': 'Скачать', 'footer.documentation': 'Документация',
            'footer.presets': 'Пресеты', 'footer.troubleshooting': 'Устранение неполадок', 'footer.changelog': 'Изменения',
            'footer.privacy': 'Конфиденциальность', 'footer.terms': 'Условия',
            'footer.rights': 'Все права защищены.', 'footer.disclaimer': 'Не связано с Roblox Corporation.',
            'legal.privacy': 'Политика конфиденциальности', 'legal.terms': 'Условия использования',

            'hero.badge': 'Версия 2.4 · Оптимизировано для Roblox',
            'hero.title': 'Откройте Roblox<br>в <span class="accent">кинематографичном</span> качестве.',
            'hero.subtitle': 'Shaderzone привносит в Roblox реалистичное освещение уровня RTX, отражения и глубину цвета. Не изменяя ни одной игры, он поднимает визуальный опыт на новый уровень.',
            'hero.btnDownload': 'Скачать бесплатно', 'hero.btnCompare': 'До / После',
            'hero.meta1': 'Поддержка Windows 10/11', 'hero.meta2': 'Установка в один клик', 'hero.meta3': 'Соответствует правилам Roblox',
            'hero.live': 'Рендеринг в реальном времени',

            'trust.label': 'Нам доверяют более 200 000 игроков по всему миру',
            'trust.1': 'Совместимо с Roblox Studio', 'trust.2': 'Мгновенная активация',
            'trust.3': 'Безопасная установка', 'trust.4': 'Поддержка 24/7',

            'inside.eyebrow': 'Что внутри',
            'inside.title': 'Три причины <span class="gradient-text">установить сегодня</span>',
            'inside.subtitle': 'Всё, что предлагает Shaderzone — с первого взгляда. Нажмите на карточку, чтобы узнать больше.',
            'inside.c1t': 'Кинематографичные функции', 'inside.c1d': 'Трассировка пути, отражения уровня RTX, HDR-тонирование и объёмный туман. Всё в одном месте.', 'inside.c1l': 'Изучить функции',
            'inside.c2t': 'Увидеть разницу', 'inside.c2d': 'Слайдер «до/после». Та же сцена, то же железо — меняется только рендер.', 'inside.c2l': 'Смотреть сравнение',
            'inside.c3t': 'Установка за три минуты', 'inside.c3d': 'Без терминала и прав администратора. Скачайте, нажмите «Установить», запустите Roblox — Shaderzone сделает остальное.', 'inside.c3l': 'Руководство по установке',

            'stats.users': 'Активных пользователей', 'stats.rating': 'Оценка пользователей', 'stats.presets': 'Наборы пресетов', 'stats.uptime': 'Аптайм',

            'faq.eyebrow': 'Часто задаваемые вопросы',
            'faq.title': 'Есть вопросы? У нас есть ответы',
            'faq.subtitle': 'Самые частые вопросы игроков. Не нашли ответ? Напишите нам через страницу контактов.',
            'faq.q1': 'Shaderzone действительно бесплатен?',
            'faq.a1': 'Да — базовая версия на 100% бесплатна. Shaderzone Pro с продвинутыми кинопресетами и дополнительными модулями освещения — опциональное обновление.',
            'faq.q2': 'Могут ли забанить мой аккаунт Roblox?',
            'faq.a2': 'Нет. Shaderzone не трогает файлы Roblox и его память. Он лишь применяет постобработку к выводу GPU, что соответствует правилам использования Roblox.',
            'faq.q3': 'Потеряю ли я FPS?',
            'faq.a3': 'В зависимости от железа возможно отклонение FPS на 5–15%. Пресет «Performance» создан для слабых ПК и добавляет визуальный лоск практически без потери FPS.',
            'faq.q4': 'Какие видеокарты поддерживаются?',
            'faq.a4': 'NVIDIA GTX 750 и новее, AMD RX 460 и новее, а также большинство современных встроенных Intel (HD 4000+). Требуется DirectX 11.',
            'faq.q5': 'Есть ли поддержка Mac или мобильных?',
            'faq.a5': 'Пока только Windows. Версия для macOS запланирована на 2026 год. Мобильные платформы (iOS/Android) не поддерживаются, так как конвейер рендеринга Roblox на мобильных закрыт.',
            'faq.q6': 'Как удалить?',
            'faq.a6': 'Откройте «Приложения и возможности» в Windows, выберите Shaderzone и нажмите «Удалить». Все файлы удаляются полностью — без остаточных папок и записей реестра.'
        },

        de: {
            'nav.home': 'Start', 'nav.features': 'Funktionen', 'nav.compare': 'Vergleich',
            'nav.install': 'Installation', 'nav.docs': 'Doku', 'nav.about': 'Über uns', 'nav.contact': 'Kontakt',

            'footer.tagline': 'Cinematische, realistische und performante Grafik für Roblox. Seit 2024.',
            'footer.product': 'Produkt', 'footer.resources': 'Ressourcen', 'footer.company': 'Unternehmen',
            'footer.faq': 'FAQ', 'footer.download': 'Download', 'footer.documentation': 'Dokumentation',
            'footer.presets': 'Presets', 'footer.troubleshooting': 'Fehlerbehebung', 'footer.changelog': 'Änderungen',
            'footer.privacy': 'Datenschutz', 'footer.terms': 'Bedingungen',
            'footer.rights': 'Alle Rechte vorbehalten.', 'footer.disclaimer': 'Nicht mit der Roblox Corporation verbunden.',
            'legal.privacy': 'Datenschutzrichtlinie', 'legal.terms': 'Nutzungsbedingungen',

            'hero.badge': 'Version 2.4 · Optimiert für Roblox',
            'hero.title': 'Erlebe Roblox in<br><span class="accent">cinematischer</span> Qualität.',
            'hero.subtitle': 'Shaderzone bringt realistische Beleuchtung auf RTX-Niveau, Reflexionen und Farbtiefe nach Roblox. Ohne ein Spiel zu verändern, hebt es dein visuelles Erlebnis auf ein neues Level.',
            'hero.btnDownload': 'Kostenlos laden', 'hero.btnCompare': 'Vorher / Nachher',
            'hero.meta1': 'Windows 10/11 Support', 'hero.meta2': 'Installation mit einem Klick', 'hero.meta3': 'Roblox-ToS-konform',
            'hero.live': 'Echtzeit-Rendering',

            'trust.label': 'Vertraut von über 200.000 Spielern weltweit',
            'trust.1': 'Roblox-Studio-kompatibel', 'trust.2': 'Sofortige Aktivierung',
            'trust.3': 'Sichere Installation', 'trust.4': '24/7-Support',

            'inside.eyebrow': 'Was drin ist',
            'inside.title': 'Drei Gründe, <span class="gradient-text">heute zu installieren</span>',
            'inside.subtitle': 'Alles, was Shaderzone bietet — auf einen Blick. Klicke auf eine Karte für mehr.',
            'inside.c1t': 'Cinematische Funktionen', 'inside.c1d': 'Path-Tracing-Beleuchtung, RTX-Reflexionen, HDR-Tonemapping und volumetrischer Nebel. Alles an einem Ort.', 'inside.c1l': 'Funktionen entdecken',
            'inside.c2t': 'Sieh den Unterschied', 'inside.c2d': 'Vorher-/Nachher-Schieberegler. Gleiche Szene, gleiche Hardware — nur der Renderer ändert sich.', 'inside.c2l': 'Vergleich ansehen',
            'inside.c3t': 'Installation in drei Minuten', 'inside.c3d': 'Kein Terminal, keine Adminrechte. Herunterladen, installieren, Roblox starten — Shaderzone übernimmt.', 'inside.c3l': 'Installationsanleitung',

            'stats.users': 'Aktive Nutzer', 'stats.rating': 'Nutzerbewertung', 'stats.presets': 'Preset-Pakete', 'stats.uptime': 'Verfügbarkeit',

            'faq.eyebrow': 'Häufige Fragen',
            'faq.title': 'Fragen? Wir haben Antworten',
            'faq.subtitle': 'Die häufigsten Fragen der Spieler. Keine Antwort gefunden? Kontaktiere uns über die Kontaktseite.',
            'faq.q1': 'Ist Shaderzone wirklich kostenlos?',
            'faq.a1': 'Ja — die Basisversion ist 100% kostenlos. Shaderzone Pro mit erweiterten cinematischen Presets und zusätzlichen Lichtmodulen ist ein optionales Upgrade.',
            'faq.q2': 'Kann mein Roblox-Konto gesperrt werden?',
            'faq.a2': 'Nein. Shaderzone berührt weder Roblox-Dateien noch dessen Speicher. Es wendet nur einen Post-Processing-Pass auf die GPU-Ausgabe an — eine Methode, die den Roblox-Nutzungsbedingungen entspricht.',
            'faq.q3': 'Verliere ich FPS?',
            'faq.a3': 'Je nach Hardware ist eine FPS-Schwankung von 5–15% zu erwarten. Das "Performance"-Preset ist für schwächere Rechner gedacht und bietet optische Verbesserungen ohne nennenswerten FPS-Verlust.',
            'faq.q4': 'Welche GPUs werden unterstützt?',
            'faq.a4': 'NVIDIA GTX 750 und neuer, AMD RX 460 und neuer sowie die meisten modernen Intel-Onboard-Grafiken (HD 4000+). DirectX 11 ist erforderlich.',
            'faq.q5': 'Gibt es Mac- oder Mobil-Support?',
            'faq.a5': "Derzeit nur Windows. Eine macOS-Version ist für 2026 geplant. Mobile Plattformen (iOS/Android) werden nicht unterstützt, da Roblox' Render-Pipeline dort geschlossen ist.",
            'faq.q6': 'Wie deinstalliere ich es?',
            'faq.a6': 'Öffne in Windows "Apps & Features", wähle Shaderzone und klicke auf Deinstallieren. Alle Dateien werden sauber entfernt — keine Restordner oder Registry-Spuren.'
        },

        fr: {
            'nav.home': 'Accueil', 'nav.features': 'Fonctions', 'nav.compare': 'Comparer',
            'nav.install': 'Installer', 'nav.docs': 'Docs', 'nav.about': 'À propos', 'nav.contact': 'Contact',

            'footer.tagline': 'Des visuels cinématiques, réalistes et performants pour Roblox. Depuis 2024.',
            'footer.product': 'Produit', 'footer.resources': 'Ressources', 'footer.company': 'Entreprise',
            'footer.faq': 'FAQ', 'footer.download': 'Télécharger', 'footer.documentation': 'Documentation',
            'footer.presets': 'Préréglages', 'footer.troubleshooting': 'Dépannage', 'footer.changelog': 'Journal',
            'footer.privacy': 'Confidentialité', 'footer.terms': 'Conditions',
            'footer.rights': 'Tous droits réservés.', 'footer.disclaimer': 'Non affilié à Roblox Corporation.',
            'legal.privacy': 'Politique de confidentialité', 'legal.terms': "Conditions d'utilisation",

            'hero.badge': 'Version 2.4 · Optimisé pour Roblox',
            'hero.title': 'Vivez Roblox en<br>qualité <span class="accent">cinématique</span>.',
            'hero.subtitle': "Shaderzone apporte à Roblox un éclairage réaliste de niveau RTX, des reflets et une profondeur de couleur. Sans modifier aucun jeu, il élève votre expérience visuelle à un tout autre niveau.",
            'hero.btnDownload': 'Télécharger', 'hero.btnCompare': 'Avant / Après',
            'hero.meta1': 'Support Windows 10/11', 'hero.meta2': 'Installation en un clic', 'hero.meta3': 'Conforme aux CGU de Roblox',
            'hero.live': 'Rendu en temps réel',

            'trust.label': 'Approuvé par plus de 200 000 joueurs dans le monde',
            'trust.1': 'Compatible Roblox Studio', 'trust.2': 'Activation instantanée',
            'trust.3': 'Installation sûre', 'trust.4': 'Support 24/7',

            'inside.eyebrow': "Ce qu'il contient",
            'inside.title': "Trois raisons de <span class=\"gradient-text\">l'installer aujourd'hui</span>",
            'inside.subtitle': "Tout ce que Shaderzone offre — en un coup d'œil. Cliquez sur une carte pour en savoir plus.",
            'inside.c1t': 'Fonctions cinématiques', 'inside.c1d': 'Éclairage path-traced, reflets RTX, mappage tonal HDR et brouillard volumétrique. Tout en un.', 'inside.c1l': 'Explorer les fonctions',
            'inside.c2t': 'Voir la différence', 'inside.c2d': 'Curseur avant / après. Même scène, même matériel — seul le rendu change.', 'inside.c2l': 'Voir la comparaison',
            'inside.c3t': 'Installation en trois minutes', 'inside.c3d': "Pas de terminal, pas de droits admin. Téléchargez, installez, lancez Roblox — Shaderzone s'occupe du reste.", 'inside.c3l': "Guide d'installation",

            'stats.users': 'Utilisateurs actifs', 'stats.rating': 'Note des utilisateurs', 'stats.presets': 'Packs de préréglages', 'stats.uptime': 'Disponibilité',

            'faq.eyebrow': 'Questions fréquentes',
            'faq.title': 'Des questions ? Nous avons les réponses',
            'faq.subtitle': "Les questions les plus fréquentes des joueurs. Vous ne trouvez pas ? Contactez-nous via la page contact.",
            'faq.q1': 'Shaderzone est-il vraiment gratuit ?',
            'faq.a1': "Oui — la version de base est 100% gratuite. Shaderzone Pro, avec des préréglages cinématiques avancés et des modules d'éclairage supplémentaires, est une option payante.",
            'faq.q2': 'Mon compte Roblox peut-il être banni ?',
            'faq.a2': "Non. Shaderzone ne touche ni aux fichiers de Roblox ni à sa mémoire. Il applique seulement un post-traitement à la sortie du GPU, une méthode conforme aux CGU de Roblox.",
            'faq.q3': 'Vais-je perdre des FPS ?',
            'faq.a3': 'Selon votre matériel, attendez-vous à une variation de 5 à 15% des FPS. Le préréglage "Performance" est conçu pour les machines modestes et améliore le rendu sans impact mesurable sur les FPS.',
            'faq.q4': 'Quels GPU sont pris en charge ?',
            'faq.a4': 'NVIDIA GTX 750 et plus récent, AMD RX 460 et plus récent, ainsi que la plupart des GPU intégrés Intel modernes (HD 4000+). DirectX 11 requis.',
            'faq.q5': 'Y a-t-il un support Mac ou mobile ?',
            'faq.a5': "Windows uniquement pour l'instant. Une version macOS est prévue pour 2026. Les plateformes mobiles (iOS/Android) ne sont pas prises en charge car le pipeline de rendu de Roblox y est fermé.",
            'faq.q6': 'Comment le désinstaller ?',
            'faq.a6': 'Ouvrez "Applications et fonctionnalités" dans Windows, sélectionnez Shaderzone et cliquez sur Désinstaller. Tous les fichiers sont supprimés proprement — aucun dossier ni trace dans le registre.'
        },

        es: {
            'nav.home': 'Inicio', 'nav.features': 'Funciones', 'nav.compare': 'Comparar',
            'nav.install': 'Instalar', 'nav.docs': 'Docs', 'nav.about': 'Acerca', 'nav.contact': 'Contacto',

            'footer.tagline': 'Visuales cinematográficos, realistas y eficientes para Roblox. Desde 2024.',
            'footer.product': 'Producto', 'footer.resources': 'Recursos', 'footer.company': 'Empresa',
            'footer.faq': 'FAQ', 'footer.download': 'Descargar', 'footer.documentation': 'Documentación',
            'footer.presets': 'Ajustes', 'footer.troubleshooting': 'Solución de problemas', 'footer.changelog': 'Cambios',
            'footer.privacy': 'Privacidad', 'footer.terms': 'Términos',
            'footer.rights': 'Todos los derechos reservados.', 'footer.disclaimer': 'No afiliado a Roblox Corporation.',
            'legal.privacy': 'Política de privacidad', 'legal.terms': 'Términos de servicio',

            'hero.badge': 'Versión 2.4 · Optimizado para Roblox',
            'hero.title': 'Vive Roblox en<br>calidad <span class="accent">cinematográfica</span>.',
            'hero.subtitle': 'Shaderzone lleva a Roblox iluminación realista de nivel RTX, reflejos y profundidad de color. Sin modificar ningún juego, eleva tu experiencia visual a un nivel completamente nuevo.',
            'hero.btnDownload': 'Descargar gratis', 'hero.btnCompare': 'Antes / Después',
            'hero.meta1': 'Compatible con Windows 10/11', 'hero.meta2': 'Instalación con un clic', 'hero.meta3': 'Compatible con los ToS de Roblox',
            'hero.live': 'Renderizado en tiempo real',

            'trust.label': 'Con la confianza de más de 200.000 jugadores en todo el mundo',
            'trust.1': 'Compatible con Roblox Studio', 'trust.2': 'Activación instantánea',
            'trust.3': 'Instalación segura', 'trust.4': 'Soporte 24/7',

            'inside.eyebrow': 'Qué incluye',
            'inside.title': 'Tres razones para <span class="gradient-text">instalarlo hoy</span>',
            'inside.subtitle': 'Todo lo que ofrece Shaderzone — de un vistazo. Haz clic en una tarjeta para ver más.',
            'inside.c1t': 'Funciones cinematográficas', 'inside.c1d': 'Iluminación path-traced, reflejos RTX, mapeo tonal HDR y niebla volumétrica. Todo en un lugar.', 'inside.c1l': 'Explorar funciones',
            'inside.c2t': 'Ve la diferencia', 'inside.c2d': 'Control deslizante antes / después. Misma escena, mismo hardware — solo cambia el renderizado.', 'inside.c2l': 'Ver comparación',
            'inside.c3t': 'Instalación en tres minutos', 'inside.c3d': 'Sin terminal ni permisos de administrador. Descarga, instala, abre Roblox — Shaderzone hace el resto.', 'inside.c3l': 'Guía de instalación',

            'stats.users': 'Usuarios activos', 'stats.rating': 'Valoración', 'stats.presets': 'Paquetes de ajustes', 'stats.uptime': 'Tiempo activo',

            'faq.eyebrow': 'Preguntas frecuentes',
            'faq.title': '¿Preguntas? Tenemos respuestas',
            'faq.subtitle': 'Las preguntas más comunes de los jugadores. ¿No encuentras tu respuesta? Escríbenos en la página de contacto.',
            'faq.q1': '¿Shaderzone es realmente gratis?',
            'faq.a1': 'Sí — la versión básica es 100% gratis. Shaderzone Pro, con ajustes cinematográficos avanzados y módulos de iluminación adicionales, es una mejora opcional.',
            'faq.q2': '¿Pueden banear mi cuenta de Roblox?',
            'faq.a2': 'No. Shaderzone no toca los archivos de Roblox ni su memoria. Solo aplica un posprocesado a la salida de la GPU, un método que cumple con los Términos de Servicio de Roblox.',
            'faq.q3': '¿Perderé FPS?',
            'faq.a3': 'Según tu hardware, espera una variación del 5–15% en los FPS. El ajuste "Performance" está pensado para equipos modestos y mejora el aspecto sin un impacto medible en los FPS.',
            'faq.q4': '¿Qué GPU son compatibles?',
            'faq.a4': 'NVIDIA GTX 750 o más nuevas, AMD RX 460 o más nuevas, y la mayoría de gráficos integrados Intel modernos (HD 4000+). Se requiere DirectX 11.',
            'faq.q5': '¿Hay soporte para Mac o móvil?',
            'faq.a5': 'Por ahora solo Windows. Una versión para macOS está en nuestra hoja de ruta para 2026. Las plataformas móviles (iOS/Android) no son compatibles porque el pipeline de renderizado de Roblox en móvil es cerrado.',
            'faq.q6': '¿Cómo lo desinstalo?',
            'faq.a6': 'Abre "Aplicaciones y características" en Windows, selecciona Shaderzone y haz clic en Desinstalar. Todos los archivos se eliminan por completo — sin carpetas ni rastros en el registro.'
        }
    };

    function applyLang(lang) {
        if (LANGS.indexOf(lang) === -1) lang = 'en';
        var dict = I18N[lang] || I18N.en;
        var fallback = I18N.en;

        /* nav + footer links by href */
        document.querySelectorAll('.nav a, .footer-col a, .legal-links a').forEach(function (a) {
            var key = NAV_MAP[a.getAttribute('href')];
            if (key && dict[key]) a.textContent = dict[key];
        });

        /* elements explicitly marked */
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var val = dict[key];
            if (val == null) val = fallback[key];
            if (val == null) return;
            if (val.indexOf('<') !== -1) el.innerHTML = val;
            else el.textContent = val;
        });

        document.documentElement.lang = lang;

        var cur = document.querySelector('.lang-current');
        if (cur) cur.textContent = LABEL[lang] || 'EN';
        document.querySelectorAll('.lang-option').forEach(function (o) {
            o.classList.toggle('active', o.getAttribute('data-lang') === lang);
        });

        try { localStorage.setItem('sz-lang', lang); } catch (e) {}
    }

    function init() {
        var saved = 'en';
        try { saved = localStorage.getItem('sz-lang') || 'en'; } catch (e) {}

        var sw = document.querySelector('.lang-switch');
        if (sw) {
            var btn = sw.querySelector('.lang-btn');
            if (btn) {
                btn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    sw.classList.toggle('open');
                });
            }
            document.addEventListener('click', function () { sw.classList.remove('open'); });
            sw.querySelectorAll('.lang-option').forEach(function (o) {
                o.addEventListener('click', function () {
                    applyLang(o.getAttribute('data-lang'));
                    sw.classList.remove('open');
                });
            });
        }

        applyLang(saved);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
