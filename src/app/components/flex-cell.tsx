interface FlexCellProps {
  header: string;
  value: string;
  style?: any;
};

const FlexCell = ({ header, value, style }: FlexCellProps) => {
  const baseStyle = 'flex-1 flex-col p-4';
  const headerStyle = 'text-gray-400';
  const contentStyle = style ? style : 'text-gray-900';

  return (
    <div className={baseStyle}>
      <p className={`${contentStyle} text-lg`}>{value}</p>
      <p className={headerStyle}>{header}</p>
    </div>
  );
};

export default FlexCell;