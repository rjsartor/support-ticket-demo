import React from 'react';

type WithId = {
  id: React.Key;
};

type DataListProps<T extends WithId> = {
  data: T[];
  DataRow: any;
};

export default function DataList<T extends WithId>({ data, DataRow }: DataListProps<T>) {
  return (
    <div className="flex flex-col overflow-y-auto">
      {data.map((row) => <DataRow key={row.id} item={row} />)}
    </div>
  );
}