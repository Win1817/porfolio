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
        'Architect and maintain Azure cloud infrastructure aligned with AZ-104 competencies: VNets, NSGs, firewall policies, IAM, Azure Monitor, ARM templates, and cost governance.',
        'Integrate Azure AI Foundry and Azure OpenAI services into UTM platform tooling, enabling intelligent automation for airspace data processing and operational analytics.',
        'Design and enforce CI/CD best practices using Git, GitOps workflows, Azure DevOps pipelines, and JFrog Artifactory for consistent, auditable release management.',
        'Oversee AKS and OpenShift cluster lifecycle management — provisioning, upgrades, scaling, and security hardening; leverage Headlamp as a modern Kubernetes dashboard for cluster visibility.',
        'Manage and troubleshoot Istio service mesh deployments including mTLS policies, traffic routing, circuit breaking, and Kiali observability integration across UTM namespaces.',
        'Process and validate AIXM (Aeronautical Information Exchange Model) XML datasets for airspace zone ingestion pipelines; diagnose geometry resolution failures in composite-airspace AIXM structures.',
        'Perform geospatial terrain analysis using QGIS and build Cloud-Optimized GeoTIFF (COG) datasets from raw elevation tile sources for UTM operational planning.',
        'Lead Helm chart development and standardization for automated, repeatable Kubernetes application deployments across multi-namespace UTM environments.',
        'Architect observability stacks using Prometheus, Grafana, Zabbix, Elasticsearch, OpenSearch, and Kibana; deploy distributed tracing with Tempo and Jaeger.',
        'Drive infrastructure-as-code initiatives and automation using Bash, PowerShell, and Python; author production-grade tooling including AIXM upload automation with retry logic and dry-run modes.',
        'Mentor junior engineers and coordinate cross-functional incident response and change management across hybrid Azure/on-prem Kubernetes environments.',
        'Collaborate with drone operators and government aviation authorities (LFV Sweden, ANS Lithuania) to ensure EU SWIM compliance and AIXM data quality standards.',
      ],
    },
    {
      title:   'Cloud Engineer',
      company: 'MedSpecialized Inc.',
      loc:     'Cebu City, Philippines',
      period:  'Mar 2023 – Feb 2024',
      duties: [
        'Administered Windows Server 2019/2022 environments including Active Directory, DNS, IIS, Remote Desktop Gateway, and Group Policy for a healthcare SaaS platform.',
        'Designed and managed scalable AWS cloud infrastructure comprising VPCs, Subnets, Security Groups, and Elastic Load Balancers, ensuring high availability and fault tolerance.',
        'Deployed and managed core AWS services including EC2, S3, AMI, CloudWatch, and RDS; optimized cost and performance through instance right-sizing and S3 lifecycle policies.',
        'Configured AWS IAM roles, policies, and permission boundaries to enforce least-privilege access across multi-account environments.',
        'Built and maintained CI/CD pipelines using Git for automated deployments and streamlined release management.',
        'Implemented security best practices including Security Group rules, IAM policies, and encryption at rest and in transit across AWS workloads.',
        'Automated routine infrastructure provisioning and maintenance tasks using PowerShell, Python, and Bash, reducing manual effort and improving consistency.',
        'Managed relational databases including MySQL, MS SQL Server, and Amazon RDS with focus on backup strategies, patching, and performance tuning.',
        'Used ConnectWise Manage and IT Boost for ITSM ticketing, asset management, and infrastructure documentation.',
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
      name: 'LFV UTM Elevation Pipeline',
      desc: 'Processed 76 Swedish terrain XYZ tiles into a merged Cloud-Optimized GeoTIFF using PDAL and QGIS for UTM airspace operational data.',
    },
    {
      name: 'AVIONIX ATC Platform',
      desc: 'Built a 10-microservice Spring Boot ATC management system with React frontend, Keycloak, Kafka, PostgreSQL, and full observability stack on Azure.',
    },
    {
      name: 'AIXM Upload Automation',
      desc: 'Python automation script replacing Postman workflows for airspace data ingestion, featuring token caching, retry logic, XML pre-flight validation, and dry-run mode.',
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
