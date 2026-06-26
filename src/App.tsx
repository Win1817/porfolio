import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Menu, 
  X, 
  ArrowRight,
  Cloud,
  Layers,
  Terminal,
  Shield,
  Database,
  Cpu,
  Monitor,
  Code,
  Globe,
  Settings,
  FileDown,
  Brain,
  Eye
} from 'lucide-react';
import { generateCV, generateCVBlob } from './generateCV';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();

const AVAILABILITY_STATUS = import.meta.env.VITE_AVAILABILITY_STATUS || 'available';

const STATUS_CONFIG = {
  available: { tagText: 'Available for opportunities', badgeText: 'Available', color: 'var(--accent2)' },
  employed:  { tagText: 'Currently employed', badgeText: 'Employed', color: '#f5a623' },
};

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cvPreviewUrl, setCvPreviewUrl] = useState<string | null>(null);
  const [pdfPages, setPdfPages] = useState<string[]>([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const previewCV = async () => {
    setPdfLoading(true);
    setPdfPages([]);
    const blob = await generateCVBlob();
    const url = URL.createObjectURL(blob);
    setCvPreviewUrl(url);
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const pages: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;
        await page.render({ canvasContext: ctx, viewport }).promise;
        pages.push(canvas.toDataURL('image/png'));
      }
      setPdfPages(pages);
    } finally {
      setPdfLoading(false);
    }
  };

  const closePreview = () => {
    if (cvPreviewUrl) URL.revokeObjectURL(cvPreviewUrl);
    setCvPreviewUrl(null);
    setPdfPages([]);
  };

  const downloadCV = async () => {
    const blob = await generateCVBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SurelyWinDilag_CV.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Homelab', href: '#homelab' },
    { name: 'Contact', href: '#contact' },
  ];

  const skills = [
    { category: 'Cloud Platforms', list: 'Azure (VNets, NSG, VMs, AKS, Firewall, IAM, ARM Templates, CLI, Monitor, Policy, AI Foundry, Azure OpenAI) · AWS (EC2, S3, RDS, CloudWatch, VPC, AMI)', icon: <Cloud className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Kubernetes & Ops', list: 'Kubernetes (AKS) · OpenShift · Helm · Rancher · Headlamp · Istio (mTLS, traffic management, Kiali)', icon: <Layers className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'DevOps & CI/CD', list: 'Git · GitOps · Azure DevOps · JFrog Artifactory · Jenkins · Bash · PowerShell', icon: <Settings className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Data & Integration', list: 'XML · AIXM (aviation data standard) · QGIS · REST APIs · Postman · Swagger · JSON · YAML · ActiveMQ', icon: <Globe className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Observability', list: 'Prometheus · Grafana · Zabbix · Elasticsearch · OpenSearch · Kibana · Tempo · Jaeger', icon: <Monitor className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Security & IAM', list: 'VNets · NSG · Firewalls · IAM · Keycloak · Encryption', icon: <Shield className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Operating Systems', list: 'Linux (RHEL, Ubuntu) · Windows Server 2019/2022 · Proxmox · VMware', icon: <Cpu className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Programming', list: 'Python · C++ · ReactJS · React Native · Bash · PowerShell', icon: <Code className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Databases & ITSM', list: 'MySQL · Microsoft SQL Server · Amazon RDS · JIRA · Confluence · Jama · ConnectWise', icon: <Database className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'AI / ML', list: 'Ollama · Qwen3 · LoRA · QLoRA · PyTorch · NumPy · LangChain · RAG · Open WebUI', icon: <Brain className="w-5 h-5 text-[var(--accent)]" /> },
  ];

  const experience = [
    {
      period: 'Feb 2024 – Present',
      company: 'AirNav Technology Services',
      location: 'Iloilo City, Philippines',
      title: 'Systems & DevOps Engineer',
      duties: [
        'Deliver end-to-end UTM/ATM system engineering across the full lifecycle — from requirements and architecture to integration, validation, and operations — following ISO/IEC 15288 and Eurocontrol standards.',
        'Ingest, audit, and validate AIXM 5.1 datasets against Eurocontrol geometry rules; diagnose composite-airspace resolution failures and align pipelines with EU SWIM data-sharing standards.',
        'Author Component Security Assurance Records (CSARs) aligned with ED-202A/DO-326A, documenting network isolation, attack surface reduction, and vulnerability tracking for regulatory sign-off.',
        'Manage system baseline via Engineering Change Proposals (ECPs) and System Change Procedures — covering risk mitigation, impact analysis, and rollback strategies.',
        'Govern requirements traceability using Jama (baseline versioning, V&V traceability matrix) and Jira (PI Planning, sprint mapping, backlog refinement) across Agile delivery cycles.',
        'Architect and maintain Azure cloud infrastructure (AZ-104): VNets, NSGs, firewall policies, IAM, Azure Monitor, ARM templates, Azure AI Foundry, and Azure OpenAI integrations.',
        'Oversee AKS and OpenShift cluster lifecycle — provisioning, upgrades, scaling, and security hardening; manage Istio service mesh with mTLS, traffic routing, circuit breaking, and Kiali observability.',
        'Build observability stacks using Prometheus, Grafana, Zabbix, Elasticsearch, OpenSearch, Kibana, Tempo, and Jaeger; monitor latency, jitter, and packet loss against ATM SLA boundaries.',
        'Enforce CI/CD pipeline governance using Git, GitOps, Azure DevOps, and JFrog Artifactory; mentor junior engineers and coordinate cross-functional incident response.',
        'Collaborate with LFV Sweden and ANS Lithuania on EU SWIM compliance, AIXM data quality standards, and geospatial UTM terrain analysis using QGIS and Cloud-Optimized GeoTIFF datasets.',
      ]
    },
    {
      period: 'Mar 2023 – Feb 2024',
      company: 'MedSpecialized Inc.',
      location: 'Cebu City, Philippines',
      title: 'Cloud Engineer',
      duties: [
        'Administered Windows Server 2019/2022 environments: Active Directory (users, GPOs, OUs), DNS, DHCP, IIS, Remote Desktop Gateway, DFS, and Certificate Services for a healthcare SaaS platform.',
        'Performed Windows Server patching, health monitoring, event log analysis, and scheduled maintenance; managed Hyper-V virtual machines and performed P2V migrations.',
        'Designed and managed scalable AWS infrastructure: VPCs, Subnets, Route Tables, Internet/NAT Gateways, Security Groups, NACLs, and Elastic Load Balancers for high availability.',
        'Deployed and operated core AWS services: EC2 (auto-scaling groups, launch templates), S3 (lifecycle policies, versioning, cross-region replication), RDS (Multi-AZ, read replicas), CloudWatch (alarms, dashboards, log groups), and AWS Backup.',
        'Managed AWS networking: VPC peering, Transit Gateway, Route 53 DNS, ACM certificates, and CloudFront distributions for global content delivery.',
        'Configured AWS IAM roles, permission boundaries, and SCPs to enforce least-privilege access; implemented MFA enforcement and AWS Config rules for compliance monitoring.',
        'Automated infrastructure provisioning using AWS CloudFormation, PowerShell DSC, Python (boto3), and Bash; reduced manual provisioning time and improved consistency.',
        'Managed MySQL, MS SQL Server, and Amazon RDS with focus on backup strategies, point-in-time recovery, performance tuning, and query optimization.',
        'Used ConnectWise Manage and IT Boost for ITSM ticketing, runbook documentation, asset management, and SLA tracking.',
      ]
    },
    {
      period: 'Aug 2021 – Mar 2023',
      company: 'BluCruPH Inc.',
      location: 'Bacolod City, Philippines',
      title: 'IT Specialist',
      duties: [
        'Installed and maintained computer systems, peripherals, and enterprise software across the organization.',
        'Managed network infrastructure including routers, switches, and firewalls to ensure reliable connectivity.',
        'Provisioned and managed Azure resources using Azure Portal, CLI, and ARM templates.',
        'Configured Azure NSGs, subnets, and firewall rules; managed Microsoft Entra (Azure AD) App Registrations for secure authentication.',
        'Administered Microsoft 365 and Exchange Online; monitored network traffic using Wireshark.',
      ]
    },
    {
      period: 'Oct 2020 – Jul 2021',
      company: 'Panasiatic Solutions Inc.',
      location: 'Philippines',
      title: 'Technical Support Representative',
      duties: [
        'Provided L1/L2 technical support via phone, chat, and email; resolved hardware, software, and connectivity issues.',
        'Acted as subject matter expert for escalated technical issues and guided users through structured troubleshooting.',
      ]
    }
  ];

  const projects = [
    { name: 'PhantomMTG', desc: 'Full-stack React/TypeScript/Vite + Supabase web app for Magic: The Gathering collection management with AI-assisted deck building (Scryfall + Gemini architecture).', icon: '🃏' },
    { name: 'Blind Mind Assistance', desc: 'Arduino-based assistive device with Text Message and GPS navigation for visually impaired individuals.', icon: '🦯' },
    { name: 'Cemetery Web & Mobile App', desc: 'Full-stack WebApp and Mobile App for Sapian Cemetery — enabling digital lot management and visitor navigation.', icon: '🗺️' },
    { name: 'Bluetooth Garbage Collector', desc: 'Semi-automated Bluetooth-controlled garbage collector robot for autonomous waste collection.', icon: '🤖' },
    { name: 'Solar Automated Trash Bin', desc: 'Solar-powered automated trash bin with smart detection for sustainable waste management.', icon: '☀️' },
  ];

  const status = STATUS_CONFIG[AVAILABILITY_STATUS];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[60px] bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)] px-6 md:px-12 flex items-center justify-between">
        <a href="#hero" className="font-display font-extrabold text-base tracking-wider text-[var(--white)]">
          SW<span className="text-[var(--accent)]">.</span>Dilag
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <a 
            href="https://www.linkedin.com/in/surely-win-dilag-598364214/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white text-[11px] uppercase tracking-wider rounded-sm hover:bg-[#005f94] transition-all"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>

          <button onClick={toggleMenu} className="md:hidden text-[var(--text)]">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[60px] left-0 right-0 z-[99] bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)] p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-[var(--text)] py-2 border-b border-[var(--border)] last:border-0"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => { previewCV(); setIsMenuOpen(false); }}
              className="flex items-center gap-2 py-2 text-sm uppercase tracking-widest text-[var(--accent)] border-t border-[var(--border)] mt-2 pt-4"
            >
              <Eye size={16} />
              Preview CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center px-6 md:px-12 pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(var(--grid-line)_1px,transparent_1px)] bg-[length:60px_60px] [mask-image:radial-gradient(ellipse_80%_70%_at_60%_50%,black_30%,transparent_100%)]"></div>
        <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,212,255,0.07)_0%,transparent_70%)] right-[-100px] top-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-[1100px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-6 text-[11px] uppercase tracking-[0.15em]" style={{ color: status.color }}>
              <span className="w-6 h-[1px]" style={{ backgroundColor: status.color }}></span>
              {status.tagText}
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-[var(--white)] tracking-tight mb-6">
              Surely Win <span className="text-[var(--muted)]">B.</span> Dilag<span className="text-[var(--accent)]">.</span>
            </h1>
            
            <p className="max-w-[520px] text-[var(--text)] leading-relaxed mb-10">
              Systems &amp; DevOps Engineer — architecting resilient cloud infrastructure across Azure, AWS, and Kubernetes.
              Specialized in mission-critical aviation (UTM) systems, CI/CD pipelines, container orchestration, and full-stack observability.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#experience" className="px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-bold text-[12px] uppercase tracking-wider rounded-sm hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(0,212,255,0.25)] transition-all">
                View Experience
              </a>
              <button onClick={previewCV} className="px-6 py-3 border border-[var(--accent)] text-[var(--accent)] font-bold text-[12px] uppercase tracking-wider rounded-sm hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(0,212,255,0.2)] transition-all flex items-center gap-2">
                <Eye size={14} />
                Preview CV
              </button>
              <a href="#contact" className="px-6 py-3 border border-[var(--border)] text-[var(--text)] font-bold text-[12px] uppercase tracking-wider rounded-sm hover:border-[var(--accent)] hover:text-[var(--accent)] hover:translate-y-[-2px] transition-all">
                Get in Touch
              </a>
            </div>

            <div className="flex flex-wrap gap-10 mt-14 pt-9 border-t border-[var(--border)]">
              {[
                { num: '4+', label: 'Years Experience' },
                { num: '3+', label: 'Cloud Platforms' },
                { num: '4', label: 'Certifications' },
                { num: '4', label: 'Companies' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-extrabold text-[var(--white)]">
                    {stat.num.split('').map((char, i) => (
                      <span key={i} className={char === '+' ? 'text-[var(--accent)]' : ''}>{char}</span>
                    ))}
                  </div>
                  <div className="text-[10px] text-[var(--muted)] uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto lg:mx-0 order-1 lg:order-2"
          >
            <div className="w-[280px] h-[340px] md:w-[320px] md:h-[400px] overflow-hidden rounded-sm border border-[var(--border)]">
              <img 
                src="/IMG_6376.jpeg" 
                alt="Surely Win B. Dilag"
                className="w-full h-full object-cover grayscale-[20%] contrast-[1.05]"
              />
            </div>
            <div className="absolute top-4 left-4 -right-4 -bottom-4 border border-[var(--accent)] opacity-40 -z-10 rounded-sm"></div>
            <div 
              className="absolute -bottom-4 -right-4 px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-2"
              style={{ backgroundColor: status.color, color: '#080c10' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              {status.badgeText}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="px-6 md:px-12 py-24 border-t border-[var(--border)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-5 mb-14">
            <span className="text-[11px] text-[var(--accent)] uppercase tracking-[0.15em]">00</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[var(--white)] tracking-tight">About Me</h2>
            <div className="flex-1 h-[1px] bg-[var(--border)] max-w-[200px]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-[var(--text)] leading-relaxed">
              <p>
                I am a <span className="text-[var(--white)] font-semibold">Systems &amp; DevOps Engineer</span> with 4+ years of experience delivering and operating mission-critical infrastructure across cloud, Kubernetes, and aviation systems. My work sits at the intersection of platform engineering, systems reliability, and compliance — building infrastructure that aviation authorities and drone operators across Europe depend on every day.
              </p>
              <p>
                At <span className="text-[var(--white)] font-semibold">AirNav Technology Services</span>, I engineer and maintain the <span className="text-[var(--white)] font-semibold">UTM/ILAS</span> platform — a Frequentis-powered system managing regulated drone operations across Sweden, Norway, Austria, Estonia, and Lithuania. My role spans Azure cloud architecture, AKS and OpenShift cluster operations, AIXM data pipelines, and EU SWIM compliance within an ISO/IEC 15288 systems engineering lifecycle.</p>
              <p>
                I thrive in environments where precision, reliability, and security are non-negotiable — from authoring Component Security Assurance Records aligned with <span className="text-[var(--white)] font-semibold">ED-202A/DO-326A</span> to building observability stacks that monitor ATM SLA boundaries in real time.
              </p>
            </div>
            <div className="space-y-6 text-[var(--text)] leading-relaxed">
              <h3 className="font-display text-xl font-bold text-[var(--white)] mb-4 flex items-center gap-2">
                <Globe size={20} className="text-[var(--accent)]" /> Career Aspirations
              </h3>
              <p>
                My goal is to grow into a <span className="text-[var(--white)] font-semibold">Senior Systems or DevOps Architect</span> role — taking deeper ownership of platform strategy, cross-functional engineering governance, and AI-integrated infrastructure. I am particularly focused on advancing in:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Aviation & UTM Systems Engineering',
                  'Multi-Cloud Architecture & Governance',
                  'AI-Ops & Intelligent Automation',
                  'Zero-Trust Security & Compliance',
                  'Site Reliability Engineering (SRE)',
                  'Platform Engineering Leadership'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent2)]"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="pt-4 italic text-[var(--muted)]">
                "Impactful engineering isn't just about building things that work — it's about building systems that uphold safety, enable trust, and empower the people who depend on them."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-[var(--surface)] px-6 md:px-12 py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-5 mb-14">
            <span className="text-[11px] text-[var(--accent)] uppercase tracking-[0.15em]">01</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[var(--white)] tracking-tight">Core Skills</h2>
            <div className="flex-1 h-[1px] bg-[var(--border)] max-w-[200px]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[var(--border)] bg-[var(--border)] gap-[1px]">
            {skills.map((skill) => (
              <div key={skill.category} className="bg-[var(--surface)] p-8 hover:bg-[var(--card-hover)] transition-colors group relative overflow-hidden">
                <div className="mb-4">{skill.icon}</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[var(--accent)] mb-2">{skill.category}</div>
                <div className="text-[13px] text-[var(--text)] leading-relaxed">{skill.list}</div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 md:px-12 py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-5 mb-14">
            <span className="text-[11px] text-[var(--accent)] uppercase tracking-[0.15em]">02</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[var(--white)] tracking-tight">Experience</h2>
            <div className="flex-1 h-[1px] bg-[var(--border)] max-w-[200px]"></div>
          </div>

          <div className="flex flex-col">
            {experience.map((job, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-[200px_1fr] border-t border-[var(--border)] py-10 last:border-b">
                <div className="mb-4 md:mb-0 pr-9">
                  <div className="text-[11px] text-[var(--accent)] tracking-wider mb-2">{job.period}</div>
                  <div className="font-display text-[15px] font-bold text-[var(--white)] mb-1">{job.company}</div>
                  <div className="text-[11px] text-[var(--muted)]">{job.location}</div>
                </div>
                <div className="md:pl-10 md:border-l border-[var(--border)]">
                  <h3 className="font-display text-xl font-bold text-[var(--white)] mb-4">{job.title}</h3>
                  <ul className="space-y-3">
                    {job.duties.map((duty, i) => (
                      <li key={i} className="flex gap-3 text-[13px] text-[var(--text)] leading-relaxed">
                        <ArrowRight size={14} className="mt-1 flex-shrink-0 text-[var(--accent)]" />
                        {duty}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certs */}
      <section id="education" className="bg-[var(--surface)] px-6 md:px-12 py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-5 mb-14">
            <span className="text-[11px] text-[var(--accent)] uppercase tracking-[0.15em]">03</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[var(--white)] tracking-tight">Education & Certs</h2>
            <div className="flex-1 h-[1px] bg-[var(--border)] max-w-[200px]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display text-lg font-bold text-[var(--white)] mb-6 pb-3 border-b border-[var(--border)]">Education</h3>
              <div className="space-y-6">
                <div className="pb-4 border-b border-[var(--border)] last:border-0">
                  <div className="text-sm text-[var(--white)] font-medium mb-1">Bachelor of Engineering Technology</div>
                  <div className="text-[13px] text-[var(--text)] mb-1">Major in Computer Engineering</div>
                  <div className="text-[12px] text-[var(--muted)]">Technological University of the Philippines – Visayas · 2018 – 2022</div>
                </div>
                <div className="pb-4 border-b border-[var(--border)] last:border-0">
                  <div className="text-sm text-[var(--white)] font-medium mb-1">Computer Systems Servicing NCII</div>
                  <div className="text-[12px] text-[var(--muted)]">La Consolacion College – Murcia · 2016 – 2018</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-[var(--white)] mb-6 pb-3 border-b border-[var(--border)]">Certifications</h3>
              <div className="flex flex-col gap-3">
                {[
                  'Microsoft Azure Administrator (AZ-104)',
                  'Sumo Logic Cloud Infrastructure Security Certified',
                  'Microsoft Azure Infrastructure Solutions',
                  'Linux Fundamentals',
                  'Zyxel Certified Network Associate'
                ].map((cert) => (
                  <div key={cert} className="flex items-center gap-3 px-4 py-3 border border-[var(--border)] rounded-sm text-[12px] text-[var(--text)] hover:border-[var(--accent2)] hover:text-[var(--accent2)] transition-all cursor-default">
                    <span className="text-[10px] text-[var(--accent2)]">✦</span>
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 md:px-12 py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-5 mb-14">
            <span className="text-[11px] text-[var(--accent)] uppercase tracking-[0.15em]">04</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[var(--white)] tracking-tight">Projects</h2>
            <div className="flex-1 h-[1px] bg-[var(--border)] max-w-[200px]"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project) => (
              <div key={project.name} className="p-7 border border-[var(--border)] rounded-sm hover:bg-[var(--project-hover)] hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="text-2xl mb-4">{project.icon}</div>
                <div className="font-display text-[15px] font-bold text-[var(--white)] mb-2">{project.name}</div>
                <div className="text-[12px] text-[var(--muted)] leading-relaxed">{project.desc}</div>
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[var(--accent2)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Homelab & AI Section */}
      <section id="homelab" className="bg-[var(--surface)] px-6 md:px-12 py-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-5 mb-14">
            <span className="text-[11px] text-[var(--accent)] uppercase tracking-[0.15em]">05</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[var(--white)] tracking-tight">Homelab & AI</h2>
            <div className="flex-1 h-[1px] bg-[var(--border)] max-w-[200px]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* LLM Infrastructure */}
            <div className="p-8 border border-[var(--border)] rounded-sm relative overflow-hidden group hover:-translate-y-1 transition-all">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[var(--accent)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="flex items-center gap-3 mb-5">
                <Brain className="w-5 h-5 text-[var(--accent)]" />
                <h3 className="font-display text-[17px] font-bold text-[var(--white)]">Self-Hosted LLM Infrastructure</h3>
              </div>
              <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-5">
                Running a private AI inference stack on a dedicated Proxmox VM (<span className="text-[var(--accent2)]">sup-qwen-01</span>) with <span className="text-[var(--white)]">Ollama</span> serving <span className="text-[var(--white)]">Qwen3</span> models. Exposed via <span className="text-[var(--white)]">Open WebUI</span> behind Nginx reverse proxy and a Cloudflare Tunnel for secure remote access — no public port exposure.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Ollama', 'Qwen3', 'Open WebUI', 'Proxmox', 'Nginx', 'Cloudflare Tunnel'].map(t => (
                  <span key={t} className="text-[10px] px-2 py-1 border border-[var(--border)] text-[var(--muted)] rounded-sm font-mono">{t}</span>
                ))}
              </div>
            </div>

            {/* Observability */}
            <div className="p-8 border border-[var(--border)] rounded-sm relative overflow-hidden group hover:-translate-y-1 transition-all">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[var(--accent2)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="flex items-center gap-3 mb-5">
                <Monitor className="w-5 h-5 text-[var(--accent2)]" />
                <h3 className="font-display text-[17px] font-bold text-[var(--white)]">Inference Observability</h3>
              </div>
              <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-5">
                Model performance monitored via <span className="text-[var(--white)]">Prometheus</span> + <span className="text-[var(--white)]">ollama-exporter</span> with custom <span className="text-[var(--white)]">Grafana</span> dashboards tracking token throughput, request latency, and GPU/CPU utilisation across model versions.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Prometheus', 'Grafana', 'ollama-exporter', 'Node Exporter'].map(t => (
                  <span key={t} className="text-[10px] px-2 py-1 border border-[var(--border)] text-[var(--muted)] rounded-sm font-mono">{t}</span>
                ))}
              </div>
            </div>

            {/* Fine-tuning */}
            <div className="p-8 border border-[var(--border)] rounded-sm relative overflow-hidden group hover:-translate-y-1 transition-all">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[var(--accent)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="flex items-center gap-3 mb-5">
                <Code className="w-5 h-5 text-[var(--accent)]" />
                <h3 className="font-display text-[17px] font-bold text-[var(--white)]">Model Fine-Tuning</h3>
              </div>
              <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-5">
                Fine-tuning LLMs using <span className="text-[var(--white)]">LoRA</span> and <span className="text-[var(--white)]">QLoRA</span> (quantized low-rank adaptation) for domain-specific tasks on consumer hardware. Training pipelines built with <span className="text-[var(--white)]">PyTorch</span> and <span className="text-[var(--white)]">NumPy</span> for data preprocessing, tensor manipulation, and loss monitoring.
              </p>
              <div className="flex flex-wrap gap-2">
                {['LoRA', 'QLoRA', 'PyTorch', 'NumPy', 'PEFT', 'Transformers'].map(t => (
                  <span key={t} className="text-[10px] px-2 py-1 border border-[var(--border)] text-[var(--muted)] rounded-sm font-mono">{t}</span>
                ))}
              </div>
            </div>

            {/* RAG */}
            <div className="p-8 border border-[var(--border)] rounded-sm relative overflow-hidden group hover:-translate-y-1 transition-all">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[var(--accent2)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className="flex items-center gap-3 mb-5">
                <Database className="w-5 h-5 text-[var(--accent2)]" />
                <h3 className="font-display text-[17px] font-bold text-[var(--white)]">RAG Pipelines</h3>
              </div>
              <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-5">
                Building <span className="text-[var(--white)]">Retrieval-Augmented Generation</span> pipelines with <span className="text-[var(--white)]">LangChain</span> to ground Qwen model responses in private knowledge bases — enabling domain-aware querying over infrastructure documentation, runbooks, and technical specs without retraining.
              </p>
              <div className="flex flex-wrap gap-2">
                {['LangChain', 'RAG', 'Vector Embeddings', 'Qwen3'].map(t => (
                  <span key={t} className="text-[10px] px-2 py-1 border border-[var(--border)] text-[var(--muted)] rounded-sm font-mono">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 md:px-12 py-24 text-center relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,transparent_70%)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="text-[11px] uppercase tracking-[0.15em] text-[var(--muted)] mb-3">06 — Let's Connect</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--white)] tracking-tight mb-8">
            Open to new<br />opportunities.
          </h2>
          
          <a href="mailto:dsurelywin@gmail.com" className="inline-block font-display text-xl md:text-3xl font-bold text-[var(--white)] border-b-2 border-[var(--accent)] pb-1 mb-8 hover:text-[var(--accent)] transition-colors">
            dsurelywin@gmail.com
          </a>
          
          <div className="text-sm text-[var(--muted)] mb-10">
            <span className="flex items-center justify-center gap-2">
              <Phone size={14} /> +63 956 766 9410
            </span>
            <span className="flex items-center justify-center gap-2 mt-2">
              <MapPin size={14} /> Negros Occidental, Philippines
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:dsurelywin@gmail.com" 
              className="px-[36px] py-[14px] bg-[var(--accent)] text-[var(--bg)] font-bold text-[13px] uppercase tracking-wider rounded-sm transition-all hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(0,212,255,0.25)]"
            >
              Send a Message
            </a>
            <a 
              href="https://www.linkedin.com/in/surely-win-dilag-598364214/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-[36px] py-[14px] bg-[#0077b5] text-white font-bold text-[13px] uppercase tracking-wider rounded-sm flex items-center gap-2 transition-all hover:bg-[#005f94] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,119,181,0.35)]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-6 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[var(--muted)]">
        <span>© 2026 Surely Win B. Dilag</span>
        <a 
          href="https://www.linkedin.com/in/surely-win-dilag-598364214/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#0077b5] hover:underline"
        >
          <Linkedin size={12} />
          linkedin.com/in/surely-win-dilag-598364214/
        </a>
        <span className="text-[var(--accent)]">Cloud · Systems · DevOps</span>
      </footer>

      {/* CV Preview Modal */}
      {cvPreviewUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={closePreview}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-4xl flex flex-col rounded-sm border border-[var(--border)] shadow-2xl overflow-hidden" style={{height: '90vh'}} onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-[var(--surface)] border-b border-[var(--border)] shrink-0">
              <div className="flex items-center gap-3">
                <Eye size={16} className="text-[var(--accent)]" />
                <span className="text-[12px] uppercase tracking-widest text-[var(--white)] font-bold">CV Preview</span>
                <span className="text-[11px] text-[var(--muted)]">— Surely Win B. Dilag</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={downloadCV}
                  className="flex items-center gap-2 px-4 py-1.5 bg-[var(--accent)] text-[var(--bg)] text-[11px] uppercase tracking-wider font-bold rounded-sm hover:brightness-110 transition-all"
                >
                  <FileDown size={13} />
                  Download
                </button>
                <button onClick={closePreview} className="p-1.5 text-[var(--muted)] hover:text-[var(--white)] transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>
            {/* PDF Viewer - canvas rendered for mobile compatibility */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-3 flex flex-col items-center gap-3" style={{minHeight:0}}>
              {pdfLoading && (
                <div className="flex items-center justify-center h-full w-full">
                  <div className="text-[var(--accent)] text-[13px] uppercase tracking-widest animate-pulse">Rendering CV...</div>
                </div>
              )}
              {pdfPages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`CV page ${i + 1}`}
                  className="w-full max-w-2xl shadow-lg rounded-sm"
                  style={{display:'block'}}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}