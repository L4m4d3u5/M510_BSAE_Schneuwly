interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

export default function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className="stat-card" style={{ borderTopColor: color }}>
      <span className="stat-card__value" style={{ color }}>
        {value}
      </span>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}
