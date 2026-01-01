interface FilterSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const FilterSelect = ({ label, value, options, onChange }: FilterSelectProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground nav-text">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border border-border px-3 py-1.5 text-sm nav-text focus:outline-none focus:border-foreground transition-colors cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-background text-foreground">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
