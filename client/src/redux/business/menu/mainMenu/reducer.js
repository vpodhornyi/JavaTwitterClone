const testColor = '#000000';

const INIT = {
  navItems: [
    {
      iconName: "HomeOutlined",
      iconActive: "Home",
      text: 'Home',
      href: '/home'
    },
    {
      iconName: "ExploreOutlined",
      iconActive: "Explore",
      text: 'Explorer',
      href: '/explore'
    },
    {
      iconName: "NotificationsOutlined",
      iconActive: "Notifications",
      text: 'Notifications',
      href: '/notifications'
    },
    {
      iconName: "MailOutlineOutlined",
      iconActive: "Mail",
      text: 'Messages',
      href: '/messages'
    },
    {
      iconName: "BookmarkBorderOutlined",
      iconActive: "Bookmark",
      text: 'Bookmarks',
      href: '/bookmarks'
    },
    {
      iconName: "ArticleOutlined",
      iconActive: "Article",
      text: 'Lists',
      href: '/lists'
    },
    {
      iconName: "PersonOutlined",
      iconActive: "Person",
      text: 'Profile',
      href: '/vpodhornyi'
    },
  ],
  more: {
    iconName: "MoreHoriz",
    text: 'More',
    children: []
  }
};

export default (state = INIT) => state;
