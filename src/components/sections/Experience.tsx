export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <h2 className="text-5xl font-semibold tracking-tight mb-12">Experience</h2>
      
      <div className="space-y-12">
        <div className="border-l-2 border-primary pl-8">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
            <h3 className="text-2xl font-semibold">Senior Fullstack Engineer</h3>
            <span className="text-muted-foreground">• Company Name</span>
          </div>
          <p className="text-muted-foreground">2024 — Present</p>
          <ul className="mt-4 list-disc list-outside pl-5 space-y-2 text-muted-foreground">
            <li>Built scalable web applications using Next.js and TypeScript</li>
            <li>Designed and implemented modern UI systems</li>
            <li>Improved application performance by 40%</li>
          </ul>
        </div>

        {/* Add more experience blocks here later */}
      </div>
    </section>
  );
}