import Home from "@pages/Home";
import Explore from "@pages/Explore";
import Messages from "@pages/Messages";

export const ROUTES = {
  HOME: {
    PATH: '/home',
    page: Explore,
    isPublic: false,
    menuItem: {
      iconName: "HomeOutlined",
      iconActive: "Home",
      text: 'Home',
    }
  },
  EXPLORE: {
    PATH: '/explore',
    page: Explore,
    isPublic: true,
    menuItem: {
      iconName: "ExploreOutlined",
      iconActive: "Explore",
      text: 'Explorer',
    }
  },
  NOTIFICATION: {
    PATH: '/notifications',
    page: Explore,
    isPublic: false,
    menuItem: {
      iconName: "NotificationsOutlined",
      iconActive: "Notifications",
      text: 'Notifications',
    }
  },
  MESSAGES: {
    PATH: 'MESSAGES',
    page: Explore,
    isPublic: false,
    menuItem: {
      iconName: "MailOutlineOutlined",
      iconActive: "Mail",
      text: 'Messages',
    }
  },
  BOOKMARKS: {
    PATH: "/bookmarks",
    page: Explore,
    isPublic: false,
    menuItem: {
      iconName: "BookmarkBorderOutlined",
      iconActive: "Bookmark",
      text: 'Bookmarks',
    }
  },
  LIST: {
    PATH: "/lists",
    page: Explore,
    isPublic: false,
    menuItem: {
      iconName: "ArticleOutlined",
      iconActive: "Article",
      text: 'Lists',
    }
  },
  PROFILE: {
    PATH: "/profile",
    page: Explore,
    isPublic: false,
    menuItem: {
      iconName: "PersonOutlined",
      iconActive: "Person",
      text: 'Profile',
    }
  }
}


export const getRoutes = (authorized) => {
  return Object.keys(ROUTES).reduce((acc, key) => {
    const res = {
      path: ROUTES[key].PATH,
      page: ROUTES[key].page,
    }
    if (authorized) {
      acc.push(res);
    } else if (ROUTES[key].isPublic) {
      acc.push(res);
    }
    return acc;
  }, []);
}

export const getMenuItems = (authorized) => {
  return Object.keys(ROUTES).reduce((acc, key) => {
    const res = {
      path: ROUTES[key].PATH,
      iconName: ROUTES[key].menuItem.iconName,
      iconActive: ROUTES[key].menuItem.iconActive,
      text: ROUTES[key].menuItem.text,
    }
    if (authorized) {
      acc.push(res);
    } else if (ROUTES[key].isPublic) {
      acc.push(res);
    }
    return acc;
  }, []);
}
