import { Code2, Briefcase, TrendingUp, Layers } from 'lucide-react'

interface OverviewCard {
  icon: React.ReactNode
  title: string
  count?: string
  isLink?: boolean
}

const overviewData: OverviewCard[] = [
  {
    icon: <Code2 className="w-12 h-12" />,
    title: 'Backend Developer',
  },
  {
    icon: <Briefcase className="w-12 h-12" />,
    title: '5 Project\nExperiences',
    count: '5',
  },
  {
    icon: <TrendingUp className="w-12 h-12" />,
    title: 'SEO Knowledge',
  },
  {
    icon: <Layers className="w-12 h-12" />,
    title: 'View My\nTech Stack',
    isLink: true,
  },
]

export default function Overview() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">INTRODUCTION</p>
          <h2 className="text-4xl md:text-5xl font-bold">Overview.</h2>
        </div>

        <div className="mb-8">
          <p className="text-gray-300 leading-relaxed">
            I'm expertise in <span className="text-primary">Backend</span> Development. I have build{' '}
            <span className="text-primary">5 projects</span> experiences and excited to explore the{' '}
            <span className="text-primary">web 3 !</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewData.map((card, index) => (
            <div
              key={index}
              className={`glass-card !py-8 text-center flex flex-col items-center justify-center min-h-[160px] md:min-h-[200px] transition-all duration-300 ${
                card.isLink ? 'cursor-pointer hover:scale-105' : ''
              }`}
            >
              <div className={`mb-4 ${card.isLink ? 'text-gray-400' : 'text-primary'}`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold whitespace-pre-line">{card.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
