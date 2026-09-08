export type SandboxSpec = { label: string; value: string };

export type ConfigLog = { filename: string; content: string };

export type VmEnvironment = {
  id: string;
  name: string;
  tagline: string;
  os: string;
  specs: SandboxSpec[];
  tags: string[];
  configLog: ConfigLog;
};

export const hostArchitecture = {
  githubUrl: "https://github.com/askpeps-jfr/jfr-sec-lab",
  host: "Dell Latitude E7270 (Bare-Metal Ubuntu Linux)",
  hypervisor: "Linux KVM + QEMU + virt-manager",
  networkQuarantine:
    "ASUS GS-BE18000 — VLAN 53 (192.168.50.0/24) — Access Intranet: Disabled",
  containmentPolicy:
    "All lab VMs run behind isolated virtual switches with no bridge to the host's LAN-facing NIC. Exploit traffic, malware samples, and C2 beacons generated inside the range cannot reach the host network by design.",
};

export const vmEnvironments: VmEnvironment[] = [
  {
    id: "w2k22-domain-controller",
    name: "Enterprise Domain Controller (W2K22)",
    tagline: "Windows Server 2022 — Active Directory hardening range",
    os: "Windows Server 2022",
    specs: [
      { label: "Domain", value: "an.local" },
      { label: "Password Policy", value: "GPO-enforced, 14-character minimum" },
      { label: "LLMNR", value: "Disabled" },
      { label: "NetBIOS", value: "Stripped" },
      { label: "SMB Signing", value: "Enforced" },
    ],
    tags: ["Active Directory", "GPO", "SMB Signing", "LLMNR Defense"],
    configLog: {
      filename: "gpo-hardening-baseline.ps1",
      content: `# AD GPO Hardening Baseline — an.local
# Applies domain-wide SMB, NetBIOS, and LLMNR lockdown

Set-SmbServerConfiguration -EnableSMB1Protocol $false -RequireSecuritySignature $true -Force

Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa" -Name "RestrictAnonymous" -Value 1
Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa" -Name "RestrictAnonymousSAM" -Value 1

# LLMNR disabled via GPO: Turn Off Multicast Name Resolution
Set-DnsClientGlobalSetting -SuffixSearchList @()

Get-NetAdapter | ForEach-Object {
  $guid = $_.InterfaceGuid
  $path = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\NetBT\\Parameters\\Interfaces\\Tcpip_$guid"
  Set-ItemProperty -Path $path -Name "NetbiosOptions" -Value 2   # 2 = disable NetBIOS over TCP/IP
}

# Password policy (GPO): 14-char minimum, 24 password history
net accounts /minpwlen:14 /maxpwage:90 /uniquepw:24

Write-Output "[OK] an.local hardening baseline applied."`,
    },
  },
  {
    id: "macos-sonoma-sandbox",
    name: "macOS Sonoma 14 Security Sandbox",
    tagline: "OpenCore-booted macOS for endpoint security testing",
    os: "macOS Sonoma 14",
    specs: [
      { label: "Bootloader", value: "OpenCore" },
      { label: "CPU Emulation", value: "Intel Penryn" },
      { label: "SMC", value: "Apple SMC cryptographic OSK injection" },
      { label: "Memory", value: "7.1 GB RAM" },
      { label: "Storage", value: "64 GB APFS" },
    ],
    tags: ["OpenCore", "APFS", "Endpoint Security"],
    configLog: {
      filename: "launch-sonoma.sh",
      content: `qemu-system-x86_64 \\
  -enable-kvm -m 7168 -smp 4,cores=4 \\
  -cpu Penryn,vendor=GenuineIntel,+invtsc,vmware-cpuid-freq=on,kvm=on \\
  -machine q35 -smbios type=2 \\
  -device isa-applesmc,osk="ourhardworkbythesewordsguardedpleasedontsteal" \\
  -drive if=pflash,format=raw,readonly=on,file=OVMF_CODE.fd \\
  -drive if=pflash,format=raw,file=OVMF_VARS-1024x768.fd \\
  -device ich9-intel-hda -device hda-duplex \\
  -device ich9-ahci,id=sata \\
  -drive id=OpenCoreBoot,if=none,snapshot=on,format=qcow2,file=OpenCore.qcow2 \\
  -device ide-hd,bus=sata.2,drive=OpenCoreBoot \\
  -drive id=MacHDD,if=none,file=mac_hdd_ng.img,format=qcow2 \\
  -device ide-hd,bus=sata.4,drive=MacHDD \\
  -netdev user,id=net0 -device vmxnet3,netdev=net0,id=net0

# Storage: mac_hdd_ng.img — 64GB APFS, thin-provisioned qcow2 backing file
# SMC: osk key injected via isa-applesmc for Apple firmware validation`,
    },
  },
  {
    id: "kali-offensive-platform",
    name: "Kali Linux Offensive Platform",
    tagline: "Attacker-side platform for scanning and exploitation practice",
    os: "Kali Linux",
    specs: [
      { label: "Recon", value: "Network scanning across the isolated range" },
      { label: "Vulnerability Audits", value: "Nmap NSE scripts" },
      { label: "Verification", value: "Protocol verification against target VMs" },
    ],
    tags: ["Nmap", "NSE", "Offensive Security"],
    configLog: {
      filename: "smb-protocols-audit.log",
      content: `$ nmap -p445 --script smb-protocols,smb-security-mode 192.168.50.10-30

PORT    STATE SERVICE
445/tcp open  microsoft-ds
| smb-protocols:
|   dialects:
|     2.0.2
|     2.1
|_    3.1.1
| smb-security-mode:
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: required

Mitigation table
---------------------------------------------------------------
Finding                    Risk     Mitigation
---------------------------------------------------------------
SMBv1 not offered          -        Confirmed disabled (pass)
Signing required           -        Confirmed enforced (pass)
Guest fallback available   Medium   Disable guest auth on shares
---------------------------------------------------------------`,
    },
  },
];
