interface ListCardProps {
  label?: string;
  list: string[];
}

export function ListCard({ label, list }: ListCardProps) {
  return (
    <div className="grid gap-1">
      <label className="font-bold">{label}</label>
      {list.length > 0 ? <div className="flex flex-wrap text-sm text-white gap-2">
        {list.map((val, i) => (
          <span key={i} className="px-2 py-0.5 bg-decor-primary rounded-lg">
            {val}
          </span>
        ))}
      </div> : <span>None</span>}
    </div>
  );
}
