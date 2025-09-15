import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { EditIcon, Trash2Icon } from 'lucide-react';

interface DataListProps<T> {
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  renderItem: (item: T) => React.ReactNode;
  getItemId: (item: T) => string;
  emptyMessage?: string;
}

export function DataList<T>({
  data,
  onEdit,
  onDelete,
  renderItem,
  getItemId,
  emptyMessage = "No data available"
}: DataListProps<T>) {
  if (data.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6 text-center text-gray-500">
          {emptyMessage}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <Card key={getItemId(item)} className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {renderItem(item)}
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item)}
                  className="border-[#913472] text-[#913472] hover:bg-[#913472] hover:text-white"
                >
                  <EditIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(getItemId(item))}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}