import React from 'react';
import StoryCard from './StoryCard';

const stories = [
  {
    name: 'sonny Sangha',
    src: 'https://links.papareact.com/zof',
    profile: 'https://links.papareact.com/l4v',
  },
  {
    name: 'Elon Musk',
    src: 'https://links.papareact.com/4zn',
    profile: 'https://links.papareact.com/kkk',
  },
  {
    name: 'Jeff Bezoz',
    src: 'https://links.papareact.com/k2j',
    profile: 'https://links.papareact.com/f0p',
  },
  {
    name: 'Mark Zuckerberg',
    src: 'https://links.papareact.com/xql',
    profile: 'https://links.papareact.com/snf',
  },
  {
    name: 'Bill Gate',
    src: 'https://links.papareact.com/4u4',
    profile: 'https://links.papareact.com/zvy',
  },
];

export default function Stories() {
  return (
    <div className="mx-auto flex justify-center space-x-3">
      {stories.map((story) => {
        return <StoryCard key={story.name} name={story.name} src={story.src} profile={story.profile} />;
      })}
    </div>
  );
}
