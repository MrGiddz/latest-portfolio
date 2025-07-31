import React from "react";

const Highlight = ({
  children,
  color = "text-cyan-400",
}: {
  children: React.ReactNode;
  color?: string;
}) => {
  return <span className={`${color} font-medium`}>{children}</span>;
};

// The new AboutContent component with inline syntax highlighting
const AboutContent = () => (
  <div className="space-y-6">
    <p className="text-gray-300 leading-relaxed">
      Hey there, I&apos;m Olaniyi Gideon Olamide — a{" "}
      <Highlight color="text-purple-400">full-stack developer</Highlight> with
      a strong focus on{" "}
      <Highlight color="text-yellow-400">backend architecture</Highlight> and{" "}
      <Highlight color="text-yellow-400">system reliability</Highlight>. With
      over 5 years of experience, I specialize in building{" "}
      <Highlight color="text-yellow-400">scalable web applications</Highlight>{" "}
      using technologies like <Highlight>Node.js</Highlight>,{" "}
      <Highlight>Express</Highlight>, <Highlight>MongoDB</Highlight>,{" "}
      <Highlight>React</Highlight>, and <Highlight>Next.js</Highlight>.
    </p>
    <p className="text-gray-300 leading-relaxed">
      I&apos;m passionate about turning complex ideas into{" "}
      <Highlight color="text-yellow-400">
        functional digital products
      </Highlight>
      . Whether I&apos;m designing robust <Highlight>APIs</Highlight>, managing{" "}
      <Highlight>cloud deployments</Highlight>, or mentoring teams, I aim to
      deliver{" "}
      <Highlight color="text-yellow-400">clean, maintainable code</Highlight>{" "}
      and long-term value. My work spans across industries like e-learning,
      event management, and SaaS platforms — always focused on{" "}
      <Highlight color="text-green-400">performance</Highlight>,{" "}
      <Highlight color="text-green-400">usability</Highlight>, and{" "}
      <Highlight color="text-green-400">business impact</Highlight>.
    </p>
    <p className="text-gray-300 leading-relaxed">
      I enjoy collaborating with{" "}
      <Highlight color="text-purple-400">product teams</Highlight>,{" "}
      <Highlight color="text-purple-400">shipping features fast</Highlight>,
      and{" "}
      <Highlight color="text-purple-400">continuously learning</Highlight>. If
      I&apos;m not coding, you&apos;ll find me creating tech videos, exploring
      new frameworks, or simplifying systems that scale.
    </p>
  </div>
);

// --- Content for Experience Section (Moved from the old file) ---
const experienceData = [
  {
    role: "Frontend/Full Stack Developer",
    company: "ShockMedia Nigeria Limited",
    location: "Ikoyi, Lagos, Nigeria",
    date: "Aug 2022 - Present",
  },
  {
    role: "IT Manager - University of Lagos",
    company: "Houses and Conference Centre",
    location: "Yaba, Lagos, Nigeria",
    date: "Feb 2022 - Aug 2022",
  },
  {
    role: "Full Stack Software Engineer",
    company: "Ventech457 Limited",
    location: "Maryland, Lagos State, Nigeria",
    date: "July 2021 - Jan 2022",
  },
  {
    role: "Full Stack Developer",
    company: "VochWave Technologies",
    location: "Maryland, Lagos State, Nigeria",
    date: "Oct 2020 - June 2021",
  },
];

const ExperienceContent = () => (
  <div className="space-y-8">
    {experienceData.map((job, index) => (
      <div key={index} className="space-y-2">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div>
            <h3 className="text-white font-semibold">{job.role}</h3>
            <p className="text-blue-300">{job.company}</p>
            <p className="text-gray-400 text-sm">{job.location}</p>
          </div>
          <span className="text-gray-400 text-sm mt-2 sm:mt-0">
            {job.date}
          </span>
        </div>
      </div>
    ))}
  </div>
);


export default function HomePage() {
  return (

    <div className="min-h-screen w-full p-6 md:p-10">
      {/* STEP 2: Add mx-auto to the inner card for horizontal centering */}
      <div className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl my-24">
        {/* About Me Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
            About Me
          </h2>
          <AboutContent />
        </section>

        {/* Divider */}
        <hr className="my-12 border-gray-600/50" />

        {/* Experience Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
            Experience
          </h2>
          <ExperienceContent />
        </section>
      </div>
    </div>
  );
}