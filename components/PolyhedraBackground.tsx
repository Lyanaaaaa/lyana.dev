'use client'

import { useEffect, useRef } from 'react'

export default function PolyhedraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const phi = (1 + Math.sqrt(5)) / 2
    const a = 1 / Math.sqrt(3)
    const b = a / phi
    const c = a * phi

    // Complete polyhedra definitions with ALL faces
    const polyhedra = {
      tetrahedron: {
        vertices: [
          [1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]
        ],
        faces: [
          [0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]
        ]
      },
      octahedron: {
        vertices: [
          [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]
        ],
        faces: [
          [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
          [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]
        ]
      },
      icosahedron: {
        vertices: [
          [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
          [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
          [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
        ],
        faces: [
          [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
          [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
          [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
          [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
        ]
      },
      cube: {
        vertices: [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ],
        faces: [
          [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
          [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5]
        ]
      }
    }

    // Particle system
    class Particle {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      life: number
      size: number

      constructor(x: number, y: number, z: number) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.12 + Math.random() * 0.08
        this.x = x
        this.y = y
        this.z = z
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.vz = (Math.random() - 0.5) * 0.08
        this.life = 1
        this.size = 0.6 + Math.random() * 0.3
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.z += this.vz
        this.vx *= 0.985
        this.vy *= 0.985
        this.life -= 0.01
      }
    }

    const particles: Particle[] = []
    let angleX = 0
    let angleY = 0
    let morphProgress = 0
    let currentShapeIndex = 0
    let targetShapeIndex = 1
    const shapeKeys = ['tetrahedron', 'octahedron', 'icosahedron', 'cube'] as const
    const scale = 95
    const centerX = window.innerWidth * 0.72
    const centerY = window.innerHeight * 0.52

    // Smooth easing with gentle acceleration
    function easeInOutQuart(t: number): number {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
    }

    // Normalize vertices to similar scale
    function normalizeVertices(vertices: number[][]): number[][] {
      const maxDist = Math.max(...vertices.map(v => 
        Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
      ))
      return vertices.map(v => [
        v[0] / maxDist,
        v[1] / maxDist,
        v[2] / maxDist
      ])
    }

    // Interpolate between shapes with matching vertex counts
    function lerpShape(shape1V: number[][], shape2V: number[][], t: number): number[][] {
      const s1 = normalizeVertices(shape1V)
      const s2 = normalizeVertices(shape2V)
      const count = Math.max(s1.length, s2.length)
      
      return Array.from({ length: count }, (_, i) => {
        const v1 = s1[i % s1.length]
        const v2 = s2[i % s2.length]
        const easedT = easeInOutQuart(t)
        
        return [
          v1[0] + (v2[0] - v1[0]) * easedT,
          v1[1] + (v2[1] - v1[1]) * easedT,
          v1[2] + (v2[2] - v1[2]) * easedT
        ]
      })
    }

    function rotateX(point: number[], angle: number) {
      const [x, y, z] = point
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [x, y * cos - z * sin, y * sin + z * cos]
    }

    function rotateY(point: number[], angle: number) {
      const [x, y, z] = point
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [x * cos + z * sin, y, -x * sin + z * cos]
    }

    function rotateZ(point: number[], angle: number) {
      const [x, y, z] = point
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [x * cos - y * sin, x * sin + y * cos, z]
    }

    function project(point: number[]) {
      const [x, y, z] = point
      const perspective = 700
      const factor = perspective / (perspective + z)
      return [
        centerX + x * factor * scale,
        centerY + y * factor * scale,
        z
      ]
    }

    function emitParticles(vertices: number[][]) {
      if (Math.random() > 0.88 && particles.length < 50) {
        const vertex = vertices[Math.floor(Math.random() * vertices.length)]
        particles.push(new Particle(vertex[0], vertex[1], vertex[2]))
      }
    }

    function animate() {
      if (!ctx || !canvas) return

      // Elegant trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Gentle rotation
      angleX += 0.0025
      angleY += 0.004
      const angleZ = Math.sin(angleY * 0.5) * 0.3

      // Smooth morphing with pause
      const pauseDuration = 0.15
      let morphSpeed = 0.0018
      
      if (morphProgress < pauseDuration || morphProgress > 1 - pauseDuration) {
        morphSpeed = 0.0004  // Very slow at endpoints
      }
      
      morphProgress += morphSpeed
      
      if (morphProgress >= 1) {
        morphProgress = 0
        currentShapeIndex = targetShapeIndex
        targetShapeIndex = (targetShapeIndex + 1) % shapeKeys.length
      }

      const t = easeInOutQuart(morphProgress)
      const currentPoly = polyhedra[shapeKeys[currentShapeIndex]]
      const targetPoly = polyhedra[shapeKeys[targetShapeIndex]]
      const morphedVertices = lerpShape(currentPoly.vertices, targetPoly.vertices, t)

      emitParticles(morphedVertices)

      // Transform vertices
      const transformed = morphedVertices.map(v => {
        let point = rotateX(v, angleX)
        point = rotateY(point, angleY)
        point = rotateZ(point, angleZ)
        return project(point)
      })

      // Use current shape's faces during first half, target during second half
      const activeFaces = t < 0.5 ? currentPoly.faces : targetPoly.faces

      // Calculate lighting
      const lightDir = [0.4, -0.6, 0.9]
      const lightMag = Math.sqrt(lightDir.reduce((sum, v) => sum + v * v, 0))
      const lightNorm = lightDir.map(v => v / lightMag)

      const facesWithData = activeFaces.map(face => {
        const validFace = face.filter(i => i < morphedVertices.length)
        if (validFace.length < 3) return null

        const v0 = morphedVertices[validFace[0]]
        const v1 = morphedVertices[validFace[1]]
        const v2 = morphedVertices[validFace[2]]

        const u = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]]
        const v = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]]
        const normal = [
          u[1] * v[2] - u[2] * v[1],
          u[2] * v[0] - u[0] * v[2],
          u[0] * v[1] - u[1] * v[0]
        ]
        const normalMag = Math.sqrt(normal.reduce((sum, n) => sum + n * n, 0))
        const normalNorm = normalMag > 0 ? normal.map(n => n / normalMag) : [0, 0, 1]

        const dotProduct = normalNorm.reduce((sum, n, i) => sum + n * lightNorm[i], 0)
        const lighting = Math.max(0.3, Math.min(1, dotProduct * 0.7 + 0.3))

        const avgZ = validFace.reduce((sum, i) => sum + transformed[i][2], 0) / validFace.length
        return { face: validFace, depth: avgZ, lighting }
      }).filter(Boolean) as Array<{ face: number[], depth: number, lighting: number }>
      
      facesWithData.sort((a, b) => a.depth - b.depth)

      // Draw faces with refined aesthetics
      facesWithData.forEach(({ face, depth, lighting }) => {
        const points = face.map(i => transformed[i])
        
        const depthFactor = Math.max(0.12, Math.min(0.45, (depth + 500) / 950))
        const opacity = depthFactor * (0.65 + lighting * 0.35)

        const centerX = points.reduce((sum, p) => sum + p[0], 0) / points.length
        const centerY = points.reduce((sum, p) => sum + p[1], 0) / points.length
        
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, scale * 0.9
        )

        const lum = 160 + lighting * 95
        gradient.addColorStop(0, `rgba(${lum}, ${lum + 30}, 255, ${opacity * 0.28})`)
        gradient.addColorStop(0.5, `rgba(103, 232, 249, ${opacity * 0.18})`)
        gradient.addColorStop(1, `rgba(6, 182, 212, ${opacity * 0.06})`)

        ctx.beginPath()
        ctx.moveTo(points[0][0], points[0][1])
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i][0], points[i][1])
        }
        ctx.closePath()

        ctx.fillStyle = gradient
        ctx.fill()

        // Elegant wireframe
        ctx.strokeStyle = `rgba(103, 232, 249, ${opacity * 0.45 * lighting})`
        ctx.lineWidth = 0.7
        ctx.shadowColor = 'rgba(103, 232, 249, 0.25)'
        ctx.shadowBlur = 6
        ctx.stroke()
        ctx.shadowBlur = 0

        // Subtle highlights on bright faces
        if (lighting > 0.8) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(lighting - 0.8) * 0.12})`
          ctx.lineWidth = 0.4
          ctx.stroke()
        }
      })

      // Refined vertex glow
      transformed.forEach(([x, y, z]) => {
        if (z > -280) {
          const depthFactor = (550 + z) / 800
          const size = depthFactor * 1.1
          const alpha = depthFactor * 0.35

          // Soft outer glow
          const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 4.5)
          glow.addColorStop(0, `rgba(220, 245, 255, ${alpha * 0.7})`)
          glow.addColorStop(0.3, `rgba(103, 232, 249, ${alpha * 0.4})`)
          glow.addColorStop(1, 'rgba(103, 232, 249, 0)')
          
          ctx.fillStyle = glow
          ctx.fillRect(x - size * 4.5, y - size * 4.5, size * 9, size * 9)

          // Minimal core
          ctx.beginPath()
          ctx.arc(x, y, size * 0.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`
          ctx.fill()
        }
      })

      // Elegant particle trails
      particles.forEach((particle, index) => {
        particle.update()
        
        if (particle.life <= 0) {
          particles.splice(index, 1)
          return
        }

        let point = rotateX([particle.x, particle.y, particle.z], angleX)
        point = rotateY(point, angleY)
        point = rotateZ(point, angleZ)
        const [x, y, z] = project(point)

        if (z > -380) {
          const depthFactor = (550 + z) / 930
          const size = particle.size * depthFactor * 0.8
          const alpha = particle.life * depthFactor * 0.45

          const particleGlow = ctx.createRadialGradient(x, y, 0, x, y, size * 3.5)
          particleGlow.addColorStop(0, `rgba(220, 245, 255, ${alpha})`)
          particleGlow.addColorStop(0.4, `rgba(103, 232, 249, ${alpha * 0.6})`)
          particleGlow.addColorStop(1, 'rgba(103, 232, 249, 0)')
          
          ctx.fillStyle = particleGlow
          ctx.fillRect(x - size * 3.5, y - size * 3.5, size * 7, size * 7)
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.68
      }}
    />
  )
}