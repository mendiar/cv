import { useEffect } from "react";

const ContactForm = () => {
  useEffect(() => {
    const tallyWindow = window as Window & {
      Tally?: { loadEmbeds?: () => void };
    };
    const scriptSrc = "https://tally.so/widgets/embed.js";

    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.onload = () => tallyWindow.Tally?.loadEmbeds?.();
      document.body.appendChild(script);
    }

    if (tallyWindow.Tally) {
      tallyWindow.Tally?.loadEmbeds?.();
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto w-full px-4 glass-card circuit-border rounded-sm py-6 md:py-8 min-w-0">
      <h3 className="font-serif tracking-tight text-3xl md:text-4xl text-bone mb-2">
        Send a Message or Document
      </h3>
      <p className="text-sm text-bone-dim mb-6">
        Anonymous by default. Attach files up to 10 MB each (PDF, DOCX, JPG, PNG).
      </p>
      <iframe
        data-tally-src="https://tally.so/embed/Eqq0WA?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
        loading="lazy"
        width="100%"
        height="748"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Send a message or document"
      />
    </div>
  );
};

export default ContactForm;
