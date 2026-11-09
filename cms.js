/**
 * Shukdev Dhakal Website - Content Management System (CMS) & Auth Engine
 * Handles client-side persistent storage for documents, custom pages, and admin auth.
 */

(function (window) {
    const STORAGE_DOCS_KEY = 'cms_documents_v1';
    const STORAGE_PAGES_KEY = 'cms_pages_v1';
    const STORAGE_AUTH_KEY = 'cms_auth_session';
    const STORAGE_ADMIN_CREDS = 'cms_admin_creds';

    // Default Seed Documents
    const DEFAULT_DOCUMENTS = [
        {
            id: 'doc-1',
            title: 'SEE Class 10 Compulsory Science - Complete Formula Sheet & Notes',
            category: 'Science',
            grade: 'Class 10',
            description: 'Comprehensive physics formulas, chemistry equations, and biology diagrams for SEE examination revision.',
            fileName: 'SEE_Science_Formula_Sheet.pdf',
            fileType: 'application/pdf',
            fileSize: '1.8 MB',
            externalUrl: 'https://play.google.com/store/apps/details?id=com.bank.damodardhakal&hl=ne',
            uploadDate: '2026-05-01'
        },
        {
            id: 'doc-2',
            title: 'SEE Class 10 Compulsory Mathematics - Model Question Set 2026',
            category: 'Mathematics',
            grade: 'Class 10',
            description: 'Updated model question papers with step-by-step solutions following the new CDC Nepal curriculum specification grid.',
            fileName: 'SEE_Compulsory_Maths_ModelSet.pdf',
            fileType: 'application/pdf',
            fileSize: '2.4 MB',
            externalUrl: '',
            uploadDate: '2026-05-04'
        },
        {
            id: 'doc-3',
            title: 'Nepali Byakaran (Grammar) & Nibandha Rachana Guide',
            category: 'Nepali',
            grade: 'Class 9 & 10',
            description: 'Essential rules for Pad Sangati, Kaal-Bhab, Karak-Bibhakti, and model high-scoring essays in Nepali.',
            fileName: 'Nepali_Byakaran_Guide.pdf',
            fileType: 'application/pdf',
            fileSize: '1.2 MB',
            externalUrl: '',
            uploadDate: '2026-05-08'
        },
        {
            id: 'doc-4',
            title: 'Kavresthali Secondary School Academic Calendar 2026/2083',
            category: 'Notice',
            grade: 'All Classes',
            description: 'Annual academic schedule including unit tests, terminal examination dates, holidays, and extracurricular activities.',
            fileName: 'School_Academic_Calendar_2026.pdf',
            fileType: 'application/pdf',
            fileSize: '850 KB',
            externalUrl: '',
            uploadDate: '2026-05-10'
        },
        {
            id: 'doc-5',
            title: 'English Compulsory - Creative Writing & Reading Comprehension Guide',
            category: 'English',
            grade: 'Class 10',
            description: 'Samples of job application, book review, dialogue writing, news reports, and unseen passage techniques.',
            fileName: 'SEE_English_Writing_Guide.pdf',
            fileType: 'application/pdf',
            fileSize: '1.5 MB',
            externalUrl: '',
            uploadDate: '2026-05-12'
        }
    ];

    // Default Seed Pages
    const DEFAULT_PAGES = [
        {
            id: 'page-1',
            slug: 'welcome-educational-portal',
            title: "Welcome to Shukdev Dhakal's Educational Resource Portal",
            subtitle: "A digital learning and resource platform for students, parents, and educators",
            category: 'General',
            author: 'Shukdev Dhakal',
            publishedDate: '2026-05-01',
            content: `
                <p>Welcome to our dedicated online educational platform. As a passionate educator at Kavresthali Secondary School, my mission has always been to make high-quality learning resources easily accessible to every student.</p>
                
                <h3>What You Can Find Here</h3>
                <p>This portal is regularly updated with helpful learning materials including:</p>
                <ul>
                    <li><strong>Chapter-wise Study Notes:</strong> Clear and concise summaries for Science, Mathematics, and Nepali.</li>
                    <li><strong>Exam Model Question Sets:</strong> Practice question papers tailored to the latest National Examination Board (NEB/CDC) guidelines.</li>
                    <li><strong>Educational Android App:</strong> Interactive quizzes, progress tracking, and study guides through our official mobile application.</li>
                    <li><strong>School Notices & Schedules:</strong> Official announcements and academic dates.</li>
                </ul>

                <h3>Our Teaching Philosophy</h3>
                <p>Education is not just about memorizing facts; it is about building deep understanding, critical thinking, and the confidence to question and explore. We emphasize interactive problem solving and practical applications in all our lessons.</p>

                <blockquote>
                    "The art of teaching is the art of assisting discovery." — Mark Van Doren
                </blockquote>

                <h3>Get Involved</h3>
                <p>Feel free to explore the documents section to download study materials. If you have questions or suggestions, please visit the <a href="contact-me.html">Contact Me</a> page.</p>
            `
        },
        {
            id: 'page-2',
            slug: 'see-examination-preparation-tips',
            title: "SEE Examination Preparation: Strategic Guide for Students",
            subtitle: "Actionable advice and timetable recommendations to excel in your board examinations",
            category: 'Guidance',
            author: 'Shukdev Dhakal',
            publishedDate: '2026-05-05',
            content: `
                <p>The Secondary Education Examination (SEE) represents an important milestone in every student's academic journey. Proper planning and consistent revision are the twin pillars of achieving outstanding grades.</p>

                <h3>1. Master the Specification Grid (CDC)</h3>
                <p>Do not study blindly. Always refer to the official specification grid to understand which topics carry high marks. Focus on topics with heavy weightage first before moving to smaller chapters.</p>

                <h3>2. Practice Writing with a Timer</h3>
                <p>Many students know the answers but run out of time during exams. Practice solving 3-hour model question sets under timed conditions once every weekend.</p>

                <h3>3. Daily Habit of Reviewing Formulas & Vocabulary</h3>
                <p>Keep a separate pocket notebook for:</p>
                <ul>
                    <li>Physics formulas and unit definitions.</li>
                    <li>Chemical reactions, common acids, bases, and salts.</li>
                    <li>Nepali vyakaran rules and English grammar structures.</li>
                </ul>

                <h3>4. Download Model Question Sets</h3>
                <p>Make sure to download the model sets from our <a href="documents.html">Documents Section</a> and solve each set independently before checking solutions.</p>
            `
        }
    ];

    // Helper: LocalStorage wrappers
    function getStoredData(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return fallback;
            return JSON.parse(raw);
        } catch (e) {
            console.error('Error reading localStorage for key: ' + key, e);
            return fallback;
        }
    }

    function setStoredData(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage for key: ' + key, e);
            return false;
        }
    }

    // Auth helpers
    function getAdminCredentials() {
        const stored = getStoredData(STORAGE_ADMIN_CREDS, null);
        if (!stored) {
            return { username: 'admin', password: 'admin123' };
        }
        return stored;
    }

    // Public CMS API
    const CMS = {
        init: function () {
            if (!localStorage.getItem(STORAGE_DOCS_KEY)) {
                setStoredData(STORAGE_DOCS_KEY, DEFAULT_DOCUMENTS);
            }
            if (!localStorage.getItem(STORAGE_PAGES_KEY)) {
                setStoredData(STORAGE_PAGES_KEY, DEFAULT_PAGES);
            }
            if (!localStorage.getItem(STORAGE_ADMIN_CREDS)) {
                setStoredData(STORAGE_ADMIN_CREDS, { username: 'admin', password: 'admin123' });
            }
            this.syncNavState();
        },

        // --- AUTHENTICATION ---
        login: function (username, password) {
            const creds = getAdminCredentials();
            if (
                username.trim().toLowerCase() === creds.username.toLowerCase() &&
                password.trim() === creds.password
            ) {
                const session = {
                    username: creds.username,
                    role: 'Administrator',
                    loginTime: new Date().toISOString()
                };
                sessionStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(session));
                localStorage.setItem('admin_logged_in', 'true');
                return { success: true, message: 'Logged in successfully' };
            }
            return { success: false, message: 'Invalid username or password. Default is admin / admin123' };
        },

        logout: function () {
            sessionStorage.removeItem(STORAGE_AUTH_KEY);
            localStorage.removeItem('admin_logged_in');
            return true;
        },

        isAuthenticated: function () {
            const session = sessionStorage.getItem(STORAGE_AUTH_KEY);
            const flag = localStorage.getItem('admin_logged_in');
            return (session !== null) || (flag === 'true');
        },

        getCurrentUser: function () {
            try {
                const session = sessionStorage.getItem(STORAGE_AUTH_KEY);
                if (session) return JSON.parse(session);
            } catch (e) {}
            if (this.isAuthenticated()) {
                return { username: 'admin', role: 'Administrator' };
            }
            return null;
        },

        changePassword: function (oldPassword, newPassword) {
            const creds = getAdminCredentials();
            if (oldPassword !== creds.password) {
                return { success: false, message: 'Current password is incorrect.' };
            }
            if (!newPassword || newPassword.length < 4) {
                return { success: false, message: 'New password must be at least 4 characters.' };
            }
            creds.password = newPassword;
            setStoredData(STORAGE_ADMIN_CREDS, creds);
            return { success: true, message: 'Password updated successfully!' };
        },

        requireAuth: function (redirectPath) {
            if (!this.isAuthenticated()) {
                const target = redirectPath || 'login.html';
                window.location.href = target;
            }
        },

        syncNavState: function () {
            document.addEventListener('DOMContentLoaded', () => {
                const loginLinks = document.querySelectorAll('.nav-login-btn');
                if (loginLinks.length > 0) {
                    if (this.isAuthenticated()) {
                        loginLinks.forEach(link => {
                            link.innerHTML = "<i class='bx bx-shield-quarter'></i> Dashboard";
                            link.setAttribute('href', 'admin.html');
                            link.classList.add('logged-in');
                            link.setAttribute('title', 'Admin Dashboard');
                        });
                    } else {
                        loginLinks.forEach(link => {
                            link.innerHTML = "<i class='bx bx-user'></i> Login";
                            link.setAttribute('href', 'login.html');
                            link.classList.remove('logged-in');
                        });
                    }
                }
            });
        },

        // --- DOCUMENTS API ---
        getDocuments: function () {
            const docs = getStoredData(STORAGE_DOCS_KEY, DEFAULT_DOCUMENTS);
            return Array.isArray(docs) ? docs : DEFAULT_DOCUMENTS;
        },

        getDocumentById: function (id) {
            const docs = this.getDocuments();
            return docs.find(d => d.id === id) || null;
        },

        addDocument: function (docData) {
            const docs = this.getDocuments();
            const newDoc = {
                id: 'doc-' + Date.now(),
                title: docData.title || 'Untitled Document',
                category: docData.category || 'General',
                grade: docData.grade || 'All Classes',
                description: docData.description || '',
                fileName: docData.fileName || 'document.pdf',
                fileType: docData.fileType || 'application/pdf',
                fileSize: docData.fileSize || 'Unknown size',
                fileData: docData.fileData || '', // Base64 data URL if uploaded
                externalUrl: docData.externalUrl || '',
                uploadDate: docData.uploadDate || new Date().toISOString().split('T')[0]
            };
            docs.unshift(newDoc);
            setStoredData(STORAGE_DOCS_KEY, docs);
            return newDoc;
        },

        deleteDocument: function (id) {
            let docs = this.getDocuments();
            docs = docs.filter(d => d.id !== id);
            setStoredData(STORAGE_DOCS_KEY, docs);
            return true;
        },

        // --- PAGES API ---
        getPages: function () {
            const pages = getStoredData(STORAGE_PAGES_KEY, DEFAULT_PAGES);
            return Array.isArray(pages) ? pages : DEFAULT_PAGES;
        },

        getPageBySlugOrId: function (identifier) {
            if (!identifier) return null;
            const pages = this.getPages();
            return pages.find(p => p.slug === identifier || p.id === identifier) || null;
        },

        savePage: function (pageData) {
            const pages = this.getPages();
            const slug = (pageData.slug || pageData.title || 'custom-page')
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

            if (pageData.id) {
                // Update existing
                const index = pages.findIndex(p => p.id === pageData.id);
                if (index !== -1) {
                    pages[index] = {
                        ...pages[index],
                        title: pageData.title,
                        slug: slug,
                        subtitle: pageData.subtitle || '',
                        category: pageData.category || 'General',
                        author: pageData.author || 'Shukdev Dhakal',
                        publishedDate: pageData.publishedDate || pages[index].publishedDate,
                        content: pageData.content || ''
                    };
                    setStoredData(STORAGE_PAGES_KEY, pages);
                    return pages[index];
                }
            }

            // Create new
            const newPage = {
                id: 'page-' + Date.now(),
                slug: slug,
                title: pageData.title || 'Untitled Page',
                subtitle: pageData.subtitle || '',
                category: pageData.category || 'General',
                author: pageData.author || 'Shukdev Dhakal',
                publishedDate: new Date().toISOString().split('T')[0],
                content: pageData.content || ''
            };
            pages.unshift(newPage);
            setStoredData(STORAGE_PAGES_KEY, pages);
            return newPage;
        },

        deletePage: function (id) {
            let pages = this.getPages();
            pages = pages.filter(p => p.id !== id);
            setStoredData(STORAGE_PAGES_KEY, pages);
            return true;
        },

        // --- BACKUP & EXPORT ---
        exportData: function () {
            const backup = {
                version: '1.0',
                exportDate: new Date().toISOString(),
                documents: this.getDocuments(),
                pages: this.getPages()
            };
            const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `shukdev-dhakal-website-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        },

        importData: function (jsonString) {
            try {
                const data = JSON.parse(jsonString);
                if (data.documents && Array.isArray(data.documents)) {
                    setStoredData(STORAGE_DOCS_KEY, data.documents);
                }
                if (data.pages && Array.isArray(data.pages)) {
                    setStoredData(STORAGE_PAGES_KEY, data.pages);
                }
                return { success: true, message: 'Data imported successfully!' };
            } catch (e) {
                return { success: false, message: 'Invalid JSON file: ' + e.message };
            }
        },

        resetToDefault: function () {
            setStoredData(STORAGE_DOCS_KEY, DEFAULT_DOCUMENTS);
            setStoredData(STORAGE_PAGES_KEY, DEFAULT_PAGES);
            return true;
        },

        // Generate complete static HTML for any page to download
        generateStaticHTML: function (page) {
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="style.css">
    <title>${page.title} - Shukdev Dhakal</title>
</head>
<body>
    <header class="header">
        <a href="index.html#home" class="logo">Shukdev dhakal</a>
        <i class='bx bx-menu' id="menu-icon"></i>
        <nav class="navbar">
            <a href="index.html#home">Home</a>
            <a href="about.html">About</a>
            <a href="documents.html">Documents</a>
            <a href="contact-me.html">Contact Me</a>
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="login.html" class="nav-login-btn"><i class='bx bx-user'></i> Login</a>
        </nav>
    </header>

    <section class="content-section">
        <div class="page-meta-header" style="margin-bottom: 2rem;">
            <span class="category-badge" style="background:#007F73;color:#fff;padding:0.4rem 1.2rem;border-radius:2rem;font-size:1.3rem;font-weight:600;">${page.category || 'Article'}</span>
            <span style="font-size:1.4rem;color:#666;margin-left:1.5rem;"><i class='bx bx-calendar'></i> ${page.publishedDate || ''}</span>
            <span style="font-size:1.4rem;color:#666;margin-left:1.5rem;"><i class='bx bx-user'></i> By ${page.author || 'Shukdev Dhakal'}</span>
        </div>
        <h1 class="heading" style="text-align:left;font-size:3.8rem;margin-bottom:1rem;">${page.title}</h1>
        ${page.subtitle ? `<h3 style="color:#555;font-size:2rem;margin-bottom:2.5rem;font-weight:400;">${page.subtitle}</h3>` : ''}
        <div class="custom-page-body" style="font-size:1.6rem;line-height:1.9;">
            ${page.content}
        </div>
        <div style="margin-top: 4rem;">
            <a href="index.html" class="btn"><i class='bx bx-arrow-back'></i> Back to Home</a>
            <a href="documents.html" class="btn" style="margin-left: 1rem;"><i class='bx bx-file'></i> View Documents</a>
        </div>
    </section>

    <footer class="footer">
        <div class="footer-links">
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="documents.html">Documents</a>
            <a href="contact-me.html">Contact</a>
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="privacy-policy-daure.html">Privacy - Daure</a>
            <a href="terms.html">Terms & Agreement</a>
            <a href="login.html">Admin Login</a>
        </div>
        <div class="social">
            <a href="https://www.facebook.com/shukdev.dhakal.3" target="_blank"><i class='bx bxl-facebook'></i></a>
            <a href="https://instagram.com/shukdevdhakal007" target="_blank"><i class='bx bxl-instagram'></i></a>
            <a href="https://play.google.com/store/apps/details?id=com.bank.damodardhakal&hl=ne" target="_blank"><i class='bx bxl-play-store'></i></a>
        </div>
        <p class="copyright">© Damodar Dhakal - All Rights Reserved</p>
    </footer>
    <script src="script.js"></script>
    <script src="cms.js"></script>
</body>
</html>`;
        }
    };

    CMS.init();
    window.CMS = CMS;
})(window);
