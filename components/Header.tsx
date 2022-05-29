import React from 'react';
import Image from 'next/image';

// https://github.com/tailwindlabs/heroicons
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import HeaderIcon from './HeaderIcon';
import { signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';

export default function Header(): JSX.Element {
  const { data } = useSession();

return (
    <header>
      <div className="sticky top-0 z-50 flex items-center bg-white p-2 shadow-md lg:px-5">
        {/* Left */}
        <div className="flex items-center">
          <Image
            src="https://links.papareact.com/5me"
            width={40}
            height={40}
            layout="fixed"
          />
          <div className="ml-2 flex items-center rounded-full bg-gray-100 p-2">
            <SearchIcon className="h-6 text-gray-600" />
            <input
              className="ml-2 hidden flex-shrink items-center bg-transparent placeholder-gray-500 outline-none md:inline-flex"
              type="text"
              placeholder="Search Facebook"
            />
          </div>
        </div>

        {/* Center */}
        <div className="flex flex-grow justify-center">
          {/* if we didn't set md or reponsive, it always view in mobile first */}
          <div className="flex space-x-6 md:space-x-2">
            <HeaderIcon active Icon={HomeIcon} />
            <HeaderIcon Icon={FlagIcon} />
            <HeaderIcon Icon={PlayIcon} />
            <HeaderIcon Icon={ShoppingCartIcon} />
            <HeaderIcon Icon={UserGroupIcon} />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end sm:space-x-2">
          {/* Profile pic */}
          <img
            onClick={() => signOut()}
            className="cursor-pointer rounded-full"
            src={data?.user?.image ?? "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"}
            width="40"
            height="40"
          />

          <p className="whitespace-nowrap pr-3 font-semibold">{data?.user?.name}</p>
          <ViewGridIcon className="icon" />
          <ChatIcon className="icon" />
          <BellIcon className="icon" />
          <ChevronDownIcon className="icon" />
        </div>
      </div>
    </header>
  );
}
