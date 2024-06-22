// components/TextInput.jsx
const TextInput = ({ label, type, id, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="shad-form_label mb-2">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="h-12 w-80 shad-input rounded-md px-4"
      />
    </div>
  );
};

export default TextInput;
