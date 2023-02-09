import Link from "next/link";
import {
  BiHome,
  BiRocket,
  BiBarChartAlt2,
  BiCertification,
  BiCircle,
} from "react-icons/bi";

export const Menu = () => {
  const feeds = [
    { page: "Home", loc: "/", icon: <BiHome /> },
    { page: "Popular", loc: "/popular", icon: <BiRocket /> },
    { page: "Top", loc: "/top", icon: <BiBarChartAlt2 /> },
    { page: "New", loc: "/new", icon: <BiCertification /> },
  ];

  // dummy data used for now, import database data here

  const communities = [
    { page: "sub1", loc: "/", icon: <BiCircle /> },
    { page: "sub2", loc: "/", icon: <BiCircle /> },
    { page: "sub3", loc: "/", icon: <BiCircle /> },
  ];

  return (
    <div className="hidden lg:flex flex-col w-full text-light-text">
      <h3 className="">Feeds</h3>
      <ul className="ml-4 my-2 mb-8">
        {feeds.map((feed) => {
          return (
            <Link href={feed.loc} key={feed.page}>
              <li className="flex items-center my-4">
                <div className="text-lg mr-4">{feed.icon}</div>
                {feed.page}
              </li>
            </Link>
          );
        })}
      </ul>
      <h3 className="">My Communities</h3>
      <ul className="ml-4 my-2 mb-8">
        {communities.map((com) => {
          return (
            <Link href={com.loc} key={com.page}>
              <li className="flex items-center my-4">
                <div className="text-lg mr-4">{com.icon}</div>
                {com.page}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
