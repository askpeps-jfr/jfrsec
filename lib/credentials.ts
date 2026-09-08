export type CredentialStatus = "VERIFIED" | "IN PROGRESS" | "SCHEDULED";
export type CredentialType = "degree" | "certification";

export type Credential = {
  id: string;
  title: string;
  issuer: string;
  type: CredentialType;
  status: CredentialStatus;
  issueDate: string;
  verifyUrl: string;
  description: string;
  skillsCovered: string[];
  previewImage?: string;
};

export const credentials: Credential[] = [
  {
    id: "itt-tech-bsit",
    title: "Bachelor of Science in Information Technology",
    issuer: "ITT Technical Institute",
    type: "degree",
    status: "VERIFIED",
    issueDate: "March 13, 2003",
    verifyUrl: "#",
    description:
      "Comprehensive 4-year technical degree foundation in IT infrastructure, routing protocols, and systems analysis.",
    skillsCovered: [
      "Systems Administration",
      "Network Infrastructure",
      "IT Operations",
      "Hardware Architecture",
    ],
    previewImage: "/itt-degree.jpg",
  },
  {
    id: "google-cybersecurity-professional",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    type: "certification",
    status: "IN PROGRESS",
    issueDate: "Target 2026-Q1",
    verifyUrl: "https://www.credly.com/badges/example-google-cybersecurity",
    description:
      "An 8-course program covering the full SOC analyst skill set — security foundations, network defense, Linux and SQL for security operations, and asset/threat/vulnerability management. Completed modules: Foundations of Cybersecurity, Play It Safe: Network Defense, Connect and Protect: Networks and Network Security, Tools of the Trade: Linux and SQL, Assets, Threats, and Vulnerabilities.",
    skillsCovered: [
      "Foundations",
      "Network Defense",
      "Linux & SQL",
      "Assets & Threats",
    ],
  },
  {
    id: "google-it-support-professional",
    title: "Google IT Support Professional Certificate",
    issuer: "Google / Coursera",
    type: "certification",
    status: "VERIFIED",
    issueDate: "2024-05",
    verifyUrl: "https://www.credly.com/badges/example-google-it-support",
    description:
      "A 5-course program covering troubleshooting, networking, operating systems, system administration, and IT security fundamentals — the operational base this security career path is built on.",
    skillsCovered: [
      "Troubleshooting",
      "Networking",
      "Operating Systems",
      "System Administration",
      "IT Security",
    ],
  },
  {
    id: "comptia-security-plus",
    title: "CompTIA Security+ (SY0-701)",
    issuer: "CompTIA",
    type: "certification",
    status: "SCHEDULED",
    issueDate: "Target 2026-Q2",
    verifyUrl: "#",
    description:
      "Currently in exam preparation. Covers general security concepts, threats and vulnerabilities, security architecture, security operations, and program management and oversight.",
    skillsCovered: [
      "Threat Management",
      "Security Architecture",
      "Cryptography",
      "Access Control",
    ],
  },
  {
    id: "comptia-a-plus",
    title: "CompTIA A+",
    issuer: "CompTIA",
    type: "certification",
    status: "SCHEDULED",
    issueDate: "Target 2026-Q1",
    verifyUrl: "#",
    description:
      "In prep. Validates core hardware, networking, mobile device, and operating system troubleshooting skills that underpin day-one IT and security operations work.",
    skillsCovered: [
      "Hardware",
      "Networking Basics",
      "Mobile Devices",
      "OS Troubleshooting",
    ],
  },
];

export function getCredential(id: string) {
  return credentials.find((c) => c.id === id);
}
