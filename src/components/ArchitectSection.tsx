import { BookOpen, Compass, GitBranch, ShieldCheck } from "lucide-react";
import ScrollRevealWrapper from "@/components/ScrollRevealWrapper";

const principles = [
  { icon: ShieldCheck, label: "Order before optimization", desc: "Understand, document, and make a system legible before changing it." },
  { icon: BookOpen, label: "Evidence before assertion", desc: "Use traceable information, clear criteria, and honest documentation." },
  { icon: GitBranch, label: "Continuity creates resilience", desc: "Preserve institutional context while preparing teams and systems for change." },
  { icon: Compass, label: "Knowledge into capability", desc: "Turn analysis into practical workflows, tools, and transferable know-how." },
];

const ArchitectSection = () => (
  <section id="architect" className="py-6 md:py-10 bg-background oil-texture relative scarlet-depth">
    <ScrollRevealWrapper className="container mx-auto px-4 max-w-5xl">
      <div className="flex items-end gap-3 mb-1">
        <h2 className="font-serif text-3xl md:text-4xl text-bone">Working Principles</h2>
        <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 border border-accent/40 text-accent rounded-sm bg-accent/5 mb-1">Professional method</span>
      </div>
      <p className="font-mono text-xs tracking-[0.2em] uppercase neon-text-cyan mb-5">Systems thinking · Governance · Execution</p>

      <div className="grid lg:grid-cols-[1fr_1.35fr] gap-5 items-start">
        <div className="glass-card p-5 md:p-7 relative rounded-sm circuit-border">
          <div className="absolute top-0 left-0 w-16 h-px bg-accent" />
          <div className="absolute top-0 left-0 h-16 w-px bg-accent" />
          <p className="text-sm md:text-base text-bone-dim leading-relaxed mb-4">
            I bridge archival rigor, operational delivery, and AI-assisted tooling. The goal is not complexity for its own sake, but systems that remain understandable, auditable, and useful when the environment changes.
          </p>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-aged-gold border-l-2 border-primary/50 pl-3">
            Preserve context · clarify structure · improve the next decision
          </p>
          <div className="absolute bottom-0 right-0 w-16 h-px bg-accent" />
          <div className="absolute bottom-0 right-0 h-16 w-px bg-accent" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {principles.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3 p-4 border border-border/60 rounded-sm bg-secondary/20 hover:border-accent/40 transition-colors">
              <Icon size={17} className="neon-text-gold shrink-0 mt-0.5" />
              <div><p className="font-mono text-[10px] tracking-wider uppercase text-bone mb-1">{label}</p><p className="text-xs text-bone-dim leading-relaxed">{desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </ScrollRevealWrapper>
  </section>
);

export default ArchitectSection;

