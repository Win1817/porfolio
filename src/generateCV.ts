import jsPDF from 'jspdf';

// ─── Colour palette ───────────────────────────────────────────────
const C = {
  accent:   [0,   180, 220] as [number,number,number],   // cyan
  black:    [10,  15,  22]  as [number,number,number],
  dark:     [30,  50,  70]  as [number,number,number],
  mid:      [80,  110, 130] as [number,number,number],
  light:    [180, 210, 230] as [number,number,number],
  bg:       [245, 249, 253] as [number,number,number],
  white:    [255, 255, 255] as [number,number,number],
  rule:     [220, 232, 242] as [number,number,number],
};

// ─── Page geometry ────────────────────────────────────────────────
const PW  = 210;          // A4 width  mm
const PH  = 297;          // A4 height mm
const ML  = 18;           // left margin
const MR  = 18;           // right margin
const MT  = 0;            // top margin (header owns it)
const COL = 62;           // sidebar width
const GAP = 6;            // gap between sidebar & main
const MX  = ML + COL + GAP; // main column x
const MW  = PW - MX - MR;   // main column width

// ─── Data ─────────────────────────────────────────────────────────
const DATA = {
  name:     'Surely Win B. Dilag',
  title:    'Cloud / Systems / DevOps Engineer',
  email:    'dsurelywin@gmail.com',
  phone:    '+63 956 766 9410',
  location: 'Negros Occidental, Philippines',
  linkedin: 'linkedin.com/in/surely-win-dilag-598364214',
  summary:
    'Systems and Cloud Engineer with 4+ years of experience architecting and ' +
    'maintaining high-availability infrastructure across Azure, AWS, and Kubernetes. ' +
    'Specialized in mission-critical aviation (UTM) systems, hybrid cloud deployments, ' +
    'CI/CD pipelines, and full-stack observability.',

  skills: [
    { cat: 'Cloud',        items: 'Azure (AKS, VM, VNet, NSG) · AWS (VPC, IAM, EC2, RDS, S3)' },
    { cat: 'Containers',   items: 'Kubernetes · Docker · Helm · Rancher · Longhorn' },
    { cat: 'IaC',          items: 'Terraform · ARM Templates · Bicep' },
    { cat: 'DevOps/CI-CD', items: 'Git · GitOps · ArgoCD · Jenkins · JFrog · Bash · PowerShell' },
    { cat: 'Observability',items: 'Prometheus · Grafana · Zabbix · Elasticsearch · Kibana' },
    { cat: 'Security',     items: 'VNet/VPC · NSG · Firewalls · IAM · Keycloak SSO' },
    { cat: 'OS',           items: 'Linux (RHEL, Ubuntu) · Windows Server 2019/22 · Proxmox · VMware' },
    { cat: 'Programming',  items: 'Python · TypeScript · JavaScript (React) · Bash · PowerShell · C++' },
    { cat: 'Databases',    items: 'MySQL · PostgreSQL · MS SQL Server · Amazon RDS' },
  ],

  certifications: [
    'Sumo Logic Cloud Infrastructure Security Certified',
    'Microsoft Azure Infrastructure Solutions',
    'Linux Fundamentals',
    'Zyxel Certified Network Associate',
  ],

  education: [
    {
      degree:  'B.Eng. Technology – Computer Engineering',
      school:  'Technological University of the Philippines – Visayas',
      period:  '2018 – 2022',
    },
    {
      degree:  'Computer Systems Servicing NC II',
      school:  'La Consolacion College – Murcia',
      period:  '2016 – 2018',
    },
  ],

  experience: [
    {
      period:  'Feb 2024 – Present',
      company: 'AirNav Technology Services',
      loc:     'Iloilo City, Philippines',
      title:   'Systems Engineer',
      duties: [
        'Managed Unmanned Traffic Management (UTM) systems in hybrid cloud environments.',
        'Administered Linux servers (RHEL, Ubuntu) ensuring high availability and security compliance.',
        'Deployed and maintained Azure Kubernetes Service (AKS) clusters using Rancher.',
        'Developed and maintained Helm charts to automate Kubernetes application deployments.',
        'Designed observability pipelines using Prometheus, Grafana, Zabbix, Elasticsearch, and Kibana.',
        'Performed Azure cloud engineering: virtual networking, firewall rules, IAM, and access control.',
        'Automated provisioning using Bash and PowerShell; integrated Keycloak IAM.',
        'Ensured EU aviation SWIM compliance with drone operators and government stakeholders.',
        'Participated in on-site deployment and system integration in Brisbane, Australia.',
      ],
    },
    {
      period:  'Mar 2023 – Feb 2024',
      company: 'MedSpecialized Inc.',
      loc:     'Cebu City, Philippines',
      title:   'Cloud Engineer',
      duties: [
        'Administered Windows Server 2019/2022 including AD, DNS, IIS, RD Gateway, and Group Policy.',
        'Designed and managed Azure and AWS cloud infrastructure (VNets, VPCs, Load Balancers, Security Groups).',
        'Deployed and managed AWS services: EC2, S3, AMI, CloudWatch, and RDS.',
        'Performed data and domain migrations with minimal downtime.',
        'Implemented firewall rules, IAM policies, and encryption security best practices.',
        'Automated routine tasks using PowerShell, Python, and Bash.',
        'Managed MySQL, MS SQL Server, and cloud-based storage databases.',
      ],
    },
    {
      period:  'Aug 2021 – Mar 2023',
      company: 'BluCruPH Inc.',
      loc:     'Bacolod City, Philippines',
      title:   'IT Specialist',
      duties: [
        'Installed and maintained computer systems, peripherals, and enterprise software.',
        'Managed network infrastructure including routers, switches, and firewalls.',
        'Administered Ubiquiti Dream Machine Pro for optimized network performance.',
        'Administered Microsoft 365 and Exchange Online.',
        'Provisioned Azure resources via Portal, CLI, and ARM templates; configured NSGs and subnets.',
        'Managed Microsoft Entra (Azure AD) App Registrations for secure authentication.',
      ],
    },
  ],

  projects: [
    { name: 'Blind Mind Assistance',      desc: 'Arduino assistive device with SMS & GPS navigation for the visually impaired.' },
    { name: 'Cemetery Web & Mobile App',  desc: 'Full-stack app for digital lot management and visitor navigation.' },
    { name: 'Bluetooth Garbage Collector',desc: 'Semi-automated BT-controlled robot for autonomous waste collection.' },
    { name: 'Solar Automated Trash Bin',  desc: 'Solar-powered smart bin with automated detection for waste management.' },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────
function setFont(
  doc: jsPDF,
  size: number,
  style: 'normal'|'bold'|'italic' = 'normal',
  color: [number,number,number] = C.dark
) {
  doc.setFontSize(size);
  doc.setFont('helvetica', style);
  doc.setTextColor(...color);
}

function hRule(doc: jsPDF, y: number, x = ML, w = PW - ML - MR, thickness = 0.2) {
  doc.setDrawColor(...C.rule);
  doc.setLineWidth(thickness);
  doc.line(x, y, x + w, y);
}

/**
 * Wraps text and returns the new Y after printing.
 * Handles automatic page breaks.
 */
function wrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number,
  pageH = PH,
  bottomMargin = 18
): number {
  const lines = doc.splitTextToSize(text, maxW);
  for (const line of lines) {
    if (y + lineH > pageH - bottomMargin) {
      doc.addPage();
      y = 24;
    }
    doc.text(line, x, y);
    y += lineH;
  }
  return y;
}

// ─── Section heading ──────────────────────────────────────────────
function sectionHeading(doc: jsPDF, label: string, y: number, x = MX, w = MW): number {
  setFont(doc, 8, 'bold', C.accent);
  doc.text(label.toUpperCase(), x, y);
  y += 1.5;
  doc.setDrawColor(...C.accent);
  doc.setLineWidth(0.4);
  doc.line(x, y, x + w, y);
  return y + 4;
}

// ─── Sidebar section heading ──────────────────────────────────────
function sideHeading(doc: jsPDF, label: string, y: number): number {
  setFont(doc, 7.5, 'bold', C.accent);
  doc.text(label.toUpperCase(), ML, y);
  y += 1.5;
  doc.setDrawColor(...C.accent);
  doc.setLineWidth(0.3);
  doc.line(ML, y, ML + COL, y);
  return y + 4;
}

// ─── Main export function ─────────────────────────────────────────
export function generateCV() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  doc.setProperties({
    title:   'Surely Win B. Dilag – CV',
    author:  'Surely Win B. Dilag',
    subject: 'Cloud / Systems / DevOps Engineer',
    creator: 'sdilag.us',
  });

  // ── HEADER BAR ─────────────────────────────────────────────────
  const HEADER_H = 38;
  doc.setFillColor(...C.black);
  doc.rect(0, 0, PW, HEADER_H, 'F');

  // Accent left stripe
  doc.setFillColor(...C.accent);
  doc.rect(0, 0, 4, HEADER_H, 'F');

  // Name
  setFont(doc, 20, 'bold', C.white);
  doc.text(DATA.name, ML + 4, 14);

  // Title
  setFont(doc, 9.5, 'normal', C.accent);
  doc.text(DATA.title, ML + 4, 21.5);

  // Contact line in header
  setFont(doc, 7.5, 'normal', [160, 200, 220]);
  const contacts = [DATA.email, DATA.phone, DATA.location, DATA.linkedin];
  const cStr = contacts.join('   ·   ');
  doc.text(cStr, ML + 4, 30);

  // ── SIDEBAR BACKGROUND ─────────────────────────────────────────
  doc.setFillColor(...C.bg);
  doc.rect(0, HEADER_H, ML + COL + GAP / 2, PH - HEADER_H, 'F');

  // ── SIDEBAR CONTENT ────────────────────────────────────────────
  let sy = HEADER_H + 10;

  // Skills
  sy = sideHeading(doc, 'Skills', sy);
  for (const sk of DATA.skills) {
    if (sy > PH - 20) { doc.addPage(); sy = 16; }
    setFont(doc, 7, 'bold', C.dark);
    doc.text(sk.cat, ML, sy);
    sy += 3.8;
    setFont(doc, 6.5, 'normal', C.mid);
    const lines = doc.splitTextToSize(sk.items, COL - 2);
    doc.text(lines, ML, sy);
    sy += lines.length * 3.2 + 2.5;
  }

  sy += 3;

  // Certifications
  sy = sideHeading(doc, 'Certifications', sy);
  for (const cert of DATA.certifications) {
    if (sy > PH - 20) { doc.addPage(); sy = 16; }
    setFont(doc, 6.5, 'normal', C.mid);
    const lines = doc.splitTextToSize(`· ${cert}`, COL - 2);
    doc.text(lines, ML, sy);
    sy += lines.length * 3.5 + 1.5;
  }

  sy += 3;

  // Education
  sy = sideHeading(doc, 'Education', sy);
  for (const ed of DATA.education) {
    if (sy > PH - 24) { doc.addPage(); sy = 16; }
    setFont(doc, 7, 'bold', C.dark);
    const degLines = doc.splitTextToSize(ed.degree, COL);
    doc.text(degLines, ML, sy);
    sy += degLines.length * 3.5 + 1;
    setFont(doc, 6.5, 'italic', C.mid);
    const schLines = doc.splitTextToSize(ed.school, COL);
    doc.text(schLines, ML, sy);
    sy += schLines.length * 3.2;
    setFont(doc, 6.5, 'normal', [120, 150, 170]);
    doc.text(ed.period, ML, sy);
    sy += 6;
  }

  // ── MAIN COLUMN ────────────────────────────────────────────────
  let my = HEADER_H + 10;

  // Summary
  my = sectionHeading(doc, 'Professional Summary', my);
  setFont(doc, 8, 'normal', C.mid);
  my = wrappedText(doc, DATA.summary, MX, my, MW, 4.2);
  my += 5;

  // Experience
  my = sectionHeading(doc, 'Work Experience', my);

  for (const job of DATA.experience) {
    // Guard page break before each job header
    if (my > PH - 38) { doc.addPage(); my = 24; }

    // Company + period row
    setFont(doc, 9, 'bold', C.black);
    doc.text(job.company, MX, my);
    setFont(doc, 7.5, 'normal', C.mid);
    doc.text(job.period, PW - MR, my, { align: 'right' });
    my += 4.2;

    // Title + location
    setFont(doc, 8, 'bold', C.accent);
    doc.text(job.title, MX, my);
    setFont(doc, 7, 'normal', C.mid);
    doc.text(job.loc, PW - MR, my, { align: 'right' });
    my += 5;

    // Bullet duties
    setFont(doc, 7.5, 'normal', C.mid);
    for (const duty of job.duties) {
      if (my > PH - 18) { doc.addPage(); my = 24; }
      const bullet = `• ${duty}`;
      const lines = doc.splitTextToSize(bullet, MW - 4);
      doc.text(lines, MX + 2, my);
      my += lines.length * 3.8;
    }

    my += 4;
    if (DATA.experience.indexOf(job) < DATA.experience.length - 1) {
      hRule(doc, my - 2, MX, MW, 0.15);
    }
  }

  my += 3;

  // Projects
  if (my > PH - 50) { doc.addPage(); my = 24; }
  my = sectionHeading(doc, 'Notable Projects', my);

  for (const proj of DATA.projects) {
    if (my > PH - 18) { doc.addPage(); my = 24; }
    setFont(doc, 8, 'bold', C.dark);
    doc.text(proj.name, MX, my);
    my += 4;
    setFont(doc, 7.5, 'normal', C.mid);
    const lines = doc.splitTextToSize(proj.desc, MW);
    doc.text(lines, MX + 2, my);
    my += lines.length * 3.8 + 2;
  }

  // ── FOOTER ─────────────────────────────────────────────────────
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    setFont(doc, 6.5, 'normal', [160, 185, 200]);
    doc.text(`Surely Win B. Dilag  ·  CV  ·  Page ${i} of ${pageCount}`, PW / 2, PH - 8, { align: 'center' });
    hRule(doc, PH - 11, ML, PW - ML - MR, 0.15);
  }

  doc.save('Surely_Win_Dilag_CV.pdf');
}
