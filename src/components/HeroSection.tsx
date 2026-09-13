import heroBg from "@/assets/hero-bg.jpg";
import portrait from "@/assets/diego-portrait.jpg";

const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "6", label: "Industry sectors" },
  { value: "C1", label: "English proficiency" },
  { value: "20K+", label: "Records processed" },
];

const chips = [
  "Operations",
  "Information Governance",
  "Records Management",
  "AI-Assisted Automation",
  "Compliance",
  "Bilingual EN / ES",
];

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0 energy-beams">
    <div className="energy-beam-extra" />
    <div className="energy-beam-extra-2" />
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/90 to-background" />
    </div>

    <div className="relative z-10 container mx-auto px-4 max-w-6xl py-8 md:py-0">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="relative shrink-0 w-[120px] h-[120px] md:w-64 md:h-64">
          <div className="absolute -inset-4 md:-inset-6 rounded-full border border-primary/20 animate-spin-ring" />
          <div className="absolute -inset-2 md:-inset-3 rounded-full border border-accent/15 animate-spin-ring-reverse" />
          <div className="absolute -inset-4 md:-inset-6 animate-spin-ring">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rotate-45 shadow-[0_0_6px_hsl(43_90%_55%_/_0.6)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-primary rotate-45 shadow-[0_0_6px_hsl(43_90%_55%_/_0.6)]" />
          </div>
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[hsl(185_100%_42%_/_0.2)] via-transparent to-[hsl(43_90%_55%_/_0.15)] blur-xl opacity-70" />
          <div className="relative w-full h-full rounded-full overflow-hidden border border-[hsl(185_100%_42%_/_0.25)] shadow-[0_0_30px_hsl(185_100%_42%_/_0.15),0_0_60px_hsl(43_90%_55%_/_0.08)]">
            <img src={portrait} alt="Diego Armando Méndez" className="w-full h-full object-cover" style={{ filter: "contrast(1.15) brightness(0.85) saturate(0.1)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 70% at 50% 45%, transparent 30%, hsl(0 0% 0% / 0.7) 70%, hsl(0 0% 0%) 100%)" }} />
            <div className="absolute inset-0 mix-blend-soft-light" style={{ background: "radial-gradient(ellipse 50% 50% at 55% 40%, hsl(185 100% 42% / 0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 45% 50%, hsl(43 90% 55% / 0.1) 0%, transparent 60%)" }} />
          </div>
        </div>

        <div className="text-center md:text-left flex-1">
          <div className="mx-auto md:mx-0 mb-6 h-px w-24 animate-line-expand" style={{ background: "linear-gradient(90deg, transparent, hsl(185 100% 50%), transparent)" }} />
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase neon-text-cyan mb-3 animate-fade-in">Bilingual Operations &amp; Information Systems Specialist</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold tracking-wider text-bone mb-4 md:mb-6 animate-fade-in">DIEGO ARMANDO MÉNDEZ</h1>
          <div className="h-px w-full mb-5" style={{ background: "linear-gradient(90deg, transparent 5%, hsl(0 100% 50% / 0.8) 30%, hsl(14 100% 57%) 50%, hsl(0 100% 50% / 0.8) 70%, transparent 95%)", boxShadow: "0 0 4px hsl(0 100% 50% / 0.5)" }} />

          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6 animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
            {chips.map((chip) => <span key={chip} className="font-mono text-[9px] sm:text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 border border-accent/30 text-accent rounded-sm bg-accent/5 hover:border-accent/60 hover:bg-accent/10 transition-all">{chip}</span>)}
          </div>

          <p className="font-sans text-sm md:text-base text-bone-dim leading-relaxed max-w-3xl mb-5 md:mb-6 animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            I design clear, auditable operations across regulated environments, connecting records management, customer lifecycle work, compliance, and AI-assisted process improvement. My approach is grounded in a simple principle: preserve context, make systems legible, and turn knowledge into practical capability.
          </p>
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.16em] uppercase text-aged-gold mb-7 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
            The past illuminates the future · El pasado ilumina el porvenir
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 mb-7 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
            {stats.map((s) => <div key={s.label} className="text-center md:text-left"><span className="block font-serif text-xl sm:text-2xl neon-text-gold">{s.value}</span><span className="font-mono text-[8px] sm:text-[9px] tracking-[0.12em] uppercase text-bone-dim">{s.label}</span></div>)}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: "0.7s", opacity: 0 }}>
            <a href="#forge" className="btn-terminal btn-terminal-gold">View professional record</a>
            <a href="/Diego_Armando_Mendez_Resume.pdf" download className="btn-terminal">Download ATS resume</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;

