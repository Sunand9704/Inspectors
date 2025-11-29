
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
        company: "CBM",
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
          address: "CBM America\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@cbm.com",
        },
        newsletter: "Stay Updated",
        placeholderEmail: "Enter your email",
      },
      pages: {
        services: {
          hero: {
            title: " Inspectors 360°",
            subtitle: "Trusted Worldwide",
            description: "We provide global workforce, staffing, and technical support solutions, delivering certified professionals and equipment to ensure safety, compliance, and performance across Oil & Gas, Mining, and Industrial sectors.",
            primaryCTAText: "Explore Services",
            secondaryCTAText: "Get Quote",
          },
          servicesOverview: {
            title: "Services",
            description: "we provide complete inspection workforce and technical support solutions, including recruitment, contract staffing, payroll, logistics, and training—ensuring qualified professionals and reliable service for every project."
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
          description: "Join INSPECTORS 360 and become part of a global network of certified inspectors, engineers, and technical professionals. We connect skilled talent with leading projects across Oil & Gas, Mining, and Industrial sectors worldwide.",
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
          },
          generalApplication: {
            title: "General Application",
            personalInfo: {
              title: "Personal Information",
              firstName: "First Name *",
              lastName: "Last Name *",
              email: "Email *",
              phone: "Phone *"
            },
            positionInfo: {
              title: "Position Information",
              desiredPosition: "Desired Position *",
              desiredPositionPlaceholder: "e.g., Senior Test Engineer",
              preferredDepartment: "Preferred Department *",
              preferredDepartmentPlaceholder: "Select department",
              departments: {
                engineering: "Engineering",
                healthcare: "Healthcare",
                technology: "Technology",
                manufacturing: "Manufacturing",
                environmental: "Environmental",
                sales: "Sales",
                marketing: "Marketing",
                finance: "Finance",
                humanResources: "Human Resources",
                operations: "Operations",
                other: "Other"
              }
            },
            experience: {
              label: "Years of Experience *",
              placeholder: "Select experience level",
              options: {
                zeroToOne: "0-1 years",
                twoToThree: "2-3 years",
                fourToFive: "4-5 years",
                sixToEight: "6-8 years",
                nineToTwelve: "9-12 years",
                thirteenPlus: "13+ years"
              }
            },
            resume: {
              label: "Resume/CV *",
              uploadText: "Click to upload your resume (PDF, DOC, DOCX)",
              maxSize: "Maximum file size: 5MB",
              chooseFile: "Choose File"
            },
            coverLetter: {
              label: "Cover Letter *",
              placeholder: "Tell us about your background, skills, and why you're interested in joining CBM..."
            },
            actions: {
              reset: "Reset",
              submit: "Submit Application",
              submitting: "Submitting..."
            },
            toasts: {
              invalidFileType: "Invalid file type",
              invalidFileTypeDesc: "Please upload PDF, DOC, or DOCX files only.",
              fileTooLarge: "File too large",
              fileTooLargeDesc: "File size must be less than 5MB.",
              resumeRequired: "Resume required",
              resumeRequiredDesc: "Please upload your resume/CV.",
              missingInfo: "Missing information",
              missingInfoDesc: "Please fill in: ",
              invalidEmail: "Invalid email",
              invalidEmailDesc: "Please enter a valid email address.",
              successTitle: "Application submitted!",
              successDesc: "Thank you for your application. We'll be in touch soon.",
              failureTitle: "Submission failed",
              failureDesc: "Failed to submit application. Please try again."
            }
          }
        },
        blog: {
          title: "Latest Articles",
          description: "Stay updated with the latest insights, trends, and best practices in inspection, workforce solutions, and industrial compliance from INSPECTORS 360."
        },
        contact: {
          officesTitle: "Our Global Offices",
          officesDescription: "With locations worldwide, we're always close to you. Find your nearest CBM office for local support and services.",
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
            consent: "I agree to CBM processing my personal data for the purpose of responding to my inquiry. I understand I can withdraw consent at any time."
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
        verifyDocuments: {
          hero: {
            badge: "Trusted Compliance Desk",
            title: "Verify Your Certificates & Technical Documents",
            description: "Upload inspection reports, compliance certificates, or calibration records securely. Our admin team will validate authenticity and respond with next steps within 24 hours.",
            ctaButton: "Start Verification",
            securityNote: "Encrypted & handled by admin only"
          },
          form: {
            title: "Submit documents for manual verification",
            description: "Provide the basic contact details and attach the certificates or reports that need validation. You can add up to 5 files (PDF, DOC/DOCX, JPG, PNG) per submission.",
            labels: {
              firstName: "First Name *",
              lastName: "Last Name *",
              email: "Official Email *",
              location: "Location *",
              company: "Company Name (optional)",
              jobTitle: "Job Title (optional)",
              comments: "Comments / Reference (optional)"
            },
            placeholders: {
              firstName: "Jane",
              lastName: "Doe",
              email: "you@company.com",
              location: "Global",
              company: "CBM 360 Global",
              jobTitle: "Operations Manager",
              comments: "Add purchase order, certificate IDs, or any special notes..."
            },
            upload: {
              label: "Upload documents *",
              dragDrop: "Drag & drop or click to upload",
              fileInfo: "Up to 5 files • Max 10MB each • PDF, DOC, DOCX, JPG, PNG",
              selectFiles: "Select Files",
              remove: "Remove"
            },
            locations: {
              "Afghanistan": "Afghanistan",
              "Albania": "Albania",
              "Algeria": "Algeria",
              "Andorra": "Andorra",
              "Angola": "Angola",
              "Antigua and Barbuda": "Antigua and Barbuda",
              "Argentina": "Argentina",
              "Armenia": "Armenia",
              "Australia": "Australia",
              "Austria": "Austria",
              "Azerbaijan": "Azerbaijan",
              "Bahamas": "Bahamas",
              "Bahrain": "Bahrain",
              "Bangladesh": "Bangladesh",
              "Barbados": "Barbados",
              "Belarus": "Belarus",
              "Belgium": "Belgium",
              "Belize": "Belize",
              "Benin": "Benin",
              "Bhutan": "Bhutan",
              "Bolivia": "Bolivia",
              "Bosnia and Herzegovina": "Bosnia and Herzegovina",
              "Botswana": "Botswana",
              "Brazil": "Brazil",
              "Brunei": "Brunei",
              "Bulgaria": "Bulgaria",
              "Burkina Faso": "Burkina Faso",
              "Burundi": "Burundi",
              "Cabo Verde": "Cabo Verde",
              "Cambodia": "Cambodia",
              "Cameroon": "Cameroon",
              "Canada": "Canada",
              "Central African Republic": "Central African Republic",
              "Chad": "Chad",
              "Chile": "Chile",
              "China": "China",
              "Colombia": "Colombia",
              "Comoros": "Comoros",
              "Congo (Republic of the Congo)": "Congo (Republic of the Congo)",
              "Congo (Democratic Republic of the Congo)": "Congo (Democratic Republic of the Congo)",
              "Costa Rica": "Costa Rica",
              "Côte d'Ivoire": "Côte d'Ivoire",
              "Croatia": "Croatia",
              "Cuba": "Cuba",
              "Cyprus": "Cyprus",
              "Czech Republic (Czechia)": "Czech Republic (Czechia)",
              "Denmark": "Denmark",
              "Djibouti": "Djibouti",
              "Dominica": "Dominica",
              "Dominican Republic": "Dominican Republic",
              "Ecuador": "Ecuador",
              "Egypt": "Egypt",
              "El Salvador": "El Salvador",
              "Equatorial Guinea": "Equatorial Guinea",
              "Eritrea": "Eritrea",
              "Estonia": "Estonia",
              "Eswatini (formerly Swaziland)": "Eswatini (formerly Swaziland)",
              "Ethiopia": "Ethiopia",
              "Fiji": "Fiji",
              "Finland": "Finland",
              "France": "France",
              "Gabon": "Gabon",
              "Gambia": "Gambia",
              "Georgia": "Georgia",
              "Germany": "Germany",
              "Ghana": "Ghana",
              "Greece": "Greece",
              "Grenada": "Grenada",
              "Guatemala": "Guatemala",
              "Guinea": "Guinea",
              "Guinea-Bissau": "Guinea-Bissau",
              "Guyana": "Guyana",
              "Haiti": "Haiti",
              "Honduras": "Honduras",
              "Hungary": "Hungary",
              "Iceland": "Iceland",
              "India": "India",
              "Indonesia": "Indonesia",
              "Iran": "Iran",
              "Iraq": "Iraq",
              "Ireland": "Ireland",
              "Israel": "Israel",
              "Italy": "Italy",
              "Jamaica": "Jamaica",
              "Japan": "Japan",
              "Jordan": "Jordan",
              "Kazakhstan": "Kazakhstan",
              "Kenya": "Kenya",
              "Kiribati": "Kiribati",
              "Korea, North (North Korea)": "Korea, North (North Korea)",
              "Korea, South (South Korea)": "Korea, South (South Korea)",
              "Kuwait": "Kuwait",
              "Kyrgyzstan": "Kyrgyzstan",
              "Laos": "Laos",
              "Latvia": "Latvia",
              "Lebanon": "Lebanon",
              "Lesotho": "Lesotho",
              "Liberia": "Liberia",
              "Libya": "Libya",
              "Liechtenstein": "Liechtenstein",
              "Lithuania": "Lithuania",
              "Luxembourg": "Luxembourg",
              "Madagascar": "Madagascar",
              "Malawi": "Malawi",
              "Malaysia": "Malaysia",
              "Maldives": "Maldives",
              "Mali": "Mali",
              "Malta": "Malta",
              "Marshall Islands": "Marshall Islands",
              "Mauritania": "Mauritania",
              "Mauritius": "Mauritius",
              "Mexico": "Mexico",
              "Micronesia": "Micronesia",
              "Moldova": "Moldova",
              "Monaco": "Monaco",
              "Mongolia": "Mongolia",
              "Montenegro": "Montenegro",
              "Morocco": "Morocco",
              "Mozambique": "Mozambique",
              "Myanmar (Burma)": "Myanmar (Burma)",
              "Namibia": "Namibia",
              "Nauru": "Nauru",
              "Nepal": "Nepal",
              "Netherlands": "Netherlands",
              "New Zealand": "New Zealand",
              "Nicaragua": "Nicaragua",
              "Niger": "Niger",
              "Nigeria": "Nigeria",
              "North Macedonia": "North Macedonia",
              "Norway": "Norway",
              "Oman": "Oman",
              "Pakistan": "Pakistan",
              "Palau": "Palau",
              "Panama": "Panama",
              "Papua New Guinea": "Papua New Guinea",
              "Paraguay": "Paraguay",
              "Peru": "Peru",
              "Philippines": "Philippines",
              "Poland": "Poland",
              "Portugal": "Portugal",
              "Qatar": "Qatar",
              "Romania": "Romania",
              "Russia": "Russia",
              "Rwanda": "Rwanda",
              "Saint Kitts and Nevis": "Saint Kitts and Nevis",
              "Saint Lucia": "Saint Lucia",
              "Saint Vincent and the Grenadines": "Saint Vincent and the Grenadines",
              "Samoa": "Samoa",
              "San Marino": "San Marino",
              "Sao Tome and Principe": "Sao Tome and Principe",
              "Saudi Arabia": "Saudi Arabia",
              "Senegal": "Senegal",
              "Serbia": "Serbia",
              "Seychelles": "Seychelles",
              "Sierra Leone": "Sierra Leone",
              "Singapore": "Singapore",
              "Slovakia": "Slovakia",
              "Slovenia": "Slovenia",
              "Solomon Islands": "Solomon Islands",
              "Somalia": "Somalia",
              "South Africa": "South Africa",
              "South Sudan": "South Sudan",
              "Spain": "Spain",
              "Sri Lanka": "Sri Lanka",
              "Sudan": "Sudan",
              "Suriname": "Suriname",
              "Sweden": "Sweden",
              "Switzerland": "Switzerland",
              "Syria": "Syria",
              "Taiwan* (not UN member — widely recognized)": "Taiwan* (not UN member — widely recognized)",
              "Tajikistan": "Tajikistan",
              "Tanzania": "Tanzania",
              "Thailand": "Thailand",
              "Timor-Leste": "Timor-Leste",
              "Togo": "Togo",
              "Tonga": "Tonga",
              "Trinidad and Tobago": "Trinidad and Tobago",
              "Tunisia": "Tunisia",
              "Turkey": "Turkey",
              "Turkmenistan": "Turkmenistan",
              "Tuvalu": "Tuvalu",
              "Uganda": "Uganda",
              "Ukraine": "Ukraine",
              "United Arab Emirates": "United Arab Emirates",
              "United Kingdom": "United Kingdom",
              "United States": "United States",
              "Uruguay": "Uruguay",
              "Uzbekistan": "Uzbekistan",
              "Vanuatu": "Vanuatu",
              "Vatican City (Holy See) — UN Observer": "Vatican City (Holy See) — UN Observer",
              "Venezuela": "Venezuela",
              "Vietnam": "Vietnam",
              "Yemen": "Yemen",
              "Zambia": "Zambia",
              "Zimbabwe": "Zimbabwe"
            },
            cta: {
              submit: "Send to Admin Team",
              submitting: "Sending..."
            }
          },
          sidebar: {
            whatNext: {
              title: "What happens next?",
              steps: [
                {
                  number: "1.",
                  title: "Secure review:",
                  description: "Our admin desk validates file integrity and authenticity."
                },
                {
                  number: "2.",
                  title: "Confirmation email:",
                  description: "You will receive a direct update from Support@cbm360tiv.com."
                },
                {
                  number: "3.",
                  title: "Assisted follow-up:",
                  description: "Additional clarifications or site audits are scheduled if needed."
                }
              ]
            },
            assistance: {
              title: "Need quick assistance?",
              description: "Email Support@cbm360tiv.com or call +44 7934 980214 referencing \"Verify Doc Portal\" for priority routing."
            }
          },
          toast: {
            invalidFiles: "Some files were rejected. Please check file types and size limits.",
            success: "Your documents have been sent for verification.",
            error: "Failed to send documents. Please try again."
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
            title: "Condition based Monitoring (CBM)",
            description: "Predictive maintenance using analytics, sensors, and diagnostics to reduce downtime.",
            icon: "Settings",
            link: "/services/cbm",
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
          number: "70+",
          label: "Countries Served",
          description: "Global presence with local expertise"
        },
        {
          number: "10,000+",
          label: "Expertise Supply Worldwide",
          description: "Highly qualified professionals"
        },
        {
          number: "2012",
          label: "Established",
          description: "Trusted partner since 2012"
        }
      ],
    },
  
    fr: {
      navbar: {
        services: "Services",
        industries: "Industries",
        about: "À propos",
        careers: "Carrières",
        blog: "Blog",
        contact: "Contact",
        getQuote: "Obtenir un devis",
        contactUs: "Contactez-nous",
      },
      footer: {
        company: "CBM",
        description:
          "Fournisseur leader de services de test, d'inspection, de certification et de conseil. Engagé pour la sécurité, la sûreté et la durabilité dans le monde entier.",
        services: {
          title: "Services",
          list: [
            "Tests et certification",
            "Services d'inspection",
            "Audit et évaluation",
            "Formation et éducation",
            "Solutions numériques",
            "Services de conseil",
          ],
        },
        industries: {
          title: "Industries",
          list: [
            "Automobile",
            "Santé & médical",
            "Énergie & services publics",
            "Fabrication",
            "Construction",
            "Alimentation & agriculture",
          ],
        },
        contact: {
          title: "Contact",
          address: "CBM Amérique\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@cbm.com",
        },
        newsletter: "Restez informé",
        placeholderEmail: "Entrez votre email",
      },
      pages: {
        services: {
          hero: {
            title: "Inspecteurs 360°",
            subtitle: "De confiance dans le monde entier",
            description: "Nous fournissons des solutions mondiales de main-d’œuvre, de dotation en personnel et de soutien technique, en livrant des professionnels certifiés et des équipements afin d’assurer la sécurité, la conformité et la performance dans les secteurs du pétrole et du gaz, de la mine et de l’industrie.",
            primaryCTAText: "Explorer les services",
            secondaryCTAText: "Obtenir un devis",
          },
          servicesOverview: {
            title: "Services",
            description: "we provide complete inspection workforce and technical support solutions, including recruitment, contract staffing, payroll, logistics, and training—ensuring qualified professionals and reliable service for every project."
          },
        },
        about: {
          title: "À propos",
          breadcrumb: {
            home: "Accueil",
            about: "À propos"
          },
          loading: "Chargement...",
          error: "Échec du chargement du contenu"
        },
        careers: {
          title: "Offres d'emploi actuelles",
          description: "Rejoignez INSPECTORS 360 et faites partie d’un réseau mondial d’inspecteurs, d’ingénieurs et de professionnels techniques certifiés. Nous connectons les talents qualifiés aux projets majeurs des secteurs du pétrole et du gaz, de l’exploitation minière et de l’industrie à travers le monde.",
          applyNow: "Postuler maintenant",
          hiringProcess: {
            title: "Notre processus de recrutement",
            description: "Nous avons conçu un processus transparent, efficace et axé sur la recherche de l'adéquation mutuelle.",
            steps: {
              review: {
                title: "Examen de la candidature",
                description: "Notre équipe RH examine votre candidature et vos qualifications par rapport aux exigences du poste."
              },
              interview: {
                title: "Entretien initial",
                description: "Entretien téléphonique ou vidéo pour discuter de votre parcours, de vos intérêts et de votre adéquation au poste."
              },
              assessment: {
                title: "Évaluation technique",
                description: "Évaluation technique spécifique au poste ou étude de cas pour évaluer vos compétences."
              },
              final: {
                title: "Entretien final",
                description: "Rencontrez les responsables du recrutement et les membres de l'équipe pour discuter de la collaboration et des prochaines étapes."
              }
            }
          },
          currentOpenings: {
            loadingText: "Chargement des offres...",
            generalApplicationText: "Vous ne trouvez pas le bon poste ? Nous recherchons toujours des talents.",
            submitGeneralApplication: "Envoyer une candidature spontanée"
          },
          generalApplication: {
            title: "Candidature Spontanée",
            personalInfo: {
              title: "Informations Personnelles",
              firstName: "Prénom *",
              lastName: "Nom *",
              email: "Email *",
              phone: "Téléphone *"
            },
            positionInfo: {
              title: "Informations sur le Poste",
              desiredPosition: "Poste Souhaité *",
              desiredPositionPlaceholder: "ex: Ingénieur Test Senior",
              preferredDepartment: "Département Préféré *",
              preferredDepartmentPlaceholder: "Sélectionner un département",
              departments: {
                engineering: "Ingénierie",
                healthcare: "Santé",
                technology: "Technologie",
                manufacturing: "Fabrication",
                environmental: "Environnement",
                sales: "Ventes",
                marketing: "Marketing",
                finance: "Finance",
                humanResources: "Ressources Humaines",
                operations: "Opérations",
                other: "Autre"
              }
            },
            experience: {
              label: "Années d'Expérience *",
              placeholder: "Sélectionner le niveau d'expérience",
              options: {
                zeroToOne: "0-1 ans",
                twoToThree: "2-3 ans",
                fourToFive: "4-5 ans",
                sixToEight: "6-8 ans",
                nineToTwelve: "9-12 ans",
                thirteenPlus: "13+ ans"
              }
            },
            resume: {
              label: "CV *",
              uploadText: "Cliquez pour télécharger votre CV (PDF, DOC, DOCX)",
              maxSize: "Taille maximale du fichier : 5MB",
              chooseFile: "Choisir un fichier"
            },
            coverLetter: {
              label: "Lettre de Motivation *",
              placeholder: "Parlez-nous de votre parcours, vos compétences et pourquoi vous souhaitez rejoindre CBM..."
            },
            actions: {
              reset: "Réinitialiser",
              submit: "Soumettre la Candidature",
              submitting: "Envoi en cours..."
            },
            toasts: {
              invalidFileType: "Type de fichier invalide",
              invalidFileTypeDesc: "Veuillez télécharger uniquement des fichiers PDF, DOC ou DOCX.",
              fileTooLarge: "Fichier trop volumineux",
              fileTooLargeDesc: "La taille du fichier doit être inférieure à 5MB.",
              resumeRequired: "CV requis",
              resumeRequiredDesc: "Veuillez télécharger votre CV.",
              missingInfo: "Informations manquantes",
              missingInfoDesc: "Veuillez remplir : ",
              invalidEmail: "Email invalide",
              invalidEmailDesc: "Veuillez entrer une adresse email valide.",
              successTitle: "Candidature soumise !",
              successDesc: "Merci pour votre candidature. Nous vous contacterons bientôt.",
              failureTitle: "Échec de l'envoi",
              failureDesc: "Échec de l'envoi de la candidature. Veuillez réessayer."
            }
          }
        },
        blog: {
          title: "Derniers Articles",
          description: "Restez informé des dernières analyses, tendances et meilleures pratiques en matière d’inspection, de solutions de main-d’œuvre et de conformité industrielle avec INSPECTORS 360."
        },
        contact: {
          officesTitle: "Nos bureaux dans le monde",
          officesDescription: "Avec des sites dans le monde entier, nous sommes toujours proches de vous. Trouvez le bureau CBM le plus proche pour un support et des services locaux.",
          formTitle: "Envoyez-nous un message",
          formDescription: "Remplissez le formulaire ci-dessous et nos experts vous répondront sous 24 heures.",
          supportTitle: "Support direct",
          supportDescription: "Vous préférez parler directement ? Notre équipe d'assistance client est disponible pour vous aider avec des questions immédiates et des demandes urgentes.",
          supportPhoneTitle: "Assistance téléphonique",
          supportPhoneDesc: "Parlez à notre service client",
          supportPhoneHours: "Lun-Ven : 8h00 - 18h00 (EST)",
          supportEmailTitle: "Assistance email",
          supportEmailDesc: "Envoyez des demandes détaillées et de la documentation",
          supportEmailResponse: "Réponse sous 24 heures",
          supportEmergencyTitle: "Assistance d'urgence",
          supportEmergencyDesc: "Support 24/7 pour les demandes urgentes de certification",
          supportEmergencyNote: "Disponible 24/7 pour les urgences",
          responseGuaranteeTitle: "Garantie de réponse rapide",
          responsePhone: "Appels répondus en moins de 3 sonneries",
          responseEmail: "Réponses aux emails sous 24 heures",
          responseQuote: "Devis traités sous 48 heures",
          labels: {
            firstName: "Prénom *",
            lastName: "Nom *",
            email: "Adresse e-mail *",
            phone: "Numéro de téléphone",
            company: "Entreprise *",
            industry: "Industrie",
            service: "Service requis",
            message: "Message *",
            consent: "J'accepte que CBM traite mes données personnelles afin de répondre à ma demande. Je comprends que je peux retirer mon consentement à tout moment."
          },
          placeholders: {
            firstName: "Jean",
            lastName: "Dupont",
            email: "jean.dupont@entreprise.com",
            phone: "+33 1 23 45 67 89",
            company: "Nom de votre entreprise",
            selectIndustry: "Sélectionner une industrie",
            selectService: "Sélectionner un service",
            message: "Veuillez décrire vos besoins, votre calendrier et vos questions spécifiques..."
          },
          cta: {
            send: "Envoyer le message",
            sending: "Envoi..."
          }
        },
        verifyDocuments: {
          hero: {
            badge: "Bureau de conformité de confiance",
            title: "Vérifiez vos certificats et documents techniques",
            description: "Téléchargez des rapports d'inspection, des certificats de conformité ou des enregistrements d'étalonnage en toute sécurité. Notre équipe administrative validera l'authenticité et répondra avec les prochaines étapes dans les 24 heures.",
            ctaButton: "Commencer la vérification",
            securityNote: "Crypté et traité par l'administrateur uniquement"
          },
          form: {
            title: "Soumettre des documents pour vérification manuelle",
            description: "Fournissez les coordonnées de base et joignez les certificats ou rapports nécessitant une validation. Vous pouvez ajouter jusqu'à 5 fichiers (PDF, DOC/DOCX, JPG, PNG) par soumission.",
            labels: {
              firstName: "Prénom *",
              lastName: "Nom *",
              email: "E-mail officiel *",
              location: "Localisation *",
              company: "Nom de l'entreprise (facultatif)",
              jobTitle: "Titre du poste (facultatif)",
              comments: "Commentaires / Référence (facultatif)"
            },
            placeholders: {
              firstName: "Jeanne",
              lastName: "Dupont",
              email: "vous@entreprise.com",
              location: "Global",
              company: "CBM 360 Global",
              jobTitle: "Responsable des opérations",
              comments: "Ajoutez un bon de commande, des ID de certificat ou des notes spéciales..."
            },
            upload: {
              label: "Télécharger des documents *",
              dragDrop: "Glissez-déposez ou cliquez pour télécharger",
              fileInfo: "Jusqu'à 5 fichiers • Max 10 Mo chacun • PDF, DOC, DOCX, JPG, PNG",
              selectFiles: "Sélectionner des fichiers",
              remove: "Supprimer"
            },
            locations: {
              "Afghanistan": "Afghanistan",
              "Albania": "Albania",
              "Algeria": "Algeria",
              "Andorra": "Andorra",
              "Angola": "Angola",
              "Antigua and Barbuda": "Antigua and Barbuda",
              "Argentina": "Argentina",
              "Armenia": "Armenia",
              "Australia": "Australia",
              "Austria": "Austria",
              "Azerbaijan": "Azerbaijan",
              "Bahamas": "Bahamas",
              "Bahrain": "Bahrain",
              "Bangladesh": "Bangladesh",
              "Barbados": "Barbados",
              "Belarus": "Belarus",
              "Belgium": "Belgium",
              "Belize": "Belize",
              "Benin": "Benin",
              "Bhutan": "Bhutan",
              "Bolivia": "Bolivia",
              "Bosnia and Herzegovina": "Bosnia and Herzegovina",
              "Botswana": "Botswana",
              "Brazil": "Brazil",
              "Brunei": "Brunei",
              "Bulgaria": "Bulgaria",
              "Burkina Faso": "Burkina Faso",
              "Burundi": "Burundi",
              "Cabo Verde": "Cabo Verde",
              "Cambodia": "Cambodia",
              "Cameroon": "Cameroon",
              "Canada": "Canada",
              "Central African Republic": "Central African Republic",
              "Chad": "Chad",
              "Chile": "Chile",
              "China": "China",
              "Colombia": "Colombia",
              "Comoros": "Comoros",
              "Congo (Republic of the Congo)": "Congo (Republic of the Congo)",
              "Congo (Democratic Republic of the Congo)": "Congo (Democratic Republic of the Congo)",
              "Costa Rica": "Costa Rica",
              "Côte d'Ivoire": "Côte d'Ivoire",
              "Croatia": "Croatia",
              "Cuba": "Cuba",
              "Cyprus": "Cyprus",
              "Czech Republic (Czechia)": "Czech Republic (Czechia)",
              "Denmark": "Denmark",
              "Djibouti": "Djibouti",
              "Dominica": "Dominica",
              "Dominican Republic": "Dominican Republic",
              "Ecuador": "Ecuador",
              "Egypt": "Egypt",
              "El Salvador": "El Salvador",
              "Equatorial Guinea": "Equatorial Guinea",
              "Eritrea": "Eritrea",
              "Estonia": "Estonia",
              "Eswatini (formerly Swaziland)": "Eswatini (formerly Swaziland)",
              "Ethiopia": "Ethiopia",
              "Fiji": "Fiji",
              "Finland": "Finland",
              "France": "France",
              "Gabon": "Gabon",
              "Gambia": "Gambia",
              "Georgia": "Georgia",
              "Germany": "Germany",
              "Ghana": "Ghana",
              "Greece": "Greece",
              "Grenada": "Grenada",
              "Guatemala": "Guatemala",
              "Guinea": "Guinea",
              "Guinea-Bissau": "Guinea-Bissau",
              "Guyana": "Guyana",
              "Haiti": "Haiti",
              "Honduras": "Honduras",
              "Hungary": "Hungary",
              "Iceland": "Iceland",
              "India": "India",
              "Indonesia": "Indonesia",
              "Iran": "Iran",
              "Iraq": "Iraq",
              "Ireland": "Ireland",
              "Israel": "Israel",
              "Italy": "Italy",
              "Jamaica": "Jamaica",
              "Japan": "Japan",
              "Jordan": "Jordan",
              "Kazakhstan": "Kazakhstan",
              "Kenya": "Kenya",
              "Kiribati": "Kiribati",
              "Korea, North (North Korea)": "Korea, North (North Korea)",
              "Korea, South (South Korea)": "Korea, South (South Korea)",
              "Kuwait": "Kuwait",
              "Kyrgyzstan": "Kyrgyzstan",
              "Laos": "Laos",
              "Latvia": "Latvia",
              "Lebanon": "Lebanon",
              "Lesotho": "Lesotho",
              "Liberia": "Liberia",
              "Libya": "Libya",
              "Liechtenstein": "Liechtenstein",
              "Lithuania": "Lithuania",
              "Luxembourg": "Luxembourg",
              "Madagascar": "Madagascar",
              "Malawi": "Malawi",
              "Malaysia": "Malaysia",
              "Maldives": "Maldives",
              "Mali": "Mali",
              "Malta": "Malta",
              "Marshall Islands": "Marshall Islands",
              "Mauritania": "Mauritania",
              "Mauritius": "Mauritius",
              "Mexico": "Mexico",
              "Micronesia": "Micronesia",
              "Moldova": "Moldova",
              "Monaco": "Monaco",
              "Mongolia": "Mongolia",
              "Montenegro": "Montenegro",
              "Morocco": "Morocco",
              "Mozambique": "Mozambique",
              "Myanmar (Burma)": "Myanmar (Burma)",
              "Namibia": "Namibia",
              "Nauru": "Nauru",
              "Nepal": "Nepal",
              "Netherlands": "Netherlands",
              "New Zealand": "New Zealand",
              "Nicaragua": "Nicaragua",
              "Niger": "Niger",
              "Nigeria": "Nigeria",
              "North Macedonia": "North Macedonia",
              "Norway": "Norway",
              "Oman": "Oman",
              "Pakistan": "Pakistan",
              "Palau": "Palau",
              "Panama": "Panama",
              "Papua New Guinea": "Papua New Guinea",
              "Paraguay": "Paraguay",
              "Peru": "Peru",
              "Philippines": "Philippines",
              "Poland": "Poland",
              "Portugal": "Portugal",
              "Qatar": "Qatar",
              "Romania": "Romania",
              "Russia": "Russia",
              "Rwanda": "Rwanda",
              "Saint Kitts and Nevis": "Saint Kitts and Nevis",
              "Saint Lucia": "Saint Lucia",
              "Saint Vincent and the Grenadines": "Saint Vincent and the Grenadines",
              "Samoa": "Samoa",
              "San Marino": "San Marino",
              "Sao Tome and Principe": "Sao Tome and Principe",
              "Saudi Arabia": "Saudi Arabia",
              "Senegal": "Senegal",
              "Serbia": "Serbia",
              "Seychelles": "Seychelles",
              "Sierra Leone": "Sierra Leone",
              "Singapore": "Singapore",
              "Slovakia": "Slovakia",
              "Slovenia": "Slovenia",
              "Solomon Islands": "Solomon Islands",
              "Somalia": "Somalia",
              "South Africa": "South Africa",
              "South Sudan": "South Sudan",
              "Spain": "Spain",
              "Sri Lanka": "Sri Lanka",
              "Sudan": "Sudan",
              "Suriname": "Suriname",
              "Sweden": "Sweden",
              "Switzerland": "Switzerland",
              "Syria": "Syria",
              "Taiwan* (not UN member — widely recognized)": "Taiwan* (not UN member — widely recognized)",
              "Tajikistan": "Tajikistan",
              "Tanzania": "Tanzania",
              "Thailand": "Thailand",
              "Timor-Leste": "Timor-Leste",
              "Togo": "Togo",
              "Tonga": "Tonga",
              "Trinidad and Tobago": "Trinidad and Tobago",
              "Tunisia": "Tunisia",
              "Turkey": "Turkey",
              "Turkmenistan": "Turkmenistan",
              "Tuvalu": "Tuvalu",
              "Uganda": "Uganda",
              "Ukraine": "Ukraine",
              "United Arab Emirates": "United Arab Emirates",
              "United Kingdom": "United Kingdom",
              "United States": "United States",
              "Uruguay": "Uruguay",
              "Uzbekistan": "Uzbekistan",
              "Vanuatu": "Vanuatu",
              "Vatican City (Holy See) — UN Observer": "Vatican City (Holy See) — UN Observer",
              "Venezuela": "Venezuela",
              "Vietnam": "Vietnam",
              "Yemen": "Yemen",
              "Zambia": "Zambia",
              "Zimbabwe": "Zimbabwe"
            },
            cta: {
              submit: "Envoyer à l'équipe administrative",
              submitting: "Envoi en cours..."
            }
          },
          sidebar: {
            whatNext: {
              title: "Que se passe-t-il ensuite ?",
              steps: [
                {
                  number: "1.",
                  title: "Examen sécurisé :",
                  description: "Notre bureau administratif valide l'intégrité et l'authenticité des fichiers."
                },
                {
                  number: "2.",
                  title: "E-mail de confirmation :",
                  description: "Vous recevrez une mise à jour directe de Support@cbm360tiv.com."
                },
                {
                  number: "3.",
                  title: "Suivi assisté :",
                  description: "Des clarifications supplémentaires ou des audits de site sont programmés si nécessaire."
                }
              ]
            },
            assistance: {
              title: "Besoin d'aide rapide ?",
              description: "Envoyez un e-mail à Support@cbm360tiv.com ou appelez le +44 7934 980214 en mentionnant \"Portail de vérification de documents\" pour un routage prioritaire."
            }
          },
          toast: {
            invalidFiles: "Certains fichiers ont été rejetés. Veuillez vérifier les types de fichiers et les limites de taille.",
            success: "Vos documents ont été envoyés pour vérification.",
            error: "Échec de l'envoi des documents. Veuillez réessayer."
          }
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Portfolio de services complet",
          subheading: "Des tests de produits à la conformité réglementaire, nous fournissons des solutions complètes pour vous aider à réussir sur les marchés mondiaux.",
        },
        servicesList: [
          {
            id: 1,
            title: "Tests (T)",
            description: "Services de test complets pour valider la sécurité, les performances et la conformité.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "Tests non destructifs",
              "Performance et fiabilité",
              "Conformité aux normes",
            ]
          },
          {
            id: 2,
            title: "Surveillance basée sur l'état (CBM)",
            description: "Maintenance prédictive utilisant l'analytique, les capteurs et les diagnostics pour réduire les temps d'arrêt.",
            icon: "Settings",
            link: "/services/cbm",
            features: [
              "Analyse vibratoire et acoustique",
              "Thermographie et analyse d'huile",
              "Tableaux de bord de santé des actifs",
            ]
          },
          {
            id: 3,
            title: "Inspection (I)",
            description: "Services d'inspection indépendants garantissant la qualité et le respect de la réglementation.",
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
            description: "Audits de processus, de fournisseurs et de systèmes pour identifier les risques et stimuler l'amélioration.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "Audits de fournisseurs",
              "Examens de capacité de processus",
              "Analyse des écarts de conformité",
            ]
          },
          {
            id: 5,
            title: "Vérification et Certification (VC)",
            description: "Services de vérification et de certification pour démontrer la confiance et la conformité.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Systèmes de management",
              "Certification de produits",
              "Approbations réglementaires",
            ]
          },
          {
            id: 6,
            title: "Innovation et R&D",
            description: "Solutions de nouvelle génération alimentées par l'IoT, l'IA, la robotique et les technologies Industrie 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "Surveillance IoT et IA",
              "Inspection robotique",
              "Technologie de jumeau numérique",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "70+",
          label: "Pays Desservis",
          description: "Présence mondiale avec expertise locale"
        },
        {
          number: "10 000+",
          label: "Expertise fournie dans le monde",
          description: "Professionnels hautement qualifiés"
        },
        {
          number: "2012",
          label: "Depuis 2012",
          description: "Partenaire de confiance depuis 2012"
        }
      ],
    },
  
    pt: {
      navbar: {
        services: "Serviços",
        industries: "Indústrias",
        about: "Sobre",
        careers: "Carreiras",
        blog: "Blog",
        contact: "Contato",
        getQuote: "Solicitar Orçamento",
        contactUs: "Contate-Nos",
      },
      footer: {
        company: "CBM",
        description:
          "Fornecedor líder de serviços de teste, inspeção, certificação e consultoria. Comprometido com segurança, proteção e sustentabilidade em todo o mundo.",
        services: {
          title: "Serviços",
          list: [
            "Teste & Certificação",
            "Serviços de Inspeção",
            "Auditoria & Avaliação",
            "Treinamento & Educação",
            "Soluções Digitais",
            "Serviços de Consultoria",
          ],
        },
        industries: {
          title: "Indústrias",
          list: [
            "Automotivo",
            "Saúde & Médico",
            "Energia & Utilidades",
            "Manufatura",
            "Construção",
            "Alimentação & Agricultura",
          ],
        },
        contact: {
          title: "Contato",
          address: "CBM América\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@cbm.com",
        },
        newsletter: "Fique Atualizado",
        placeholderEmail: "Digite seu email",
      },
      pages: {
        services: {
          hero: {
            title: "Inspetores 360°",
            subtitle: "Confiável em todo o mundo",
            description: "Fornecemos soluções globais de força de trabalho, recrutamento e suporte técnico, entregando profissionais certificados e equipamentos para garantir segurança, conformidade e desempenho nos setores de Petróleo e Gás, Mineração e Indústria.",
            primaryCTAText: "Explorar Serviços",
            secondaryCTAText: "Solicitar Orçamento",
          },
          servicesOverview: {
            title: "Services",
            description: "we provide complete inspection workforce and technical support solutions, including recruitment, contract staffing, payroll, logistics, and training—ensuring qualified professionals and reliable service for every project."
          },
        },
        about: {
          title: "Sobre",
          breadcrumb: {
            home: "Início",
            about: "Sobre"
          },
          loading: "Carregando...",
          error: "Falha ao carregar conteúdo"
        },
        careers: {
          title: "Vagas Abertas",
          description: "Junte-se à INSPECTORS 360 e faça parte de uma rede global de inspetores, engenheiros e profissionais técnicos certificados. Conectamos talentos qualificados a projetos de destaque nos setores de Petróleo e Gás, Mineração e Indústria em todo o mundo.",
          applyNow: "Candidatar-se agora",
          hiringProcess: {
            title: "Nosso processo de contratação",
            description: "Criamos um processo transparente, eficiente e focado em encontrar o melhor encaixe mútuo.",
            steps: {
              review: {
                title: "Análise da candidatura",
                description: "Nossa equipe de talentos avalia sua candidatura e qualificações em relação aos requisitos da vaga."
              },
              interview: {
                title: "Entrevista inicial",
                description: "Entrevista por telefone ou vídeo para discutir sua experiência, interesses e aderência à função."
              },
              assessment: {
                title: "Avaliação técnica",
                description: "Avaliação técnica específica da função ou estudo de caso para avaliar suas capacidades."
              },
              final: {
                title: "Entrevista final",
                description: "Reunião com os gestores e membros da equipe para discutir colaboração e próximos passos."
              }
            }
          },
          currentOpenings: {
            loadingText: "Carregando vagas...",
            generalApplicationText: "Não encontrou a vaga ideal? Estamos sempre em busca de talentos.",
            submitGeneralApplication: "Enviar candidatura geral"
          },
          generalApplication: {
            title: "Candidatura Geral",
            personalInfo: {
              title: "Informações Pessoais",
              firstName: "Nome *",
              lastName: "Sobrenome *",
              email: "Email *",
              phone: "Telefone *"
            },
            positionInfo: {
              title: "Informações da Posição",
              desiredPosition: "Posição Desejada *",
              desiredPositionPlaceholder: "ex: Engenheiro de Teste Sênior",
              preferredDepartment: "Departamento Preferido *",
              preferredDepartmentPlaceholder: "Selecione o departamento",
              departments: {
                engineering: "Engenharia",
                healthcare: "Saúde",
                technology: "Tecnologia",
                manufacturing: "Manufatura",
                environmental: "Meio Ambiente",
                sales: "Vendas",
                marketing: "Marketing",
                finance: "Finanças",
                humanResources: "Recursos Humanos",
                operations: "Operações",
                other: "Outro"
              }
            },
            experience: {
              label: "Anos de Experiência *",
              placeholder: "Selecione o nível de experiência",
              options: {
                zeroToOne: "0-1 anos",
                twoToThree: "2-3 anos",
                fourToFive: "4-5 anos",
                sixToEight: "6-8 anos",
                nineToTwelve: "9-12 anos",
                thirteenPlus: "13+ anos"
              }
            },
            resume: {
              label: "Currículo/CV *",
              uploadText: "Clique para enviar seu currículo (PDF, DOC, DOCX)",
              maxSize: "Tamanho máximo do arquivo: 5MB",
              chooseFile: "Escolher Arquivo"
            },
            coverLetter: {
              label: "Carta de Apresentação *",
              placeholder: "Conte-nos sobre sua experiência, habilidades e por que você está interessado em se juntar à CBM..."
            },
            actions: {
              reset: "Redefinir",
              submit: "Enviar Candidatura",
              submitting: "Enviando..."
            },
            toasts: {
              invalidFileType: "Tipo de arquivo inválido",
              invalidFileTypeDesc: "Por favor, envie apenas arquivos PDF, DOC ou DOCX.",
              fileTooLarge: "Arquivo muito grande",
              fileTooLargeDesc: "O tamanho do arquivo deve ser menor que 5MB.",
              resumeRequired: "Currículo obrigatório",
              resumeRequiredDesc: "Por favor, envie seu currículo.",
              missingInfo: "Informações faltando",
              missingInfoDesc: "Por favor, preencha: ",
              invalidEmail: "Email inválido",
              invalidEmailDesc: "Por favor, insira um endereço de email válido.",
              successTitle: "Candidatura enviada!",
              successDesc: "Obrigado pela sua candidatura. Entraremos em contato em breve.",
              failureTitle: "Falha no envio",
              failureDesc: "Falha ao enviar a candidatura. Por favor, tente novamente."
            }
          }
        },
        blog: {
          title: "Artigos Mais Recentes",
          description: "Mantenha-se atualizado com as mais recentes percepções, tendências e melhores práticas em inspeção, soluções de força de trabalho e conformidade industrial da INSPECTORS 360."
        },
        contact: {
          officesTitle: "Nossos Escritórios Globais",
          officesDescription: "Com locais em todo o mundo, estamos sempre perto de você. Encontre o escritório CBM mais próximo para suporte e serviços locais.",
          formTitle: "Envie-nos uma mensagem",
          formDescription: "Preencha o formulário abaixo e nossos especialistas retornarão em até 24 horas.",
          supportTitle: "Obter suporte direto",
          supportDescription: "Prefere falar diretamente? Nossa equipe de suporte ao cliente está disponível para ajudar com dúvidas imediatas e solicitações urgentes.",
          supportPhoneTitle: "Suporte por telefone",
          supportPhoneDesc: "Fale com nossa equipe de atendimento",
          supportPhoneHours: "Seg-Sex: 8:00 - 18:00 (EST)",
          supportEmailTitle: "Suporte por e-mail",
          supportEmailDesc: "Envie dúvidas detalhadas e documentação",
          supportEmailResponse: "Resposta em até 24 horas",
          supportEmergencyTitle: "Suporte de emergência",
          supportEmergencyDesc: "Suporte 24/7 para questões urgentes de certificação",
          supportEmergencyNote: "Disponível 24/7 para emergências",
          responseGuaranteeTitle: "Garantia de resposta rápida",
          responsePhone: "Ligações atendidas em até 3 toques",
          responseEmail: "Respostas por e-mail em até 24 horas",
          responseQuote: "Solicitações de cotação processadas em até 48 horas",
          labels: {
            firstName: "Nome *",
            lastName: "Sobrenome *",
            email: "Endereço de e-mail *",
            phone: "Número de telefone",
            company: "Empresa *",
            industry: "Indústria",
            service: "Serviço necessário",
            message: "Mensagem *",
            consent: "Concordo que a CBM processe meus dados pessoais para responder à minha solicitação. Entendo que posso retirar o consentimento a qualquer momento."
          },
          placeholders: {
            firstName: "João",
            lastName: "Silva",
            email: "joao.silva@empresa.com",
            phone: "+55 (11) 1234-5678",
            company: "Nome da sua empresa",
            selectIndustry: "Selecionar indústria",
            selectService: "Selecionar serviço",
            message: "Descreva seus requisitos, prazos e dúvidas específicas..."
          },
          cta: {
            send: "Enviar mensagem",
            sending: "Enviando..."
          }
        },
        verifyDocuments: {
          hero: {
            badge: "Mesa de Conformidade Confiável",
            title: "Verifique seus Certificados e Documentos Técnicos",
            description: "Carregue relatórios de inspeção, certificados de conformidade ou registros de calibração com segurança. Nossa equipe administrativa validará a autenticidade e responderá com os próximos passos em até 24 horas.",
            ctaButton: "Iniciar Verificação",
            securityNote: "Criptografado e tratado apenas pelo administrador"
          },
          form: {
            title: "Enviar documentos para verificação manual",
            description: "Forneça os dados de contato básicos e anexe os certificados ou relatórios que precisam de validação. Você pode adicionar até 5 arquivos (PDF, DOC/DOCX, JPG, PNG) por envio.",
            labels: {
              firstName: "Nome *",
              lastName: "Sobrenome *",
              email: "E-mail Oficial *",
              location: "Localização *",
              company: "Nome da Empresa (opcional)",
              jobTitle: "Cargo (opcional)",
              comments: "Comentários / Referência (opcional)"
            },
            placeholders: {
              firstName: "Maria",
              lastName: "Silva",
              email: "voce@empresa.com",
              location: "Global",
              company: "CBM 360 Global",
              jobTitle: "Gerente de Operações",
              comments: "Adicione pedido de compra, IDs de certificado ou notas especiais..."
            },
            upload: {
              label: "Carregar documentos *",
              dragDrop: "Arraste e solte ou clique para carregar",
              fileInfo: "Até 5 arquivos • Máx 10MB cada • PDF, DOC, DOCX, JPG, PNG",
              selectFiles: "Selecionar Arquivos",
              remove: "Remover"
            },
            locations: {
              "Afghanistan": "Afghanistan",
              "Albania": "Albania",
              "Algeria": "Algeria",
              "Andorra": "Andorra",
              "Angola": "Angola",
              "Antigua and Barbuda": "Antigua and Barbuda",
              "Argentina": "Argentina",
              "Armenia": "Armenia",
              "Australia": "Australia",
              "Austria": "Austria",
              "Azerbaijan": "Azerbaijan",
              "Bahamas": "Bahamas",
              "Bahrain": "Bahrain",
              "Bangladesh": "Bangladesh",
              "Barbados": "Barbados",
              "Belarus": "Belarus",
              "Belgium": "Belgium",
              "Belize": "Belize",
              "Benin": "Benin",
              "Bhutan": "Bhutan",
              "Bolivia": "Bolivia",
              "Bosnia and Herzegovina": "Bosnia and Herzegovina",
              "Botswana": "Botswana",
              "Brazil": "Brazil",
              "Brunei": "Brunei",
              "Bulgaria": "Bulgaria",
              "Burkina Faso": "Burkina Faso",
              "Burundi": "Burundi",
              "Cabo Verde": "Cabo Verde",
              "Cambodia": "Cambodia",
              "Cameroon": "Cameroon",
              "Canada": "Canada",
              "Central African Republic": "Central African Republic",
              "Chad": "Chad",
              "Chile": "Chile",
              "China": "China",
              "Colombia": "Colombia",
              "Comoros": "Comoros",
              "Congo (Republic of the Congo)": "Congo (Republic of the Congo)",
              "Congo (Democratic Republic of the Congo)": "Congo (Democratic Republic of the Congo)",
              "Costa Rica": "Costa Rica",
              "Côte d'Ivoire": "Côte d'Ivoire",
              "Croatia": "Croatia",
              "Cuba": "Cuba",
              "Cyprus": "Cyprus",
              "Czech Republic (Czechia)": "Czech Republic (Czechia)",
              "Denmark": "Denmark",
              "Djibouti": "Djibouti",
              "Dominica": "Dominica",
              "Dominican Republic": "Dominican Republic",
              "Ecuador": "Ecuador",
              "Egypt": "Egypt",
              "El Salvador": "El Salvador",
              "Equatorial Guinea": "Equatorial Guinea",
              "Eritrea": "Eritrea",
              "Estonia": "Estonia",
              "Eswatini (formerly Swaziland)": "Eswatini (formerly Swaziland)",
              "Ethiopia": "Ethiopia",
              "Fiji": "Fiji",
              "Finland": "Finland",
              "France": "France",
              "Gabon": "Gabon",
              "Gambia": "Gambia",
              "Georgia": "Georgia",
              "Germany": "Germany",
              "Ghana": "Ghana",
              "Greece": "Greece",
              "Grenada": "Grenada",
              "Guatemala": "Guatemala",
              "Guinea": "Guinea",
              "Guinea-Bissau": "Guinea-Bissau",
              "Guyana": "Guyana",
              "Haiti": "Haiti",
              "Honduras": "Honduras",
              "Hungary": "Hungary",
              "Iceland": "Iceland",
              "India": "India",
              "Indonesia": "Indonesia",
              "Iran": "Iran",
              "Iraq": "Iraq",
              "Ireland": "Ireland",
              "Israel": "Israel",
              "Italy": "Italy",
              "Jamaica": "Jamaica",
              "Japan": "Japan",
              "Jordan": "Jordan",
              "Kazakhstan": "Kazakhstan",
              "Kenya": "Kenya",
              "Kiribati": "Kiribati",
              "Korea, North (North Korea)": "Korea, North (North Korea)",
              "Korea, South (South Korea)": "Korea, South (South Korea)",
              "Kuwait": "Kuwait",
              "Kyrgyzstan": "Kyrgyzstan",
              "Laos": "Laos",
              "Latvia": "Latvia",
              "Lebanon": "Lebanon",
              "Lesotho": "Lesotho",
              "Liberia": "Liberia",
              "Libya": "Libya",
              "Liechtenstein": "Liechtenstein",
              "Lithuania": "Lithuania",
              "Luxembourg": "Luxembourg",
              "Madagascar": "Madagascar",
              "Malawi": "Malawi",
              "Malaysia": "Malaysia",
              "Maldives": "Maldives",
              "Mali": "Mali",
              "Malta": "Malta",
              "Marshall Islands": "Marshall Islands",
              "Mauritania": "Mauritania",
              "Mauritius": "Mauritius",
              "Mexico": "Mexico",
              "Micronesia": "Micronesia",
              "Moldova": "Moldova",
              "Monaco": "Monaco",
              "Mongolia": "Mongolia",
              "Montenegro": "Montenegro",
              "Morocco": "Morocco",
              "Mozambique": "Mozambique",
              "Myanmar (Burma)": "Myanmar (Burma)",
              "Namibia": "Namibia",
              "Nauru": "Nauru",
              "Nepal": "Nepal",
              "Netherlands": "Netherlands",
              "New Zealand": "New Zealand",
              "Nicaragua": "Nicaragua",
              "Niger": "Niger",
              "Nigeria": "Nigeria",
              "North Macedonia": "North Macedonia",
              "Norway": "Norway",
              "Oman": "Oman",
              "Pakistan": "Pakistan",
              "Palau": "Palau",
              "Panama": "Panama",
              "Papua New Guinea": "Papua New Guinea",
              "Paraguay": "Paraguay",
              "Peru": "Peru",
              "Philippines": "Philippines",
              "Poland": "Poland",
              "Portugal": "Portugal",
              "Qatar": "Qatar",
              "Romania": "Romania",
              "Russia": "Russia",
              "Rwanda": "Rwanda",
              "Saint Kitts and Nevis": "Saint Kitts and Nevis",
              "Saint Lucia": "Saint Lucia",
              "Saint Vincent and the Grenadines": "Saint Vincent and the Grenadines",
              "Samoa": "Samoa",
              "San Marino": "San Marino",
              "Sao Tome and Principe": "Sao Tome and Principe",
              "Saudi Arabia": "Saudi Arabia",
              "Senegal": "Senegal",
              "Serbia": "Serbia",
              "Seychelles": "Seychelles",
              "Sierra Leone": "Sierra Leone",
              "Singapore": "Singapore",
              "Slovakia": "Slovakia",
              "Slovenia": "Slovenia",
              "Solomon Islands": "Solomon Islands",
              "Somalia": "Somalia",
              "South Africa": "South Africa",
              "South Sudan": "South Sudan",
              "Spain": "Spain",
              "Sri Lanka": "Sri Lanka",
              "Sudan": "Sudan",
              "Suriname": "Suriname",
              "Sweden": "Sweden",
              "Switzerland": "Switzerland",
              "Syria": "Syria",
              "Taiwan* (not UN member — widely recognized)": "Taiwan* (not UN member — widely recognized)",
              "Tajikistan": "Tajikistan",
              "Tanzania": "Tanzania",
              "Thailand": "Thailand",
              "Timor-Leste": "Timor-Leste",
              "Togo": "Togo",
              "Tonga": "Tonga",
              "Trinidad and Tobago": "Trinidad and Tobago",
              "Tunisia": "Tunisia",
              "Turkey": "Turkey",
              "Turkmenistan": "Turkmenistan",
              "Tuvalu": "Tuvalu",
              "Uganda": "Uganda",
              "Ukraine": "Ukraine",
              "United Arab Emirates": "United Arab Emirates",
              "United Kingdom": "United Kingdom",
              "United States": "United States",
              "Uruguay": "Uruguay",
              "Uzbekistan": "Uzbekistan",
              "Vanuatu": "Vanuatu",
              "Vatican City (Holy See) — UN Observer": "Vatican City (Holy See) — UN Observer",
              "Venezuela": "Venezuela",
              "Vietnam": "Vietnam",
              "Yemen": "Yemen",
              "Zambia": "Zambia",
              "Zimbabwe": "Zimbabwe"
            },
            cta: {
              submit: "Enviar para Equipe Administrativa",
              submitting: "Enviando..."
            }
          },
          sidebar: {
            whatNext: {
              title: "O que acontece a seguir?",
              steps: [
                {
                  number: "1.",
                  title: "Revisão segura:",
                  description: "Nossa mesa administrativa valida a integridade e autenticidade dos arquivos."
                },
                {
                  number: "2.",
                  title: "E-mail de confirmação:",
                  description: "Você receberá uma atualização direta de Support@cbm360tiv.com."
                },
                {
                  number: "3.",
                  title: "Acompanhamento assistido:",
                  description: "Esclarecimentos adicionais ou auditorias de site são agendados se necessário."
                }
              ]
            },
            assistance: {
              title: "Precisa de ajuda rápida?",
              description: "Envie um e-mail para Support@cbm360tiv.com ou ligue para +44 7934 980214 mencionando \"Portal de Verificação de Documentos\" para roteamento prioritário."
            }
          },
          toast: {
            invalidFiles: "Alguns arquivos foram rejeitados. Verifique os tipos de arquivo e limites de tamanho.",
            success: "Seus documentos foram enviados para verificação.",
            error: "Falha ao enviar documentos. Por favor, tente novamente."
          }
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Portfólio Completo de Serviços",
          subheading: "Desde testes de produtos até conformidade regulatória, fornecemos soluções abrangentes para ajudá-lo a ter sucesso nos mercados globais.",
        },
        servicesList: [
          {
            id: 1,
            title: "Testes (T)",
            description: "Serviços abrangentes de teste para validar segurança, desempenho e conformidade.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "Testes não destrutivos",
              "Desempenho e confiabilidade",
              "Conformidade com padrões",
            ]
          },
          {
            id: 2,
            title: "Monitoramento Baseado em Condição (CBM)",
            description: "Manutenção preditiva usando análise, sensores e diagnósticos para reduzir tempo de inatividade.",
            icon: "Settings",
            link: "/services/cbm",
            features: [
              "Análise de vibração e acústica",
              "Termografia e análise de óleo",
              "Dashboards de saúde de ativos",
            ]
          },
          {
            id: 3,
            title: "Inspeção (I)",
            description: "Serviços de inspeção independentes garantindo qualidade e aderência regulatória.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "Inspeção de terceiros",
              "Vigilância de fornecedores",
              "Auditorias de site e fábrica",
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
              "Revisões de capacidade de processo",
              "Análise de lacunas de conformidade",
            ]
          },
          {
            id: 5,
            title: "Verificação e Certificação (VC)",
            description: "Serviços de verificação e certificação para demonstrar confiança e conformidade.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Sistemas de gestão",
              "Certificação de produtos",
              "Aprovações regulatórias",
            ]
          },
          {
            id: 6,
            title: "Inovação e P&D",
            description: "Soluções de próxima geração alimentadas por IoT, IA, Robótica e tecnologias Indústria 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "Monitoramento IoT e IA",
              "Inspeção robótica",
              "Tecnologia de gêmeo digital",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "70+",
          label: "Países Atendidos",
          description: "Presença global com expertise local"
        },
        {
          number: "10.000+",
          label: "Expertise fornecida no mundo",
          description: "Profissionais altamente qualificados"
        },
        {
          number: "2012",
          label: "Desde 2012",
          description: "Parceiro de confiança desde 2012"
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
        getQuote: "Obtener Cotización",
        contactUs: "Contáctenos",
      },
      footer: {
        company: "CBM",
        description:
          "Proveedor líder de servicios de prueba, inspección, certificación y asesoría. Comprometido con la seguridad, la protección y la sostenibilidad en todo el mundo.",
        services: {
          title: "Servicios",
          list: [
            "Pruebas & Certificación",
            "Servicios de Inspección",
            "Auditoría & Evaluación",
            "Capacitación & Educación",
            "Soluciones Digitales",
            "Servicios de Consultoría",
          ],
        },
        industries: {
          title: "Industrias",
          list: [
            "Automotriz",
            "Salud & Médico",
            "Energía & Utilidades",
            "Manufactura",
            "Construcción",
            "Alimentos & Agricultura",
          ],
        },
        contact: {
          title: "Contacto",
          address: "CBM América\n10040 Mesa Rim Road\nSan Diego, CA 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@cbm.com",
        },
        newsletter: "Mantente Actualizado",
        placeholderEmail: "Ingrese su correo electrónico",
      },
      pages: {
        services: {
          hero: {
            title: "Inspectores 360°",
            subtitle: "De confianza en todo el mundo",
            description: "Ofrecemos soluciones globales de fuerza laboral, personal y soporte técnico, proporcionando profesionales certificados y equipos para garantizar la seguridad, el cumplimiento y el rendimiento en los sectores de petróleo y gas, minería e industria.",
            primaryCTAText: "Explorar Servicios",
            secondaryCTAText: "Obtener Cotización",
          },
          servicesOverview: {
            title: "Services",
            description: "we provide complete inspection workforce and technical support solutions, including recruitment, contract staffing, payroll, logistics, and training—ensuring qualified professionals and reliable service for every project."
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
          description: "Únete a INSPECTORS 360 y forma parte de una red global de inspectores, ingenieros y profesionales técnicos certificados. Conectamos talento calificado con proyectos líderes en los sectores de petróleo y gas, minería e industria en todo el mundo.",
          applyNow: "Postular ahora",
          hiringProcess: {
            title: "Nuestro proceso de contratación",
            description: "Hemos diseñado un proceso transparente, eficiente y centrado en encontrar el ajuste mutuo adecuado.",
            steps: {
              review: {
                title: "Revisión de la solicitud",
                description: "Nuestro equipo de talento revisa tu solicitud y calificaciones en relación con los requisitos del puesto."
              },
              interview: {
                title: "Entrevista inicial",
                description: "Entrevista telefónica o por video para hablar sobre tu experiencia, intereses y encaje con el puesto."
              },
              assessment: {
                title: "Evaluación técnica",
                description: "Evaluación técnica específica del puesto o caso práctico para valorar tus capacidades."
              },
              final: {
                title: "Entrevista final",
                description: "Reúnete con los responsables de contratación y miembros del equipo para hablar de la colaboración y los siguientes pasos."
              }
            }
          },
          currentOpenings: {
            loadingText: "Cargando vacantes...",
            generalApplicationText: "¿No ves el puesto adecuado? Siempre buscamos personas con talento.",
            submitGeneralApplication: "Enviar candidatura general"
          },
          generalApplication: {
            title: "Solicitud General",
            personalInfo: {
              title: "Información Personal",
              firstName: "Nombre *",
              lastName: "Apellido *",
              email: "Correo Electrónico *",
              phone: "Teléfono *"
            },
            positionInfo: {
              title: "Información del Puesto",
              desiredPosition: "Puesto Deseado *",
              desiredPositionPlaceholder: "ej. Ingeniero de Pruebas Senior",
              preferredDepartment: "Departamento Preferido *",
              preferredDepartmentPlaceholder: "Seleccionar departamento",
              departments: {
                engineering: "Ingeniería",
                healthcare: "Salud",
                technology: "Tecnología",
                manufacturing: "Manufactura",
                environmental: "Medio Ambiente",
                sales: "Ventas",
                marketing: "Marketing",
                finance: "Finanzas",
                humanResources: "Recursos Humanos",
                operations: "Operaciones",
                other: "Otro"
              }
            },
            experience: {
              label: "Años de Experiencia *",
              placeholder: "Seleccionar nivel de experiencia",
              options: {
                zeroToOne: "0-1 años",
                twoToThree: "2-3 años",
                fourToFive: "4-5 años",
                sixToEight: "6-8 años",
                nineToTwelve: "9-12 años",
                thirteenPlus: "13+ años"
              }
            },
            resume: {
              label: "Currículum/CV *",
              uploadText: "Haga clic para subir su currículum (PDF, DOC, DOCX)",
              maxSize: "Tamaño máximo de archivo: 5MB",
              chooseFile: "Elegir Archivo"
            },
            coverLetter: {
              label: "Carta de Presentación *",
              placeholder: "Cuéntenos sobre su experiencia, habilidades y por qué está interesado en unirse a CBM..."
            },
            actions: {
              reset: "Restablecer",
              submit: "Enviar Solicitud",
              submitting: "Enviando..."
            },
            toasts: {
              invalidFileType: "Tipo de archivo inválido",
              invalidFileTypeDesc: "Por favor, suba solo archivos PDF, DOC o DOCX.",
              fileTooLarge: "Archivo demasiado grande",
              fileTooLargeDesc: "El tamaño del archivo debe ser menor a 5MB.",
              resumeRequired: "Currículum requerido",
              resumeRequiredDesc: "Por favor, suba su currículum.",
              missingInfo: "Información faltante",
              missingInfoDesc: "Por favor complete: ",
              invalidEmail: "Correo inválido",
              invalidEmailDesc: "Por favor ingrese una dirección de correo válida.",
              successTitle: "¡Solicitud enviada!",
              successDesc: "Gracias por su solicitud. Nos pondremos en contacto pronto.",
              failureTitle: "Envío fallido",
              failureDesc: "Error al enviar la solicitud. Por favor intente de nuevo."
            }
          }
        },
        blog: {
          title: "Artículos Recientes",
          description: "Mantente actualizado con las últimas ideas, tendencias y mejores prácticas en inspección, soluciones laborales y cumplimiento industrial de INSPECTORS 360."
        },
        contact: {
          officesTitle: "Nuestras Oficinas Globales",
          officesDescription: "Con ubicaciones en todo el mundo, siempre estamos cerca de ti. Encuentra tu oficina CBM más cercana para soporte y servicios locales.",
          formTitle: "Envíanos un mensaje",
          formDescription: "Completa el formulario y nuestros expertos te responderán dentro de 24 horas.",
          supportTitle: "Obtén soporte directo",
          supportDescription: "¿Prefieres hablar directamente? Nuestro equipo de atención está disponible para ayudarte con preguntas inmediatas y solicitudes urgentes.",
          supportPhoneTitle: "Soporte telefónico",
          supportPhoneDesc: "Habla con nuestro equipo de atención al cliente",
          supportPhoneHours: "Lun-Vie: 8:00 - 18:00 (EST)",
          supportEmailTitle: "Soporte por correo",
          supportEmailDesc: "Envía consultas detalladas y documentación",
          supportEmailResponse: "Respuesta dentro de 24 horas",
          supportEmergencyTitle: "Soporte de emergencia",
          supportEmergencyDesc: "Atención 24/7 para problemas urgentes de certificación",
          supportEmergencyNote: "Disponible 24/7 para emergencias",
          responseGuaranteeTitle: "Garantía de respuesta rápida",
          responsePhone: "Llamadas respondidas dentro de 3 timbres",
          responseEmail: "Respuestas por correo dentro de 24 horas",
          responseQuote: "Solicitudes de cotización procesadas dentro de 48 horas",
          labels: {
            firstName: "Nombre *",
            lastName: "Apellido *",
            email: "Correo electrónico *",
            phone: "Número de teléfono",
            company: "Compañía *",
            industry: "Industria",
            service: "Servicio requerido",
            message: "Mensaje *",
            consent: "Acepto que CBM procese mis datos personales para responder a mi consulta. Entiendo que puedo retirar mi consentimiento en cualquier momento."
          },
          placeholders: {
            firstName: "Juan",
            lastName: "Pérez",
            email: "juan.perez@empresa.com",
            phone: "+34 600 000 000",
            company: "Nombre de tu empresa",
            selectIndustry: "Seleccionar industria",
            selectService: "Seleccionar servicio",
            message: "Describe tus requisitos, plazos y preguntas específicas..."
          },
          cta: {
            send: "Enviar mensaje",
            sending: "Enviando..."
          }
        },
        verifyDocuments: {
          hero: {
            badge: "Mesa de Cumplimiento Confiable",
            title: "Verifique sus Certificados y Documentos Técnicos",
            description: "Cargue informes de inspección, certificados de cumplimiento o registros de calibración de forma segura. Nuestro equipo administrativo validará la autenticidad y responderá con los próximos pasos en 24 horas.",
            ctaButton: "Iniciar Verificación",
            securityNote: "Encriptado y manejado solo por el administrador"
          },
          form: {
            title: "Enviar documentos para verificación manual",
            description: "Proporcione los datos de contacto básicos y adjunte los certificados o informes que necesitan validación. Puede agregar hasta 5 archivos (PDF, DOC/DOCX, JPG, PNG) por envío.",
            labels: {
              firstName: "Nombre *",
              lastName: "Apellido *",
              email: "Correo Electrónico Oficial *",
              location: "Ubicación *",
              company: "Nombre de la Empresa (opcional)",
              jobTitle: "Título del Puesto (opcional)",
              comments: "Comentarios / Referencia (opcional)"
            },
            placeholders: {
              firstName: "María",
              lastName: "García",
              email: "usted@empresa.com",
              location: "Global",
              company: "CBM 360 Global",
              jobTitle: "Gerente de Operaciones",
              comments: "Agregue orden de compra, IDs de certificado o notas especiales..."
            },
            upload: {
              label: "Cargar documentos *",
              dragDrop: "Arrastre y suelte o haga clic para cargar",
              fileInfo: "Hasta 5 archivos • Máx 10MB cada uno • PDF, DOC, DOCX, JPG, PNG",
              selectFiles: "Seleccionar Archivos",
              remove: "Eliminar"
            },
            locations: {
              "Afghanistan": "Afghanistan",
              "Albania": "Albania",
              "Algeria": "Algeria",
              "Andorra": "Andorra",
              "Angola": "Angola",
              "Antigua and Barbuda": "Antigua and Barbuda",
              "Argentina": "Argentina",
              "Armenia": "Armenia",
              "Australia": "Australia",
              "Austria": "Austria",
              "Azerbaijan": "Azerbaijan",
              "Bahamas": "Bahamas",
              "Bahrain": "Bahrain",
              "Bangladesh": "Bangladesh",
              "Barbados": "Barbados",
              "Belarus": "Belarus",
              "Belgium": "Belgium",
              "Belize": "Belize",
              "Benin": "Benin",
              "Bhutan": "Bhutan",
              "Bolivia": "Bolivia",
              "Bosnia and Herzegovina": "Bosnia and Herzegovina",
              "Botswana": "Botswana",
              "Brazil": "Brazil",
              "Brunei": "Brunei",
              "Bulgaria": "Bulgaria",
              "Burkina Faso": "Burkina Faso",
              "Burundi": "Burundi",
              "Cabo Verde": "Cabo Verde",
              "Cambodia": "Cambodia",
              "Cameroon": "Cameroon",
              "Canada": "Canada",
              "Central African Republic": "Central African Republic",
              "Chad": "Chad",
              "Chile": "Chile",
              "China": "China",
              "Colombia": "Colombia",
              "Comoros": "Comoros",
              "Congo (Republic of the Congo)": "Congo (Republic of the Congo)",
              "Congo (Democratic Republic of the Congo)": "Congo (Democratic Republic of the Congo)",
              "Costa Rica": "Costa Rica",
              "Côte d'Ivoire": "Côte d'Ivoire",
              "Croatia": "Croatia",
              "Cuba": "Cuba",
              "Cyprus": "Cyprus",
              "Czech Republic (Czechia)": "Czech Republic (Czechia)",
              "Denmark": "Denmark",
              "Djibouti": "Djibouti",
              "Dominica": "Dominica",
              "Dominican Republic": "Dominican Republic",
              "Ecuador": "Ecuador",
              "Egypt": "Egypt",
              "El Salvador": "El Salvador",
              "Equatorial Guinea": "Equatorial Guinea",
              "Eritrea": "Eritrea",
              "Estonia": "Estonia",
              "Eswatini (formerly Swaziland)": "Eswatini (formerly Swaziland)",
              "Ethiopia": "Ethiopia",
              "Fiji": "Fiji",
              "Finland": "Finland",
              "France": "France",
              "Gabon": "Gabon",
              "Gambia": "Gambia",
              "Georgia": "Georgia",
              "Germany": "Germany",
              "Ghana": "Ghana",
              "Greece": "Greece",
              "Grenada": "Grenada",
              "Guatemala": "Guatemala",
              "Guinea": "Guinea",
              "Guinea-Bissau": "Guinea-Bissau",
              "Guyana": "Guyana",
              "Haiti": "Haiti",
              "Honduras": "Honduras",
              "Hungary": "Hungary",
              "Iceland": "Iceland",
              "India": "India",
              "Indonesia": "Indonesia",
              "Iran": "Iran",
              "Iraq": "Iraq",
              "Ireland": "Ireland",
              "Israel": "Israel",
              "Italy": "Italy",
              "Jamaica": "Jamaica",
              "Japan": "Japan",
              "Jordan": "Jordan",
              "Kazakhstan": "Kazakhstan",
              "Kenya": "Kenya",
              "Kiribati": "Kiribati",
              "Korea, North (North Korea)": "Korea, North (North Korea)",
              "Korea, South (South Korea)": "Korea, South (South Korea)",
              "Kuwait": "Kuwait",
              "Kyrgyzstan": "Kyrgyzstan",
              "Laos": "Laos",
              "Latvia": "Latvia",
              "Lebanon": "Lebanon",
              "Lesotho": "Lesotho",
              "Liberia": "Liberia",
              "Libya": "Libya",
              "Liechtenstein": "Liechtenstein",
              "Lithuania": "Lithuania",
              "Luxembourg": "Luxembourg",
              "Madagascar": "Madagascar",
              "Malawi": "Malawi",
              "Malaysia": "Malaysia",
              "Maldives": "Maldives",
              "Mali": "Mali",
              "Malta": "Malta",
              "Marshall Islands": "Marshall Islands",
              "Mauritania": "Mauritania",
              "Mauritius": "Mauritius",
              "Mexico": "Mexico",
              "Micronesia": "Micronesia",
              "Moldova": "Moldova",
              "Monaco": "Monaco",
              "Mongolia": "Mongolia",
              "Montenegro": "Montenegro",
              "Morocco": "Morocco",
              "Mozambique": "Mozambique",
              "Myanmar (Burma)": "Myanmar (Burma)",
              "Namibia": "Namibia",
              "Nauru": "Nauru",
              "Nepal": "Nepal",
              "Netherlands": "Netherlands",
              "New Zealand": "New Zealand",
              "Nicaragua": "Nicaragua",
              "Niger": "Niger",
              "Nigeria": "Nigeria",
              "North Macedonia": "North Macedonia",
              "Norway": "Norway",
              "Oman": "Oman",
              "Pakistan": "Pakistan",
              "Palau": "Palau",
              "Panama": "Panama",
              "Papua New Guinea": "Papua New Guinea",
              "Paraguay": "Paraguay",
              "Peru": "Peru",
              "Philippines": "Philippines",
              "Poland": "Poland",
              "Portugal": "Portugal",
              "Qatar": "Qatar",
              "Romania": "Romania",
              "Russia": "Russia",
              "Rwanda": "Rwanda",
              "Saint Kitts and Nevis": "Saint Kitts and Nevis",
              "Saint Lucia": "Saint Lucia",
              "Saint Vincent and the Grenadines": "Saint Vincent and the Grenadines",
              "Samoa": "Samoa",
              "San Marino": "San Marino",
              "Sao Tome and Principe": "Sao Tome and Principe",
              "Saudi Arabia": "Saudi Arabia",
              "Senegal": "Senegal",
              "Serbia": "Serbia",
              "Seychelles": "Seychelles",
              "Sierra Leone": "Sierra Leone",
              "Singapore": "Singapore",
              "Slovakia": "Slovakia",
              "Slovenia": "Slovenia",
              "Solomon Islands": "Solomon Islands",
              "Somalia": "Somalia",
              "South Africa": "South Africa",
              "South Sudan": "South Sudan",
              "Spain": "Spain",
              "Sri Lanka": "Sri Lanka",
              "Sudan": "Sudan",
              "Suriname": "Suriname",
              "Sweden": "Sweden",
              "Switzerland": "Switzerland",
              "Syria": "Syria",
              "Taiwan* (not UN member — widely recognized)": "Taiwan* (not UN member — widely recognized)",
              "Tajikistan": "Tajikistan",
              "Tanzania": "Tanzania",
              "Thailand": "Thailand",
              "Timor-Leste": "Timor-Leste",
              "Togo": "Togo",
              "Tonga": "Tonga",
              "Trinidad and Tobago": "Trinidad and Tobago",
              "Tunisia": "Tunisia",
              "Turkey": "Turkey",
              "Turkmenistan": "Turkmenistan",
              "Tuvalu": "Tuvalu",
              "Uganda": "Uganda",
              "Ukraine": "Ukraine",
              "United Arab Emirates": "United Arab Emirates",
              "United Kingdom": "United Kingdom",
              "United States": "United States",
              "Uruguay": "Uruguay",
              "Uzbekistan": "Uzbekistan",
              "Vanuatu": "Vanuatu",
              "Vatican City (Holy See) — UN Observer": "Vatican City (Holy See) — UN Observer",
              "Venezuela": "Venezuela",
              "Vietnam": "Vietnam",
              "Yemen": "Yemen",
              "Zambia": "Zambia",
              "Zimbabwe": "Zimbabwe"
            },
            cta: {
              submit: "Enviar al Equipo Administrativo",
              submitting: "Enviando..."
            }
          },
          sidebar: {
            whatNext: {
              title: "¿Qué sucede después?",
              steps: [
                {
                  number: "1.",
                  title: "Revisión segura:",
                  description: "Nuestro equipo administrativo valida la integridad y autenticidad de los archivos."
                },
                {
                  number: "2.",
                  title: "Correo de confirmación:",
                  description: "Recibirá una actualización directa de Support@cbm360tiv.com."
                },
                {
                  number: "3.",
                  title: "Seguimiento asistido:",
                  description: "Se programan aclaraciones adicionales o auditorías de sitio si es necesario."
                }
              ]
            },
            assistance: {
              title: "¿Necesita ayuda rápida?",
              description: "Envíe un correo a Support@cbm360tiv.com o llame al +44 7934 980214 mencionando \"Portal de Verificación de Documentos\" para enrutamiento prioritario."
            }
          },
          toast: {
            invalidFiles: "Algunos archivos fueron rechazados. Verifique los tipos de archivo y límites de tamaño.",
            success: "Sus documentos han sido enviados para verificación.",
            error: "Error al enviar documentos. Por favor, inténtelo de nuevo."
          }
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Portafolio Completo de Servicios",
          subheading: "Desde pruebas de productos hasta cumplimiento regulatorio, proporcionamos soluciones integrales para ayudarle a tener éxito en los mercados globales.",
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
              "Cumplimiento de estándares",
            ]
          },
          {
            id: 2,
            title: "Monitoreo Basado en Condición (CBM)",
            description: "Mantenimiento predictivo utilizando análisis, sensores y diagnósticos para reducir el tiempo de inactividad.",
            icon: "Settings",
            link: "/services/cbm",
            features: [
              "Análisis de vibración y acústica",
              "Termografía y análisis de aceite",
              "Tableros de salud de activos",
            ]
          },
          {
            id: 3,
            title: "Inspección (I)",
            description: "Servicios de inspección independientes que garantizan calidad y adherencia regulatoria.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "Inspección de terceros",
              "Vigilancia de proveedores",
              "Auditorías de sitio y fábrica",
            ]
          },
          {
            id: 4,
            title: "Auditoría (A)",
            description: "Auditorías de proceso, proveedor y sistema para identificar riesgos e impulsar mejoras.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "Auditorías de proveedores",
              "Revisiones de capacidad de proceso",
              "Análisis de brechas de cumplimiento",
            ]
          },
          {
            id: 5,
            title: "Verificación y Certificación (VC)",
            description: "Servicios de verificación y certificación para demostrar confianza y cumplimiento.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Sistemas de gestión",
              "Certificación de productos",
              "Aprobaciones regulatorias",
            ]
          },
          {
            id: 6,
            title: "Innovación y I+D",
            description: "Soluciones de próxima generación impulsadas por IoT, IA, Robótica y tecnologías Industria 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "Monitoreo IoT e IA",
              "Inspección robótica",
              "Tecnología de gemelo digital",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "70+",
          label: "Países Atendidos",
          description: "Presencia global con experiencia local"
        },
        {
          number: "10,000+",
          label: "Suministro de experiencia mundial",
          description: "Profesionales altamente calificados"
        },
        {
          number: "2012",
          label: "Desde 2012",
          description: "Socio de confianza desde 2012"
        }
      ],
    },
  
    ru: {
      navbar: {
        services: "Услуги",
        industries: "Отрасли",
        about: "О нас",
        careers: "Карьера",
        blog: "Блог",
        contact: "Контакты",
        getQuote: "Получить предложение",
        contactUs: "Свяжитесь с нами",
      },
      footer: {
        company: "CBM",
        description:
          "Ведущий поставщик услуг по тестированию, инспекции, сертификации и консультированию. Привержен безопасности, защите и устойчивости по всему миру.",
        services: {
          title: "Услуги",
          list: [
            "Тестирование и сертификация",
            "Инспекционные услуги",
            "Аудит и оценка",
            "Обучение и образование",
            "Цифровые решения",
            "Консалтинговые услуги",
          ],
        },
        industries: {
          title: "Отрасли",
          list: [
            "Автомобильная промышленность",
            "Здравоохранение и медицина",
            "Энергетика и коммунальные услуги",
            "Производство",
            "Строительство",
            "Продовольствие и сельское хозяйство",
          ],
        },
        contact: {
          title: "Контакты",
          address: "CBM Америка\n10040 Mesa Rim Road\nСан-Диего, Калифорния 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@cbm.com",
        },
        newsletter: "Будьте в курсе",
        placeholderEmail: "Введите ваш email",
      },
      pages: {
        services: {
          hero: {
            title: "Инспекторы 360°",
            subtitle: "Доверие по всему миру",
            description: "Мы предоставляем глобальные решения в области кадров, персонала и технической поддержки, обеспечивая сертифицированных специалистов и оборудование для гарантии безопасности, соответствия и эффективности в нефтегазовой, горнодобывающей и промышленной отраслях.",
            primaryCTAText: "Изучить услуги",
            secondaryCTAText: "Получить предложение",
          },
          servicesOverview: {
            title: "Services",
            description: "we provide complete inspection workforce and technical support solutions, including recruitment, contract staffing, payroll, logistics, and training—ensuring qualified professionals and reliable service for every project."
          },
        },
        about: {
          title: "О нас",
          breadcrumb: {
            home: "Главная",
            about: "О нас"
          },
          loading: "Загрузка...",
          error: "Ошибка загрузки контента"
        },
        careers: {
          title: "Актуальные вакансии",
          description: "Присоединяйтесь к INSPECTORS 360 и станьте частью глобальной сети сертифицированных инспекторов, инженеров и технических специалистов. Мы соединяем квалифицированных профессионалов с ведущими проектами в отраслях нефти и газа, горнодобывающей промышленности и промышленного сектора по всему миру.",
          applyNow: "Подать заявку",
          hiringProcess: {
            title: "Наш процесс найма",
            description: "Мы разработали прозрачный и эффективный процесс, нацеленный на поиск взаимного соответствия.",
            steps: {
              review: {
                title: "Рассмотрение заявки",
                description: "Наша команда по подбору изучает вашу заявку и квалификацию в соответствии с требованиями роли."
              },
              interview: {
                title: "Первичное интервью",
                description: "Телефонное или видео-интервью для обсуждения вашего опыта, интересов и соответствия роли."
              },
              assessment: {
                title: "Техническая оценка",
                description: "Тематическая техническая проверка или кейс для оценки ваших компетенций."
              },
              final: {
                title: "Финальное интервью",
                description: "Встреча с руководителями и членами команды для обсуждения сотрудничества и следующих шагов."
              }
            }
          },
          currentOpenings: {
            loadingText: "Загрузка вакансий...",
            generalApplicationText: "Не нашли подходящую роль? Мы всегда рады талантливым специалистам.",
            submitGeneralApplication: "Отправить общую заявку"
          },
          generalApplication: {
            title: "Общая заявка",
            personalInfo: {
              title: "Личная информация",
              firstName: "Имя *",
              lastName: "Фамилия *",
              email: "Email *",
              phone: "Телефон *"
            },
            positionInfo: {
              title: "Информация о должности",
              desiredPosition: "Желаемая должность *",
              desiredPositionPlaceholder: "напр., Старший инженер-испытатель",
              preferredDepartment: "Предпочтительный отдел *",
              preferredDepartmentPlaceholder: "Выберите отдел",
              departments: {
                engineering: "Инженерия",
                healthcare: "Здравоохранение",
                technology: "Технологии",
                manufacturing: "Производство",
                environmental: "Окружающая среда",
                sales: "Продажи",
                marketing: "Маркетинг",
                finance: "Финансы",
                humanResources: "HR",
                operations: "Операции",
                other: "Другое"
              }
            },
            experience: {
              label: "Опыт работы *",
              placeholder: "Выберите уровень опыта",
              options: {
                zeroToOne: "0-1 лет",
                twoToThree: "2-3 года",
                fourToFive: "4-5 лет",
                sixToEight: "6-8 лет",
                nineToTwelve: "9-12 лет",
                thirteenPlus: "13+ лет"
              }
            },
            resume: {
              label: "Резюме/CV *",
              uploadText: "Нажмите, чтобы загрузить резюме (PDF, DOC, DOCX)",
              maxSize: "Максимальный размер файла: 5МБ",
              chooseFile: "Выбрать файл"
            },
            coverLetter: {
              label: "Сопроводительное письмо *",
              placeholder: "Расскажите нам о своем опыте, навыках и почему вы хотите присоединиться к CBM..."
            },
            actions: {
              reset: "Сбросить",
              submit: "Отправить заявку",
              submitting: "Отправка..."
            },
            toasts: {
              invalidFileType: "Неверный тип файла",
              invalidFileTypeDesc: "Пожалуйста, загружайте только файлы PDF, DOC или DOCX.",
              fileTooLarge: "Файл слишком большой",
              fileTooLargeDesc: "Размер файла должен быть менее 5МБ.",
              resumeRequired: "Требуется резюме",
              resumeRequiredDesc: "Пожалуйста, загрузите ваше резюме.",
              missingInfo: "Отсутствует информация",
              missingInfoDesc: "Пожалуйста, заполните: ",
              invalidEmail: "Неверный email",
              invalidEmailDesc: "Пожалуйста, введите корректный адрес электронной почты.",
              successTitle: "Заявка отправлена!",
              successDesc: "Спасибо за вашу заявку. Мы свяжемся с вами в ближайшее время.",
              failureTitle: "Ошибка отправки",
              failureDesc: "Не удалось отправить заявку. Пожалуйста, попробуйте снова."
            }
          }
        },
        blog: {
          title: "Последние статьи",
          description: "Будьте в курсе последних идей, тенденций и лучших практик в области инспекции, кадровых решений и промышленного соответствия от INSPECTORS 360."
        },
        contact: {
          officesTitle: "Наши офисы по всему миру",
          officesDescription: "С офисами по всему миру мы всегда рядом. Найдите ближайший офис CBM для локальной поддержки и услуг.",
          formTitle: "Отправьте нам сообщение",
          formDescription: "Заполните форму ниже, и наши специалисты свяжутся с вами в течение 24 часов.",
          supportTitle: "Получите прямую поддержку",
          supportDescription: "Предпочитаете поговорить напрямую? Наша служба поддержки готова помочь с оперативными вопросами и срочными запросами.",
          supportPhoneTitle: "Телефонная поддержка",
          supportPhoneDesc: "Свяжитесь с нашей службой поддержки",
          supportPhoneHours: "Пн-Пт: 8:00 - 18:00 (EST)",
          supportEmailTitle: "Поддержка по email",
          supportEmailDesc: "Отправляйте подробные запросы и документы",
          supportEmailResponse: "Ответ в течение 24 часов",
          supportEmergencyTitle: "Экстренная поддержка",
          supportEmergencyDesc: "Круглосуточная поддержка срочных вопросов сертификации",
          supportEmergencyNote: "Доступно 24/7 для экстренных случаев",
          responseGuaranteeTitle: "Гарантия быстрого ответа",
          responsePhone: "Ответ на звонки в течение 3 гудков",
          responseEmail: "Ответ по электронной почте в течение 24 часов",
          responseQuote: "Обработка запросов на расчет в течение 48 часов",
          labels: {
            firstName: "Имя *",
            lastName: "Фамилия *",
            email: "Адрес электронной почты *",
            phone: "Номер телефона",
            company: "Компания *",
            industry: "Отрасль",
            service: "Требуемая услуга",
            message: "Сообщение *",
            consent: "Я согласен на обработку CBM моих персональных данных для ответа на мой запрос. Я понимаю, что могу отозвать согласие в любое время."
          },
          placeholders: {
            firstName: "Иван",
            lastName: "Иванов",
            email: "ivan.ivanov@company.com",
            phone: "+7 (999) 123-45-67",
            company: "Название вашей компании",
            selectIndustry: "Выберите отрасль",
            selectService: "Выберите услугу",
            message: "Опишите ваши требования, сроки и конкретные вопросы..."
          },
          cta: {
            send: "Отправить сообщение",
            sending: "Отправка..."
          }
        },
        verifyDocuments: {
          hero: {
            badge: "Надежный отдел соответствия",
            title: "Проверьте ваши сертификаты и технические документы",
            description: "Безопасно загрузите отчеты об инспекции, сертификаты соответствия или записи калибровки. Наша административная команда проверит подлинность и ответит с дальнейшими шагами в течение 24 часов.",
            ctaButton: "Начать проверку",
            securityNote: "Зашифровано и обрабатывается только администратором"
          },
          form: {
            title: "Отправить документы для ручной проверки",
            description: "Предоставьте основные контактные данные и приложите сертификаты или отчеты, требующие проверки. Вы можете добавить до 5 файлов (PDF, DOC/DOCX, JPG, PNG) за одну отправку.",
            labels: {
              firstName: "Имя *",
              lastName: "Фамилия *",
              email: "Официальный Email *",
              location: "Местоположение *",
              company: "Название компании (необязательно)",
              jobTitle: "Должность (необязательно)",
              comments: "Комментарии / Ссылка (необязательно)"
            },
            placeholders: {
              firstName: "Анна",
              lastName: "Иванова",
              email: "вы@компания.com",
              location: "Глобально",
              company: "CBM 360 Global",
              jobTitle: "Менеджер по операциям",
              comments: "Добавьте заказ на покупку, ID сертификата или специальные заметки..."
            },
            upload: {
              label: "Загрузить документы *",
              dragDrop: "Перетащите или нажмите для загрузки",
              fileInfo: "До 5 файлов • Макс 10МБ каждый • PDF, DOC, DOCX, JPG, PNG",
              selectFiles: "Выбрать файлы",
              remove: "Удалить"
            },
            locations: {
              "Afghanistan": "Afghanistan",
              "Albania": "Albania",
              "Algeria": "Algeria",
              "Andorra": "Andorra",
              "Angola": "Angola",
              "Antigua and Barbuda": "Antigua and Barbuda",
              "Argentina": "Argentina",
              "Armenia": "Armenia",
              "Australia": "Australia",
              "Austria": "Austria",
              "Azerbaijan": "Azerbaijan",
              "Bahamas": "Bahamas",
              "Bahrain": "Bahrain",
              "Bangladesh": "Bangladesh",
              "Barbados": "Barbados",
              "Belarus": "Belarus",
              "Belgium": "Belgium",
              "Belize": "Belize",
              "Benin": "Benin",
              "Bhutan": "Bhutan",
              "Bolivia": "Bolivia",
              "Bosnia and Herzegovina": "Bosnia and Herzegovina",
              "Botswana": "Botswana",
              "Brazil": "Brazil",
              "Brunei": "Brunei",
              "Bulgaria": "Bulgaria",
              "Burkina Faso": "Burkina Faso",
              "Burundi": "Burundi",
              "Cabo Verde": "Cabo Verde",
              "Cambodia": "Cambodia",
              "Cameroon": "Cameroon",
              "Canada": "Canada",
              "Central African Republic": "Central African Republic",
              "Chad": "Chad",
              "Chile": "Chile",
              "China": "China",
              "Colombia": "Colombia",
              "Comoros": "Comoros",
              "Congo (Republic of the Congo)": "Congo (Republic of the Congo)",
              "Congo (Democratic Republic of the Congo)": "Congo (Democratic Republic of the Congo)",
              "Costa Rica": "Costa Rica",
              "Côte d'Ivoire": "Côte d'Ivoire",
              "Croatia": "Croatia",
              "Cuba": "Cuba",
              "Cyprus": "Cyprus",
              "Czech Republic (Czechia)": "Czech Republic (Czechia)",
              "Denmark": "Denmark",
              "Djibouti": "Djibouti",
              "Dominica": "Dominica",
              "Dominican Republic": "Dominican Republic",
              "Ecuador": "Ecuador",
              "Egypt": "Egypt",
              "El Salvador": "El Salvador",
              "Equatorial Guinea": "Equatorial Guinea",
              "Eritrea": "Eritrea",
              "Estonia": "Estonia",
              "Eswatini (formerly Swaziland)": "Eswatini (formerly Swaziland)",
              "Ethiopia": "Ethiopia",
              "Fiji": "Fiji",
              "Finland": "Finland",
              "France": "France",
              "Gabon": "Gabon",
              "Gambia": "Gambia",
              "Georgia": "Georgia",
              "Germany": "Germany",
              "Ghana": "Ghana",
              "Greece": "Greece",
              "Grenada": "Grenada",
              "Guatemala": "Guatemala",
              "Guinea": "Guinea",
              "Guinea-Bissau": "Guinea-Bissau",
              "Guyana": "Guyana",
              "Haiti": "Haiti",
              "Honduras": "Honduras",
              "Hungary": "Hungary",
              "Iceland": "Iceland",
              "India": "India",
              "Indonesia": "Indonesia",
              "Iran": "Iran",
              "Iraq": "Iraq",
              "Ireland": "Ireland",
              "Israel": "Israel",
              "Italy": "Italy",
              "Jamaica": "Jamaica",
              "Japan": "Japan",
              "Jordan": "Jordan",
              "Kazakhstan": "Kazakhstan",
              "Kenya": "Kenya",
              "Kiribati": "Kiribati",
              "Korea, North (North Korea)": "Korea, North (North Korea)",
              "Korea, South (South Korea)": "Korea, South (South Korea)",
              "Kuwait": "Kuwait",
              "Kyrgyzstan": "Kyrgyzstan",
              "Laos": "Laos",
              "Latvia": "Latvia",
              "Lebanon": "Lebanon",
              "Lesotho": "Lesotho",
              "Liberia": "Liberia",
              "Libya": "Libya",
              "Liechtenstein": "Liechtenstein",
              "Lithuania": "Lithuania",
              "Luxembourg": "Luxembourg",
              "Madagascar": "Madagascar",
              "Malawi": "Malawi",
              "Malaysia": "Malaysia",
              "Maldives": "Maldives",
              "Mali": "Mali",
              "Malta": "Malta",
              "Marshall Islands": "Marshall Islands",
              "Mauritania": "Mauritania",
              "Mauritius": "Mauritius",
              "Mexico": "Mexico",
              "Micronesia": "Micronesia",
              "Moldova": "Moldova",
              "Monaco": "Monaco",
              "Mongolia": "Mongolia",
              "Montenegro": "Montenegro",
              "Morocco": "Morocco",
              "Mozambique": "Mozambique",
              "Myanmar (Burma)": "Myanmar (Burma)",
              "Namibia": "Namibia",
              "Nauru": "Nauru",
              "Nepal": "Nepal",
              "Netherlands": "Netherlands",
              "New Zealand": "New Zealand",
              "Nicaragua": "Nicaragua",
              "Niger": "Niger",
              "Nigeria": "Nigeria",
              "North Macedonia": "North Macedonia",
              "Norway": "Norway",
              "Oman": "Oman",
              "Pakistan": "Pakistan",
              "Palau": "Palau",
              "Panama": "Panama",
              "Papua New Guinea": "Papua New Guinea",
              "Paraguay": "Paraguay",
              "Peru": "Peru",
              "Philippines": "Philippines",
              "Poland": "Poland",
              "Portugal": "Portugal",
              "Qatar": "Qatar",
              "Romania": "Romania",
              "Russia": "Russia",
              "Rwanda": "Rwanda",
              "Saint Kitts and Nevis": "Saint Kitts and Nevis",
              "Saint Lucia": "Saint Lucia",
              "Saint Vincent and the Grenadines": "Saint Vincent and the Grenadines",
              "Samoa": "Samoa",
              "San Marino": "San Marino",
              "Sao Tome and Principe": "Sao Tome and Principe",
              "Saudi Arabia": "Saudi Arabia",
              "Senegal": "Senegal",
              "Serbia": "Serbia",
              "Seychelles": "Seychelles",
              "Sierra Leone": "Sierra Leone",
              "Singapore": "Singapore",
              "Slovakia": "Slovakia",
              "Slovenia": "Slovenia",
              "Solomon Islands": "Solomon Islands",
              "Somalia": "Somalia",
              "South Africa": "South Africa",
              "South Sudan": "South Sudan",
              "Spain": "Spain",
              "Sri Lanka": "Sri Lanka",
              "Sudan": "Sudan",
              "Suriname": "Suriname",
              "Sweden": "Sweden",
              "Switzerland": "Switzerland",
              "Syria": "Syria",
              "Taiwan* (not UN member — widely recognized)": "Taiwan* (not UN member — widely recognized)",
              "Tajikistan": "Tajikistan",
              "Tanzania": "Tanzania",
              "Thailand": "Thailand",
              "Timor-Leste": "Timor-Leste",
              "Togo": "Togo",
              "Tonga": "Tonga",
              "Trinidad and Tobago": "Trinidad and Tobago",
              "Tunisia": "Tunisia",
              "Turkey": "Turkey",
              "Turkmenistan": "Turkmenistan",
              "Tuvalu": "Tuvalu",
              "Uganda": "Uganda",
              "Ukraine": "Ukraine",
              "United Arab Emirates": "United Arab Emirates",
              "United Kingdom": "United Kingdom",
              "United States": "United States",
              "Uruguay": "Uruguay",
              "Uzbekistan": "Uzbekistan",
              "Vanuatu": "Vanuatu",
              "Vatican City (Holy See) — UN Observer": "Vatican City (Holy See) — UN Observer",
              "Venezuela": "Venezuela",
              "Vietnam": "Vietnam",
              "Yemen": "Yemen",
              "Zambia": "Zambia",
              "Zimbabwe": "Zimbabwe"
            },
            cta: {
              submit: "Отправить административной команде",
              submitting: "Отправка..."
            }
          },
          sidebar: {
            whatNext: {
              title: "Что происходит дальше?",
              steps: [
                {
                  number: "1.",
                  title: "Безопасная проверка:",
                  description: "Наш административный отдел проверяет целостность и подлинность файлов."
                },
                {
                  number: "2.",
                  title: "Подтверждение по email:",
                  description: "Вы получите прямое обновление от Support@cbm360tiv.com."
                },
                {
                  number: "3.",
                  title: "Сопровождаемое наблюдение:",
                  description: "При необходимости планируются дополнительные разъяснения или аудиты объекта."
                }
              ]
            },
            assistance: {
              title: "Нужна быстрая помощь?",
              description: "Отправьте email на Support@cbm360tiv.com или позвоните по телефону +44 7934 980214, упомянув \"Портал проверки документов\" для приоритетной маршрутизации."
            }
          },
          toast: {
            invalidFiles: "Некоторые файлы были отклонены. Проверьте типы файлов и ограничения размера.",
            success: "Ваши документы отправлены на проверку.",
            error: "Не удалось отправить документы. Пожалуйста, попробуйте снова."
          }
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "Полный портфель услуг",
          subheading: "От тестирования продуктов до соблюдения нормативных требований, мы предоставляем комплексные решения для успеха на глобальных рынках.",
        },
        servicesList: [
          {
            id: 1,
            title: "Тестирование (T)",
            description: "Комплексные услуги тестирования для проверки безопасности, производительности и соответствия требованиям.",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "Неразрушающий контроль",
              "Производительность и надежность",
              "Соответствие стандартам",
            ]
          },
          {
            id: 2,
            title: "Мониторинг по состоянию (CBM)",
            description: "Предиктивное обслуживание с использованием аналитики, датчиков и диагностики для снижения простоев.",
            icon: "Settings",
            link: "/services/cbm",
            features: [
              "Анализ вибрации и акустики",
              "Термография и анализ масла",
              "Панели состояния активов",
            ]
          },
          {
            id: 3,
            title: "Инспекция (I)",
            description: "Независимые инспекционные услуги, обеспечивающие качество и соблюдение нормативных требований.",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "Инспекция третьей стороной",
              "Надзор за поставщиками",
              "Аудит площадок и заводов",
            ]
          },
          {
            id: 4,
            title: "Аудит (A)",
            description: "Аудит процессов, поставщиков и систем для выявления рисков и стимулирования улучшений.",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "Аудит поставщиков",
              "Обзор производственных возможностей",
              "Анализ пробелов в соответствии",
            ]
          },
          {
            id: 5,
            title: "Верификация и Сертификация (VC)",
            description: "Услуги верификации и сертификации для демонстрации доверия и соответствия требованиям.",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "Системы менеджмента",
              "Сертификация продукции",
              "Регуляторные одобрения",
            ]
          },
          {
            id: 6,
            title: "Инновации и НИОКР",
            description: "Решения следующего поколения на основе IoT, ИИ, робототехники и технологий Индустрии 4.0.",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "Мониторинг IoT и ИИ",
              "Роботизированная инспекция",
              "Технология цифрового двойника",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "70+",
          label: "Обслуживаемые страны",
          description: "Глобальное присутствие с местной экспертизой"
        },
        {
          number: "10 000+",
          label: "Поставка экспертизы по всему миру",
          description: "Высококвалифицированные специалисты"
        },
        {
          number: "2012",
          label: "С 2012 года",
          description: "Надежный партнер с 2012 года"
        }
      ],
    },
  
    zh: {
      navbar: {
        services: "服务",
        industries: "行业",
        about: "关于",
        careers: "职业发展",
        blog: "博客",
        contact: "联系我们",
        getQuote: "获取报价",
        contactUs: "联系我们",
      },
      footer: {
        company: "CBM",
        description:
          "领先的测试、检验、认证和咨询服务提供商。致力于全球安全、保障和可持续发展。",
        services: {
          title: "服务",
          list: [
            "测试与认证",
            "检验服务",
            "审计与评估",
            "培训与教育",
            "数字解决方案",
            "咨询服务",
          ],
        },
        industries: {
          title: "行业",
          list: [
            "汽车",
            "医疗保健与医疗",
            "能源与公用事业",
            "制造业",
            "建筑",
            "食品与农业",
          ],
        },
        contact: {
          title: "联系我们",
          address: "CBM 美国\n10040 Mesa Rim Road\n圣地亚哥，加州 92121",
          phone: "+1 (555) 123-4567",
          email: "contact@cbm.com",
        },
        newsletter: "保持更新",
        placeholderEmail: "输入您的电子邮件",
      },
      pages: {
        services: {
          hero: {
            title: "检验员 360°",
            subtitle: "全球信赖",
            description: "我们提供全球劳动力、人员配置和技术支持解决方案，提供经过认证的专业人员和设备，以确保石油和天然气、采矿及工业领域的安全、合规和高效运行。",
            primaryCTAText: "探索服务",
            secondaryCTAText: "获取报价",
          },
          servicesOverview: {
            title: "Services",
            description: "we provide complete inspection workforce and technical support solutions, including recruitment, contract staffing, payroll, logistics, and training—ensuring qualified professionals and reliable service for every project."
          },
        },
        about: {
          title: "关于",
          breadcrumb: {
            home: "首页",
            about: "关于"
          },
          loading: "加载中...",
          error: "内容加载失败"
        },
        careers: {
          title: "当前职位空缺",
          description: "加入 INSPECTORS 360，成为全球认证检验员、工程师和技术专业人士网络的一员。我们将优秀人才与全球石油和天然气、采矿及工业领域的领先项目相连接。",
          applyNow: "立即申请",
          hiringProcess: {
            title: "我们的招聘流程",
            description: "我们设计的流程透明、高效，并专注于寻找合适的相互契合点。",
            steps: {
              review: {
                title: "申请审核",
                description: "我们的人才团队将根据职位要求审核您的申请和资格。"
              },
              interview: {
                title: "初次面试",
                description: "通过电话或视频面试来讨论您的背景、兴趣以及是否适合该职位。"
              },
              assessment: {
                title: "技术评估",
                description: "特定角色的技术评估或案例研究来评估您的能力。"
              },
              final: {
                title: "最终面试",
                description: "与招聘经理和团队成员会面，讨论合作和后续步骤。"
              }
            }
          },
          currentOpenings: {
            loadingText: "正在加载职业...",
            generalApplicationText: "没有找到合适的职位？我们一直在寻找有才华的人才。",
            submitGeneralApplication: "提交通用申请"
          },
          generalApplication: {
            title: "一般申请",
            personalInfo: {
              title: "个人信息",
              firstName: "名字 *",
              lastName: "姓氏 *",
              email: "电子邮件 *",
              phone: "电话 *"
            },
            positionInfo: {
              title: "职位信息",
              desiredPosition: "期望职位 *",
              desiredPositionPlaceholder: "例如：高级测试工程师",
              preferredDepartment: "首选部门 *",
              preferredDepartmentPlaceholder: "选择部门",
              departments: {
                engineering: "工程",
                healthcare: "医疗保健",
                technology: "技术",
                manufacturing: "制造",
                environmental: "环境",
                sales: "销售",
                marketing: "市场营销",
                finance: "财务",
                humanResources: "人力资源",
                operations: "运营",
                other: "其他"
              }
            },
            experience: {
              label: "工作经验 *",
              placeholder: "选择经验水平",
              options: {
                zeroToOne: "0-1 年",
                twoToThree: "2-3 年",
                fourToFive: "4-5 年",
                sixToEight: "6-8 年",
                nineToTwelve: "9-12 年",
                thirteenPlus: "13+ 年"
              }
            },
            resume: {
              label: "简历/CV *",
              uploadText: "点击上传您的简历 (PDF, DOC, DOCX)",
              maxSize: "最大文件大小：5MB",
              chooseFile: "选择文件"
            },
            coverLetter: {
              label: "求职信 *",
              placeholder: "告诉我们您的背景、技能以及您为什么有兴趣加入 CBM..."
            },
            actions: {
              reset: "重置",
              submit: "提交申请",
              submitting: "正在提交..."
            },
            toasts: {
              invalidFileType: "无效的文件类型",
              invalidFileTypeDesc: "请仅上传 PDF, DOC 或 DOCX 文件。",
              fileTooLarge: "文件过大",
              fileTooLargeDesc: "文件大小必须小于 5MB。",
              resumeRequired: "需要简历",
              resumeRequiredDesc: "请上传您的简历。",
              missingInfo: "缺少信息",
              missingInfoDesc: "请填写：",
              invalidEmail: "无效的电子邮件",
              invalidEmailDesc: "请输入有效的电子邮件地址。",
              successTitle: "申请已提交！",
              successDesc: "感谢您的申请。我们将尽快与您联系。",
              failureTitle: "提交失败",
              failureDesc: "提交申请失败。请重试。"
            }
          }
        },
        blog: {
          title: "最新文章",
          description: "通过 INSPECTORS 360 获取最新的检验、劳动力解决方案和工业合规方面的洞察、趋势与最佳实践，保持与行业同步。"
        },
        contact: {
          officesTitle: "我们的全球办事处",
          officesDescription: "我们在全球各地设有办事处，随时为您提供服务。查找您附近的 CBM 办事处，获取本地支持和服务。",
          formTitle: "给我们留言",
          formDescription: "填写下面的表格，我们的专家将在 24 小时内回复您。",
          supportTitle: "获得直接支持",
          supportDescription: "想直接联系？我们的客户支持团队随时准备解答您的紧急问题和请求。",
          supportPhoneTitle: "电话支持",
          supportPhoneDesc: "与我们的客户服务团队联系",
          supportPhoneHours: "周一至周五：上午 8:00 - 下午 6:00（东部标准时间）",
          supportEmailTitle: "电子邮件支持",
          supportEmailDesc: "发送详细的询问和文件",
          supportEmailResponse: "24小时内回复",
          supportEmergencyTitle: "紧急支援",
          supportEmergencyDesc: "全天候支持紧急认证问题",
          supportEmergencyNote: "全天候提供紧急服务",
          responseGuaranteeTitle: "快速响应保证",
          responsePhone: "电话咨询在 3 声响铃内得到答复",
          responseEmail: "24小时内回复电子邮件",
          responseQuote: "报价请求在 48 小时内处理",
          labels: {
            firstName: "名 *",
            lastName: "姓 *",
            email: "电子邮件地址 *",
            phone: "电话号码",
            company: "公司 *",
            industry: "行业",
            service: "需要服务",
            message: "信息 *",
            consent: "我同意 CBM 处理我的个人数据以回复我的咨询。我理解我可以随时撤回同意。"
          },
          placeholders: {
            firstName: "约翰",
            lastName: "多伊",
            email: "john.doe@company.com",
            phone: "+1 (555) 123-4567",
            company: "您的公司名称",
            selectIndustry: "选择行业",
            selectService: "选择服务",
            message: "请描述您的要求、时间表以及任何具体问题……"
          },
          cta: {
            send: "发送消息",
            sending: "正在发送..."
          }
        },
        verifyDocuments: {
          hero: {
            badge: "可信合规服务台",
            title: "验证您的证书和技术文件",
            description: "安全上传检验报告、合规证书或校准记录。我们的管理团队将验证真实性，并在24小时内回复后续步骤。",
            ctaButton: "开始验证",
            securityNote: "加密并仅由管理员处理"
          },
          form: {
            title: "提交文件以进行人工验证",
            description: "提供基本联系信息并附上需要验证的证书或报告。每次提交最多可添加5个文件（PDF、DOC/DOCX、JPG、PNG）。",
            labels: {
              firstName: "名字 *",
              lastName: "姓氏 *",
              email: "官方电子邮件 *",
              location: "位置 *",
              company: "公司名称（可选）",
              jobTitle: "职位（可选）",
              comments: "评论/参考（可选）"
            },
            placeholders: {
              firstName: "小明",
              lastName: "王",
              email: "您@公司.com",
              location: "全球",
              company: "CBM 360 Global",
              jobTitle: "运营经理",
              comments: "添加采购订单、证书ID或任何特殊说明..."
            },
            upload: {
              label: "上传文件 *",
              dragDrop: "拖放或点击上传",
              fileInfo: "最多5个文件 • 每个最大10MB • PDF、DOC、DOCX、JPG、PNG",
              selectFiles: "选择文件",
              remove: "删除"
            },
            locations: {
              "Afghanistan": "Afghanistan",
              "Albania": "Albania",
              "Algeria": "Algeria",
              "Andorra": "Andorra",
              "Angola": "Angola",
              "Antigua and Barbuda": "Antigua and Barbuda",
              "Argentina": "Argentina",
              "Armenia": "Armenia",
              "Australia": "Australia",
              "Austria": "Austria",
              "Azerbaijan": "Azerbaijan",
              "Bahamas": "Bahamas",
              "Bahrain": "Bahrain",
              "Bangladesh": "Bangladesh",
              "Barbados": "Barbados",
              "Belarus": "Belarus",
              "Belgium": "Belgium",
              "Belize": "Belize",
              "Benin": "Benin",
              "Bhutan": "Bhutan",
              "Bolivia": "Bolivia",
              "Bosnia and Herzegovina": "Bosnia and Herzegovina",
              "Botswana": "Botswana",
              "Brazil": "Brazil",
              "Brunei": "Brunei",
              "Bulgaria": "Bulgaria",
              "Burkina Faso": "Burkina Faso",
              "Burundi": "Burundi",
              "Cabo Verde": "Cabo Verde",
              "Cambodia": "Cambodia",
              "Cameroon": "Cameroon",
              "Canada": "Canada",
              "Central African Republic": "Central African Republic",
              "Chad": "Chad",
              "Chile": "Chile",
              "China": "China",
              "Colombia": "Colombia",
              "Comoros": "Comoros",
              "Congo (Republic of the Congo)": "Congo (Republic of the Congo)",
              "Congo (Democratic Republic of the Congo)": "Congo (Democratic Republic of the Congo)",
              "Costa Rica": "Costa Rica",
              "Côte d'Ivoire": "Côte d'Ivoire",
              "Croatia": "Croatia",
              "Cuba": "Cuba",
              "Cyprus": "Cyprus",
              "Czech Republic (Czechia)": "Czech Republic (Czechia)",
              "Denmark": "Denmark",
              "Djibouti": "Djibouti",
              "Dominica": "Dominica",
              "Dominican Republic": "Dominican Republic",
              "Ecuador": "Ecuador",
              "Egypt": "Egypt",
              "El Salvador": "El Salvador",
              "Equatorial Guinea": "Equatorial Guinea",
              "Eritrea": "Eritrea",
              "Estonia": "Estonia",
              "Eswatini (formerly Swaziland)": "Eswatini (formerly Swaziland)",
              "Ethiopia": "Ethiopia",
              "Fiji": "Fiji",
              "Finland": "Finland",
              "France": "France",
              "Gabon": "Gabon",
              "Gambia": "Gambia",
              "Georgia": "Georgia",
              "Germany": "Germany",
              "Ghana": "Ghana",
              "Greece": "Greece",
              "Grenada": "Grenada",
              "Guatemala": "Guatemala",
              "Guinea": "Guinea",
              "Guinea-Bissau": "Guinea-Bissau",
              "Guyana": "Guyana",
              "Haiti": "Haiti",
              "Honduras": "Honduras",
              "Hungary": "Hungary",
              "Iceland": "Iceland",
              "India": "India",
              "Indonesia": "Indonesia",
              "Iran": "Iran",
              "Iraq": "Iraq",
              "Ireland": "Ireland",
              "Israel": "Israel",
              "Italy": "Italy",
              "Jamaica": "Jamaica",
              "Japan": "Japan",
              "Jordan": "Jordan",
              "Kazakhstan": "Kazakhstan",
              "Kenya": "Kenya",
              "Kiribati": "Kiribati",
              "Korea, North (North Korea)": "Korea, North (North Korea)",
              "Korea, South (South Korea)": "Korea, South (South Korea)",
              "Kuwait": "Kuwait",
              "Kyrgyzstan": "Kyrgyzstan",
              "Laos": "Laos",
              "Latvia": "Latvia",
              "Lebanon": "Lebanon",
              "Lesotho": "Lesotho",
              "Liberia": "Liberia",
              "Libya": "Libya",
              "Liechtenstein": "Liechtenstein",
              "Lithuania": "Lithuania",
              "Luxembourg": "Luxembourg",
              "Madagascar": "Madagascar",
              "Malawi": "Malawi",
              "Malaysia": "Malaysia",
              "Maldives": "Maldives",
              "Mali": "Mali",
              "Malta": "Malta",
              "Marshall Islands": "Marshall Islands",
              "Mauritania": "Mauritania",
              "Mauritius": "Mauritius",
              "Mexico": "Mexico",
              "Micronesia": "Micronesia",
              "Moldova": "Moldova",
              "Monaco": "Monaco",
              "Mongolia": "Mongolia",
              "Montenegro": "Montenegro",
              "Morocco": "Morocco",
              "Mozambique": "Mozambique",
              "Myanmar (Burma)": "Myanmar (Burma)",
              "Namibia": "Namibia",
              "Nauru": "Nauru",
              "Nepal": "Nepal",
              "Netherlands": "Netherlands",
              "New Zealand": "New Zealand",
              "Nicaragua": "Nicaragua",
              "Niger": "Niger",
              "Nigeria": "Nigeria",
              "North Macedonia": "North Macedonia",
              "Norway": "Norway",
              "Oman": "Oman",
              "Pakistan": "Pakistan",
              "Palau": "Palau",
              "Panama": "Panama",
              "Papua New Guinea": "Papua New Guinea",
              "Paraguay": "Paraguay",
              "Peru": "Peru",
              "Philippines": "Philippines",
              "Poland": "Poland",
              "Portugal": "Portugal",
              "Qatar": "Qatar",
              "Romania": "Romania",
              "Russia": "Russia",
              "Rwanda": "Rwanda",
              "Saint Kitts and Nevis": "Saint Kitts and Nevis",
              "Saint Lucia": "Saint Lucia",
              "Saint Vincent and the Grenadines": "Saint Vincent and the Grenadines",
              "Samoa": "Samoa",
              "San Marino": "San Marino",
              "Sao Tome and Principe": "Sao Tome and Principe",
              "Saudi Arabia": "Saudi Arabia",
              "Senegal": "Senegal",
              "Serbia": "Serbia",
              "Seychelles": "Seychelles",
              "Sierra Leone": "Sierra Leone",
              "Singapore": "Singapore",
              "Slovakia": "Slovakia",
              "Slovenia": "Slovenia",
              "Solomon Islands": "Solomon Islands",
              "Somalia": "Somalia",
              "South Africa": "South Africa",
              "South Sudan": "South Sudan",
              "Spain": "Spain",
              "Sri Lanka": "Sri Lanka",
              "Sudan": "Sudan",
              "Suriname": "Suriname",
              "Sweden": "Sweden",
              "Switzerland": "Switzerland",
              "Syria": "Syria",
              "Taiwan* (not UN member — widely recognized)": "Taiwan* (not UN member — widely recognized)",
              "Tajikistan": "Tajikistan",
              "Tanzania": "Tanzania",
              "Thailand": "Thailand",
              "Timor-Leste": "Timor-Leste",
              "Togo": "Togo",
              "Tonga": "Tonga",
              "Trinidad and Tobago": "Trinidad and Tobago",
              "Tunisia": "Tunisia",
              "Turkey": "Turkey",
              "Turkmenistan": "Turkmenistan",
              "Tuvalu": "Tuvalu",
              "Uganda": "Uganda",
              "Ukraine": "Ukraine",
              "United Arab Emirates": "United Arab Emirates",
              "United Kingdom": "United Kingdom",
              "United States": "United States",
              "Uruguay": "Uruguay",
              "Uzbekistan": "Uzbekistan",
              "Vanuatu": "Vanuatu",
              "Vatican City (Holy See) — UN Observer": "Vatican City (Holy See) — UN Observer",
              "Venezuela": "Venezuela",
              "Vietnam": "Vietnam",
              "Yemen": "Yemen",
              "Zambia": "Zambia",
              "Zimbabwe": "Zimbabwe"
            },
            cta: {
              submit: "发送给管理团队",
              submitting: "正在发送..."
            }
          },
          sidebar: {
            whatNext: {
              title: "接下来会发生什么？",
              steps: [
                {
                  number: "1.",
                  title: "安全审查：",
                  description: "我们的管理部门验证文件的完整性和真实性。"
                },
                {
                  number: "2.",
                  title: "确认电子邮件：",
                  description: "您将收到来自Support@cbm360tiv.com的直接更新。"
                },
                {
                  number: "3.",
                  title: "协助跟进：",
                  description: "如有需要，将安排额外的澄清或现场审核。"
                }
              ]
            },
            assistance: {
              title: "需要快速帮助？",
              description: "发送电子邮件至Support@cbm360tiv.com或致电+44 7934 980214，并提及\"文件验证门户\"以获得优先路由。"
            }
          },
          toast: {
            invalidFiles: "某些文件被拒绝。请检查文件类型和大小限制。",
            success: "您的文件已发送进行验证。",
            error: "发送文件失败。请重试。"
          }
        },
      },
      services: {
        completeServicePortfolio: {
          heading: "完整的服务组合",
          subheading: "从产品测试到法规遵从，我们提供全面的解决方案，帮助您在全球市场取得成功。",
        },
        servicesList: [
          {
            id: 1,
            title: "测试（T）",
            description: "全面的测试服务，以验证安全性、性能和合规性。",
            icon: "Search",
            link: "/services/testing",
            imageUrl: "/testing-inspection-bg.jpg",
            features: [
              "无损检测",
              "性能和可靠性",
              "标准合规性",
            ]
          },
          {
            id: 2,
            title: "基于状态的监测（CBM）",
            description: "使用分析、传感器和诊断进行预测性维护以减少停机时间。",
            icon: "Settings",
            link: "/services/cbm",
            features: [
              "振动和声学分析",
              "热成像和油分析",
              "资产健康仪表板",
            ]
          },
          {
            id: 3,
            title: "检查（I）",
            description: "独立检验服务确保质量和法规遵守。",
            icon: "Shield",
            link: "/services/inspection",
            features: [
              "第三方检验",
              "供应商监控",
              "现场和工厂审核",
            ]
          },
          {
            id: 4,
            title: "审计（A）",
            description: "流程、供应商和系统审计，以识别风险并推动改进。",
            icon: "FileText",
            link: "/services/auditing",
            features: [
              "供应商审核",
              "过程能力评审",
              "合规差距分析",
            ]
          },
          {
            id: 5,
            title: "验证与认证（VC）",
            description: "验证和认证服务以证明信任和合规性。",
            icon: "Award",
            link: "/services/verification-certification",
            features: [
              "管理系统",
              "产品认证",
              "监管部门批准",
            ]
          },
          {
            id: 6,
            title: "创新与研发",
            description: "由物联网、人工智能、机器人和工业 4.0 技术支持的下一代解决方案。",
            icon: "Brain",
            link: "/services/innovation-rd",
            features: [
              "物联网和人工智能监控",
              "机器人检查",
              "数字孪生技术",
            ]
          },
        ]
      },
      industryStats: [
        {
          number: "70+",
          label: "服务国家",
          description: "拥有本地专业知识的全球影响力"
        },
        {
          number: "10,000+",
          label: "全球专业能力供应",
          description: "高素质的专业人员"
        },
        {
          number: "2012",
          label: "成立年份",
          description: "自 2012 年以来值得信赖"
        }
      ],
    },
  };
  
  module.exports = translations;



