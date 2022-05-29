import Image from 'next/image';
import React from 'react';

interface Props {
  name: string;
  src: string;
  profile: string;
}

export default function StoryCard({ name, src, profile }: Props) {
  return (
    <div className="overflow-x relative h-14 w-14 cursor-pointer p-3 md:h-20 md:w-20 lg:h-56 lg:w-32 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
      <Image
        className="absolute top-10 z-50 rounded-full opacity-0 lg:opacity-100"
        src={profile}
        width={40}
        height={40}
        layout="fixed"
        objectFit="cover"
      />
      {/* Use the filter utility to enable filters (in combination with other filter utilities like blur or grayscale), and the filter-none utility to remove filters. */}
      <Image
        src={src}
        className="rounded-full object-cover brightness-75 filter lg:rounded-3xl"
        layout="fill"
      />
    </div>
  );
}
