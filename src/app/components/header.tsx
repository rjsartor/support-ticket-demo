interface HeaderSubheaderProps {
  header: string;
  subheader?: string;
};

export default function Header({ header, subheader }: HeaderSubheaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-xl font-semibold text-gray-700">{header}</h1>
      {subheader && <p className="text-gray-600">{subheader}</p>}
    </header>
  )
};