// All site content lives here. Edit text in this file; the page layout lives in app.js and styles.css.
// To add a blog post: write posts/<slug>.md, then add an entry under `entries` and its slug to a list in `lists`.

window.SITE = {
  name: 'Shashank Mishra',
  links: {
    linkedin: 'https://www.linkedin.com/in/ishashankmishra',
    github: 'https://github.com/shashankcornell',
    email: '' // TODO: pick the public contact email; the email icon stays hidden while this is empty
  },
  photo: '', // e.g. 'assets/photo.jpg'; the About view shows a black square until this is set

  // Home page highlights: set to { label: 'Highlights', items: ['nulp', ...] } to show a row of links; null shows nothing.
  home: null,

  about: 'I work where public systems meet the software that runs them. For most of my career that has meant building products for governments: the National Urban Learning Platform, which helps city officials across India share what works, and TULIP, which connects young graduates with internships in urban local bodies. Alongside that I have helped start institutions, from Samavesh and Anticarbon to advocacy work with the Saujanya Foundation, because good tools rarely survive without people and organisations committed to keeping them alive. I am interested in the quiet machinery of the state: how a document becomes legitimate, how a department decides where its people go, how electricity reaches a village and who pays for it. I like problems that sit between disciplines, where an engineer, a policy analyst and a field officer each see only part of the picture. Before policy I trained as an engineer, and I still think in systems, constraints and feedback loops. I am currently at Cornell University, studying how state capacity can be measured and built. This site collects what I have made and what I have written, in the hope that some of it outlasts the moment it was made for.',

  lists: {
    build: [
      { title: 'Products', items: ['nulp', 'tulip', 'samavesh-portal', 'job-agent', 'state-capacity-dashboard'] },
      { title: 'Institutions', items: ['samavesh', 'anticarbon', 'data-for-good', 'buniyaad', 'saujanya'] }
    ],
    write: [
      { title: 'Society', items: ['electricity-sector', 'protestors-on-a-bicycle', 'legitimate-government-document', 'ai-rights', 'accelerating-climate-finance', 'hr-allocation', 'delhi-homelessness'] },
      { title: 'Technology', items: ['cfd-paper', 'venturi-cavitation', 'robowars', 'inverted-pendulum'] }
    ]
  },

  // Every item in the lists. Products open as case studies; everything else opens as a post.
  // A post reads posts/<slug>.md; with `draft: true` and no file it shows a short "being written" note.
  entries: {
    // ---------- I build / Products (case studies) ----------
    'nulp': {
      title: 'National Urban Learning Platform',
      // Full case study page; opening NULP from the site goes here instead of the overlay below.
      page: 'case-studies/nulp/index.html',
      tagline: 'A shared learning and knowledge platform for urban local bodies across India.',
      meta: [['Role', 'Senior Associate, Product and Data'], ['Years', '2021–24'], ['Team', '9 people'], ['Platform', 'Web']],
      heroCaption: 'NULP: screenshot to come',
      story: [
        ['Problem', 'City officials across India had no common place to learn from each other. The National Institute of Urban Affairs set out to build one national platform where urban local bodies could share what works.'],
        ['Approach', 'I functionally led a 9-person team (front-end, back-end and DevOps, UI/UX and data) that adapted open-source infrastructure into NULP within 6 months, then grew it with a monitoring-and-evaluation framework and A/B tests on onboarding and engagement.'],
        ['Outcome', 'Registrations grew from 450+ to 106,000+ across 434 cities in 18 months. Redesigned discussion forums and enforcement workflows cut harmful-conduct incidents by 76% and raised constructive participation by 140%.']
      ],
      metrics: [['106,000+', 'registered users, up from 450+ in 18 months'], ['434', 'cities on the platform'], ['−76%', 'harmful-conduct incidents after the forum redesign']],
      stack: 'Open-source learning-platform infrastructure, adapted for NULP · M&E framework · A/B testing · Figma'
    },
    'tulip': {
      title: 'TULIP',
      // Full case study page; opening TULIP from the site goes here instead of the overlay below.
      page: 'case-studies/tulip/index.html',
      tagline: 'The Urban Learning Internship Program, matching graduates with internships in cities.',
      meta: [['Role', 'Associate, Product'], ['Years', '2020–21'], ['Organisation', 'Ministry of Housing and Urban Affairs'], ['Platform', 'Web']],
      heroCaption: 'TULIP: screenshot to come',
      story: [
        ['Problem', 'TULIP had few cities posting internships and few graduates applying: 1,800+ posted internships and 250+ applications when I joined.'],
        ['Approach', 'I designed an M&E framework, built an outreach toolkit distributed centrally to 4,500+ city governments, and redesigned the platform onboarding in Figma.'],
        ['Outcome', 'Applications grew from 250+ to 7,200+ in 8 months, posted internships grew from 1,800+ to 93,000+ within 3 months, and placements rose 300% within 6 months.']
      ],
      metrics: [['93,000+', 'internships posted, up from 1,800+'], ['7,200+', 'applications, up from 250+'], ['300%', 'rise in placements within 6 months']],
      stack: 'Figma · outreach toolkit for 4,500+ city governments · M&E framework'
    },
    'samavesh-portal': {
      title: 'Samavesh Portal',
      // Full case study page; opening it from the site goes here instead of the overlay below.
      page: 'case-studies/samavesh-portal/index.html',
      tagline: "The public website and editorial system for Samavesh, with an AI pipeline that turns recorded policy discourses into text.",
      meta: [['Role', 'Designer and builder'], ['Year', '2026'], ['Organisation', 'Samavesh'], ['Scope', 'Public site and admin CMS']],
      heroCaption: 'Samavesh Portal homepage: screenshot to come',
      story: [
        ['Problem', "Samavesh has spent years testing policy ideas in moderated public discourses and publishing the strongest in a journal. The record of that work lived in a spreadsheet of past sessions and in scattered posts. Readers had no way to browse it by topic or by speaker, and the team could not publish without someone technical in the loop."],
        ['For readers', 'A public site organised the way a policy reader thinks: by sector, by format and by person. Discourses, articles, essays, podcasts and op-eds sit side by side. A community directory groups the team, advisory board, fellows, presenters and discussants, each with a profile page that lists their contributions. The Gazette presents each journal edition with its editorial board, and one search box looks across content, people and topics.'],
        ['For editors', 'An admin CMS lets the team run the site without a developer. Editors write in a rich-text editor, credit each person as author, presenter, discussant or editor, tag topics, and move pieces from draft to published to archived. They can add new content formats, edit the Think, Meet, Act, Careers and policy pages, post news with social embeds, and crop images on upload. When a record is deleted, its images are removed too, unless another page still uses them.'],
        ['Ordering', 'The homepage should feel varied and current. A custom ordering rule guarantees at least three pieces of every format, fills the remaining slots with the newest work, then shuffles the grid so each visit mixes formats. When the editors want a particular front page, they switch to manual mode and pin exactly what goes where, along with a featured story.'],
        ['From talk to text', "Samavesh records every discourse, and a recording is only useful once someone can read it. Today, recordings uploaded through a form land in Google Drive, where a script runs OpenAI's Whisper speech-to-text model and turns each one into a transcript. In the next phase, editors will upload recordings straight into the CMS. Whisper will transcribe the conversation as it was spoken, in a mix of Hindi and English, and a large language model will turn the transcript into a structured discourse paper, saved as a draft. The model only writes the first draft. An editor still checks it against the recording, edits it and decides whether it gets published."],
        ['Trust', "A site that hosts public debate has to be hard to deface. Logins are rate-limited to ten attempts per fifteen minutes and passwords are stored hashed. Creating, editing and deleting content needs a signed-in session, inputs are validated, published text is sanitised against an allowlist of safe tags, and uploads are limited to images under 5 MB."],
        ['Outcome', "I built it between April and June 2026, with AI coding assistance. A one-time import script brought in 88 past discourses from August 2020 to February 2022, creating presenter profiles and topic tags as it went. The data model grew from a simple publishing schema into one that also covers the journal, news, configurable pages and the homepage layout, across four migrations."]
      ],
      metrics: [['88', 'past discourses imported, 2020 to 2022'], ['60+', 'API endpoints behind the site and CMS'], ['17', 'data models, built up over 4 schema migrations']],
      stack: 'Next.js 14 · TypeScript · PostgreSQL / Prisma · NextAuth · Tiptap · Cloudinary · Tailwind CSS · OpenAI Whisper · Google Drive'
    },
    'job-agent': {
      title: 'Job Agent',
      // Full case study page; opening it from the site goes here instead of the overlay below.
      page: 'case-studies/job-agent/index.html',
      tagline: 'A personal pipeline that finds and scores job postings every morning and drafts fact-checked applications on request.',
      meta: [['Role', 'Builder (personal project)'], ['Year', '2026'], ['Team', 'Solo'], ['Platform', 'Runs locally']],
      heroCaption: 'Job Agent dashboard: screenshot to come',
      story: [
        ['Problem', 'Searching across many employers by hand is slow, and tailored applications are easy to get wrong.'],
        ['Approach', 'It checks the career sites of 125 organisations daily, filters postings with plain rules before any model call, then scores them in tiers with Claude Haiku and Sonnet. Separate agents analyse the job, score fit, tailor a CV and draft a letter, and an adversarial fact-checker blocks any claim not in a reviewed facts file.'],
        ['Outcome', 'It has stored 2,193 postings and quick-scored 1,520, runs on a daily schedule with a hard cap on model calls, and shows everything in a local dashboard.']
      ],
      metrics: [['125', 'organisations checked daily'], ['2,193', 'postings stored'], ['1,520', 'postings quick-scored']],
      stack: 'Python · SQLite · Claude Haiku and Sonnet · launchd scheduling · headless Chrome · Chrome extension'
    },
    'state-capacity-dashboard': {
      title: 'State Capacity data Dashboard',
      // Full case study page; opening it from the site goes here instead of the overlay below.
      page: 'case-studies/state-capacity/index.html',
      tagline: 'A dashboard on vacant posts in urban departments across Indian states.',
      meta: [['Role', 'Senior Associate, Product and Data'], ['Organisation', 'National Institute of Urban Affairs'], ['Coverage', '28 states'], ['Tool', 'Looker Studio']],
      heroCaption: 'Dashboard: screenshot to come',
      story: [
        ['Problem', 'There was no clear national picture of vacant posts in government.'],
        ['Approach', 'I designed and ran a national survey across 28 states on vacant government posts and built a Looker Studio dashboard on the results.'],
        ['Outcome', "The findings were reported to the Prime Minister's Office."]
      ],
      metrics: [['28', 'states surveyed'], ['1', 'national survey designed and run'], ['PMO', 'where the findings were reported']],
      stack: 'Survey design · Google Looker Studio'
    },

    // ---------- I build / Institutions ----------
    // Designed page on the Samavesh concept (built from the 2020 concept note and session guidelines).
    'samavesh': { title: 'Samavesh', date: 'Since February 2020', page: 'institutions/samavesh/index.html' },
    'anticarbon': { title: 'Anticarbon', page: 'institutions/anticarbon/index.html' },
    'data-for-good': { title: 'Data for Good in Policy at Cornell' },
    'buniyaad': { title: 'Buniyaad', draft: true },
    'saujanya': { title: 'Saujanya Foundation Advocacy' },

    // ---------- I write / Society ----------
    // Designed essay page (The Electricity Buzzar, ISPP Policy Review, 2020); opening it from the site goes there.
    'electricity-sector': { title: 'Electricity sector of India', page: 'writing/electricity-sector/index.html' },
    'protestors-on-a-bicycle': { title: 'The Protester on a Bicycle', date: '2026', page: 'writing/protester-on-a-bicycle/index.html' },
    'delhi-homelessness': { title: 'Redefining Delhi\'s Rental Market to Address Homelessness', date: '2020', page: 'writing/delhi-homelessness/index.html' },
    'legitimate-government-document': { title: 'Evaluating Large Language Models for Drafting Indian Government Documents', date: 'Ongoing', page: 'writing/legitimate-government-document/index.html' },
    'ai-rights': { title: 'Should AI have rights', page: 'writing/ai-rights/index.html' },
    'accelerating-climate-finance': { title: 'Accelerating climate finance', date: '2023', page: 'writing/accelerating-climate-finance/index.html' },
    'hr-allocation': { title: 'Human resource allocation for capacity building reforms', page: 'writing/hr-allocation/index.html' },

    // ---------- I write / Technology ----------
    'cfd-paper': { title: 'Heat Rising in a Triangle', date: '2016', page: 'writing/cfd-paper/index.html' },
    'venturi-cavitation': { title: 'Washing Ginger with Bubbles', date: '2017', page: 'writing/venturi-cavitation/index.html' },
    'robowars': { title: 'Design of a Six-Wheeled Wedge Robot', date: '2013', page: 'writing/robowars/index.html' },
    'inverted-pendulum': { title: 'Modeling the Inverted Pendulum and the Unicycle', date: '2016', page: 'writing/inverted-pendulum/index.html' }
  },

  resumes: {
    product: {
      title: 'Product resume',
      updated: '22 October 2026',
      pdf: '', // e.g. 'assets/Shashank_Mishra_Product.pdf'; without it, Download PDF opens a printable page
      lede: 'I build public-sector products, from national learning platforms for Indian cities to data and AI tools, and I measure whether they work.',
      sections: [
        { h: 'Work', items: [
          { key: 'samavesh', role: 'Co-Founder and Director', org: 'Samavesh', dates: '2020–', desc: 'Built and led an 18-member team, ran 3 national policy summits, and raised INR 3,000,000+ from a government grant and individual donors. Designed and shipped the full-stack editorial platform: a public site and an admin CMS with role-based access across 30+ API endpoints.', links: ['samavesh-portal', 'samavesh'] },
          { key: 'niua', role: 'Senior Associate, Product and Data', org: 'National Institute of Urban Affairs, Government of India', dates: '2021–24', desc: 'Functionally led a 9-person team that adapted open-source infrastructure into the National Urban Learning Platform within 6 months. Grew registrations from 450+ to 106,000+ across 434 cities in 18 months with an M&E framework and A/B tests, and cut harmful-conduct incidents by 76% with a forum and enforcement redesign.', links: ['nulp', 'state-capacity-dashboard'] },
          { key: 'mohua', role: 'Associate, Product (TULIP)', org: 'Ministry of Housing and Urban Affairs, Government of India', dates: '2020–21', desc: 'Redesigned platform onboarding in Figma, contributing to growth in posted internships from 1,800+ to 93,000+ within 3 months. Grew applications from 250+ to 7,200+ in 8 months with an outreach toolkit for 4,500+ city governments.', links: ['tulip'] },
          { key: 'ctpi', role: 'Research Associate, Cryptocurrency (part-time)', org: 'Cornell Tech Policy Institute, Cornell University', dates: '2025–26', desc: 'Built an analysis-ready dataset and 1,002-variable codebook from ~26,000 survey responses across 25 countries, and supported econometric modeling of adoption drivers.', links: [] }
        ] },
        { h: 'Projects', items: [
          { key: 'jobagent', role: 'Job Agent', org: 'Personal project', dates: '2026', desc: 'An LLM pipeline that checks 125 organisations daily, scores postings in tiers with Claude Haiku and Sonnet, and drafts applications checked by an adversarial fact-checker.', links: ['job-agent'] },
          { key: 'wdi', role: 'wdi-inequality', org: 'Open-source Python package', dates: '2026', desc: 'Predicts the Gini index for 145 countries from World Development Indicators; Random Forest reaches RMSE 3.71 and R² 0.79 on held-out data.', links: [{ where: 'GitHub /', title: 'wdi-inequality', href: 'https://github.com/shashankcornell/wdi-inequality' }] },
          { key: 'wbpipe', role: 'World Bank indicators pipeline', org: 'Open-source data pipeline', dates: '2026', desc: 'World Bank API to a Databricks PySpark country-year panel, SQL summary tables and a four-view Tableau Public dashboard.', links: [{ where: 'GitHub /', title: 'Pipeline repository', href: 'https://github.com/shashankcornell/urban-mobility-databricks-pipeline' }] }
        ] },
        { h: 'Education', items: [
          { key: 'cornell', role: 'Master of Public Administration (Economics and Finance), Minor in Data Science', org: 'Cornell University', dates: '2024–26', desc: '$64,000 merit scholarship. Founding member, Data for Good in Policy at Cornell.', links: ['data-for-good'] },
          { key: 'ispp', role: 'Post Graduate Program in Public Policy, Design, and Management', org: 'Indian School of Public Policy', dates: '2019–20', desc: 'INR 500,000 scholarship and the Best Alumni Award.', links: [] },
          { key: 'ipu', role: 'Bachelor of Technology, Mechanical Engineering', org: 'Indraprastha University', dates: '2013–17', desc: 'President of the College Theatre Society: wrote and directed 2 plays and acted in 4.', links: [] }
        ] }
      ]
    },
    policy: {
      title: 'Public policy resume',
      updated: '22 October 2026',
      pdf: '',
      lede: 'I work on how governments build capacity: urban programs, climate finance, public procurement, and the evidence behind them.',
      sections: [
        { h: 'Work', items: [
          { key: 'niua', role: 'Senior Associate, Product and Data', org: 'National Institute of Urban Affairs, Government of India', dates: '2021–24', desc: "Designed and ran a national survey across 28 states on vacant government posts; the findings were reported to the Prime Minister's Office. Drafted RFPs and contracts under India's General Financial Rules and supported legal reviews.", links: ['state-capacity-dashboard', 'hr-allocation'] },
          { key: 'u20', role: 'U20 Technical Secretariat team member', org: "India's G20 Presidency, on deputation from NIUA", dates: '2023', desc: "Led Urban20 editorial governance, reviewing 1,550+ submissions and finalising 250+ articles. Co-authored India's white paper Accelerating Climate Finance in G20 Cities with an 8-member global task force, 3 advisors and 57 city stakeholders.", links: ['accelerating-climate-finance'] },
          { key: 'mohua', role: 'Policy Associate, TULIP', org: 'Ministry of Housing and Urban Affairs, Government of India', dates: '2020–21', desc: 'Designed an M&E framework that drove a 300% rise in internship placements within 6 months, and grew applications from 250+ to 7,200+ with an outreach toolkit for 4,500+ city governments.', links: ['tulip'] },
          { key: 'samavesh', role: 'Co-Founder and Director', org: 'Samavesh', dates: '2020–', desc: "Curated 280+ policy ideas from 150+ moderated discussions into India's first discourse-led policy journal, and built partnerships across 15 Indian and international institutions.", links: ['samavesh'] },
          { key: 'ctpi', role: 'Research Associate, Cryptocurrency (part-time)', org: 'Cornell Tech Policy Institute, Cornell University', dates: '2025–26', desc: 'Built an analysis-ready dataset from ~26,000 survey responses across 25 countries and supported econometric modeling of cryptocurrency adoption drivers.', links: [] },
          { key: 'saujanya', role: 'Member and Intervention Designer', org: 'Saujanya Foundation', dates: '4 years', desc: "Four years designing preventive-healthcare interventions in Delhi's informal settlements.", links: ['saujanya'] }
        ] },
        { h: 'Publications', items: [
          { key: 'acf', role: 'Accelerating Climate Finance in G20 Cities', org: 'Urban20 white paper, co-author', dates: '2023', desc: "India's 2023 Urban20 submission, published on the global G20 portal.", links: ['accelerating-climate-finance'] },
          { key: 'cduf', role: 'Catalysing Digital Urban Futures', org: 'Chapter 6, U20 Background Research 2023, co-author', dates: '2023', desc: "Published under India's Urban20 initiative during the G20 Presidency.", links: [] },
          { key: 'buzzer', role: 'The Electricity Buzzer', org: 'ISPP Policy Review', dates: '2021', desc: 'Policy article in the Indian School of Public Policy review.', links: ['electricity-sector'] }
        ] },
        { h: 'Research in progress', items: [
          { key: 'llmaudit', role: 'Auditing frontier LLMs in government document generation', org: 'Research in progress', dates: 'Now', desc: 'Bias, guardrail failures and procedural fidelity when LLMs draft procurement documents (RFPs).', links: [] },
          { key: 'did', role: 'Immigration and county felony rates', org: 'Cornell University', dates: '2025–26', desc: 'The causal effect of immigration into US counties on felony rates, using staggered difference-in-differences.', links: [] }
        ] },
        { h: 'Education', items: [
          { key: 'cornell', role: 'Master of Public Administration (Economics and Finance), Minor in Data Science', org: 'Cornell University', dates: '2024–26', desc: '$64,000 merit scholarship. Founding member, Data for Good in Policy at Cornell.', links: ['data-for-good'] },
          { key: 'ispp', role: 'Post Graduate Program in Public Policy, Design, and Management', org: 'Indian School of Public Policy', dates: '2019–20', desc: 'INR 500,000 scholarship and the Best Alumni Award. Thesis on homelessness in New Delhi.', links: [] }
        ] }
      ]
    }
  }
};
