import { Code2, Database, Server } from 'lucide-react'

interface TechItem {
  name: string
  icon?: string
}

interface TechCategory {
  title: string
  items: TechItem[]
}

const techStackData = {
  frameworks: [
    { name: 'Laravel', icon: 'L' },
    { name: 'ASP.NET', icon: '.NET' },
    { name: 'Node.js', icon: 'N' },
    { name: 'Next.js', icon: 'N' },
  ],
  languages: [
    { name: 'PHP', icon: 'PHP' },
    { name: 'C#', icon: 'C#' },
  ],
  databases: [
    { name: 'MySQL', icon: 'My' },
    { name: 'MongoDB', icon: 'M' },
    { name: 'PostgreSQL', icon: 'P' },
  ],
}

export default function TechStack() {
  const categories: TechCategory[] = [
    { title: 'Frontend', items: techStackData.frameworks.filter(f => ['Next.js', 'Node.js'].includes(f.name)) },
    { title: 'Backend', items: techStackData.frameworks.filter(f => ['Laravel', 'ASP.NET'].includes(f.name)) },
    { title: 'Database', items: techStackData.databases },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">
            PROGRAMMING LANGUAGES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">My Tech Stack.</h2>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-4 mb-12 flex-wrap">
          <button className="px-6 py-2 rounded-lg font-medium bg-primary text-dark-900">
            Frontend
          </button>
          <button className="px-6 py-2 rounded-lg font-medium bg-dark-800 text-gray-300 hover:bg-dark-700 transition-colors">
            Backend
          </button>
          <button className="px-6 py-2 rounded-lg font-medium bg-dark-800 text-gray-300 hover:bg-dark-700 transition-colors">
            Database
          </button>
        </div>

        {/* Frameworks Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 uppercase tracking-wider text-gray-400">
            Frameworks
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStackData.frameworks.map((tech, index) => (
              <div
                key={index}
                className="glass-card p-8 flex flex-col items-center justify-center min-h-[160px] group hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-lg flex items-center justify-center mb-4 text-2xl font-bold text-white group-hover:shadow-lg group-hover:shadow-primary/50 transition-shadow">
                  {tech.icon}
                </div>
                <p className="text-center font-medium">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6 uppercase tracking-wider text-gray-400">
            Languages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStackData.languages.map((tech, index) => (
              <div
                key={index}
                className="glass-card p-8 flex flex-col items-center justify-center min-h-[160px] group hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 text-2xl font-bold text-white group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                  {tech.icon}
                </div>
                <p className="text-center font-medium">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
