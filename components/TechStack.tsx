'use client'

import { Code2, Database, Server } from 'lucide-react'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface TechItem {
  name: string
  logo: string
  iconColor?: string
}

interface TechCategory {
  title: string
  items: TechItem[]
}

const techStackData = {
  frameworks: [
    { name: 'Laravel', logo: 'https://cdn.simpleicons.org/laravel/FF2D20', iconColor: '#FF2D20' },
    { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/white', iconColor: '#000000' },
    { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933', iconColor: '#339933' },
    { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB', iconColor: '#61DAFB' },
  ],
  languages: [
    { name: 'PHP', logo: 'https://cdn.simpleicons.org/php/777BB4', iconColor: '#777BB4' },
    { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6', iconColor: '#3178C6' },
    { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E', iconColor: '#F7DF1E' },
    { name: 'HTML/CSS', logo: 'https://cdn.simpleicons.org/html5/E34F26', iconColor: '#E34F26' },
  ],
  databases: [
    { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1', iconColor: '#4169E1' },
    { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/4479A1', iconColor: '#4479A1' },
    { name: 'Prisma ORM', logo: 'https://cdn.simpleicons.org/prisma/2D3748', iconColor: '#2D3748' },
  ],
  tools: [
    { name: 'tRPC', logo: 'https://cdn.simpleicons.org/trpc/2596BE', iconColor: '#2596BE' },
    { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', iconColor: '#06B6D4' },
    { name: 'Bootstrap', logo: 'https://cdn.simpleicons.org/bootstrap/7952B3', iconColor: '#7952B3' },
    { name: 'Billplz', logo: 'https://cdn.simpleicons.org/stripe/008CDD', iconColor: '#008CDD' },
  ],
}

export default function TechStack() {
  const ref = useScrollAnimation()
  const categories: TechCategory[] = [
    { title: 'Frontend', items: techStackData.frameworks.filter(f => ['Next.js', 'Node.js'].includes(f.name)) },
    { title: 'Backend', items: techStackData.frameworks.filter(f => ['Laravel', 'ASP.NET'].includes(f.name)) },
    { title: 'Database', items: techStackData.databases },
  ]

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2 animate-fade-in-down">
            PROGRAMMING LANGUAGES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold animate-fade-in-up delay-100">My Tech Stack.</h2>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-4 mb-12 flex-wrap animate-fade-in-up delay-200">
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
          <h3 className="text-xl font-semibold mb-6 uppercase tracking-wider text-gray-400 animate-fade-in-left delay-300">
            Frameworks & Libraries
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStackData.frameworks.map((tech, index) => {
              const delays = ['delay-300', 'delay-400', 'delay-500', 'delay-600']
              return (
              <div
                key={index}
                className={`glass-card p-8 flex flex-col items-center justify-center min-h-[160px] group hover:scale-105 transition-all duration-300 animate-scale-in ${delays[index]}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/50 transition-shadow p-3">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-center font-medium">{tech.name}</p>
              </div>
            )})}
          </div>
        </div>

        {/* Languages Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 uppercase tracking-wider text-gray-400 animate-fade-in-left delay-700">
            Languages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStackData.languages.map((tech, index) => {
              const delays = ['delay-700', 'delay-800', 'delay-100', 'delay-200']
              return (
              <div
                key={index}
                className={`glass-card p-8 flex flex-col items-center justify-center min-h-[160px] group hover:scale-105 transition-all duration-300 animate-scale-in ${delays[index]}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-shadow p-3">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-center font-medium">{tech.name}</p>
              </div>
            )})}
          </div>
        </div>

        {/* Databases Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 uppercase tracking-wider text-gray-400 animate-fade-in-left delay-300">
            Databases
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStackData.databases.map((tech, index) => {
              const delays = ['delay-300', 'delay-400', 'delay-500']
              return (
              <div
                key={index}
                className={`glass-card p-8 flex flex-col items-center justify-center min-h-[160px] group hover:scale-105 transition-all duration-300 animate-scale-in ${delays[index]}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-shadow p-3">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-center font-medium">{tech.name}</p>
              </div>
            )})}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6 uppercase tracking-wider text-gray-400 animate-fade-in-left delay-600">
            Tools & Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStackData.tools.map((tech, index) => {
              const delays = ['delay-600', 'delay-700', 'delay-800', 'delay-100']
              return (
              <div
                key={index}
                className={`glass-card p-8 flex flex-col items-center justify-center min-h-[160px] group hover:scale-105 transition-all duration-300 animate-scale-in ${delays[index]}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-shadow p-3">
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-center font-medium">{tech.name}</p>
              </div>
            )})}
          </div>
        </div>
      </div>
    </section>
  )
}
