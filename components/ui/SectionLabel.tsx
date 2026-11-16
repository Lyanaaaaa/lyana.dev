export default function SectionLabel({ index, children, className = '' }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow ${className}`}>
      {'// '}
      {index && <>{index}. </>}
      {children}
    </p>
  )
}
