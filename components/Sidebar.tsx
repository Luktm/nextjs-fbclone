import { useSession } from 'next-auth/react';
import React from 'react';

// install hero icon to use the features
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import SidebarRow from './SidebarRow';

export default function Sidebar(): JSX.Element {
  // useSession hook work with getSession, different is getSession can be call in server
  // to use session above, please wrap SeesionProvider at _app.tsx
  const { data, status } = useSession();
  
  return (
    <div className="max-w[600px] xl:min-w[300px] mt-5 p-2">
      <SidebarRow src={data?.user?.image} title={data?.user?.name} />
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  );
}
