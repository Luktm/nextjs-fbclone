import Image from 'next/image';
import React from 'react';

interface Props {
  src?: string | null;
  Icon?: any | null;
  title?: string | null;
}

export default function SidebarRow({ src, Icon, title }: Props) {
  return (
    <div className="flex items-center space-x-2 p-4">
      {src && (
        <Image
          className="rounded-full"
          src={src}
          width={30}
          height={30}
          layout="fixed"
        />
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden font-medium sm:inline-flex">{title}</p>
    </div>
  );
}
