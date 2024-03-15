import React from 'react';

type WithId = {
  id: React.Key;
};

type DataListProps<T extends WithId> = {
  data: T[];
  DataRow: any;
};

// This is component meant to show how I try to create generic components where possible, 
// though in this case it's really just a flex container and the DataRow component is doing the heavy lifting.
// With more time I would flesh out the types of DataRow and explain better how it should be formatted
export default function DataList<T extends WithId>({ data, DataRow }: DataListProps<T>) {
  return (
    <div className="flex flex-col overflow-y-auto">
      {data.map((row) => <DataRow key={row.id} item={row} />)}
    </div>
  );
};