import ChatRoom from "../assets/images/chatroom-icon.png";
import ReadAStory from "../assets/images/read-a-story-icon.png";
import WriteAstory from "../assets/images/write-a-story-icon.png";
import disclaimerIcon from "../assets/images/disclaimer-icon.png";
import settingIcon from "../../src/assets/images/settings-submenu-icon-1.png";
import languageIcon from "../assets/images/language-icon.png";
import warningIcon from "../assets/images/warning-icon.png";
import settingIcon2 from "../assets/images/settings-submenu-icon-3.png";
import ad1 from "../assets/images/ads-submenu-icon-1.png";
import ad2 from "../assets/images/ads-submenu-icon-2.png";
import ad3 from "../assets/images/ads-submenu-icon-3.png";
import mail from "../assets/images/guide-submenu-icon-1.png";
import male from "../assets/images/guide-submenu-icon-2.png";
import refresh from "../assets/images/guide-submenu-icon-3.png";

export const CardData = [
  {
    image: ReadAStory,
    name: "readstory",
    height: "calc(100vh - 355px)",
    // marginTop:"23%",
    transition: {
      bottom: "bottom",
      left: "left",
    },
  },
  {
    image: WriteAstory,
    name: "writestory",
    height: "calc(100vh - 400px)",
    marginTop: "1.5%",
    transition: {
      top: "top",
      left: "left",
    },
  },
  {
    image: ChatRoom,
    name: "chartroom",
    height: "calc(100vh - 355px)",
    // marginTop:"23%",
    transition: {
      bottom: "bottom",
      left: "left",
    },
  },
];
export const CardSettingData = [
  {
    image: settingIcon,
    name: "settingsubmenu1",
    height: "calc(100vh - 400px)",
    // marginTop:"23%",
    transition: {
      bottom: "bottom",
      left: "left",
    },
  },
  {
    image: languageIcon,
    name: "settingsubmenu2",
    height: "calc(100vh - 450px)",
    marginTop: "1.5%",
    transition: {
      top: "top",
      left: "left",
    },
  },
  {
    image: settingIcon2,
    name: "settingsubmenu3",
    height: "calc(100vh - 400px)",
    // marginTop:"23%",
    transition: {
      bottom: "bottom",
      left: "left",
    },
  },
];

export const CardQuestionData = [
  {
    image: mail,
    name: "disclaimer",
    height: "calc(100vh - 345px)",
    // marginTop:"23%",
    transition: {
      bottom: "bottom",
      left: "left",
    },
  },
  {
    image: male,
    name: "language",
    height: "calc(100vh - 400px)",
    marginTop: "1.5%",
    transition: {
      bottom: "top",
      right: "right",
    },
  },
  {
    image: refresh,
    name: "warning",
    height: "calc(100vh - 345px)",
    // marginTop:"23%",
    transition: {
      bottom: "bottom",
      left: "left",
    },
  },
];

export const CardInitialData = [
  {
    image: disclaimerIcon,
    name: "disclaimer",
    height: "calc(100vh - 345px)",
    // marginTop:"23%",
    transition: {
      bottom: "bottom",
      left: "left",
    },
  },
  {
    image: languageIcon,
    name: "statistic",
    height: "calc(100vh - 400px)",
    marginTop: "1.5%",
    transition: {
      bottom: "top",
      right: "right",
    },
  },
  {
    image: warningIcon,
    name: "warning",
    height: "calc(100vh - 345px)",
    // marginTop:"23%",
    transition: {
      bottom: "bottom",
      left: "left",
    },
  },
];
export const CardAdsData = [
  {
    image: ad1,
    name: "disclaimer",
    height: "calc(100vh - 345px)",
    // marginTop:"23%",
    transition: {
      bottom: "bottom",
      left: "left",
    },
  },
  {
    image: ad2,
    name: "statistic",
    height: "calc(100vh - 400px)",
    marginTop: "1.5%",
    transition: {
      bottom: "top",
      right: "right",
    },
  },
  {
    image: ad3,
    name: "warning",
    height: "calc(100vh - 345px)",
    // marginTop:"23%",
    transition: {
      bottom: "bottom",
      left: "left",
    },
  },
];
