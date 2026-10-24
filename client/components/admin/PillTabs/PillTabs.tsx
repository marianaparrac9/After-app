'use client';

interface PillOption {
  value: string;
  label: string;
}

interface PillTabsProps {
  options: PillOption[];
  selected: string;
  onSelect: (value: string) => void;
}

export const PillTabs = ({ options, selected, onSelect }: PillTabsProps) => {
  return (
    <div className="pills">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={option.value === selected ? 'pill pill--active' : 'pill'}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
