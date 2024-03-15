const Button = ({ label }: { label: string }) => (
  <button 
    type="submit"
    className="self-start py-3 px-4 mt-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-xs font-semibold"
  >
    {label}
  </button>
);

export default Button;