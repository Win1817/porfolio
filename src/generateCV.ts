import jsPDF from 'jspdf';

// ─── ATS-FRIENDLY CV GENERATOR ────────────────────────────────────
// Uses plain Helvetica, single-pass left-to-right text, no columns,
// no images, no tables — optimised for ATS keyword parsing.

const PW  = 210;
const PH  = 297;
const ML  = 20;   // left margin
const MR  = 20;   // right margin
const TW  = PW - ML - MR;  // text width
const BOT = 18;   // bottom margin before page break

// ── Palette (greyscale-safe, renders well when printed B&W) ───────
type RGB = [number, number, number];
const BLACK:  RGB = [15,  20,  30];
const DARK:   RGB = [40,  55,  75];
const MID:    RGB = [90, 110, 130];
const ACCENT: RGB = [0,  150, 190];
const RULE:   RGB = [200, 215, 225];
const WHITE:  RGB = [255, 255, 255];

// ── DATA ──────────────────────────────────────────────────────────
const DATA = {
  name:     'Surely Win B. Dilag',
  title:    'Systems & DevOps Engineer',
  email:    'dsurelywin@gmail.com',
  phone:    '+63 956 766 9410',
  location: 'Negros Occidental, Philippines',
  linkedin: 'linkedin.com/in/surely-win-dilag-598364214',

  summary:
    'Systems and DevOps Engineer with extensive experience in cloud infrastructure, Kubernetes, ' +
    'OpenShift, and CI/CD pipeline engineering. Deep expertise in Azure cloud architecture ' +
    '(AZ-104 level), container orchestration, AI/ML platform integration via Azure AI Foundry ' +
    'and Azure OpenAI, observability (Prometheus, Grafana, Zabbix, OpenSearch), and security. ' +
    'Experienced in supporting mission-critical aviation and UTM systems, AIXM/XML data pipelines, ' +
    'hybrid cloud deployments, and collaborating with international stakeholders. Adept at ' +
    'infrastructure automation, reliability engineering, and incident response.',

  skills: [
    { cat: 'Cloud Platforms',
      val: 'Azure (VNets, NSG, VMs, AKS, Firewall, IAM, ARM Templates, CLI, Monitor, Policy, AI Foundry, Azure OpenAI), AWS (EC2, S3, RDS, CloudWatch, VPC, AMI)' },
    { cat: 'Kubernetes & Ops',
      val: 'Kubernetes (AKS), OpenShift, Helm, Rancher, Headlamp, Istio (service mesh, mTLS, traffic management)' },
    { cat: 'Containers & VMs',
      val: 'Docker, Proxmox, VMware, Azure VM' },
    { cat: 'DevOps & CI/CD',
      val: 'Git, GitOps, Azure DevOps, JFrog Artifactory, Jenkins, Bash, PowerShell' },
    { cat: 'Data & Integration',
      val: 'XML, AIXM (aviation data standard), QGIS, REST APIs, Postman, Swagger, JSON, YAML, ActiveMQ' },
    { cat: 'Observability',
      val: 'Prometheus, Grafana, Zabbix, Elasticsearch, OpenSearch, Kibana, Tempo, Jaeger' },
    { cat: 'Operating Systems',
      val: 'Linux (RHEL, Ubuntu), Windows Server 2019/2022' },
    { cat: 'Programming',
      val: 'Python, C++, ReactJS, React Native' },
    { cat: 'Security & IAM',
      val: 'VNets, NSG, Firewalls, IAM, Keycloak, Encryption' },
    { cat: 'Databases',
      val: 'MySQL, Microsoft SQL Server, Amazon RDS' },
    { cat: 'ITSM & Docs',
      val: 'JIRA, Confluence, Jama, ConnectWise' },
  ],

  certifications: [
    'Microsoft Azure Administrator (AZ-104) – Core competency in Azure infrastructure management',
    'Sumo Logic Cloud Infrastructure Security Certified',
    'Microsoft Azure Infrastructure Solutions',
    'Linux Fundamentals',
    'Zyxel Certified Network Associate',
  ],

  education: [
    {
      degree: 'Bachelor of Engineering Technology – Major in Computer Engineering',
      school: 'Technological University of the Philippines – Visayas',
      period: '2018 – 2022',
    },
    {
      degree: 'Computer Systems Servicing NCII',
      school: 'La Consolacion College – Murcia',
      period: '2016 – 2018',
    },
  ],

  experience: [
    {
      title:   'Systems & DevOps Engineer',
      company: 'AirNav Technology Services',
      loc:     'Iloilo City, Philippines',
      period:  'Feb 2024 – Present',
      duties: [
        'Deliver end-to-end UTM/ATM system engineering across the full lifecycle — requirements, architecture, integration, validation, and operations — following ISO/IEC 15288 and Eurocontrol standards.',
        'Ingest, audit, and validate AIXM 5.1 datasets against Eurocontrol geometry rules; diagnose composite-airspace resolution failures and align pipelines with EU SWIM data-sharing standards.',
        'Author Component Security Assurance Records (CSARs) aligned with ED-202A/DO-326A, documenting network isolation, attack surface reduction, and vulnerability tracking for regulatory sign-off.',
        'Manage system baseline via Engineering Change Proposals (ECPs) and System Change Procedures covering risk mitigation, impact analysis, and rollback strategies.',
        'Govern requirements traceability using Jama (baseline versioning, V&V traceability matrix) and Jira (PI Planning, sprint mapping, backlog refinement) across Agile delivery cycles.',
        'Architect and maintain Azure cloud infrastructure (AZ-104): VNets, NSGs, firewall policies, IAM, Azure Monitor, ARM templates, Azure AI Foundry, and Azure OpenAI integrations.',
        'Oversee AKS and OpenShift cluster lifecycle — provisioning, upgrades, scaling, and security hardening; manage Istio service mesh with mTLS, traffic routing, circuit breaking, and Kiali observability.',
        'Build observability stacks using Prometheus, Grafana, Zabbix, Elasticsearch, OpenSearch, Kibana, Tempo, and Jaeger; monitor latency, jitter, and packet loss against ATM SLA boundaries.',
        'Lead CI/CD pipeline governance using Git, GitOps, Azure DevOps, and JFrog Artifactory; mentor junior engineers and coordinate cross-functional incident response.',
        'Collaborate with LFV Sweden and ANS Lithuania on EU SWIM compliance, AIXM data quality standards, and UTM terrain analysis using QGIS and Cloud-Optimized GeoTIFF datasets.',
      ],
    },
    {
      title:   'Cloud Engineer',
      company: 'MedSpecialized Inc.',
      loc:     'Cebu City, Philippines',
      period:  'Mar 2023 – Feb 2024',
      duties: [
        'Administered Windows Server 2019/2022: Active Directory (users, GPOs, OUs), DNS, DHCP, IIS, Remote Desktop Gateway, DFS, and Certificate Services for a healthcare SaaS platform.',
        'Performed Windows Server patching, health monitoring, event log analysis, and Hyper-V VM management including P2V migrations.',
        'Designed and managed scalable AWS infrastructure: VPCs, Subnets, Route Tables, Internet/NAT Gateways, Security Groups, NACLs, and Elastic Load Balancers for high availability.',
        'Deployed and operated core AWS services: EC2 (auto-scaling, launch templates), S3 (lifecycle policies, versioning, cross-region replication), RDS (Multi-AZ, read replicas), CloudWatch, and AWS Backup.',
        'Managed AWS networking: VPC peering, Transit Gateway, Route 53 DNS, ACM certificates, and CloudFront distributions.',
        'Configured AWS IAM roles, permission boundaries, and SCPs; implemented MFA enforcement and AWS Config rules for compliance monitoring.',
        'Automated provisioning using AWS CloudFormation, PowerShell DSC, Python (boto3), and Bash.',
        'Managed MySQL, MS SQL Server, and Amazon RDS with focus on backup strategies, point-in-time recovery, and query optimization.',
        'Used ConnectWise Manage and IT Boost for ITSM ticketing, runbook documentation, and SLA tracking.',
      ],
    },
    {
      title:   'IT Specialist',
      company: 'BluCruPH Inc.',
      loc:     'Bacolod City, Philippines',
      period:  'Aug 2021 – Mar 2023',
      duties: [
        'Installed and maintained computer systems, peripherals, and enterprise software across the organization.',
        'Managed network infrastructure including routers, switches, and firewalls to ensure reliable connectivity.',
        'Provisioned and managed Azure resources using Azure Portal, CLI, and ARM templates.',
        'Configured Azure NSGs, subnets, and firewall rules; managed Microsoft Entra (Azure AD) App Registrations for secure authentication.',
        'Administered Microsoft 365 and Exchange Online; monitored network traffic using Wireshark.',
      ],
    },
    {
      title:   'Technical Support Representative',
      company: 'Panasiatic Solutions Inc.',
      loc:     'Philippines',
      period:  'Oct 2020 – Jul 2021',
      duties: [
        'Provided L1/L2 technical support via phone, chat, and email; resolved hardware, software, and connectivity issues.',
        'Acted as subject matter expert for escalated technical issues and guided users through structured troubleshooting.',
      ],
    },
  ],

  projects: [
    {
      name: 'PhantomMTG',
      desc: 'Full-stack React/TypeScript/Vite + Supabase web app for Magic: The Gathering collection management with AI-assisted deck building (Scryfall + Gemini architecture).',
    },
    {
      name: 'Blind Mind Assistance',
      desc: 'Arduino-based assistive device with SMS and GPS navigation for visually impaired individuals.',
    },
    {
      name: 'Cemetery Web & Mobile App',
      desc: 'Full-stack WebApp and Mobile App for Sapian Cemetery — enabling digital lot management and visitor navigation.',
    },
    {
      name: 'Bluetooth Garbage Collector',
      desc: 'Semi-automated Bluetooth-controlled garbage collector robot for autonomous waste collection.',
    },
    {
      name: 'Solar Automated Trash Bin',
      desc: 'Solar-powered automated trash bin with smart detection for sustainable waste management.',
    },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────
function font(doc: jsPDF, size: number, style: 'normal'|'bold'|'italic' = 'normal', color: RGB = DARK) {
  doc.setFontSize(size);
  doc.setFont('helvetica', style);
  doc.setTextColor(...color);
}

function rule(doc: jsPDF, y: number, color: RGB = RULE, lw = 0.25) {
  doc.setDrawColor(...color);
  doc.setLineWidth(lw);
  doc.line(ML, y, ML + TW, y);
}

function wrap(doc: jsPDF, text: string, x: number, y: number, maxW: number, lh: number): number {
  const lines = doc.splitTextToSize(text, maxW);
  for (const line of lines) {
    if (y + lh > PH - BOT) { doc.addPage(); y = 22; }
    doc.text(line, x, y);
    y += lh;
  }
  return y;
}

function sectionHead(doc: jsPDF, label: string, y: number): number {
  if (y + 12 > PH - BOT) { doc.addPage(); y = 22; }
  font(doc, 9, 'bold', ACCENT);
  doc.text(label.toUpperCase(), ML, y);
  y += 1.8;
  rule(doc, y, ACCENT, 0.5);
  return y + 5;
}

// ── Main export ───────────────────────────────────────────────────
export function generateCV() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });

  doc.setProperties({
    title:   'Surely Win B. Dilag – CV',
    author:  'Surely Win B. Dilag',
    subject: 'Systems & DevOps Engineer',
    creator: 'sdilag.us portfolio',
    keywords: 'DevOps, Cloud, Kubernetes, Azure, AWS, AKS, OpenShift, Helm, Terraform, CI/CD',
  });

  // ── HEADER ──────────────────────────────────────────────────────
  // Solid dark bar
  doc.setFillColor(...BLACK);
  doc.rect(0, 0, PW, 36, 'F');
  // Accent left strip
  doc.setFillColor(...ACCENT);
  doc.rect(0, 0, 4, 36, 'F');

  font(doc, 22, 'bold', WHITE);
  doc.text(DATA.name, ML + 5, 13);

  font(doc, 10, 'normal', [0, 200, 230] as RGB);
  doc.text(DATA.title, ML + 5, 20);

  font(doc, 7.5, 'normal', [160, 200, 220] as RGB);
  const contacts = `${DATA.email}   |   ${DATA.phone}   |   ${DATA.location}   |   ${DATA.linkedin}`;
  doc.text(contacts, ML + 5, 29);

  let y = 44;

  // ── SUMMARY ─────────────────────────────────────────────────────
  y = sectionHead(doc, 'Professional Summary', y);
  font(doc, 8.5, 'normal', MID);
  y = wrap(doc, DATA.summary, ML, y, TW, 4.5);
  y += 6;

  // ── CORE SKILLS ─────────────────────────────────────────────────
  y = sectionHead(doc, 'Core Skills', y);

  for (const sk of DATA.skills) {
    if (y + 8 > PH - BOT) { doc.addPage(); y = 22; }
    font(doc, 8.5, 'bold', DARK);
    doc.text(`${sk.cat}:`, ML, y);
    const labelW = doc.getTextWidth(`${sk.cat}: `);
    font(doc, 8.5, 'normal', MID);
    y = wrap(doc, sk.val, ML + labelW, y, TW - labelW, 4.5);
    y += 1.5;
  }
  y += 4;

  // ── EXPERIENCE ──────────────────────────────────────────────────
  y = sectionHead(doc, 'Professional Experience', y);

  for (const job of DATA.experience) {
    if (y + 20 > PH - BOT) { doc.addPage(); y = 22; }

    // Role title
    font(doc, 9.5, 'bold', DARK);
    doc.text(job.title, ML, y);
    // Period right-aligned
    font(doc, 8, 'normal', MID);
    doc.text(job.period, ML + TW, y, { align: 'right' });
    y += 4.5;

    // Company + location
    font(doc, 8.5, 'bold', ACCENT);
    doc.text(job.company, ML, y);
    font(doc, 8, 'normal', MID);
    doc.text(` – ${job.loc}`, ML + doc.getTextWidth(job.company), y);
    y += 5.5;

    // Bullets
    font(doc, 8, 'normal', MID);
    for (const duty of job.duties) {
      if (y + 5 > PH - BOT) { doc.addPage(); y = 22; }
      const lines = doc.splitTextToSize(duty, TW - 6);
      doc.text('-', ML + 1, y);
      doc.text(lines, ML + 5, y);
      y += lines.length * 4 + 0.8;
    }
    y += 4;
    if (DATA.experience.indexOf(job) < DATA.experience.length - 1) {
      rule(doc, y - 2, RULE, 0.2);
    }
  }

  y += 2;

  // ── PROJECTS ────────────────────────────────────────────────────
  if (y + 14 > PH - BOT) { doc.addPage(); y = 22; }
  y = sectionHead(doc, 'Notable Projects', y);

  for (const proj of DATA.projects) {
    if (y + 10 > PH - BOT) { doc.addPage(); y = 22; }
    font(doc, 8.5, 'bold', DARK);
    doc.text(`${proj.name}:`, ML, y);
    const lw = doc.getTextWidth(`${proj.name}: `);
    font(doc, 8.5, 'normal', MID);
    y = wrap(doc, proj.desc, ML + lw, y, TW - lw, 4.5);
    y += 2;
  }

  y += 4;

  // ── CERTIFICATIONS ──────────────────────────────────────────────
  if (y + 14 > PH - BOT) { doc.addPage(); y = 22; }
  y = sectionHead(doc, 'Certifications', y);

  for (const cert of DATA.certifications) {
    if (y + 6 > PH - BOT) { doc.addPage(); y = 22; }
    font(doc, 8.5, 'normal', MID);
    doc.text('-', ML + 1, y);
    y = wrap(doc, cert, ML + 5, y, TW - 5, 4.5);
    y += 1;
  }

  y += 4;

  // ── EDUCATION ───────────────────────────────────────────────────
  if (y + 14 > PH - BOT) { doc.addPage(); y = 22; }
  y = sectionHead(doc, 'Education', y);

  for (const ed of DATA.education) {
    if (y + 12 > PH - BOT) { doc.addPage(); y = 22; }
    font(doc, 8.5, 'bold', DARK);
    doc.text(ed.degree, ML, y);
    font(doc, 8, 'normal', MID);
    y += 4.2;
    doc.text(`${ed.school}  |  ${ed.period}`, ML, y);
    y += 6;
  }

  // ── FOOTER on every page ────────────────────────────────────────
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    rule(doc, PH - 11, RULE, 0.2);
    font(doc, 6.5, 'normal', [150, 170, 190] as RGB);
    doc.text(`Surely Win B. Dilag  ·  Systems & DevOps Engineer  ·  Page ${i} of ${pages}`, PW / 2, PH - 7, { align: 'center' });
  }

  doc.save('SurelyWinDilag_CV.pdf');
}
