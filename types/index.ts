export interface Project {
    id: string
    title: string
    category: string
    problem: string
    solution: string
    impact: string[]
    tech: string[]
    image?: string
    link?: string
  }
  
  export interface Skill {
    category: string
    items: string[]
  }