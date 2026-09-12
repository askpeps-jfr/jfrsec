export const interviewQuestions: Record<string, { q: string; a: string }[]> = {
  "foundations": [
    {
      q: "Walk me through your operational triage process when taking over an unhardened enterprise environment.",
      a: "I begin with an asset discovery and identity audit: inventorying domain controllers, hypervisors, and service accounts. Next, I enforce strict Role-Based Access Control (RBAC) and least privilege, disable dormant administrator accounts, and implement automated log forwarding. Finally, I define operational runbooks and SLA triage tiers to ensure system availability aligns with security guardrails."
    },
    {
      q: "How do you balance uptime SLAs against critical off-cycle patch deployments?",
      a: "I evaluate the vulnerability severity against exposure. If a vulnerability is actively exploited remotely without authentication, it triggers an emergency change window. Otherwise, patches deploy through an isolated staging tier to validate dependency health before executing zero-downtime rolling updates across production clusters."
    },
    {
      q: "What would you do differently on a legacy enterprise infrastructure migration?",
      a: "I would implement network micro-segmentation and strict Privileged Access Management (PAM) session recording prior to migrating workloads. Treating legacy assets as zero-trust zones from day one prevents lateral contamination into modernized infrastructure."
    },
    {
      q: "How do you communicate the operational friction of MFA or least privilege to executive leadership?",
      a: "I frame access controls around operational resilience and risk liability rather than compliance checkmarks. I demonstrate how credential compromise leads to extended operational downtime, showing that minimal authentication friction prevents catastrophic business halts."
    }
  ],
  "vulneramap": [
    {
      q: "Walk me through your methodology for conducting the Botium Toys NIST CSF assessment.",
      a: "I scoped the digital asset inventory across e-commerce retail endpoints, internal networks, and cloud storage. I mapped findings against the five core NIST CSF functions (Identify, Protect, Detect, Respond, Recover) and applied quantitative scoring using Likelihood x Impact to highlight unencrypted legacy databases and lack of segmentation."
    },
    {
      q: "How do you prioritize findings when multiple critical vulnerabilities surface simultaneously?",
      a: "I rank vulnerabilities using risk velocity and exposure context rather than raw CVSS alone. An unencrypted database containing customer PII directly exposed to external subnets takes immediate precedence over an internal air-gapped system vulnerability."
    },
    {
      q: "What would you change if auditing a distributed cloud environment instead of retail on-prem?",
      a: "I would shift the focus to IAM permission boundaries, open S3 buckets, ephemeral resource lifecycles, and automated Infrastructure-as-Code (IaC) configuration audits rather than traditional perimeter hardware assessments."
    },
    {
      q: "How do you present a technical risk audit to non-technical stakeholders?",
      a: "I translate technical debt into financial and reputational exposure. Instead of detailing database encryption ciphers, I highlight regulatory fines (GDPR/CCPA), brand degradation, and customer transaction downtime, using a clean color-coded heat map for clarity."
    }
  ],
  "nethardener": [
    {
      q: "Walk me through your perimeter reconnaissance process using Nmap.",
      a: "I conduct stealth SYN scans (-sS) with banner grabbing and OS detection (-sV -O) across the target perimeter. Once services are fingerprinted, I cross-reference service versions against public CVE databases, flag unnecessary public daemons (like database listeners or unhardened SSH), and compile immediate firewall remediation rules."
    },
    {
      q: "What immediate actions do you take when a production database port (e.g., MySQL 3306) is exposed to 0.0.0.0?",
      a: "I immediately bind the service to 127.0.0.1 in the database configuration, drop external access via local firewall rules (iptables / ufw), and force remote administrator traffic through an encrypted SSH tunnel or internal VPN."
    },
    {
      q: "What would you do differently on a full-scope external penetration test?",
      a: "I would incorporate OSINT enumeration, certificate transparency log scraping, and passive DNS discovery before active port scanning to identify forgotten shadow IT assets without alerting perimeter intrusion detection systems."
    },
    {
      q: "How do you explain the necessity of disabling legacy protocols (like Telnet or SMBv1) to management?",
      a: "I demonstrate that plaintext protocols transmit credentials in clear text across the wire, making credential theft trivial with basic packet capture tools. Upgrading to modern encrypted baselines protects internal credentials with zero workflow degradation."
    }
  ],
  "logquery": [
    {
      q: "Walk me through your command-line workflow for isolating a brute-force authentication incident.",
      a: "I parse /var/log/auth.log using chained bash commands: grep 'Failed password' piped to awk to extract source IP addresses, then sort | uniq -c | sort -nr to isolate top attack vectors. I then run SQL queries against authentication event tables to correlate repeated failed logins with eventual successful authentications."
    },
    {
      q: "How do you differentiate between an automated credential-stuffing bot and an authorized user locked out?",
      a: "I analyze request velocity, user-agent headers, and username distribution. Automated attacks hit high request volumes across alphabetical or dictionary usernames from distributed public IPs, whereas a legitimate user produces low-volume attempts against a single username originating from known subnet pools."
    },
    {
      q: "What would you improve in this forensic pipeline for high-throughput enterprise logs?",
      a: "I would ingest raw logs into an indexed log aggregator (such as an ELK stack or OpenSearch) with pre-parsed fields and automated alerting rules rather than performing ad-hoc manual command-line parsing on disk."
    },
    {
      q: "How do you justify investment in centralized SIEM logging to business stakeholders?",
      a: "I explain that local logs can be altered or erased by an adversary after root compromise. Centralized, write-once log streaming preserves cryptographic chain-of-custody, drastically reduces breach detection time, and fulfills mandatory compliance retention requirements."
    }
  ],
  "threatsurface": [
    {
      q: "Walk me through your evaluation of physical and hardware attack surfaces.",
      a: "I evaluate endpoint vulnerabilities that bypass network perimeters: open USB interfaces, unsecured bootloaders, and unpatched local daemon vulnerabilities. I verify that kernel-level restrictions (usbcore.authorized_default=0) and strict udev rules prevent rogue Human Interface Device (HID) keystroke injection attacks."
    },
    {
      q: "How do you prioritize local host hardening against physical tampering?",
      a: "I enforce Full Disk Encryption (FDE) backed by TPM hardware chips, secure BIOS/UEFI passwords, and disabled DMA ports (like Thunderbolt). If physical possession is compromised, the data remains cryptographically inaccessible."
    },
    {
      q: "What would you do differently in an enterprise workstation environment?",
      a: "I would deploy automated endpoint configuration baselines via MDM or Group Policy Objects (GPO), enforcing mass storage USB blocklists and automated firmware integrity verification across all remote fleet devices."
    },
    {
      q: "How do you communicate the danger of 'Rubber Ducky' USB attacks to general employees?",
      a: "I avoid deep hardware jargon and explain it simply: any unknown USB device can simulate a keyboard typing thousands of malicious terminal commands in a fraction of a second. I reinforce 'zero trust' physical hygiene through interactive security awareness demos."
    }
  ],
  "siem-triage": [
    {
      q: "Walk me through your triage workflow when a critical SIEM alert fires.",
      a: "I correlate the alert timestamp against network flows and host logs. I extract the destination IP, domain, and payload hashes, check them against threat intelligence feeds, and inspect surrounding packet captures (PCAP) to verify whether the alert is a true-positive beacon or benign business traffic."
    },
    {
      q: "How do you tune noisy detection rules to prevent SOC alert fatigue?",
      a: "I analyze historical alert volumes to identify repeated false positives triggered by authorized internal scanners or routine administrative scripts. I apply precise exclusion criteria based on verified source subnets or hash signatures without loosening baseline detection thresholds."
    },
    {
      q: "What would you do differently when monitoring a cloud-native architecture?",
      a: "I would prioritize API control plane telemetry (such as AWS CloudTrail or Azure Activity Logs), tracking anomalous token assumption and IAM policy edits rather than relying solely on traditional network packet inspection."
    },
    {
      q: "How do you communicate an active containment recommendation to an executive team?",
      a: "I state the confirmed scope, the isolated asset, and the business impact up front. I provide clear options: immediate workstation network isolation with minimal user impact versus taking an entire sub-service offline, outlining the risk trade-offs for each."
    }
  ],
  "sentinel-py": [
    {
      q: "Walk me through the architecture of your Sentinel-Py automated triage pipeline.",
      a: "The script ingests incoming alert payloads in JSON format, parses critical fields (timestamp, host, IP, signature), and extracts IOCs. It automates initial reputation scoring via API lookups, maps the event to a MITRE ATT&CK technique, and uses AI-driven classification to filter out routine noise before escalating to human analysts."
    },
    {
      q: "How do you ensure automated triage scripts don't accidentally drop genuine high-severity incidents?",
      a: "I maintain strict deterministic fallback rules: any event involving privileged account modification, ransomware indicators, or out-of-band data exfiltration is hardcoded to bypass AI filtering and alert a human analyst immediately. AI ops handles repetitive low-tier triage, not executive authorization."
    },
    {
      q: "What would you enhance if deploying this automation script to enterprise production?",
      a: "I would containerize the workflow into microservices running on a serverless event queue (like AWS Lambda or Google Cloud Functions), backed by structured logging, retry logic, and an API rate-limiting cache."
    },
    {
      q: "How do you reassure leadership regarding the safety of AI-assisted security automation?",
      a: "I clarify that the pipeline operates under a 'human-in-the-loop' model. The automation and AI models perform time-consuming data gathering, enrichment, and summarization, while critical containment and blocking actions remain governed by analyst approval."
    }
  ]
};
