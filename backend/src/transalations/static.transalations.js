



const translations = {
    en: {
      navbar: {
        services: "Services",
        industries: "Industries",
        about: "About",
        careers: "Careers",
        blog: "Blog",
        contact: "Contact",
        getQuote: "Get Quote",
        contactUs: "Contact Us",
      },
      footer: {
        company: "INSPECTORS",
        description:
          "Leading provider of testing, inspection, certification, and advisory services. Committed to safety, security, and sustainability worldwide.",
        services: {
          title: "Services",
          list: [
            "Testing & Certification",
            "Inspection Services",
            "Audit & Assessment",
            "Training & Education",
            "Digital Solutions",
            "Consulting Services",
          ],
        },
        industries: {
          title: "Industries",
          list: [
            "Automotive",
            "Healthcare & Medical",
            "Energy & Utilities",
            "Manufacturing",
            "Construction",
            "Food & Agriculture",
          ],
        },
        contact: {
          title: "Contact",
          address: "INSPECTORS America\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@INSPECTORS.com",
        },
        newsletter: "Stay Updated",
        placeholderEmail: "Enter your email",
      },
      pages: {
        services: {
          hero: {
            title: "Leading Testing, Inspection & Certification Services",
            subtitle: "Trusted Worldwide",
            description: "Ensuring safety, security, and sustainability across industries with comprehensive testing, inspection, certification, and advisory services.",
            primaryCTAText: "Explore Services",
            secondaryCTAText: "Get Quote",
          },
        },
        about: {
          title: "About",
          breadcrumb: {
            home: "Home",
            about: "About"
          },
          loading: "Loading...",
          error: "Failed to load content"
        },
        careers: {
          title: "Current Openings",
          description: "Explore exciting career opportunities across our global organization. Find the perfect role to advance your career.",
          applyNow: "Apply Now",
          hiringProcess: {
            title: "Our Hiring Process",
            description: "We've designed our process to be transparent, efficient, and focused on finding the right mutual fit.",
            steps: {
              review: {
                title: "Application Review",
                description: "Our talent team reviews your application and qualifications against role requirements."
              },
              interview: {
                title: "Initial Interview",
                description: "Phone or video interview to discuss your background, interests, and fit for the role."
              },
              assessment: {
                title: "Technical Assessment",
                description: "Role-specific technical evaluation or case study to assess your capabilities."
              },
              final: {
                title: "Final Interview",
                description: "Meet with hiring managers and team members to discuss collaboration and next steps."
              }
            }
          },
          currentOpenings: {
            loadingText: "Loading careers...",
            generalApplicationText: "Don't see the right role? We're always looking for talented individuals.",
            submitGeneralApplication: "Submit General Application"
          }
        },
        blog: {
          title: "Latest Articles",
          description: "Technical insights and industry updates from our team of experts."
        },
        contact: {
          officesTitle: "Our Global Offices",
          officesDescription: "With locations worldwide, we're always close to you. Find your nearest INSPECTORS office for local support and services.",
          formTitle: "Send Us a Message",
          formDescription: "Fill out the form below and our experts will get back to you within 24 hours.",
          supportTitle: "Get Direct Support",
          supportDescription: "Prefer to speak directly? Our customer support team is available to help you with immediate questions and urgent requests.",
          supportPhoneTitle: "Phone Support",
          supportPhoneDesc: "Speak with our customer service team",
          supportPhoneHours: "Mon-Fri: 8:00 AM - 6:00 PM EST",
          supportEmailTitle: "Email Support",
          supportEmailDesc: "Send detailed inquiries and documentation",
          supportEmailResponse: "Response within 24 hours",
          supportEmergencyTitle: "Emergency Support",
          supportEmergencyDesc: "24/7 support for urgent certification issues",
          supportEmergencyNote: "Available 24/7 for emergencies",
          responseGuaranteeTitle: "Quick Response Guarantee",
          responsePhone: "Phone inquiries answered within 3 rings",
          responseEmail: "Email responses within 24 hours",
          responseQuote: "Quote requests processed within 48 hours",
          labels: {
            firstName: "First Name *",
            lastName: "Last Name *",
            email: "Email Address *",
            phone: "Phone Number",
            company: "Company *",
            industry: "Industry",
            service: "Service Needed",
            message: "Message *",
            consent: "I agree to INSPECTORS processing my personal data for the purpose of responding to my inquiry. I understand I can withdraw consent at any time."
          },
          placeholders: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@company.com",
            phone: "+1 (555) 123-4567",
            company: "Your Company Name",
            selectIndustry: "Select Industry",
            selectService: "Select Service",
            message: "Please describe your requirements, timeline, and any specific questions you have..."
          },
          cta: {
            send: "Send Message",
            sending: "Sending..."
          }
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Complete Service Portfolio",
          subheading: "From product testing to regulatory compliance, we provide comprehensive solutions to help you succeed in global markets.",
        },
        servicesList: [
          {
            id: 1,
            title: "Testing (T)",
            description: "Comprehensive testing services to validate safety, performance, and compliance.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "Non-destructive testing",
              "Performance & reliability",
              "Standards compliance",
            ]
          },
          {
            id: 2,
            title: "Condition based Monitoring (INSPECTORS)",
            description: "Predictive maintenance using analytics, sensors, and diagnostics to reduce downtime.",
            icon: "Settings",
            link: "/services/INSPECTORS",
            features: [
              "Vibration & acoustic analysis",
              "Thermography & oil analysis",
              "Asset health dashboards",
            ]
          },
          {
            id: 3,
            title: "Inspection (I)",
            description: "Independent inspection services ensuring quality and regulatory adherence.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "Third-party inspection",
              "Vendor surveillance",
              "Site & factory audits",
            ]
          },
          {
            id: 4,
            title: "Auditing (A)",
            description: "Process, supplier, and system audits to identify risks and drive improvement.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "Supplier audits",
              "Process capability reviews",
              "Compliance gap analysis",
            ]
          },
          {
            id: 5,
            title: "Verification & Certification (VC)",
            description: "Verification and certification services to demonstrate trust and compliance.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Management systems",
              "Product certification",
              "Regulatory approvals",
            ]
          },
          {
            id: 6,
            title: "Innovation & R&D",
            description: "Next-generation solutions powered by IoT, AI, Robotics, and Industry 4.0 technologies.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "IoT & AI monitoring",
              "Robotic inspection",
              "Digital twin technology",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "72+",
          label: "Countries Served",
          description: "Global presence with local expertise"
        },
        {
          number: "7,000+",
          label: "Experts Worldwide",
          description: "Highly qualified professionals"
        },
        {
          number: "25+",
          label: "Testing Laboratories",
          description: "State-of-the-art facilities"
        },
        {
          number: "33",
          label: "Years of Excellence",
          description: "Trusted since 1866"
        }
      ],
    },
  
    fr: {
      navbar: {
        services: "Services",
        industries: "Industries",
        about: "Ã€ propos",
        careers: "CarriÃ¨res",
        blog: "Blog",
        contact: "Contact",
        getQuote: "Obtenir un devis",
        contactUs: "Contactez-nous",
      },
      footer: {
        company: "INSPECTORS",
        description:
          "Fournisseur leader de services de test, d'inspection, de certification et de conseil. EngagÃ© pour la sÃ©curitÃ©, la sÃ»retÃ© et la durabilitÃ© dans le monde entier.",
        services: {
          title: "Services",
          list: [
            "Tests et certification",
            "Services d'inspection",
            "Audit et Ã©valuation",
            "Formation et Ã©ducation",
            "Solutions numÃ©riques",
            "Services de conseil",
          ],
        },
        industries: {
          title: "Industries",
          list: [
            "Automobile",
            "SantÃ© & mÃ©dical",
            "Ã‰nergie & services publics",
            "Fabrication",
            "Construction",
            "Alimentation & agriculture",
          ],
        },
        contact: {
          title: "Contact",
          address: "INSPECTORS AmÃ©rique\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@INSPECTORS.com",
        },
        newsletter: "Restez informÃ©",
        placeholderEmail: "Entrez votre email",
      },
      pages: {
        services: {
          hero: {
            title: "Services de test, d'inspection et de certification de premier plan",
            subtitle: "De confiance dans le monde entier",
            description: "Garantir la sÃ©curitÃ©, la sÃ»retÃ© et la durabilitÃ© dans tous les secteurs grÃ¢ce Ã  des services complets de test, d'inspection, de certification et de conseil.",
            primaryCTAText: "Explorer les services",
            secondaryCTAText: "Obtenir un devis",
          },
        },
        about: {
          title: "Ã€ propos",
          breadcrumb: {
            home: "Accueil",
            about: "Ã€ propos"
          },
          loading: "Chargement...",
          error: "Ã‰chec du chargement du contenu"
        },
        careers: {
          title: "Offres d'emploi actuelles",
          description: "DÃ©couvrez des opportunitÃ©s de carriÃ¨re passionnantes au sein de notre organisation mondiale. Trouvez le poste idÃ©al pour faire progresser votre carriÃ¨re.",
          applyNow: "Postuler maintenant",
          hiringProcess: {
            title: "Notre processus de recrutement",
            description: "Nous avons conÃ§u un processus transparent, efficace et axÃ© sur la recherche de l'adÃ©quation mutuelle.",
            steps: {
              review: {
                title: "Examen de la candidature",
                description: "Notre Ã©quipe RH examine votre candidature et vos qualifications par rapport aux exigences du poste."
              },
              interview: {
                title: "Entretien initial",
                description: "Entretien tÃ©lÃ©phonique ou vidÃ©o pour discuter de votre parcours, de vos intÃ©rÃªts et de votre adÃ©quation au poste."
              },
              assessment: {
                title: "Ã‰valuation technique",
                description: "Ã‰valuation technique spÃ©cifique au poste ou Ã©tude de cas pour Ã©valuer vos compÃ©tences."
              },
              final: {
                title: "Entretien final",
                description: "Rencontrez les responsables du recrutement et les membres de l'Ã©quipe pour discuter de la collaboration et des prochaines Ã©tapes."
              }
            }
          },
          currentOpenings: {
            loadingText: "Chargement des offres...",
            generalApplicationText: "Vous ne trouvez pas le bon poste ? Nous recherchons toujours des talents.",
            submitGeneralApplication: "Envoyer une candidature spontanÃ©e"
          }
        },
        blog: {
          title: "Derniers Articles",
          description: "Analyses techniques et actualitÃ©s du secteur de notre Ã©quipe d'experts."
        },
        contact: {
          officesTitle: "Nos bureaux dans le monde",
          officesDescription: "Avec des sites dans le monde entier, nous sommes toujours proches de vous. Trouvez le bureau INSPECTORS le plus proche pour un support et des services locaux.",
          formTitle: "Envoyez-nous un message",
          formDescription: "Remplissez le formulaire ci-dessous et nos experts vous rÃ©pondront sous 24 heures.",
          supportTitle: "Support direct",
          supportDescription: "Vous prÃ©fÃ©rez parler directement ? Notre Ã©quipe d'assistance client est disponible pour vous aider avec des questions immÃ©diates et des demandes urgentes.",
          supportPhoneTitle: "Assistance tÃ©lÃ©phonique",
          supportPhoneDesc: "Parlez Ã  notre service client",
          supportPhoneHours: "Lun-Ven : 8h00 - 18h00 (EST)",
          supportEmailTitle: "Assistance email",
          supportEmailDesc: "Envoyez des demandes dÃ©taillÃ©es et de la documentation",
          supportEmailResponse: "RÃ©ponse sous 24 heures",
          supportEmergencyTitle: "Assistance d'urgence",
          supportEmergencyDesc: "Support 24/7 pour les demandes urgentes de certification",
          supportEmergencyNote: "Disponible 24/7 pour les urgences",
          responseGuaranteeTitle: "Garantie de rÃ©ponse rapide",
          responsePhone: "Appels rÃ©pondus en moins de 3 sonneries",
          responseEmail: "RÃ©ponses aux emails sous 24 heures",
          responseQuote: "Devis traitÃ©s sous 48 heures",
          labels: {
            firstName: "PrÃ©nom *",
            lastName: "Nom *",
            email: "Adresse e-mail *",
            phone: "NumÃ©ro de tÃ©lÃ©phone",
            company: "Entreprise *",
            industry: "Industrie",
            service: "Service requis",
            message: "Message *",
            consent: "J'accepte que INSPECTORS traite mes donnÃ©es personnelles afin de rÃ©pondre Ã  ma demande. Je comprends que je peux retirer mon consentement Ã  tout moment."
          },
          placeholders: {
            firstName: "Jean",
            lastName: "Dupont",
            email: "jean.dupont@entreprise.com",
            phone: "+33 1 23 45 67 89",
            company: "Nom de votre entreprise",
            selectIndustry: "SÃ©lectionner une industrie",
            selectService: "SÃ©lectionner un service",
            message: "Veuillez dÃ©crire vos besoins, votre calendrier et vos questions spÃ©cifiques..."
          },
          cta: {
            send: "Envoyer le message",
            sending: "Envoi..."
          }
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Portfolio de services complet",
          subheading: "Des tests de produits Ã  la conformitÃ© rÃ©glementaire, nous fournissons des solutions complÃ¨tes pour vous aider Ã  rÃ©ussir sur les marchÃ©s mondiaux.",
        },
        servicesList: [
          {
            id: 1,
            title: "Tests (T)",
            description: "Services de test complets pour valider la sÃ©curitÃ©, les performances et la conformitÃ©.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "Tests non destructifs",
              "Performance et fiabilitÃ©",
              "ConformitÃ© aux normes",
            ]
          },
          {
            id: 2,
            title: "Surveillance basÃ©e sur l'Ã©tat (INSPECTORS)",
            description: "Maintenance prÃ©dictive utilisant l'analytique, les capteurs et les diagnostics pour rÃ©duire les temps d'arrÃªt.",
            icon: "Settings",
            link: "/services/INSPECTORS",
            features: [
              "Analyse vibratoire et acoustique",
              "Thermographie et analyse d'huile",
              "Tableaux de bord de santÃ© des actifs",
            ]
          },
          {
            id: 3,
            title: "Inspection (I)",
            description: "Services d'inspection indÃ©pendants garantissant la qualitÃ© et le respect de la rÃ©glementation.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "Inspection tierce partie",
              "Surveillance des fournisseurs",
              "Audits de site et d'usine",
            ]
          },
          {
            id: 4,
            title: "Audit (A)",
            description: "Audits de processus, de fournisseurs et de systÃ¨mes pour identifier les risques et stimuler l'amÃ©lioration.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "Audits de fournisseurs",
              "Examens de capacitÃ© de processus",
              "Analyse des Ã©carts de conformitÃ©",
            ]
          },
          {
            id: 5,
            title: "VÃ©rification et Certification (VC)",
            description: "Services de vÃ©rification et de certification pour dÃ©montrer la confiance et la conformitÃ©.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "SystÃ¨mes de management",
              "Certification de produits",
              "Approbations rÃ©glementaires",
            ]
          },
          {
            id: 6,
            title: "Innovation et R&D",
            description: "Solutions de nouvelle gÃ©nÃ©ration alimentÃ©es par l'IoT, l'IA, la robotique et les technologies Industrie 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "Surveillance IoT et IA",
              "Inspection robotique",
              "Technologie de jumeau numÃ©rique",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "72+",
          label: "Pays Desservis",
          description: "PrÃ©sence mondiale avec expertise locale"
        },
        {
          number: "7,000+",
          label: "Experts dans le Monde",
          description: "Professionnels hautement qualifiÃ©s"
        },
        {
          number: "25+",
          label: "Laboratoires de Test",
          description: "Installations de pointe"
        },
        {
          number: "33",
          label: "AnnÃ©es d'Excellence",
          description: "De confiance depuis 1866"
        }
      ],
    },
  
    pt: {
      navbar: {
        services: "ServiÃ§os",
        industries: "IndÃºstrias",
        about: "Sobre",
        careers: "Carreiras",
        blog: "Blog",
        contact: "Contato",
        getQuote: "Solicitar OrÃ§amento",
        contactUs: "Contate-Nos",
      },
      footer: {
        company: "INSPECTORS",
        description:
          "Fornecedor lÃ­der de serviÃ§os de teste, inspeÃ§Ã£o, certificaÃ§Ã£o e consultoria. Comprometido com seguranÃ§a, proteÃ§Ã£o e sustentabilidade em todo o mundo.",
        services: {
          title: "ServiÃ§os",
          list: [
            "Teste & CertificaÃ§Ã£o",
            "ServiÃ§os de InspeÃ§Ã£o",
            "Auditoria & AvaliaÃ§Ã£o",
            "Treinamento & EducaÃ§Ã£o",
            "SoluÃ§Ãµes Digitais",
            "ServiÃ§os de Consultoria",
          ],
        },
        industries: {
          title: "IndÃºstrias",
          list: [
            "Automotivo",
            "SaÃºde & MÃ©dico",
            "Energia & Utilidades",
            "Manufatura",
            "ConstruÃ§Ã£o",
            "AlimentaÃ§Ã£o & Agricultura",
          ],
        },
        contact: {
          title: "Contato",
          address: "INSPECTORS AmÃ©rica\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@INSPECTORS.com",
        },
        newsletter: "Fique Atualizado",
        placeholderEmail: "Digite seu email",
      },
      pages: {
        services: {
          hero: {
            title: "Principais serviÃ§os de Teste, InspeÃ§Ã£o e CertificaÃ§Ã£o",
            subtitle: "ConfiÃ¡vel em todo o mundo",
            description: "Garantindo seguranÃ§a, proteÃ§Ã£o e sustentabilidade em diversos setores com serviÃ§os abrangentes de teste, inspeÃ§Ã£o, certificaÃ§Ã£o e consultoria.",
            primaryCTAText: "Explorar ServiÃ§os",
            secondaryCTAText: "Solicitar OrÃ§amento",
          },
        },
        about: {
          title: "Sobre",
          breadcrumb: {
            home: "InÃ­cio",
            about: "Sobre"
          },
          loading: "Carregando...",
          error: "Falha ao carregar conteÃºdo"
        },
        careers: {
          title: "Vagas Abertas",
          description: "Explore oportunidades de carreira empolgantes em nossa organizaÃ§Ã£o global. Encontre o cargo ideal para avanÃ§ar na sua carreira.",
          applyNow: "Candidatar-se agora",
          hiringProcess: {
            title: "Nosso processo de contrataÃ§Ã£o",
            description: "Criamos um processo transparente, eficiente e focado em encontrar o melhor encaixe mÃºtuo.",
            steps: {
              review: {
                title: "AnÃ¡lise da candidatura",
                description: "Nossa equipe de talentos avalia sua candidatura e qualificaÃ§Ãµes em relaÃ§Ã£o aos requisitos da vaga."
              },
              interview: {
                title: "Entrevista inicial",
                description: "Entrevista por telefone ou vÃ­deo para discutir sua experiÃªncia, interesses e aderÃªncia Ã  funÃ§Ã£o."
              },
              assessment: {
                title: "AvaliaÃ§Ã£o tÃ©cnica",
                description: "AvaliaÃ§Ã£o tÃ©cnica especÃ­fica da funÃ§Ã£o ou estudo de caso para avaliar suas capacidades."
              },
              final: {
                title: "Entrevista final",
                description: "ReuniÃ£o com os gestores e membros da equipe para discutir colaboraÃ§Ã£o e prÃ³ximos passos."
              }
            }
          },
          currentOpenings: {
            loadingText: "Carregando vagas...",
            generalApplicationText: "NÃ£o encontrou a vaga ideal? Estamos sempre em busca de talentos.",
            submitGeneralApplication: "Enviar candidatura geral"
          }
        },
        blog: {
          title: "Artigos Mais Recentes",
          description: "PercepÃ§Ãµes tÃ©cnicas e novidades do setor da nossa equipe de especialistas."
        },
        contact: {
          officesTitle: "Nossos EscritÃ³rios Globais",
          officesDescription: "Com locais em todo o mundo, estamos sempre perto de vocÃª. Encontre o escritÃ³rio INSPECTORS mais prÃ³ximo para suporte e serviÃ§os locais.",
          formTitle: "Envie-nos uma mensagem",
          formDescription: "Preencha o formulÃ¡rio abaixo e nossos especialistas retornarÃ£o em atÃ© 24 horas.",
          supportTitle: "Obter suporte direto",
          supportDescription: "Prefere falar diretamente? Nossa equipe de suporte ao cliente estÃ¡ disponÃ­vel para ajudar com dÃºvidas imediatas e solicitaÃ§Ãµes urgentes.",
          supportPhoneTitle: "Suporte por telefone",
          supportPhoneDesc: "Fale com nossa equipe de atendimento",
          supportPhoneHours: "Seg-Sex: 8:00 - 18:00 (EST)",
          supportEmailTitle: "Suporte por e-mail",
          supportEmailDesc: "Envie dÃºvidas detalhadas e documentaÃ§Ã£o",
          supportEmailResponse: "Resposta em atÃ© 24 horas",
          supportEmergencyTitle: "Suporte de emergÃªncia",
          supportEmergencyDesc: "Suporte 24/7 para questÃµes urgentes de certificaÃ§Ã£o",
          supportEmergencyNote: "DisponÃ­vel 24/7 para emergÃªncias",
          responseGuaranteeTitle: "Garantia de resposta rÃ¡pida",
          responsePhone: "LigaÃ§Ãµes atendidas em atÃ© 3 toques",
          responseEmail: "Respostas por e-mail em atÃ© 24 horas",
          responseQuote: "SolicitaÃ§Ãµes de cotaÃ§Ã£o processadas em atÃ© 48 horas",
          labels: {
            firstName: "Nome *",
            lastName: "Sobrenome *",
            email: "EndereÃ§o de e-mail *",
            phone: "NÃºmero de telefone",
            company: "Empresa *",
            industry: "IndÃºstria",
            service: "ServiÃ§o necessÃ¡rio",
            message: "Mensagem *",
            consent: "Concordo que a INSPECTORS processe meus dados pessoais para responder Ã  minha solicitaÃ§Ã£o. Entendo que posso retirar o consentimento a qualquer momento."
          },
          placeholders: {
            firstName: "JoÃ£o",
            lastName: "Silva",
            email: "joao.silva@empresa.com",
            phone: "+55 (11) 1234-5678",
            company: "Nome da sua empresa",
            selectIndustry: "Selecionar indÃºstria",
            selectService: "Selecionar serviÃ§o",
            message: "Descreva seus requisitos, prazos e dÃºvidas especÃ­ficas..."
          },
          cta: {
            send: "Enviar mensagem",
            sending: "Enviando..."
          }
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "PortfÃ³lio Completo de ServiÃ§os",
          subheading: "Desde testes de produtos atÃ© conformidade regulatÃ³ria, fornecemos soluÃ§Ãµes abrangentes para ajudÃ¡-lo a ter sucesso nos mercados globais.",
        },
        servicesList: [
          {
            id: 1,
            title: "Testes (T)",
            description: "ServiÃ§os abrangentes de teste para validar seguranÃ§a, desempenho e conformidade.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "Testes nÃ£o destrutivos",
              "Desempenho e confiabilidade",
              "Conformidade com padrÃµes",
            ]
          },
          {
            id: 2,
            title: "Monitoramento Baseado em CondiÃ§Ã£o (INSPECTORS)",
            description: "ManutenÃ§Ã£o preditiva usando anÃ¡lise, sensores e diagnÃ³sticos para reduzir tempo de inatividade.",
            icon: "Settings",
            link: "/services/INSPECTORS",
            features: [
              "AnÃ¡lise de vibraÃ§Ã£o e acÃºstica",
              "Termografia e anÃ¡lise de Ã³leo",
              "Dashboards de saÃºde de ativos",
            ]
          },
          {
            id: 3,
            title: "InspeÃ§Ã£o (I)",
            description: "ServiÃ§os de inspeÃ§Ã£o independentes garantindo qualidade e aderÃªncia regulatÃ³ria.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "InspeÃ§Ã£o de terceiros",
              "VigilÃ¢ncia de fornecedores",
              "Auditorias de site e fÃ¡brica",
            ]
          },
          {
            id: 4,
            title: "Auditoria (A)",
            description: "Auditorias de processo, fornecedor e sistema para identificar riscos e impulsionar melhorias.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "Auditorias de fornecedores",
              "RevisÃµes de capacidade de processo",
              "AnÃ¡lise de lacunas de conformidade",
            ]
          },
          {
            id: 5,
            title: "VerificaÃ§Ã£o e CertificaÃ§Ã£o (VC)",
            description: "ServiÃ§os de verificaÃ§Ã£o e certificaÃ§Ã£o para demonstrar confianÃ§a e conformidade.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Sistemas de gestÃ£o",
              "CertificaÃ§Ã£o de produtos",
              "AprovaÃ§Ãµes regulatÃ³rias",
            ]
          },
          {
            id: 6,
            title: "InovaÃ§Ã£o e P&D",
            description: "SoluÃ§Ãµes de prÃ³xima geraÃ§Ã£o alimentadas por IoT, IA, RobÃ³tica e tecnologias IndÃºstria 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "Monitoramento IoT e IA",
              "InspeÃ§Ã£o robÃ³tica",
              "Tecnologia de gÃªmeo digital",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "72+",
          label: "PaÃ­ses Atendidos",
          description: "PresenÃ§a global com expertise local"
        },
        {
          number: "7,000+",
          label: "Especialistas no Mundo",
          description: "Profissionais altamente qualificados"
        },
        {
          number: "25+",
          label: "LaboratÃ³rios de Teste",
          description: "InstalaÃ§Ãµes de Ãºltima geraÃ§Ã£o"
        },
        {
          number: "33",
          label: "Anos de ExcelÃªncia",
          description: "ConfiÃ¡vel desde 1866"
        }
      ],
    },
  
    es: {
      navbar: {
        services: "Servicios",
        industries: "Industrias",
        about: "Acerca de",
        careers: "Carreras",
        blog: "Blog",
        contact: "Contacto",
        getQuote: "Obtener CotizaciÃ³n",
        contactUs: "ContÃ¡ctenos",
      },
      footer: {
        company: "INSPECTORS",
        description:
          "Proveedor lÃ­der de servicios de prueba, inspecciÃ³n, certificaciÃ³n y asesorÃ­a. Comprometido con la seguridad, la protecciÃ³n y la sostenibilidad en todo el mundo.",
        services: {
          title: "Servicios",
          list: [
            "Pruebas & CertificaciÃ³n",
            "Servicios de InspecciÃ³n",
            "AuditorÃ­a & EvaluaciÃ³n",
            "CapacitaciÃ³n & EducaciÃ³n",
            "Soluciones Digitales",
            "Servicios de ConsultorÃ­a",
          ],
        },
        industries: {
          title: "Industrias",
          list: [
            "Automotriz",
            "Salud & MÃ©dico",
            "EnergÃ­a & Utilidades",
            "Manufactura",
            "ConstrucciÃ³n",
            "Alimentos & Agricultura",
          ],
        },
        contact: {
          title: "Contacto",
          address: "INSPECTORS AmÃ©rica\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@INSPECTORS.com",
        },
        newsletter: "Mantente Actualizado",
        placeholderEmail: "Ingrese su correo electrÃ³nico",
      },
      pages: {
        services: {
          hero: {
            title: "Servicios lÃ­deres de Pruebas, InspecciÃ³n y CertificaciÃ³n",
            subtitle: "De confianza en todo el mundo",
            description: "Garantizando la seguridad, la protecciÃ³n y la sostenibilidad en todas las industrias con servicios integrales de prueba, inspecciÃ³n, certificaciÃ³n y asesorÃ­a.",
            primaryCTAText: "Explorar Servicios",
            secondaryCTAText: "Obtener CotizaciÃ³n",
          },
        },
        about: {
          title: "Acerca de",
          breadcrumb: {
            home: "Inicio",
            about: "Acerca de"
          },
          loading: "Cargando...",
          error: "Error al cargar contenido"
        },
        careers: {
          title: "Vacantes Actuales",
          description: "Explora emocionantes oportunidades de carrera en nuestra organizaciÃ³n global. Encuentra el puesto perfecto para impulsar tu carrera.",
          applyNow: "Postular ahora",
          hiringProcess: {
            title: "Nuestro proceso de contrataciÃ³n",
            description: "Hemos diseÃ±ado un proceso transparente, eficiente y centrado en encontrar el ajuste mutuo adecuado.",
            steps: {
              review: {
                title: "RevisiÃ³n de la solicitud",
                description: "Nuestro equipo de talento revisa tu solicitud y calificaciones en relaciÃ³n con los requisitos del puesto."
              },
              interview: {
                title: "Entrevista inicial",
                description: "Entrevista telefÃ³nica o por video para hablar sobre tu experiencia, intereses y encaje con el puesto."
              },
              assessment: {
                title: "EvaluaciÃ³n tÃ©cnica",
                description: "EvaluaciÃ³n tÃ©cnica especÃ­fica del puesto o caso prÃ¡ctico para valorar tus capacidades."
              },
              final: {
                title: "Entrevista final",
                description: "ReÃºnete con los responsables de contrataciÃ³n y miembros del equipo para hablar de la colaboraciÃ³n y los siguientes pasos."
              }
            }
          },
          currentOpenings: {
            loadingText: "Cargando vacantes...",
            generalApplicationText: "Â¿No ves el puesto adecuado? Siempre buscamos personas con talento.",
            submitGeneralApplication: "Enviar candidatura general"
          }
        },
        blog: {
          title: "ArtÃ­culos Recientes",
          description: "Perspectivas tÃ©cnicas y novedades de la industria de nuestro equipo de expertos."
        },
        contact: {
          officesTitle: "Nuestras Oficinas Globales",
          officesDescription: "Con ubicaciones en todo el mundo, siempre estamos cerca de ti. Encuentra tu oficina INSPECTORS mÃ¡s cercana para soporte y servicios locales.",
          formTitle: "EnvÃ­anos un mensaje",
          formDescription: "Completa el formulario y nuestros expertos te responderÃ¡n dentro de 24 horas.",
          supportTitle: "ObtÃ©n soporte directo",
          supportDescription: "Â¿Prefieres hablar directamente? Nuestro equipo de atenciÃ³n estÃ¡ disponible para ayudarte con preguntas inmediatas y solicitudes urgentes.",
          supportPhoneTitle: "Soporte telefÃ³nico",
          supportPhoneDesc: "Habla con nuestro equipo de atenciÃ³n al cliente",
          supportPhoneHours: "Lun-Vie: 8:00 - 18:00 (EST)",
          supportEmailTitle: "Soporte por correo",
          supportEmailDesc: "EnvÃ­a consultas detalladas y documentaciÃ³n",
          supportEmailResponse: "Respuesta dentro de 24 horas",
          supportEmergencyTitle: "Soporte de emergencia",
          supportEmergencyDesc: "AtenciÃ³n 24/7 para problemas urgentes de certificaciÃ³n",
          supportEmergencyNote: "Disponible 24/7 para emergencias",
          responseGuaranteeTitle: "GarantÃ­a de respuesta rÃ¡pida",
          responsePhone: "Llamadas respondidas dentro de 3 timbres",
          responseEmail: "Respuestas por correo dentro de 24 horas",
          responseQuote: "Solicitudes de cotizaciÃ³n procesadas dentro de 48 horas",
          labels: {
            firstName: "Nombre *",
            lastName: "Apellido *",
            email: "Correo electrÃ³nico *",
            phone: "NÃºmero de telÃ©fono",
            company: "CompaÃ±Ã­a *",
            industry: "Industria",
            service: "Servicio requerido",
            message: "Mensaje *",
            consent: "Acepto que INSPECTORS procese mis datos personales para responder a mi consulta. Entiendo que puedo retirar mi consentimiento en cualquier momento."
          },
          placeholders: {
            firstName: "Juan",
            lastName: "PÃ©rez",
            email: "juan.perez@empresa.com",
            phone: "+34 600 000 000",
            company: "Nombre de tu empresa",
            selectIndustry: "Seleccionar industria",
            selectService: "Seleccionar servicio",
            message: "Describe tus requisitos, plazos y preguntas especÃ­ficas..."
          },
          cta: {
            send: "Enviar mensaje",
            sending: "Enviando..."
          }
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Portafolio Completo de Servicios",
          subheading: "Desde pruebas de productos hasta cumplimiento regulatorio, proporcionamos soluciones integrales para ayudarle a tener Ã©xito en los mercados globales.",
        },
        servicesList: [
          {
            id: 1,
            title: "Pruebas (T)",
            description: "Servicios integrales de prueba para validar seguridad, rendimiento y cumplimiento.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "Pruebas no destructivas",
              "Rendimiento y confiabilidad",
              "Cumplimiento de estÃ¡ndares",
            ]
          },
          {
            id: 2,
            title: "Monitoreo Basado en CondiciÃ³n (INSPECTORS)",
            description: "Mantenimiento predictivo utilizando anÃ¡lisis, sensores y diagnÃ³sticos para reducir el tiempo de inactividad.",
            icon: "Settings",
            link: "/services/INSPECTORS",
            features: [
              "AnÃ¡lisis de vibraciÃ³n y acÃºstica",
              "TermografÃ­a y anÃ¡lisis de aceite",
              "Tableros de salud de activos",
            ]
          },
          {
            id: 3,
            title: "InspecciÃ³n (I)",
            description: "Servicios de inspecciÃ³n independientes que garantizan calidad y adherencia regulatoria.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "InspecciÃ³n de terceros",
              "Vigilancia de proveedores",
              "AuditorÃ­as de sitio y fÃ¡brica",
            ]
          },
          {
            id: 4,
            title: "AuditorÃ­a (A)",
            description: "AuditorÃ­as de proceso, proveedor y sistema para identificar riesgos e impulsar mejoras.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "AuditorÃ­as de proveedores",
              "Revisiones de capacidad de proceso",
              "AnÃ¡lisis de brechas de cumplimiento",
            ]
          },
          {
            id: 5,
            title: "VerificaciÃ³n y CertificaciÃ³n (VC)",
            description: "Servicios de verificaciÃ³n y certificaciÃ³n para demostrar confianza y cumplimiento.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Sistemas de gestiÃ³n",
              "CertificaciÃ³n de productos",
              "Aprobaciones regulatorias",
            ]
          },
          {
            id: 6,
            title: "InnovaciÃ³n y I+D",
            description: "Soluciones de prÃ³xima generaciÃ³n impulsadas por IoT, IA, RobÃ³tica y tecnologÃ­as Industria 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "Monitoreo IoT e IA",
              "InspecciÃ³n robÃ³tica",
              "TecnologÃ­a de gemelo digital",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "72+",
          label: "PaÃ­ses Atendidos",
          description: "Presencia global con experiencia local"
        },
        {
          number: "7,000+",
          label: "Expertos en el Mundo",
          description: "Profesionales altamente calificados"
        },
        {
          number: "25+",
          label: "Laboratorios de Prueba",
          description: "Instalaciones de vanguardia"
        },
        {
          number: "33",
          label: "AÃ±os de Excelencia",
          description: "Confiable desde 1866"
        }
      ],
    },
  
    ru: {
      navbar: {
        services: "Ð£ÑÐ»ÑƒÐ³Ð¸",
        industries: "ÐžÑ‚Ñ€Ð°ÑÐ»Ð¸",
        about: "Ðž Ð½Ð°Ñ",
        careers: "ÐšÐ°Ñ€ÑŒÐµÑ€Ð°",
        blog: "Ð‘Ð»Ð¾Ð³",
        contact: "ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ñ‹",
        getQuote: "ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð¿Ñ€ÐµÐ´Ð»Ð¾Ð¶ÐµÐ½Ð¸Ðµ",
        contactUs: "Ð¡Ð²ÑÐ¶Ð¸Ñ‚ÐµÑÑŒ Ñ Ð½Ð°Ð¼Ð¸",
      },
      footer: {
        company: "INSPECTORS",
        description:
          "Ð’ÐµÐ´ÑƒÑ‰Ð¸Ð¹ Ð¿Ð¾ÑÑ‚Ð°Ð²Ñ‰Ð¸Ðº ÑƒÑÐ»ÑƒÐ³ Ð¿Ð¾ Ñ‚ÐµÑÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸ÑŽ, Ð¸Ð½ÑÐ¿ÐµÐºÑ†Ð¸Ð¸, ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸ Ð¸ ÐºÐ¾Ð½ÑÑƒÐ»ÑŒÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸ÑŽ. ÐŸÑ€Ð¸Ð²ÐµÑ€Ð¶ÐµÐ½ Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾ÑÑ‚Ð¸, Ð·Ð°Ñ‰Ð¸Ñ‚Ðµ Ð¸ ÑƒÑÑ‚Ð¾Ð¹Ñ‡Ð¸Ð²Ð¾ÑÑ‚Ð¸ Ð¿Ð¾ Ð²ÑÐµÐ¼Ñƒ Ð¼Ð¸Ñ€Ñƒ.",
        services: {
          title: "Ð£ÑÐ»ÑƒÐ³Ð¸",
          list: [
            "Ð¢ÐµÑÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ",
            "Ð˜Ð½ÑÐ¿ÐµÐºÑ†Ð¸Ð¾Ð½Ð½Ñ‹Ðµ ÑƒÑÐ»ÑƒÐ³Ð¸",
            "ÐÑƒÐ´Ð¸Ñ‚ Ð¸ Ð¾Ñ†ÐµÐ½ÐºÐ°",
            "ÐžÐ±ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ð¸ Ð¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ð½Ð¸Ðµ",
            "Ð¦Ð¸Ñ„Ñ€Ð¾Ð²Ñ‹Ðµ Ñ€ÐµÑˆÐµÐ½Ð¸Ñ",
            "ÐšÐ¾Ð½ÑÐ°Ð»Ñ‚Ð¸Ð½Ð³Ð¾Ð²Ñ‹Ðµ ÑƒÑÐ»ÑƒÐ³Ð¸",
          ],
        },
        industries: {
          title: "ÐžÑ‚Ñ€Ð°ÑÐ»Ð¸",
          list: [
            "ÐÐ²Ñ‚Ð¾Ð¼Ð¾Ð±Ð¸Ð»ÑŒÐ½Ð°Ñ Ð¿Ñ€Ð¾Ð¼Ñ‹ÑˆÐ»ÐµÐ½Ð½Ð¾ÑÑ‚ÑŒ",
            "Ð—Ð´Ñ€Ð°Ð²Ð¾Ð¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ðµ Ð¸ Ð¼ÐµÐ´Ð¸Ñ†Ð¸Ð½Ð°",
            "Ð­Ð½ÐµÑ€Ð³ÐµÑ‚Ð¸ÐºÐ° Ð¸ ÐºÐ¾Ð¼Ð¼ÑƒÐ½Ð°Ð»ÑŒÐ½Ñ‹Ðµ ÑƒÑÐ»ÑƒÐ³Ð¸",
            "ÐŸÑ€Ð¾Ð¸Ð·Ð²Ð¾Ð´ÑÑ‚Ð²Ð¾",
            "Ð¡Ñ‚Ñ€Ð¾Ð¸Ñ‚ÐµÐ»ÑŒÑÑ‚Ð²Ð¾",
            "ÐŸÑ€Ð¾Ð´Ð¾Ð²Ð¾Ð»ÑŒÑÑ‚Ð²Ð¸Ðµ Ð¸ ÑÐµÐ»ÑŒÑÐºÐ¾Ðµ Ñ…Ð¾Ð·ÑÐ¹ÑÑ‚Ð²Ð¾",
          ],
        },
        contact: {
          title: "ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ñ‹",
          address: "INSPECTORS ÐÐ¼ÐµÑ€Ð¸ÐºÐ°\n10040 Mesa Rim Road\nÐ¡Ð°Ð½-Ð”Ð¸ÐµÐ³Ð¾, ÐšÐ°Ð»Ð¸Ñ„Ð¾Ñ€Ð½Ð¸Ñ 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@INSPECTORS.com",
        },
        newsletter: "Ð‘ÑƒÐ´ÑŒÑ‚Ðµ Ð² ÐºÑƒÑ€ÑÐµ",
        placeholderEmail: "Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ Ð²Ð°Ñˆ email",
      },
      pages: {
        services: {
          hero: {
            title: "Ð’ÐµÐ´ÑƒÑ‰Ð¸Ðµ ÑƒÑÐ»ÑƒÐ³Ð¸ Ð¿Ð¾ Ñ‚ÐµÑÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸ÑŽ, Ð¸Ð½ÑÐ¿ÐµÐºÑ†Ð¸Ð¸ Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸",
            subtitle: "Ð”Ð¾Ð²ÐµÑ€Ð¸Ðµ Ð¿Ð¾ Ð²ÑÐµÐ¼Ñƒ Ð¼Ð¸Ñ€Ñƒ",
            description: "ÐžÐ±ÐµÑÐ¿ÐµÑ‡ÐµÐ½Ð¸Ðµ Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾ÑÑ‚Ð¸, Ð½Ð°Ð´ÐµÐ¶Ð½Ð¾ÑÑ‚Ð¸ Ð¸ ÑƒÑÑ‚Ð¾Ð¹Ñ‡Ð¸Ð²Ð¾Ð³Ð¾ Ñ€Ð°Ð·Ð²Ð¸Ñ‚Ð¸Ñ Ð² Ñ€Ð°Ð·Ð»Ð¸Ñ‡Ð½Ñ‹Ñ… Ð¾Ñ‚Ñ€Ð°ÑÐ»ÑÑ… Ð±Ð»Ð°Ð³Ð¾Ð´Ð°Ñ€Ñ ÐºÐ¾Ð¼Ð¿Ð»ÐµÐºÑÐ½Ñ‹Ð¼ ÑƒÑÐ»ÑƒÐ³Ð°Ð¼ Ð¿Ð¾ Ñ‚ÐµÑÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸ÑŽ, Ð¸Ð½ÑÐ¿ÐµÐºÑ†Ð¸Ð¸, ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸ Ð¸ ÐºÐ¾Ð½ÑÑƒÐ»ÑŒÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸ÑŽ.",
            primaryCTAText: "Ð˜Ð·ÑƒÑ‡Ð¸Ñ‚ÑŒ ÑƒÑÐ»ÑƒÐ³Ð¸",
            secondaryCTAText: "ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð¿Ñ€ÐµÐ´Ð»Ð¾Ð¶ÐµÐ½Ð¸Ðµ",
          },
        },
        about: {
          title: "Ðž Ð½Ð°Ñ",
          breadcrumb: {
            home: "Ð“Ð»Ð°Ð²Ð½Ð°Ñ",
            about: "Ðž Ð½Ð°Ñ"
          },
          loading: "Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ°...",
          error: "ÐžÑˆÐ¸Ð±ÐºÐ° Ð·Ð°Ð³Ñ€ÑƒÐ·ÐºÐ¸ ÐºÐ¾Ð½Ñ‚ÐµÐ½Ñ‚Ð°"
        },
        careers: {
          title: "ÐÐºÑ‚ÑƒÐ°Ð»ÑŒÐ½Ñ‹Ðµ Ð²Ð°ÐºÐ°Ð½ÑÐ¸Ð¸",
          description: "Ð˜Ð·ÑƒÑ‡Ð¸Ñ‚Ðµ Ð¸Ð½Ñ‚ÐµÑ€ÐµÑÐ½Ñ‹Ðµ ÐºÐ°Ñ€ÑŒÐµÑ€Ð½Ñ‹Ðµ Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚Ð¸ Ð² Ð½Ð°ÑˆÐµÐ¹ Ð³Ð»Ð¾Ð±Ð°Ð»ÑŒÐ½Ð¾Ð¹ Ð¾Ñ€Ð³Ð°Ð½Ð¸Ð·Ð°Ñ†Ð¸Ð¸. ÐÐ°Ð¹Ð´Ð¸Ñ‚Ðµ Ð¸Ð´ÐµÐ°Ð»ÑŒÐ½ÑƒÑŽ Ñ€Ð¾Ð»ÑŒ Ð´Ð»Ñ Ñ€Ð°Ð·Ð²Ð¸Ñ‚Ð¸Ñ Ð²Ð°ÑˆÐµÐ¹ ÐºÐ°Ñ€ÑŒÐµÑ€Ñ‹.",
          applyNow: "ÐŸÐ¾Ð´Ð°Ñ‚ÑŒ Ð·Ð°ÑÐ²ÐºÑƒ",
          hiringProcess: {
            title: "ÐÐ°Ñˆ Ð¿Ñ€Ð¾Ñ†ÐµÑÑ Ð½Ð°Ð¹Ð¼Ð°",
            description: "ÐœÑ‹ Ñ€Ð°Ð·Ñ€Ð°Ð±Ð¾Ñ‚Ð°Ð»Ð¸ Ð¿Ñ€Ð¾Ð·Ñ€Ð°Ñ‡Ð½Ñ‹Ð¹ Ð¸ ÑÑ„Ñ„ÐµÐºÑ‚Ð¸Ð²Ð½Ñ‹Ð¹ Ð¿Ñ€Ð¾Ñ†ÐµÑÑ, Ð½Ð°Ñ†ÐµÐ»ÐµÐ½Ð½Ñ‹Ð¹ Ð½Ð° Ð¿Ð¾Ð¸ÑÐº Ð²Ð·Ð°Ð¸Ð¼Ð½Ð¾Ð³Ð¾ ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ñ.",
            steps: {
              review: {
                title: "Ð Ð°ÑÑÐ¼Ð¾Ñ‚Ñ€ÐµÐ½Ð¸Ðµ Ð·Ð°ÑÐ²ÐºÐ¸",
                description: "ÐÐ°ÑˆÐ° ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð¿Ð¾ Ð¿Ð¾Ð´Ð±Ð¾Ñ€Ñƒ Ð¸Ð·ÑƒÑ‡Ð°ÐµÑ‚ Ð²Ð°ÑˆÑƒ Ð·Ð°ÑÐ²ÐºÑƒ Ð¸ ÐºÐ²Ð°Ð»Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸ÑŽ Ð² ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ð¸ Ñ Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸ÑÐ¼Ð¸ Ñ€Ð¾Ð»Ð¸."
              },
              interview: {
                title: "ÐŸÐµÑ€Ð²Ð¸Ñ‡Ð½Ð¾Ðµ Ð¸Ð½Ñ‚ÐµÑ€Ð²ÑŒÑŽ",
                description: "Ð¢ÐµÐ»ÐµÑ„Ð¾Ð½Ð½Ð¾Ðµ Ð¸Ð»Ð¸ Ð²Ð¸Ð´ÐµÐ¾-Ð¸Ð½Ñ‚ÐµÑ€Ð²ÑŒÑŽ Ð´Ð»Ñ Ð¾Ð±ÑÑƒÐ¶Ð´ÐµÐ½Ð¸Ñ Ð²Ð°ÑˆÐµÐ³Ð¾ Ð¾Ð¿Ñ‹Ñ‚Ð°, Ð¸Ð½Ñ‚ÐµÑ€ÐµÑÐ¾Ð² Ð¸ ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ñ Ñ€Ð¾Ð»Ð¸."
              },
              assessment: {
                title: "Ð¢ÐµÑ…Ð½Ð¸Ñ‡ÐµÑÐºÐ°Ñ Ð¾Ñ†ÐµÐ½ÐºÐ°",
                description: "Ð¢ÐµÐ¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ°Ñ Ñ‚ÐµÑ…Ð½Ð¸Ñ‡ÐµÑÐºÐ°Ñ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¸Ð»Ð¸ ÐºÐµÐ¹Ñ Ð´Ð»Ñ Ð¾Ñ†ÐµÐ½ÐºÐ¸ Ð²Ð°ÑˆÐ¸Ñ… ÐºÐ¾Ð¼Ð¿ÐµÑ‚ÐµÐ½Ñ†Ð¸Ð¹."
              },
              final: {
                title: "Ð¤Ð¸Ð½Ð°Ð»ÑŒÐ½Ð¾Ðµ Ð¸Ð½Ñ‚ÐµÑ€Ð²ÑŒÑŽ",
                description: "Ð’ÑÑ‚Ñ€ÐµÑ‡Ð° Ñ Ñ€ÑƒÐºÐ¾Ð²Ð¾Ð´Ð¸Ñ‚ÐµÐ»ÑÐ¼Ð¸ Ð¸ Ñ‡Ð»ÐµÐ½Ð°Ð¼Ð¸ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñ‹ Ð´Ð»Ñ Ð¾Ð±ÑÑƒÐ¶Ð´ÐµÐ½Ð¸Ñ ÑÐ¾Ñ‚Ñ€ÑƒÐ´Ð½Ð¸Ñ‡ÐµÑÑ‚Ð²Ð° Ð¸ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰Ð¸Ñ… ÑˆÐ°Ð³Ð¾Ð²."
              }
            }
          },
          currentOpenings: {
            loadingText: "Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ° Ð²Ð°ÐºÐ°Ð½ÑÐ¸Ð¹...",
            generalApplicationText: "ÐÐµ Ð½Ð°ÑˆÐ»Ð¸ Ð¿Ð¾Ð´Ñ…Ð¾Ð´ÑÑ‰ÑƒÑŽ Ñ€Ð¾Ð»ÑŒ? ÐœÑ‹ Ð²ÑÐµÐ³Ð´Ð° Ñ€Ð°Ð´Ñ‹ Ñ‚Ð°Ð»Ð°Ð½Ñ‚Ð»Ð¸Ð²Ñ‹Ð¼ ÑÐ¿ÐµÑ†Ð¸Ð°Ð»Ð¸ÑÑ‚Ð°Ð¼.",
            submitGeneralApplication: "ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ Ð¾Ð±Ñ‰ÑƒÑŽ Ð·Ð°ÑÐ²ÐºÑƒ"
          }
        },
        blog: {
          title: "ÐŸÐ¾ÑÐ»ÐµÐ´Ð½Ð¸Ðµ ÑÑ‚Ð°Ñ‚ÑŒÐ¸",
          description: "Ð¢ÐµÑ…Ð½Ð¸Ñ‡ÐµÑÐºÐ¸Ðµ Ð¾Ð±Ð·Ð¾Ñ€Ñ‹ Ð¸ Ð½Ð¾Ð²Ð¾ÑÑ‚Ð¸ Ð¾Ñ‚Ñ€Ð°ÑÐ»Ð¸ Ð¾Ñ‚ Ð½Ð°ÑˆÐµÐ¹ ÐºÐ¾Ð¼Ð°Ð½Ð´Ñ‹ ÑÐºÑÐ¿ÐµÑ€Ñ‚Ð¾Ð²."
        },
        contact: {
          officesTitle: "ÐÐ°ÑˆÐ¸ Ð¾Ñ„Ð¸ÑÑ‹ Ð¿Ð¾ Ð²ÑÐµÐ¼Ñƒ Ð¼Ð¸Ñ€Ñƒ",
          officesDescription: "Ð¡ Ð¾Ñ„Ð¸ÑÐ°Ð¼Ð¸ Ð¿Ð¾ Ð²ÑÐµÐ¼Ñƒ Ð¼Ð¸Ñ€Ñƒ Ð¼Ñ‹ Ð²ÑÐµÐ³Ð´Ð° Ñ€ÑÐ´Ð¾Ð¼. ÐÐ°Ð¹Ð´Ð¸Ñ‚Ðµ Ð±Ð»Ð¸Ð¶Ð°Ð¹ÑˆÐ¸Ð¹ Ð¾Ñ„Ð¸Ñ INSPECTORS Ð´Ð»Ñ Ð»Ð¾ÐºÐ°Ð»ÑŒÐ½Ð¾Ð¹ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ¸ Ð¸ ÑƒÑÐ»ÑƒÐ³.",
          formTitle: "ÐžÑ‚Ð¿Ñ€Ð°Ð²ÑŒÑ‚Ðµ Ð½Ð°Ð¼ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ",
          formDescription: "Ð—Ð°Ð¿Ð¾Ð»Ð½Ð¸Ñ‚Ðµ Ñ„Ð¾Ñ€Ð¼Ñƒ Ð½Ð¸Ð¶Ðµ, Ð¸ Ð½Ð°ÑˆÐ¸ ÑÐ¿ÐµÑ†Ð¸Ð°Ð»Ð¸ÑÑ‚Ñ‹ ÑÐ²ÑÐ¶ÑƒÑ‚ÑÑ Ñ Ð²Ð°Ð¼Ð¸ Ð² Ñ‚ÐµÑ‡ÐµÐ½Ð¸Ðµ 24 Ñ‡Ð°ÑÐ¾Ð².",
          supportTitle: "ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚Ðµ Ð¿Ñ€ÑÐ¼ÑƒÑŽ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶ÐºÑƒ",
          supportDescription: "ÐŸÑ€ÐµÐ´Ð¿Ð¾Ñ‡Ð¸Ñ‚Ð°ÐµÑ‚Ðµ Ð¿Ð¾Ð³Ð¾Ð²Ð¾Ñ€Ð¸Ñ‚ÑŒ Ð½Ð°Ð¿Ñ€ÑÐ¼ÑƒÑŽ? ÐÐ°ÑˆÐ° ÑÐ»ÑƒÐ¶Ð±Ð° Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ¸ Ð³Ð¾Ñ‚Ð¾Ð²Ð° Ð¿Ð¾Ð¼Ð¾Ñ‡ÑŒ Ñ Ð¾Ð¿ÐµÑ€Ð°Ñ‚Ð¸Ð²Ð½Ñ‹Ð¼Ð¸ Ð²Ð¾Ð¿Ñ€Ð¾ÑÐ°Ð¼Ð¸ Ð¸ ÑÑ€Ð¾Ñ‡Ð½Ñ‹Ð¼Ð¸ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°Ð¼Ð¸.",
          supportPhoneTitle: "Ð¢ÐµÐ»ÐµÑ„Ð¾Ð½Ð½Ð°Ñ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ°",
          supportPhoneDesc: "Ð¡Ð²ÑÐ¶Ð¸Ñ‚ÐµÑÑŒ Ñ Ð½Ð°ÑˆÐµÐ¹ ÑÐ»ÑƒÐ¶Ð±Ð¾Ð¹ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ¸",
          supportPhoneHours: "ÐŸÐ½-ÐŸÑ‚: 8:00 - 18:00 (EST)",
          supportEmailTitle: "ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ° Ð¿Ð¾ email",
          supportEmailDesc: "ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð»ÑÐ¹Ñ‚Ðµ Ð¿Ð¾Ð´Ñ€Ð¾Ð±Ð½Ñ‹Ðµ Ð·Ð°Ð¿Ñ€Ð¾ÑÑ‹ Ð¸ Ð´Ð¾ÐºÑƒÐ¼ÐµÐ½Ñ‚Ñ‹",
          supportEmailResponse: "ÐžÑ‚Ð²ÐµÑ‚ Ð² Ñ‚ÐµÑ‡ÐµÐ½Ð¸Ðµ 24 Ñ‡Ð°ÑÐ¾Ð²",
          supportEmergencyTitle: "Ð­ÐºÑÑ‚Ñ€ÐµÐ½Ð½Ð°Ñ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ°",
          supportEmergencyDesc: "ÐšÑ€ÑƒÐ³Ð»Ð¾ÑÑƒÑ‚Ð¾Ñ‡Ð½Ð°Ñ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ° ÑÑ€Ð¾Ñ‡Ð½Ñ‹Ñ… Ð²Ð¾Ð¿Ñ€Ð¾ÑÐ¾Ð² ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸",
          supportEmergencyNote: "Ð”Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾ 24/7 Ð´Ð»Ñ ÑÐºÑÑ‚Ñ€ÐµÐ½Ð½Ñ‹Ñ… ÑÐ»ÑƒÑ‡Ð°ÐµÐ²",
          responseGuaranteeTitle: "Ð“Ð°Ñ€Ð°Ð½Ñ‚Ð¸Ñ Ð±Ñ‹ÑÑ‚Ñ€Ð¾Ð³Ð¾ Ð¾Ñ‚Ð²ÐµÑ‚Ð°",
          responsePhone: "ÐžÑ‚Ð²ÐµÑ‚ Ð½Ð° Ð·Ð²Ð¾Ð½ÐºÐ¸ Ð² Ñ‚ÐµÑ‡ÐµÐ½Ð¸Ðµ 3 Ð³ÑƒÐ´ÐºÐ¾Ð²",
          responseEmail: "ÐžÑ‚Ð²ÐµÑ‚ Ð¿Ð¾ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð¹ Ð¿Ð¾Ñ‡Ñ‚Ðµ Ð² Ñ‚ÐµÑ‡ÐµÐ½Ð¸Ðµ 24 Ñ‡Ð°ÑÐ¾Ð²",
          responseQuote: "ÐžÐ±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° Ð·Ð°Ð¿Ñ€Ð¾ÑÐ¾Ð² Ð½Ð° Ñ€Ð°ÑÑ‡ÐµÑ‚ Ð² Ñ‚ÐµÑ‡ÐµÐ½Ð¸Ðµ 48 Ñ‡Ð°ÑÐ¾Ð²",
          labels: {
            firstName: "Ð˜Ð¼Ñ *",
            lastName: "Ð¤Ð°Ð¼Ð¸Ð»Ð¸Ñ *",
            email: "ÐÐ´Ñ€ÐµÑ ÑÐ»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð¾Ð¹ Ð¿Ð¾Ñ‡Ñ‚Ñ‹ *",
            phone: "ÐÐ¾Ð¼ÐµÑ€ Ñ‚ÐµÐ»ÐµÑ„Ð¾Ð½Ð°",
            company: "ÐšÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ñ *",
            industry: "ÐžÑ‚Ñ€Ð°ÑÐ»ÑŒ",
            service: "Ð¢Ñ€ÐµÐ±ÑƒÐµÐ¼Ð°Ñ ÑƒÑÐ»ÑƒÐ³Ð°",
            message: "Ð¡Ð¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ *",
            consent: "Ð¯ ÑÐ¾Ð³Ð»Ð°ÑÐµÐ½ Ð½Ð° Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÑƒ INSPECTORS Ð¼Ð¾Ð¸Ñ… Ð¿ÐµÑ€ÑÐ¾Ð½Ð°Ð»ÑŒÐ½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ… Ð´Ð»Ñ Ð¾Ñ‚Ð²ÐµÑ‚Ð° Ð½Ð° Ð¼Ð¾Ð¹ Ð·Ð°Ð¿Ñ€Ð¾Ñ. Ð¯ Ð¿Ð¾Ð½Ð¸Ð¼Ð°ÑŽ, Ñ‡Ñ‚Ð¾ Ð¼Ð¾Ð³Ñƒ Ð¾Ñ‚Ð¾Ð·Ð²Ð°Ñ‚ÑŒ ÑÐ¾Ð³Ð»Ð°ÑÐ¸Ðµ Ð² Ð»ÑŽÐ±Ð¾Ðµ Ð²Ñ€ÐµÐ¼Ñ."
          },
          placeholders: {
            firstName: "Ð˜Ð²Ð°Ð½",
            lastName: "Ð˜Ð²Ð°Ð½Ð¾Ð²",
            email: "ivan.ivanov@company.com",
            phone: "+7 (999) 123-45-67",
            company: "ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð²Ð°ÑˆÐµÐ¹ ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸",
            selectIndustry: "Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ Ð¾Ñ‚Ñ€Ð°ÑÐ»ÑŒ",
            selectService: "Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ ÑƒÑÐ»ÑƒÐ³Ñƒ",
            message: "ÐžÐ¿Ð¸ÑˆÐ¸Ñ‚Ðµ Ð²Ð°ÑˆÐ¸ Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸Ñ, ÑÑ€Ð¾ÐºÐ¸ Ð¸ ÐºÐ¾Ð½ÐºÑ€ÐµÑ‚Ð½Ñ‹Ðµ Ð²Ð¾Ð¿Ñ€Ð¾ÑÑ‹..."
          },
          cta: {
            send: "ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ",
            sending: "ÐžÑ‚Ð¿Ñ€Ð°Ð²ÐºÐ°..."
          }
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "ÐŸÐ¾Ð»Ð½Ñ‹Ð¹ Ð¿Ð¾Ñ€Ñ‚Ñ„ÐµÐ»ÑŒ ÑƒÑÐ»ÑƒÐ³",
          subheading: "ÐžÑ‚ Ñ‚ÐµÑÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ‚Ð¾Ð² Ð´Ð¾ ÑÐ¾Ð±Ð»ÑŽÐ´ÐµÐ½Ð¸Ñ Ð½Ð¾Ñ€Ð¼Ð°Ñ‚Ð¸Ð²Ð½Ñ‹Ñ… Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸Ð¹, Ð¼Ñ‹ Ð¿Ñ€ÐµÐ´Ð¾ÑÑ‚Ð°Ð²Ð»ÑÐµÐ¼ ÐºÐ¾Ð¼Ð¿Ð»ÐµÐºÑÐ½Ñ‹Ðµ Ñ€ÐµÑˆÐµÐ½Ð¸Ñ Ð´Ð»Ñ ÑƒÑÐ¿ÐµÑ…Ð° Ð½Ð° Ð³Ð»Ð¾Ð±Ð°Ð»ÑŒÐ½Ñ‹Ñ… Ñ€Ñ‹Ð½ÐºÐ°Ñ….",
        },
        servicesList: [
          {
            id: 1,
            title: "Ð¢ÐµÑÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ (T)",
            description: "ÐšÐ¾Ð¼Ð¿Ð»ÐµÐºÑÐ½Ñ‹Ðµ ÑƒÑÐ»ÑƒÐ³Ð¸ Ñ‚ÐµÑÑ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ Ð´Ð»Ñ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸ Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾ÑÑ‚Ð¸, Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚Ð¸ Ð¸ ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ñ Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸ÑÐ¼.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "ÐÐµÑ€Ð°Ð·Ñ€ÑƒÑˆÐ°ÑŽÑ‰Ð¸Ð¹ ÐºÐ¾Ð½Ñ‚Ñ€Ð¾Ð»ÑŒ",
              "ÐŸÑ€Ð¾Ð¸Ð·Ð²Ð¾Ð´Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚ÑŒ Ð¸ Ð½Ð°Ð´ÐµÐ¶Ð½Ð¾ÑÑ‚ÑŒ",
              "Ð¡Ð¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ðµ ÑÑ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚Ð°Ð¼",
            ]
          },
          {
            id: 2,
            title: "ÐœÐ¾Ð½Ð¸Ñ‚Ð¾Ñ€Ð¸Ð½Ð³ Ð¿Ð¾ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸ÑŽ (INSPECTORS)",
            description: "ÐŸÑ€ÐµÐ´Ð¸ÐºÑ‚Ð¸Ð²Ð½Ð¾Ðµ Ð¾Ð±ÑÐ»ÑƒÐ¶Ð¸Ð²Ð°Ð½Ð¸Ðµ Ñ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸ÐµÐ¼ Ð°Ð½Ð°Ð»Ð¸Ñ‚Ð¸ÐºÐ¸, Ð´Ð°Ñ‚Ñ‡Ð¸ÐºÐ¾Ð² Ð¸ Ð´Ð¸Ð°Ð³Ð½Ð¾ÑÑ‚Ð¸ÐºÐ¸ Ð´Ð»Ñ ÑÐ½Ð¸Ð¶ÐµÐ½Ð¸Ñ Ð¿Ñ€Ð¾ÑÑ‚Ð¾ÐµÐ².",
            icon: "Settings",
            link: "/services/INSPECTORS",
            features: [
              "ÐÐ½Ð°Ð»Ð¸Ð· Ð²Ð¸Ð±Ñ€Ð°Ñ†Ð¸Ð¸ Ð¸ Ð°ÐºÑƒÑÑ‚Ð¸ÐºÐ¸",
              "Ð¢ÐµÑ€Ð¼Ð¾Ð³Ñ€Ð°Ñ„Ð¸Ñ Ð¸ Ð°Ð½Ð°Ð»Ð¸Ð· Ð¼Ð°ÑÐ»Ð°",
              "ÐŸÐ°Ð½ÐµÐ»Ð¸ ÑÐ¾ÑÑ‚Ð¾ÑÐ½Ð¸Ñ Ð°ÐºÑ‚Ð¸Ð²Ð¾Ð²",
            ]
          },
          {
            id: 3,
            title: "Ð˜Ð½ÑÐ¿ÐµÐºÑ†Ð¸Ñ (I)",
            description: "ÐÐµÐ·Ð°Ð²Ð¸ÑÐ¸Ð¼Ñ‹Ðµ Ð¸Ð½ÑÐ¿ÐµÐºÑ†Ð¸Ð¾Ð½Ð½Ñ‹Ðµ ÑƒÑÐ»ÑƒÐ³Ð¸, Ð¾Ð±ÐµÑÐ¿ÐµÑ‡Ð¸Ð²Ð°ÑŽÑ‰Ð¸Ðµ ÐºÐ°Ñ‡ÐµÑÑ‚Ð²Ð¾ Ð¸ ÑÐ¾Ð±Ð»ÑŽÐ´ÐµÐ½Ð¸Ðµ Ð½Ð¾Ñ€Ð¼Ð°Ñ‚Ð¸Ð²Ð½Ñ‹Ñ… Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸Ð¹.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "Ð˜Ð½ÑÐ¿ÐµÐºÑ†Ð¸Ñ Ñ‚Ñ€ÐµÑ‚ÑŒÐµÐ¹ ÑÑ‚Ð¾Ñ€Ð¾Ð½Ð¾Ð¹",
              "ÐÐ°Ð´Ð·Ð¾Ñ€ Ð·Ð° Ð¿Ð¾ÑÑ‚Ð°Ð²Ñ‰Ð¸ÐºÐ°Ð¼Ð¸",
              "ÐÑƒÐ´Ð¸Ñ‚ Ð¿Ð»Ð¾Ñ‰Ð°Ð´Ð¾Ðº Ð¸ Ð·Ð°Ð²Ð¾Ð´Ð¾Ð²",
            ]
          },
          {
            id: 4,
            title: "ÐÑƒÐ´Ð¸Ñ‚ (A)",
            description: "ÐÑƒÐ´Ð¸Ñ‚ Ð¿Ñ€Ð¾Ñ†ÐµÑÑÐ¾Ð², Ð¿Ð¾ÑÑ‚Ð°Ð²Ñ‰Ð¸ÐºÐ¾Ð² Ð¸ ÑÐ¸ÑÑ‚ÐµÐ¼ Ð´Ð»Ñ Ð²Ñ‹ÑÐ²Ð»ÐµÐ½Ð¸Ñ Ñ€Ð¸ÑÐºÐ¾Ð² Ð¸ ÑÑ‚Ð¸Ð¼ÑƒÐ»Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ ÑƒÐ»ÑƒÑ‡ÑˆÐµÐ½Ð¸Ð¹.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "ÐÑƒÐ´Ð¸Ñ‚ Ð¿Ð¾ÑÑ‚Ð°Ð²Ñ‰Ð¸ÐºÐ¾Ð²",
              "ÐžÐ±Ð·Ð¾Ñ€ Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´ÑÑ‚Ð²ÐµÐ½Ð½Ñ‹Ñ… Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚ÐµÐ¹",
              "ÐÐ½Ð°Ð»Ð¸Ð· Ð¿Ñ€Ð¾Ð±ÐµÐ»Ð¾Ð² Ð² ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ð¸",
            ]
          },
          {
            id: 5,
            title: "Ð’ÐµÑ€Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ Ð¸ Ð¡ÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ (VC)",
            description: "Ð£ÑÐ»ÑƒÐ³Ð¸ Ð²ÐµÑ€Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸ Ð¸ ÑÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸ Ð´Ð»Ñ Ð´ÐµÐ¼Ð¾Ð½ÑÑ‚Ñ€Ð°Ñ†Ð¸Ð¸ Ð´Ð¾Ð²ÐµÑ€Ð¸Ñ Ð¸ ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ñ Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸ÑÐ¼.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Ð¡Ð¸ÑÑ‚ÐµÐ¼Ñ‹ Ð¼ÐµÐ½ÐµÐ´Ð¶Ð¼ÐµÐ½Ñ‚Ð°",
              "Ð¡ÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ Ð¿Ñ€Ð¾Ð´ÑƒÐºÑ†Ð¸Ð¸",
              "Ð ÐµÐ³ÑƒÐ»ÑÑ‚Ð¾Ñ€Ð½Ñ‹Ðµ Ð¾Ð´Ð¾Ð±Ñ€ÐµÐ½Ð¸Ñ",
            ]
          },
          {
            id: 6,
            title: "Ð˜Ð½Ð½Ð¾Ð²Ð°Ñ†Ð¸Ð¸ Ð¸ ÐÐ˜ÐžÐšÐ ",
            description: "Ð ÐµÑˆÐµÐ½Ð¸Ñ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÐµÐ³Ð¾ Ð¿Ð¾ÐºÐ¾Ð»ÐµÐ½Ð¸Ñ Ð½Ð° Ð¾ÑÐ½Ð¾Ð²Ðµ IoT, Ð˜Ð˜, Ñ€Ð¾Ð±Ð¾Ñ‚Ð¾Ñ‚ÐµÑ…Ð½Ð¸ÐºÐ¸ Ð¸ Ñ‚ÐµÑ…Ð½Ð¾Ð»Ð¾Ð³Ð¸Ð¹ Ð˜Ð½Ð´ÑƒÑÑ‚Ñ€Ð¸Ð¸ 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "ÐœÐ¾Ð½Ð¸Ñ‚Ð¾Ñ€Ð¸Ð½Ð³ IoT Ð¸ Ð˜Ð˜",
              "Ð Ð¾Ð±Ð¾Ñ‚Ð¸Ð·Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ð°Ñ Ð¸Ð½ÑÐ¿ÐµÐºÑ†Ð¸Ñ",
              "Ð¢ÐµÑ…Ð½Ð¾Ð»Ð¾Ð³Ð¸Ñ Ñ†Ð¸Ñ„Ñ€Ð¾Ð²Ð¾Ð³Ð¾ Ð´Ð²Ð¾Ð¹Ð½Ð¸ÐºÐ°",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "72+",
          label: "ÐžÐ±ÑÐ»ÑƒÐ¶Ð¸Ð²Ð°ÐµÐ¼Ñ‹Ðµ Ð¡Ñ‚Ñ€Ð°Ð½Ñ‹",
          description: "Ð“Ð»Ð¾Ð±Ð°Ð»ÑŒÐ½Ð¾Ðµ Ð¿Ñ€Ð¸ÑÑƒÑ‚ÑÑ‚Ð²Ð¸Ðµ Ñ Ð¼ÐµÑÑ‚Ð½Ð¾Ð¹ ÑÐºÑÐ¿ÐµÑ€Ñ‚Ð¸Ð·Ð¾Ð¹"
        },
        {
          number: "7,000+",
          label: "Ð­ÐºÑÐ¿ÐµÑ€Ñ‚Ð¾Ð² Ð¿Ð¾ ÐœÐ¸Ñ€Ñƒ",
          description: "Ð’Ñ‹ÑÐ¾ÐºÐ¾ÐºÐ²Ð°Ð»Ð¸Ñ„Ð¸Ñ†Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ðµ ÑÐ¿ÐµÑ†Ð¸Ð°Ð»Ð¸ÑÑ‚Ñ‹"
        },
        {
          number: "25+",
          label: "Ð˜ÑÐ¿Ñ‹Ñ‚Ð°Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ñ… Ð›Ð°Ð±Ð¾Ñ€Ð°Ñ‚Ð¾Ñ€Ð¸Ð¹",
          description: "Ð¡Ð¾Ð²Ñ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ðµ Ð¾Ð±ÑŠÐµÐºÑ‚Ñ‹"
        },
        {
          number: "33",
          label: "Ð›ÐµÑ‚ Ð¡Ð¾Ð²ÐµÑ€ÑˆÐµÐ½ÑÑ‚Ð²Ð°",
          description: "Ð”Ð¾Ð²ÐµÑ€Ð¸Ðµ Ñ 1866 Ð³Ð¾Ð´Ð°"
        }
      ],
    },
  
    zh: {
      navbar: {
        services: "æœåŠ¡",
        industries: "è¡Œä¸š",
        about: "å…³äºŽ",
        careers: "èŒä¸šå‘å±•",
        blog: "åšå®¢",
        contact: "è”ç³»æˆ‘ä»¬",
        getQuote: "èŽ·å–æŠ¥ä»·",
        contactUs: "è”ç³»æˆ‘ä»¬",
      },
      footer: {
        company: "INSPECTORS",
        description:
          "é¢†å…ˆçš„æµ‹è¯•ã€æ£€éªŒã€è®¤è¯å’Œå’¨è¯¢æœåŠ¡æä¾›å•†ã€‚è‡´åŠ›äºŽå…¨çƒå®‰å…¨ã€ä¿éšœå’Œå¯æŒç»­å‘å±•ã€‚",
        services: {
          title: "æœåŠ¡",
          list: [
            "æµ‹è¯•ä¸Žè®¤è¯",
            "æ£€éªŒæœåŠ¡",
            "å®¡è®¡ä¸Žè¯„ä¼°",
            "åŸ¹è®­ä¸Žæ•™è‚²",
            "æ•°å­—è§£å†³æ–¹æ¡ˆ",
            "å’¨è¯¢æœåŠ¡",
          ],
        },
        industries: {
          title: "è¡Œä¸š",
          list: [
            "æ±½è½¦",
            "åŒ»ç–—ä¿å¥ä¸ŽåŒ»ç–—",
            "èƒ½æºä¸Žå…¬ç”¨äº‹ä¸š",
            "åˆ¶é€ ä¸š",
            "å»ºç­‘",
            "é£Ÿå“ä¸Žå†œä¸š",
          ],
        },
        contact: {
          title: "è”ç³»æˆ‘ä»¬",
          address: "INSPECTORS ç¾Žå›½\n10040 Mesa Rim Road\nåœ£åœ°äºšå“¥ï¼ŒåŠ å·ž 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@INSPECTORS.com",
        },
        newsletter: "ä¿æŒæ›´æ–°",
        placeholderEmail: "è¾“å…¥æ‚¨çš„ç”µå­é‚®ä»¶",
      },
      pages: {
        services: {
          hero: {
            title: "é¢†å…ˆçš„æµ‹è¯•ã€æ£€éªŒå’Œè®¤è¯æœåŠ¡",
            subtitle: "å…¨çƒä¿¡èµ–",
            description: "é€šè¿‡å…¨é¢çš„æµ‹è¯•ã€æ£€éªŒã€è®¤è¯å’Œå’¨è¯¢æœåŠ¡ç¡®ä¿å„è¡Œä¸šçš„å®‰å…¨ã€ä¿éšœå’Œå¯æŒç»­æ€§ã€‚",
            primaryCTAText: "æŽ¢ç´¢æœåŠ¡",
            secondaryCTAText: "èŽ·å–æŠ¥ä»·",
          },
        },
        about: {
          title: "å…³äºŽ",
          breadcrumb: {
            home: "é¦–é¡µ",
            about: "å…³äºŽ"
          },
          loading: "åŠ è½½ä¸­...",
          error: "å†…å®¹åŠ è½½å¤±è´¥"
        },
        careers: {
          title: "å½“å‰èŒä½ç©ºç¼º",
          description: "æŽ¢ç´¢æˆ‘ä»¬å…¨çƒç»„ç»‡ä¸­æ¿€åŠ¨äººå¿ƒçš„èŒä¸šå‘å±•æœºä¼šã€‚æ‰¾åˆ°ç†æƒ³çš„èŒä½ï¼ŒåŠ©æ‚¨èŒä¸šå‘å±•ã€‚",
          applyNow: "ç«‹å³ç”³è¯·",
          hiringProcess: {
            title: "æˆ‘ä»¬çš„æ‹›è˜æµç¨‹",
            description: "æˆ‘ä»¬è®¾è®¡çš„æµç¨‹é€æ˜Žã€é«˜æ•ˆï¼Œå¹¶ä¸“æ³¨äºŽå¯»æ‰¾åˆé€‚çš„ç›¸äº’å¥‘åˆç‚¹ã€‚",
            steps: {
              review: {
                title: "ç”³è¯·å®¡æ ¸",
                description: "æˆ‘ä»¬çš„äººæ‰å›¢é˜Ÿå°†æ ¹æ®èŒä½è¦æ±‚å®¡æ ¸æ‚¨çš„ç”³è¯·å’Œèµ„æ ¼ã€‚"
              },
              interview: {
                title: "åˆæ¬¡é¢è¯•",
                description: "é€šè¿‡ç”µè¯æˆ–è§†é¢‘é¢è¯•æ¥è®¨è®ºæ‚¨çš„èƒŒæ™¯ã€å…´è¶£ä»¥åŠæ˜¯å¦é€‚åˆè¯¥èŒä½ã€‚"
              },
              assessment: {
                title: "æŠ€æœ¯è¯„ä¼°",
                description: "ç‰¹å®šè§’è‰²çš„æŠ€æœ¯è¯„ä¼°æˆ–æ¡ˆä¾‹ç ”ç©¶æ¥è¯„ä¼°æ‚¨çš„èƒ½åŠ›ã€‚"
              },
              final: {
                title: "æœ€ç»ˆé¢è¯•",
                description: "ä¸Žæ‹›è˜ç»ç†å’Œå›¢é˜Ÿæˆå‘˜ä¼šé¢ï¼Œè®¨è®ºåˆä½œå’ŒåŽç»­æ­¥éª¤ã€‚"
              }
            }
          },
          currentOpenings: {
            loadingText: "æ­£åœ¨åŠ è½½èŒä¸š...",
            generalApplicationText: "æ²¡æœ‰æ‰¾åˆ°åˆé€‚çš„èŒä½ï¼Ÿæˆ‘ä»¬ä¸€ç›´åœ¨å¯»æ‰¾æœ‰æ‰åŽçš„äººæ‰ã€‚",
            submitGeneralApplication: "æäº¤é€šç”¨ç”³è¯·"
          }
        },
        blog: {
          title: "æœ€æ–°æ–‡ç« ",
          description: "æ¥è‡ªæˆ‘ä»¬ä¸“å®¶å›¢é˜Ÿçš„æŠ€æœ¯è§è§£å’Œè¡Œä¸šæ›´æ–°ã€‚"
        },
        contact: {
          officesTitle: "æˆ‘ä»¬çš„å…¨çƒåŠžäº‹å¤„",
          officesDescription: "æˆ‘ä»¬åœ¨å…¨çƒå„åœ°è®¾æœ‰åŠžäº‹å¤„ï¼Œéšæ—¶ä¸ºæ‚¨æä¾›æœåŠ¡ã€‚æŸ¥æ‰¾æ‚¨é™„è¿‘çš„ INSPECTORS åŠžäº‹å¤„ï¼ŒèŽ·å–æœ¬åœ°æ”¯æŒå’ŒæœåŠ¡ã€‚",
          formTitle: "ç»™æˆ‘ä»¬ç•™è¨€",
          formDescription: "å¡«å†™ä¸‹é¢çš„è¡¨æ ¼ï¼Œæˆ‘ä»¬çš„ä¸“å®¶å°†åœ¨ 24 å°æ—¶å†…å›žå¤æ‚¨ã€‚",
          supportTitle: "èŽ·å¾—ç›´æŽ¥æ”¯æŒ",
          supportDescription: "æƒ³ç›´æŽ¥è”ç³»ï¼Ÿæˆ‘ä»¬çš„å®¢æˆ·æ”¯æŒå›¢é˜Ÿéšæ—¶å‡†å¤‡è§£ç­”æ‚¨çš„ç´§æ€¥é—®é¢˜å’Œè¯·æ±‚ã€‚",
          supportPhoneTitle: "ç”µè¯æ”¯æŒ",
          supportPhoneDesc: "ä¸Žæˆ‘ä»¬çš„å®¢æˆ·æœåŠ¡å›¢é˜Ÿè”ç³»",
          supportPhoneHours: "å‘¨ä¸€è‡³å‘¨äº”ï¼šä¸Šåˆ 8:00 - ä¸‹åˆ 6:00ï¼ˆä¸œéƒ¨æ ‡å‡†æ—¶é—´ï¼‰",
          supportEmailTitle: "ç”µå­é‚®ä»¶æ”¯æŒ",
          supportEmailDesc: "å‘é€è¯¦ç»†çš„è¯¢é—®å’Œæ–‡ä»¶",
          supportEmailResponse: "24å°æ—¶å†…å›žå¤",
          supportEmergencyTitle: "ç´§æ€¥æ”¯æ´",
          supportEmergencyDesc: "å…¨å¤©å€™æ”¯æŒç´§æ€¥è®¤è¯é—®é¢˜",
          supportEmergencyNote: "å…¨å¤©å€™æä¾›ç´§æ€¥æœåŠ¡",
          responseGuaranteeTitle: "å¿«é€Ÿå“åº”ä¿è¯",
          responsePhone: "ç”µè¯å’¨è¯¢åœ¨ 3 å£°å“é“ƒå†…å¾—åˆ°ç­”å¤",
          responseEmail: "24å°æ—¶å†…å›žå¤ç”µå­é‚®ä»¶",
          responseQuote: "æŠ¥ä»·è¯·æ±‚åœ¨ 48 å°æ—¶å†…å¤„ç†",
          labels: {
            firstName: "å *",
            lastName: "å§“ *",
            email: "ç”µå­é‚®ä»¶åœ°å€ *",
            phone: "ç”µè¯å·ç ",
            company: "å…¬å¸ *",
            industry: "è¡Œä¸š",
            service: "éœ€è¦æœåŠ¡",
            message: "ä¿¡æ¯ *",
            consent: "æˆ‘åŒæ„ INSPECTORS å¤„ç†æˆ‘çš„ä¸ªäººæ•°æ®ä»¥å›žå¤æˆ‘çš„å’¨è¯¢ã€‚æˆ‘ç†è§£æˆ‘å¯ä»¥éšæ—¶æ’¤å›žåŒæ„ã€‚"
          },
          placeholders: {
            firstName: "çº¦ç¿°",
            lastName: "å¤šä¼Š",
            email: "john.doe@company.com",
            phone: "+1 (555) 123-4567",
            company: "æ‚¨çš„å…¬å¸åç§°",
            selectIndustry: "é€‰æ‹©è¡Œä¸š",
            selectService: "é€‰æ‹©æœåŠ¡",
            message: "è¯·æè¿°æ‚¨çš„è¦æ±‚ã€æ—¶é—´è¡¨ä»¥åŠä»»ä½•å…·ä½“é—®é¢˜â€¦â€¦"
          },
          cta: {
            send: "å‘é€æ¶ˆæ¯",
            sending: "æ­£åœ¨å‘é€..."
          }
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "å®Œæ•´çš„æœåŠ¡ç»„åˆ",
          subheading: "ä»Žäº§å“æµ‹è¯•åˆ°æ³•è§„éµä»Žï¼Œæˆ‘ä»¬æä¾›å…¨é¢çš„è§£å†³æ–¹æ¡ˆï¼Œå¸®åŠ©æ‚¨åœ¨å…¨çƒå¸‚åœºå–å¾—æˆåŠŸã€‚",
        },
        servicesList: [
          {
            id: 1,
            title: "æµ‹è¯•ï¼ˆTï¼‰",
            description: "å…¨é¢çš„æµ‹è¯•æœåŠ¡ï¼Œä»¥éªŒè¯å®‰å…¨æ€§ã€æ€§èƒ½å’Œåˆè§„æ€§ã€‚",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "æ— æŸæ£€æµ‹",
              "æ€§èƒ½å’Œå¯é æ€§",
              "æ ‡å‡†åˆè§„æ€§",
            ]
          },
          {
            id: 2,
            title: "åŸºäºŽçŠ¶æ€çš„ç›‘æµ‹ï¼ˆINSPECTORSï¼‰",
            description: "ä½¿ç”¨åˆ†æžã€ä¼ æ„Ÿå™¨å’Œè¯Šæ–­è¿›è¡Œé¢„æµ‹æ€§ç»´æŠ¤ä»¥å‡å°‘åœæœºæ—¶é—´ã€‚",
            icon: "Settings",
            link: "/services/INSPECTORS",
            features: [
              "æŒ¯åŠ¨å’Œå£°å­¦åˆ†æž",
              "çƒ­æˆåƒå’Œæ²¹åˆ†æž",
              "èµ„äº§å¥åº·ä»ªè¡¨æ¿",
            ]
          },
          {
            id: 3,
            title: "æ£€æŸ¥ï¼ˆIï¼‰",
            description: "ç‹¬ç«‹æ£€éªŒæœåŠ¡ç¡®ä¿è´¨é‡å’Œæ³•è§„éµå®ˆã€‚",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "ç¬¬ä¸‰æ–¹æ£€éªŒ",
              "ä¾›åº”å•†ç›‘æŽ§",
              "çŽ°åœºå’Œå·¥åŽ‚å®¡æ ¸",
            ]
          },
          {
            id: 4,
            title: "å®¡è®¡ï¼ˆAï¼‰",
            description: "æµç¨‹ã€ä¾›åº”å•†å’Œç³»ç»Ÿå®¡è®¡ï¼Œä»¥è¯†åˆ«é£Žé™©å¹¶æŽ¨åŠ¨æ”¹è¿›ã€‚",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "ä¾›åº”å•†å®¡æ ¸",
              "è¿‡ç¨‹èƒ½åŠ›è¯„å®¡",
              "åˆè§„å·®è·åˆ†æž",
            ]
          },
          {
            id: 5,
            title: "éªŒè¯ä¸Žè®¤è¯ï¼ˆVCï¼‰",
            description: "éªŒè¯å’Œè®¤è¯æœåŠ¡ä»¥è¯æ˜Žä¿¡ä»»å’Œåˆè§„æ€§ã€‚",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "ç®¡ç†ç³»ç»Ÿ",
              "äº§å“è®¤è¯",
              "ç›‘ç®¡éƒ¨é—¨æ‰¹å‡†",
            ]
          },
          {
            id: 6,
            title: "åˆ›æ–°ä¸Žç ”å‘",
            description: "ç”±ç‰©è”ç½‘ã€äººå·¥æ™ºèƒ½ã€æœºå™¨äººå’Œå·¥ä¸š 4.0 æŠ€æœ¯æ”¯æŒçš„ä¸‹ä¸€ä»£è§£å†³æ–¹æ¡ˆã€‚",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "ç‰©è”ç½‘å’Œäººå·¥æ™ºèƒ½ç›‘æŽ§",
              "æœºå™¨äººæ£€æŸ¥",
              "æ•°å­—å­ªç”ŸæŠ€æœ¯",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "72+",
          label: "æœåŠ¡å›½å®¶",
          description: "æ‹¥æœ‰æœ¬åœ°ä¸“ä¸šçŸ¥è¯†çš„å…¨çƒå½±å“åŠ›"
        },
        {
          number: "7,000+",
          label: "å…¨çƒä¸“å®¶",
          description: "é«˜ç´ è´¨çš„ä¸“ä¸šäººå‘˜"
        },
        {
          number: "25+",
          label: "æµ‹è¯•å®žéªŒå®¤",
          description: "æœ€å…ˆè¿›çš„è®¾æ–½"
        },
        {
          number: "33",
          label: "å¤šå¹´çš„å“è¶Šæˆå°±",
          description: "è‡ª 1866 å¹´ä»¥æ¥å€¼å¾—ä¿¡èµ–"
        }
      ],
    },
  };
  
  module.exports = translations;




