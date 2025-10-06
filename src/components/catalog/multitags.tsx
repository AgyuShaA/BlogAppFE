interface MultiSelectTagProps {
  label: string;
  options: Option[] | ColorOption[];
  selected: number[];
  setter: React.Dispatch<React.SetStateAction<number[]>>;
}

type Option = { id: number; name: string };
type ColorOption = { id: number; name: string; hex: string };

function isColorOption(o: Option | ColorOption): o is ColorOption {
  return (o as ColorOption).hex !== undefined;
}
export const MultiSelectTag = ({
  label,
  options,
  selected,
  setter,
}: MultiSelectTagProps) => {
  const availableOptions = options.filter((o) => !selected.includes(o.id));

  const toggleSelect = (id: number) => {
    setter([...selected, id]);
  };

  const removeTag = (id: number) => {
    setter(selected.filter((s) => s !== id));
  };

  return (
    <div>
      <label className="font-semibold mb-1 block">{label}</label>

      {/* Dropdown / Select */}
      <select
        onChange={(e) => toggleSelect(Number(e.target.value))}
        className="w-full border px-2 py-1 rounded mb-2"
        value=""
      >
        <option value="" disabled>
          Select {label}
        </option>
        {availableOptions.map((o) => (
          <option key={o.id} value={o.id}>
            {"hex" in o ? o.name + ` (${o.hex})` : o.name}
          </option>
        ))}
      </select>

      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2">
        {selected.map((id) => {
          const item = options.find((o) => o.id === id)!;
          const isColor = isColorOption(item);

          return (
            <div
              key={id}
              className={`flex items-center gap-1 px-2 py-1 rounded ${
                isColor ? "" : "bg-gray-200"
              }`}
              style={
                isColor ? { backgroundColor: item.hex, color: "#fff" } : {}
              }
            >
              <span>{item.name}</span>
              <button
                type="button"
                className="ml-1 text-xs font-bold"
                onClick={() => removeTag(id)}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
