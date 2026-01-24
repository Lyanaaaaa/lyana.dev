import { Skill } from '@/types'

export default function Skills() {
  const skills: Skill[] = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs'],
    },
    {
      category: 'DevOps & Tools',
      items: ['Vercel', 'AWS', 'Docker', 'Git', 'CI/CD'],
    },
    {
      category: 'Specialties',
      items: ['API Integration', 'Payment Systems', 'Data Automation', 'Performance Optimization'],
    },
  ]

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="content">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skills & Tools
            </h2>
            <p className="text-xl text-gray-600">
              Technologies I use to solve problems
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Always learning and adapting to the right tool for the job
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}