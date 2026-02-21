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
  Settings
} from 'lucide-react';

const AVAILABILITY_STATUS = import.meta.env.VITE_AVAILABILITY_STATUS || 'available';

const STATUS_CONFIG = {
  available: { tagText: 'Available for opportunities', badgeText: 'Available', color: 'var(--accent2)' },
  employed:  { tagText: 'Currently employed', badgeText: 'Employed', color: '#f5a623' },
};

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const skills = [
    { category: 'Cloud Platforms', list: 'Microsoft Azure (AKS, VM, VNet, NSG) · AWS (VPC, IAM, EC2, RDS, S3)', icon: <Cloud className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Containers & Orchestration', list: 'Kubernetes (AKS) · Docker · Helm · Rancher', icon: <Layers className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Infrastructure as Code', list: 'Terraform · ARM Templates · Bicep', icon: <Terminal className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'DevOps & CI/CD', list: 'Git · GitOps · JFrog Artifactory · Bash · PowerShell', icon: <Settings className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Observability', list: 'Prometheus · Grafana · Zabbix · Elasticsearch · Kibana', icon: <Monitor className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Networking & Security', list: 'VNet · VPC · NSG · Firewalls · IAM · Keycloak SSO', icon: <Shield className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Operating Systems', list: 'Linux (RHEL, Ubuntu) · Windows Server 2019/2022 · Proxmox · VMware', icon: <Cpu className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Programming', list: 'Python · C++ · Typescript . JavaScript (ReactJS, React Native) · Bash · PowerShell', icon: <Code className="w-5 h-5 text-[var(--accent)]" /> },
    { category: 'Databases', list: 'MySQL · Microsoft SQL Server . Postgres· Amazon RDS', icon: <Database className="w-5 h-5 text-[var(--accent)]" /> },
  ];

  const experience = [
    {
      period: 'Feb 2024 – Present',
      company: 'AirNav Technology Services',
      location: 'Iloilo City, Philippines',
      title: 'Systems Engineer',
      duties: [
        'Managed and supported Unmanned Traffic Management (UTM) systems in hybrid cloud environments.',
        'Administered Linux servers (RHEL, Ubuntu) ensuring high availability and security compliance.',
        'Deployed and maintained Azure Kubernetes Service (AKS) clusters using Rancher.',
        'Developed and maintained Helm charts to automate Kubernetes application deployments.',
        'Designed observability pipelines using Prometheus, Grafana, Zabbix, Elasticsearch, and Kibana.',
        'Performed Azure cloud engineering tasks including virtual networking, firewall rules, IAM, and access control.',
        'Automated provisioning using Bash and PowerShell scripts. Integrated Keycloak IAM across system components.',
        'Worked with drone operators and government stakeholders to ensure EU aviation SWIM compliance.',
        'Participated in on-site deployment and system integration in Brisbane, Australia.'
      ]
    },
    {
      period: 'Mar 2023 – Feb 2024',
      company: 'MedSpecialized Inc.',
      location: 'Cebu City, Philippines',
      title: 'Cloud Engineer',
      duties: [
        'Administered Windows Server 2019/2022 including AD, DNS, IIS, RD Gateway, and Group Policy.',
        'Designed and managed Azure and AWS cloud infrastructure (VNets, VPCs, Load Balancers, Security Groups).',
        'Deployed and managed AWS services: EC2, S3, AMI, CloudWatch, and RDS.',
        'Performed data and domain migrations with minimal downtime.',
        'Implemented security best practices through firewall rules, IAM policies, and encryption.',
        'Automated routine tasks using PowerShell, Python, and Bash.',
        'Managed databases including MySQL, MS SQL Server, and cloud-based storage.',
        'Used ConnectWise Manage and IT Boost for ITSM, monitoring, and asset management.'
      ]
    },
    {
      period: 'Aug 2021 – Mar 2023',
      company: 'BluCruPH Inc.',
      location: 'Bacolod City, Philippines',
      title: 'IT Specialist',
      duties: [
        'Installed and maintained computer systems, peripherals, and enterprise software.',
        'Managed network infrastructure including routers, switches, and firewalls.',
        'Administered Ubiquiti Dream Machine Pro for optimized network performance.',
        'Administered Microsoft 365 and Exchange Online.',
        'Provisioned and managed Azure resources using Azure Portal, CLI, and ARM templates.',
        'Configured Azure NSGs, subnets, and firewall rules.',
        'Managed Microsoft Entra (Azure AD) App Registrations for secure authentication.'
      ]
    }
  ];

  const projects = [
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
              Cloud / Systems / DevOps Engineer — building resilient infrastructure across Azure, AWS, and Kubernetes.
              Specialized in mission-critical aviation systems, hybrid cloud deployments, and full-stack observability pipelines.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#experience" className="px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-bold text-[12px] uppercase tracking-wider rounded-sm hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(0,212,255,0.25)] transition-all">
                View Experience
              </a>
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
                src="/public/profile.jpg" 
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
                I am a dedicated <span className="text-[var(--white)] font-semibold">Systems and Cloud Engineer</span> with a passion for architecting and maintaining high-availability infrastructure. My journey in technology began with a deep curiosity about how complex systems communicate, which led me to specialize in cloud-native environments and mission-critical aviation systems.
              </p>
              <p>
                With over 4 years of experience, I've navigated the complexities of hybrid cloud deployments, Kubernetes orchestration, and automated CI/CD pipelines. I thrive in environments where security, scalability, and observability are paramount. My work with AirNav Technology Services has particularly honed my ability to manage systems that demand 99.9% uptime and strict regulatory compliance.
              </p>
            </div>
            <div className="space-y-6 text-[var(--text)] leading-relaxed">
              <h3 className="font-display text-xl font-bold text-[var(--white)] mb-4 flex items-center gap-2">
                <Globe size={20} className="text-[var(--accent)]" /> Career Aspirations
              </h3>
              <p>
                My goal is to evolve into a <span className="text-[var(--white)] font-semibold">Senior DevOps Architect</span>, focusing on the intersection of AI-driven infrastructure and global-scale distributed systems. I am particularly interested in advancing my expertise in:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Advanced Site Reliability Engineering (SRE)',
                  'Multi-Cloud Strategy & Governance',
                  'AI-Ops & Automated Remediation',
                  'Zero-Trust Security Architectures'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent2)]"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="pt-4 italic text-[var(--muted)]">
                "I believe that great engineering isn't just about building things that work, but building things that last and empower others."
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

      {/* Contact Section */}
      <section id="contact" className="px-6 md:px-12 py-24 text-center relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,transparent_70%)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="text-[11px] uppercase tracking-[0.15em] text-[var(--muted)] mb-3">05 — Let's Connect</div>
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
    </div>
  );
}
