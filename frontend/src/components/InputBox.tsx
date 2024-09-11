import { ReactNode } from "react";

interface InputBoxProps {
    field: ReactNode;
    holder: string;
    value : string;  
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox: React.FC<InputBoxProps> = ({ field, holder,onChange,value }) => {
  return (
    <div className="text-sm font-medium text-left py-2">
      <label className="block mb-1">{field}</label>
      <input
        type="text"
        className="w-full px-2 py-1 border rounded border-slate-400"
        placeholder={holder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
