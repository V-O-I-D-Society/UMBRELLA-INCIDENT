import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-4 border-t border-gray-700 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-mono text-red-400 mb-4">
              UMBRELLA CORPORATION
            </h3>
            <p className="text-gray-400 text-sm font-mono leading-relaxed">
              "Our business is life itself." Advancing human evolution through
              pharmaceutical excellence and biotechnology innovation.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-mono text-blue-400 mb-4">
              SECURE CHANNELS
            </h3>
            <div className="space-y-2">
              <a
                href="https://forms.gle/iGkx8ENEA25updMj8"
                target="_blank"
                className="block text-gray-400 hover:text-white font-mono text-sm transition-colors"
              >
                [ENCRYPTED] Register Now
              </a>
              <a
                href="https://discord.gg/59dsVSSF"
                target="_blank"
                className="block text-gray-400 hover:text-white font-mono text-sm transition-colors"
              >
                [CLASSIFIED] Join Discord
              </a>
              <a
                href="mailto:cybersecurex@kiet.edu"
                target="_blank"
                className="block text-gray-400 hover:text-white font-mono text-sm transition-colors"
              >
                [SECURE] Mail Us
              </a>
                <a
                href="tel:+918126158522"
                target="_blank"
                className="block text-gray-400 hover:text-white font-mono text-sm transition-colors"
                >
                [PRIORITY] Call Us
                </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-mono text-white mb-4">
              LEGAL DISCLAIMER
            </h3>
            <p className="text-gray-500 text-xs font-mono leading-relaxed">
              Participation in Umbrella Corporation events may result in
              exposure to experimental substances. All participants waive rights
              to legal action. Umbrella Corp. is not liable for mutation,
              infection, or death.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-500 font-mono text-sm">
            © 2025 <a href="https://github.com/Nemesis-AS" target="_blank" className="text-lime-400 text-underline">NemesisAS</a>. & <a href="https://github.com/soul-abhi" target="_blank" className="text-lime-400 text-underline">Soul Abhi</a>. All rights reserved. | Classification
            Level: ALPHA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
