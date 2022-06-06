import React from 'react';
import InputBox from './InputBox';
import Posts from './Posts';
import Stories from './Stories';

export default function Feed(): JSX.Element {
  return (
    // yarn add tailwind-scrollbar-hide and add it in tailwind.config.js
    <div className="mr-4 h-screen flex-grow overflow-y-auto pb-44 pt-6 xl:mr-40 scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-lg">
        <Stories />
        <InputBox />
        <Posts />
      </div>
    </div>
  );
}
