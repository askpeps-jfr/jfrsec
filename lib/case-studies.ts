export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type CommandLogEntry = {
  comment: string;
  command: string;
  output?: string;
};

export type Finding = {
  title: string;
  detail: string;
  severity: Severity;
};

export type IOC = {
  type: string;
  value: string;
  description: string;
};

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export type RiskMatrixEntry = {
  asset: string;
  threat: string;
  likelihood: RiskLevel;
  impact: RiskLevel;
  risk: RiskLevel;
  treatment: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  githubUrl: string;
  category: string;
  summary: string;
  executiveSummary: string;
  severity: Severity;
  cvss: number;
  tags: string[];
  date: string;
  duration: string;
  scope: string[];
  overview: string;
  objectives: string[];
  methodology: string[];
  commandLog: CommandLogEntry[];
  findings: Finding[];
  iocs?: IOC[];
  riskMatrix?: RiskMatrixEntry[];
  remediation: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "botium-toys-enterprise-risk-assessment",
    title: "Botium Toys – NIST CSF Compliance Audit & Risk Assessment",
    githubUrl: "https://github.com/askpeps-jfr/botium-toys-risk-audit",
    category: "Risk Assessment",
    summary:
      "Full-scope security risk assessment for a mid-size e-commerce retailer, mapping asset inventory and NIST CSF gaps to a prioritized risk mitigation matrix.",
    executiveSummary:
      "Botium Toys, a growing online retailer, engaged this assessment after rapid infrastructure expansion outpaced its security controls. Assets across corporate, e-commerce, and point-of-sale environments were inventoried and scored against the NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover). The engagement surfaced one critical finding — unencrypted customer PII in a legacy order database — alongside high-risk gaps in asset ownership and network segmentation. A risk mitigation matrix was delivered to the executive team, ranking remediation work by likelihood x impact so budget could be allocated to the highest-leverage fixes first.",
    severity: "high",
    cvss: 7.4,
    tags: ["Risk Assessment", "NIST CSF", "Compliance", "Asset Inventory"],
    date: "2025-11-02",
    duration: "3 weeks",
    scope: [
      "Corporate network across 3 office sites",
      "Public e-commerce web application and checkout flow",
      "Point-of-sale terminals (retail floor)",
      "Cloud storage and compute (AWS)",
    ],
    overview:
      "The assessment inventoried physical, network, and application assets, then scored risk using likelihood x impact against the NIST Cybersecurity Framework, producing a control-gap register the client could action directly.",
    objectives: [
      "Inventory all physical, digital, and cloud assets",
      "Map existing controls to the NIST CSF functions",
      "Score residual risk and prioritize a remediation backlog",
      "Deliver an executive-readable risk register and mitigation roadmap",
    ],
    methodology: [
      "Asset discovery and classification workshop with IT stakeholders",
      "Threat and vulnerability identification per asset class",
      "NIST CSF gap analysis (Identify / Protect / Detect / Respond / Recover)",
      "Likelihood x impact risk scoring against the client's risk appetite",
      "Risk mitigation matrix with owners and target remediation dates",
    ],
    commandLog: [
      {
        comment: "Enumerate exposed subdomains",
        command:
          "subfinder -d botiumtoys.example -silent | httpx -silent",
        output:
          "shop.botiumtoys.example [200]\napi.botiumtoys.example [200]\nstaging.botiumtoys.example [200]\nold-cms.botiumtoys.example [200]",
      },
      {
        comment: "Baseline external attack surface",
        command: "nmap -sV -Pn -T4 -oA botium_ext botiumtoys.example",
        output:
          "PORT     STATE SERVICE VERSION\n80/tcp   open  http    nginx 1.18.0\n443/tcp  open  https   nginx 1.18.0\n3306/tcp open  mysql   MySQL 5.7.26",
      },
      {
        comment: "Check for exposed cloud storage",
        command: "aws s3 ls s3://botium-assets --no-sign-request",
        output: "PRE product-images/\nPRE order-exports/\nPRE db-backups/",
      },
    ],
    findings: [
      {
        title: "Unencrypted PII at rest in legacy order database",
        detail:
          "Customer PII stored without column-level encryption on the legacy MySQL order archive, directly exposed via the misconfigured S3 backup bucket.",
        severity: "critical",
      },
      {
        title: "No formal asset inventory",
        detail:
          "35% of cloud compute instances were untagged and unowned, preventing consistent patch and access reviews.",
        severity: "high",
      },
      {
        title: "Flat internal network segmentation",
        detail:
          "POS terminals shared a VLAN with corporate workstations, allowing lateral movement from a phished endpoint to payment infrastructure.",
        severity: "medium",
      },
    ],
    riskMatrix: [
      {
        asset: "Legacy order database (PII)",
        threat: "Unauthorized data exposure via misconfigured backups",
        likelihood: "Medium",
        impact: "High",
        risk: "Critical",
        treatment: "Encrypt at rest, rotate keys, restrict bucket ACLs",
      },
      {
        asset: "Cloud compute instances",
        threat: "Shadow IT / unmanaged, unpatched assets",
        likelihood: "High",
        impact: "Medium",
        risk: "High",
        treatment: "Deploy CMDB with automated tagging enforcement",
      },
      {
        asset: "POS network segment",
        threat: "Lateral movement from corporate LAN",
        likelihood: "Medium",
        impact: "High",
        risk: "High",
        treatment: "VLAN segmentation with explicit firewall ACLs",
      },
      {
        asset: "Employee credentials",
        threat: "Phishing and credential reuse",
        likelihood: "High",
        impact: "Medium",
        risk: "High",
        treatment: "Enforce MFA org-wide, run security awareness training",
      },
    ],
    remediation: [
      "Implement column-level encryption and key rotation for PII stores",
      "Deploy a CMDB with automated cloud tagging enforcement",
      "Segment POS and corporate VLANs with default-deny firewall ACLs",
      "Formalize NIST CSF-aligned control ownership across teams",
    ],
  },
  {
    slug: "perimeter-recon-port-audit",
    title: "NetHardener – Perimeter Recon & OSI Network Audit",
    githubUrl: "https://github.com/askpeps-jfr/nethardener-perimeter-matrix",
    category: "Network Security",
    summary:
      "Stealth Nmap sweep and service fingerprinting across a simulated small-business perimeter to enumerate the full external attack surface.",
    executiveSummary:
      "A lab environment modeling a small-business perimeter was swept end-to-end using staged Nmap scans — host discovery, stealth SYN scanning, and full service/version fingerprinting — to build an accurate picture of the externally reachable attack surface. Detected service versions were cross-referenced against known CVEs. The sweep found a database service bound to all interfaces and reachable from the internet, plus an outdated SSH daemon vulnerable to user enumeration, both prioritized for immediate remediation ahead of lower-severity banner-disclosure issues.",
    severity: "high",
    cvss: 6.8,
    tags: ["Nmap", "Network Audit", "Recon", "Service Enumeration"],
    date: "2025-09-14",
    duration: "2 days",
    scope: ["10.10.10.0/24 perimeter lab segment", "Single externally-facing host (10.10.10.15)"],
    overview:
      "A full TCP/UDP sweep catalogued live hosts, open ports, and running services, then cross-referenced fingerprinted versions against known CVEs to produce a prioritized hardening checklist.",
    objectives: [
      "Discover all live hosts on the target CIDR",
      "Fingerprint services and versions on open ports without tripping alerting",
      "Cross-reference versions against known CVEs",
      "Document a prioritized hardening checklist",
    ],
    methodology: [
      "ICMP/ARP host discovery sweep across the CIDR",
      "Stealth SYN scan with timing throttled to evade basic IDS thresholds",
      "Service and version detection with default NSE scripts",
      "UDP top-ports sweep for commonly missed exposure",
      "CVE cross-reference against fingerprinted service versions",
    ],
    commandLog: [
      {
        comment: "Host discovery sweep",
        command: "nmap -sn 10.10.10.0/24 -oG live_hosts.txt",
        output: "Host: 10.10.10.1\nHost: 10.10.10.15\nHost: 10.10.10.22\n3 hosts up.",
      },
      {
        comment: "Stealth SYN scan, full port range, throttled timing",
        command: "nmap -sS -p- -T2 -D RND:6 -oA full_tcp 10.10.10.15",
        output: "PORT      STATE SERVICE\n22/tcp    open  ssh\n80/tcp    open  http\n443/tcp   open  https\n3306/tcp  open  mysql",
      },
      {
        comment: "Service/version detection + default scripts",
        command: "nmap -sV -sC -p22,80,443,3306 -oA svc_scan 10.10.10.15",
        output:
          "22/tcp   open  ssh     OpenSSH 7.2 (protocol 2.0)\n80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))\n443/tcp  open  ssl/http Apache httpd 2.4.18\n3306/tcp open  mysql   MySQL 5.5.62-0ubuntu0.14.04.1",
      },
      {
        comment: "UDP top-100 sweep",
        command: "nmap -sU --top-ports 100 -oA udp_scan 10.10.10.15",
        output: "68/udp  open|filtered dhcpc\n123/udp open          ntp",
      },
    ],
    findings: [
      {
        title: "Outdated OpenSSH exposed to the internet",
        detail:
          "OpenSSH 7.2 is vulnerable to username enumeration via timing side-channel (CVE-2018-15473).",
        severity: "medium",
      },
      {
        title: "MySQL bound to 0.0.0.0",
        detail:
          "Database service reachable externally on 3306/tcp with weak default credentials accepted on first attempt.",
        severity: "critical",
      },
      {
        title: "Verbose HTTP server banner",
        detail:
          "Apache banner disclosed exact version and OS build, simplifying exploit targeting for an attacker.",
        severity: "low",
      },
    ],
    remediation: [
      "Patch OpenSSH to the latest stable release",
      "Bind MySQL to localhost or an internal-only interface; enforce strong credentials",
      "Disable server tokens and verbose banners on all public-facing services",
    ],
  },
  {
    slug: "pcap-forensic-triage-beacon-analysis",
    title: "LogQuery & PCAP Forensic Triage – C2 Beacon & Traffic Analysis",
    githubUrl: "https://github.com/askpeps-jfr/logquery-forensic-sandbox",
    category: "Traffic Analysis",
    summary:
      "Wireshark-driven packet capture triage isolating periodic beacon traffic and extracting indicators of compromise from a suspected C2 channel.",
    executiveSummary:
      "A SIEM alert flagged anomalous periodic outbound connections from workstation 10.10.20.44. The captured PCAP was triaged in Wireshark and tshark to isolate the anomalous flow from background traffic, characterize its beacon cadence, reconstruct the TCP stream, and extract indicators of compromise. The traffic pattern — fixed 60-second interval connections to an unattributed IP with no reverse DNS — is consistent with a lightweight C2 check-in protocol. The host was isolated and the destination blocked at the perimeter within the hour.",
    severity: "critical",
    cvss: 8.6,
    tags: ["Wireshark", "PCAP", "Traffic Analysis", "IDS"],
    date: "2025-07-22",
    duration: "1 day",
    scope: ["Workstation 10.10.20.44", "SIEM alert #4471, 45-minute capture window"],
    overview:
      "A SIEM alert triggered on periodic outbound connections from a workstation. The captured PCAP was triaged to identify protocol, cadence, and destination reputation of the beaconing traffic, then reconstructed into a full incident timeline.",
    objectives: [
      "Isolate the anomalous flow from background traffic",
      "Determine beacon interval and jitter",
      "Reconstruct the TCP stream and extract payload IOCs",
      "Produce a timeline for the incident report",
    ],
    methodology: [
      "Filter capture to the suspect host, excluding broadcast/DNS noise",
      "Isolate the repeating outbound flow and measure interval/jitter",
      "Follow and reconstruct the TCP stream in Wireshark",
      "Export objects and extract payload IOCs via tshark",
      "Correlate conversation statistics into an incident timeline",
    ],
    commandLog: [
      {
        comment: "Filter to suspect host, exclude broadcast noise",
        command: "ip.addr == 10.10.20.44 && !(bootp || arp || dns)",
        output: "247 packets matched filter (of 18,442 total)",
      },
      {
        comment: "Isolate repeating outbound TCP flow",
        command:
          "tcp.flags.syn == 1 && tcp.flags.ack == 0 && ip.dst == 185.220.101.7",
        output: "41 SYN packets, average interval 60.4s, jitter ±2.1s",
      },
      {
        comment: "Export objects for payload inspection",
        command: "tshark -r capture.pcap --export-objects http,./extracted",
        output: "Exported: beacon_payload.bin (312 bytes, base64-encoded body)",
      },
      {
        comment: "Statistics: conversation timing",
        command: "tshark -r capture.pcap -q -z conv,tcp",
        output:
          "10.10.20.44:49213 <-> 185.220.101.7:443   41 pkts   duration 41m 23s",
      },
    ],
    findings: [
      {
        title: "Fixed-interval beaconing to unattributed IP",
        detail:
          "Outbound connection every 60s ± 2s jitter to an IP with no reverse DNS and poor threat-intel reputation.",
        severity: "critical",
      },
      {
        title: "Base64-obfuscated payload in POST body",
        detail:
          "Encoded payload consistent with a lightweight C2 check-in protocol, extracted and decoded during triage.",
        severity: "critical",
      },
      {
        title: "No egress filtering on workstation VLAN",
        detail:
          "Client subnet permitted unrestricted outbound traffic on all ports, allowing the beacon to reach the internet unimpeded.",
        severity: "high",
      },
    ],
    iocs: [
      {
        type: "IPv4",
        value: "185.220.101.7",
        description: "C2 beacon destination — no reverse DNS, poor reputation score",
      },
      {
        type: "Beacon Interval",
        value: "60s ± 2s",
        description: "Fixed cadence consistent with a lightweight C2 framework",
      },
      {
        type: "User-Agent",
        value: "Mozilla/4.0 (compatible; MSIE)",
        description: "Anomalous legacy UA string used to blend with normal traffic",
      },
    ],
    remediation: [
      "Isolate the host and initiate full forensic imaging",
      "Block the destination IP/domain at the perimeter firewall",
      "Implement default-deny egress filtering with explicit allow-listing",
    ],
  },
  {
    slug: "nist-sp800-30-db-hardening",
    title: "NIST SP 800-30 Database Hardening & Quantitative Risk Assessment",
    githubUrl: "https://github.com/askpeps-jfr/nist-sp800-30-db-hardening",
    category: "Database Security",
    summary:
      "Quantitative risk assessment applying the NIST SP 800-30 methodology to a production MySQL tier, pairing probability-weighted likelihood/impact scoring with concrete hardening controls.",
    executiveSummary:
      "A production MySQL cluster was assessed using the NIST SP 800-30 Guide for Conducting Risk Assessments, replacing the client's prior qualitative High/Medium/Low labeling with a quantitative scale — probability of threat-event initiation multiplied by probability of success, scored against defined confidentiality/integrity/availability loss magnitudes. The assessment identified over-privileged service accounts, unencrypted client transport, and disabled at-rest encryption on PII-bearing tables as the highest-value residual risks. Hardening controls were applied directly during the engagement and residual risk was recalculated against the same quantitative scale to demonstrate measurable reduction.",
    severity: "critical",
    cvss: 8.4,
    tags: ["NIST SP 800-30", "Quantitative Risk Assessment", "Database Hardening", "MySQL"],
    date: "2025-05-30",
    duration: "1 week",
    scope: [
      "Production MySQL 8.0 cluster (primary + 2 replicas)",
      "Database administrative access controls and privilege grants",
      "Backup and replication transport pipeline",
    ],
    overview:
      "The assessment applied the NIST SP 800-30 four-step risk assessment process — prepare, conduct, communicate, maintain — to a database tier handling customer PII, scoring each identified risk quantitatively rather than qualitatively so remediation could be prioritized by measurable expected loss.",
    objectives: [
      "Apply the NIST SP 800-30 risk assessment methodology to the database tier",
      "Quantify likelihood and impact using a defined probability/loss scale rather than qualitative labels",
      "Harden database configuration against identified threat sources",
      "Recalculate residual risk after remediation to demonstrate measurable reduction",
    ],
    methodology: [
      "Threat source and threat event identification (NIST SP 800-30 Table D-2)",
      "Vulnerability identification via configuration review and CVE cross-reference",
      "Quantitative likelihood scoring (probability of initiation x probability of success)",
      "Impact quantification against confidentiality/integrity/availability loss magnitude",
      "Hardening implementation and residual risk recalculation",
    ],
    commandLog: [
      {
        comment: "Enumerate over-privileged accounts",
        command: "SELECT user, host, Grant_priv, Super_priv FROM mysql.user;",
        output: "5 accounts hold SUPER privilege; 2 are unused legacy service accounts",
      },
      {
        comment: "Enforce TLS-only client and replication transport",
        command: "SET GLOBAL require_secure_transport = ON;",
        output: "[OK] require_secure_transport = ON",
      },
      {
        comment: "Remove anonymous and unused accounts",
        command: "DROP USER ''@'localhost', 'legacy_report'@'%';",
        output: "Query OK, 0 rows affected",
      },
      {
        comment: "Verify at-rest encryption status",
        command: "SHOW VARIABLES LIKE 'innodb_encrypt_tables';",
        output: "innodb_encrypt_tables = ON",
      },
    ],
    findings: [
      {
        title: "SUPER privilege granted to inactive service accounts",
        detail:
          "Two unused legacy service accounts retained SUPER privilege, giving any compromised credential full administrative control of the cluster.",
        severity: "high",
      },
      {
        title: "Client connections permitted over unencrypted transport",
        detail:
          "require_secure_transport was disabled, allowing credentials and query data to traverse the network in plaintext.",
        severity: "critical",
      },
      {
        title: "At-rest encryption disabled on customer PII tables",
        detail:
          "innodb_encrypt_tables was unset on the primary node, leaving PII-bearing tablespaces readable directly from disk or backup.",
        severity: "critical",
      },
    ],
    remediation: [
      "Revoke SUPER privilege from inactive accounts; enforce least privilege via role-based grants",
      "Require TLS for all client and replication connections",
      "Enable InnoDB tablespace encryption for PII-bearing tables",
      "Recalculate residual risk quarterly using the NIST SP 800-30 quantitative scale",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export const allTags = Array.from(
  new Set(caseStudies.flatMap((c) => c.tags))
).sort();
