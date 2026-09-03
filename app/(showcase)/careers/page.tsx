"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Globe,
  TrendingUp,
  Users,
  UserCheck,
  Palette,
  Video,
  ArrowRight,
  Mail,
  X,
  CheckCircle2
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { agtpAssets } from "@/src/assets";
import {
  RevealHeading,
  RevealText,
  RevealButton,
  RevealEyebrow,
  RevealStagger
} from "@/components/ui/scroll-reveal";

export interface JobRole {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  subject: string;
  icon: any;
}

const jobRoles: JobRole[] = [
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    dept: "Creative & Brand Design",
    location: "Dubai Headquarters • On-site / Hybrid",
    type: "Full-Time",
    subject: "Graphic%20Designer",
    icon: Palette,
    description:
      "As our Graphic Designer, you will craft marketing collateral, vehicle catalog visuals, social media creatives, print and digital banners, and brand identity assets for our global automotive export markets across Africa, the Middle East, and worldwide.",
    responsibilities: [
      "Design vehicle showcase creatives, digital catalogs, and social media banners.",
      "Develop branding materials for automotive spare parts and freight logistics campaigns.",
      "Produce engaging social media graphics, flyers, and sales presentation decks.",
      "Collaborate with the video and sales teams to maintain a luxury, high-conversion visual standard."
    ],
    requirements: [
      "2+ years of graphic design experience (Adobe Photoshop, Illustrator, InDesign, Figma).",
      "Strong portfolio showcasing commercial branding, typography, and product marketing.",
      "Ability to manage multiple design deliverables with pixel-perfect attention to detail.",
      "Experience or passion for the automotive trading industry is a strong plus."
    ]
  },
  {
    id: "video-editor",
    title: "Professional Video Editor",
    dept: "Media & Video Production",
    location: "Dubai Headquarters • Full-Time",
    type: "Full-Time",
    subject: "Professional%20Video%20Editor",
    icon: Video,
    description:
      "Create high-impact video walkthroughs, vehicle showroom reels, customer delivery testimonials, and educational export guides for YouTube, Instagram, and web channels.",
    responsibilities: [
      "Edit dynamic vehicle review videos, yard walkthroughs, and customer testimonial stories.",
      "Perform color grading, sound design, motion graphics, and multi-language subtitle integration.",
      "Produce short-form reels for Instagram/TikTok and long-form YouTube export walkthroughs.",
      "Maintain organized project archives and collaborate with showroom camera operators."
    ],
    requirements: [
      "Proficiency in Adobe Premiere Pro, After Effects, DaVinci Resolve, or Final Cut Pro.",
      "Strong portfolio of commercial video editing, pacing, sound design, and color grading.",
      "Ability to deliver fast-turnaround video content for social and web platforms.",
      "A keen visual eye for luxury automotive framing and storytelling."
    ]
  },
  {
    id: "senior-accountant",
    title: "Senior Accountant",
    dept: "Finance & Accounting",
    location: "Dubai Headquarters • Full-Time",
    type: "Full-Time",
    subject: "Senior%20Accountant",
    icon: UserCheck,
    description:
      "Oversee trade accounting, multi-currency export invoicing, bank reconciliations, VAT filings, and financial reporting for large-scale international vehicle and spare parts shipments.",
    responsibilities: [
      "Manage general ledger, accounts payable/receivable, and international wire reconciliations.",
      "Coordinate UAE VAT compliance, corporate tax records, and external audits.",
      "Prepare monthly financial statements and export trade margin analysis.",
      "Work closely with banking partners and customs logistics coordinators."
    ],
    requirements: [
      "Bachelor's degree in Accounting/Finance or professional qualification (ACCA/CPA/CA).",
      "4+ years of accounting experience, preferably within trading, automotive, or export sectors.",
      "Strong knowledge of UAE VAT, corporate tax, and ERP accounting systems.",
      "High level of integrity, analytical mindset, and precision."
    ]
  }
];

/* ── Embedded Job Application Modal ── */
function JobApplicationModal({
  isOpen,
  onClose,
  role
}: {
  isOpen: boolean;
  onClose: () => void;
  role: JobRole | null;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");

  if (!isOpen || !role) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10 MB limit.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    const newAppId = `APP-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationId(newAppId);

    try {
      const existing = JSON.parse(localStorage.getItem("agtp_job_applications") || "[]");
      const record = {
        id: newAppId,
        roleId: role.id,
        roleTitle: role.title,
        ...formData,
        fileName: selectedFile ? selectedFile.name : "Not provided",
        submittedAt: new Date().toISOString(),
        status: "Received"
      };
      localStorage.setItem("agtp_job_applications", JSON.stringify([record, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      coverLetter: ""
    });
    setSelectedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#0b1329] border border-[#1e2b45] rounded-3xl max-w-2xl w-full p-7 sm:p-10 shadow-2xl relative text-white my-8 max-h-[92vh] flex flex-col">
        {/* Close Circular Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full border border-slate-700/80 bg-[#060c1c]/80 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800 flex items-center justify-center transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* Submission Confirmation Screen */
          <div className="text-center py-10 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-[#4361EE]/15 border border-[#4361EE]/30 text-[#5b7bf7] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Application Submitted!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for applying for the <strong className="text-white">{role.title}</strong> position at AGTP Group.
              </p>
            </div>

            <div className="bg-[#060c1c] border border-[#1e2b45] p-5 rounded-2xl text-left max-w-md mx-auto space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Application Reference:</span>
                <strong className="text-[#5b7bf7] font-mono text-sm">{confirmationId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Position:</span>
                <span className="text-white font-semibold">{role.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Applicant Name:</span>
                <span className="text-white font-semibold">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact Email:</span>
                <span className="text-white font-semibold">{formData.email}</span>
              </div>
              {selectedFile && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Attached Resume:</span>
                  <span className="text-emerald-400 font-semibold truncate max-w-[200px]">{selectedFile.name}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our Talent Acquisition team will review your qualifications and reach out to you shortly.
            </p>

            <div className="pt-3">
              <button
                type="button"
                className="w-full max-w-md font-bold bg-[#4361EE] hover:bg-[#3651D4] text-white py-3 rounded-full uppercase tracking-wider transition-colors"
                onClick={handleResetAndClose}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1 pr-1 custom-scrollbar">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#5b7bf7]">
              <span className="w-5 h-[2px] bg-[#4361EE] inline-block" />
              <span>CAREER APPLICATION</span>
            </div>

            {/* Main Heading */}
            <h2 className="mt-3 text-2xl sm:text-4xl font-black text-white tracking-tight">
              Apply for {role.title}
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="app-name" className="block text-xs font-bold text-slate-200">
                    Name *
                  </label>
                  <input
                    id="app-name"
                    required
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5 h-12 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="app-email" className="block text-xs font-bold text-slate-200">
                    Email *
                  </label>
                  <input
                    id="app-email"
                    required
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1.5 h-12 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Resume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="app-phone" className="block text-xs font-bold text-slate-200">
                    Phone *
                  </label>
                  <input
                    id="app-phone"
                    required
                    type="tel"
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1.5 h-12 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200">
                    Resume *
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.rtf,.txt,.jpg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="mt-1.5 h-12 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] px-2.5 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-lg bg-[#4361EE] hover:bg-[#3651D4] px-4 py-1.5 text-xs font-bold text-white transition-colors shrink-0"
                    >
                      Choose file
                    </button>
                    <span className="text-xs text-slate-400 truncate">
                      {selectedFile ? selectedFile.name : "No file chosen"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Allowed: PDF, DOC, DOCX, RTF, TXT, JPG and PNG. Maximum 10 MB.
                  </p>
                </div>
              </div>

              {/* Row 3: Cover letter */}
              <div>
                <label htmlFor="app-cover" className="block text-xs font-bold text-slate-200">
                  Cover letter *
                </label>
                <textarea
                  id="app-cover"
                  rows={6}
                  required
                  placeholder="Write your cover letter here..."
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[#1e2b45] bg-[#060c1c] p-4 text-sm text-white placeholder:text-slate-500 focus:border-[#4361EE] focus:outline-none resize-none transition-colors"
                />
              </div>

              {/* Row 4: Submit Button */}
              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#4361EE] hover:bg-[#3651D4] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                >
                  <span>Submit application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenRoleModal = (role: JobRole) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-0 pb-20 bg-[#060709] text-white">
      {/* ── 1. Hero Header Banner matching new design ── */}
      <PageHero
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "CAREERS" }
        ]}
        badge={{
          text: "CAREERS & OPPORTUNITIES"
        }}
        title="BUILD YOUR FUTURE WITH AGTP"
        subtitle="Join a growing global automotive company and build your career in vehicle exports, automotive parts, international trade, and global logistics from Dubai."
        imageSrc={agtpAssets.careersHero}
        imageAlt="Careers at AGTP Group"
      />

      {/* ── 2. WHY AGTP GROUP — Core Values Grid ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <RevealEyebrow>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-[1.5px] bg-[#F97316]" />
              WHY AGTP GROUP
            </div>
          </RevealEyebrow>

          <RevealHeading>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-sans">
              A Workplace Built for Growth
            </h2>
          </RevealHeading>

          <RevealText delay={120}>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We believe strong businesses are built by strong people — with integrity, accountability, continuous learning, and a commitment to doing great work.
            </p>
          </RevealText>
        </div>

        <RevealStagger staggerDelay={100} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Globe,
              tag: "Global Exposure",
              title: "Work Across Markets",
              desc: "Work in an international automotive business and gain hands-on experience across vehicles, spare parts, exports, and global trade."
            },
            {
              icon: TrendingUp,
              tag: "Real Growth",
              title: "Learn & Grow",
              desc: "Take on meaningful responsibilities, develop new skills, and grow with a company building its international presence."
            },
            {
              icon: Users,
              tag: "Team Culture",
              title: "People Who Support You",
              desc: "Work with a team that values collaboration, professionalism, accountability, and long-term success."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#102941] border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-[#F97316] transition-all duration-300 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] flex items-center justify-center">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 border border-slate-700/60 rounded-full px-3 py-1">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-xl font-black text-white pt-1">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 3. OPEN ROLES — Current Opportunities ─────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="space-y-3 mb-10">
          <RevealEyebrow>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-6 h-[1.5px] bg-[#F97316]" />
              OPEN ROLES
            </div>
          </RevealEyebrow>

          <RevealHeading>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-sans">
              Current Opportunities
            </h2>
          </RevealHeading>

          <RevealText delay={120}>
            <p className="text-xs sm:text-sm text-slate-400">
              Select an open opportunity below to view the role and apply online, or send your application directly via email.
            </p>
          </RevealText>
        </div>

        {/* Roles List */}
        <RevealStagger staggerDelay={80} className="space-y-4">
          {jobRoles.map((role) => (
            <div
              key={role.id}
              className="bg-[#102941] border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl hover:border-[#315671] transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-[#4361EE] flex items-center justify-center border border-slate-800 shrink-0">
                  <role.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{role.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-medium mt-0.5">
                    <span>{role.dept}</span>
                    <span>•</span>
                    <span>{role.location}</span>
                  </div>
                </div>
              </div>

              {/* Distinct Action Buttons: View Role (Modal) + Email Application (Mailto) */}
              <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleOpenRoleModal(role)}
                  className="rounded-full bg-[#4361EE] hover:bg-[#3651D4] text-white font-bold text-xs px-5 py-2.5 transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/25 hover:scale-105"
                >
                  <span>View role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`mailto:careers@agtpgroup.com?subject=Application%20for%20${role.subject}`}
                  className="rounded-full border border-slate-700 hover:border-slate-500 hover:bg-slate-800/80 text-slate-300 hover:text-white font-bold text-xs px-4 py-2.5 transition-all flex items-center gap-1.5"
                  title="Apply via email"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ── 4. DIDN'T FIND THE RIGHT FIT? Banner ─────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="relative bg-[#102941] border border-slate-800 rounded-3xl p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
          <ParallaxImage
            src={agtpAssets.careersHero}
            alt="Office Environment"
            overlayOpacity="opacity-45"
            speed={0.2}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#102941]/80 via-[#102941]/60 to-[#102941] z-10" />

          <div className="relative z-20 max-w-2xl mx-auto space-y-6">
            <RevealHeading>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight font-sans">
                DON’T SEE THE RIGHT OPPORTUNITY?
              </h2>
            </RevealHeading>

            <RevealText delay={120}>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We’re always looking for talented people to join our growing team. Send us your CV and tell us how you can contribute to AGTP Group.
              </p>
            </RevealText>

            <RevealButton delay={180}>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href="mailto:careers@agtpgroup.com?subject=General%20Application%20-%20CV%20Submission"
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white font-black text-xs px-8 py-3.5 rounded-full shadow-lg transition-all inline-flex items-center gap-2 hover:scale-105"
                >
                  <span>Send Your CV</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-white font-black text-xs px-8 py-3.5 rounded-full transition-all inline-flex items-center gap-2"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealButton>
          </div>
        </div>
      </section>

      {/* ── 5. Job Application Modal Matching Provided Design ─────────────────── */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={selectedRole}
      />
    </div>
  );
}
