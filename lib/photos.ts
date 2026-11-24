export type PhotoCategory = "Community" | "Connections" | "Learning";

export interface Photo {
  id: number;
  src: string;
  filename: string;
  caption: string;
  alt: string;
  category: PhotoCategory;
  driveUrl: string;
  width: number;
  height: number;
  figmaNode: string;
  crop: { desktop: string; mobile: string };
  thumbnailHeight: { desktop: number; mobile: number };
}

// Shared sequence for the DOM, keyboard navigation and photo viewer.
export const photos: readonly Photo[] = [
  {
    id: 1,
    filename: "IMG_3090.jpg",
    caption: "Gathering in the atrium",
    category: "Community",
    alt: "Educators gather around tables in a bright school atrium.",
    driveId: "1AuUROxgO-xfCNYu5nrAQeIjxqknX2ox9",
    width: 5188,
    height: 2503,
    figmaNode: "98:1428",
    desktopHeight: 320,
    mobileHeight: 201,
  },
  {
    id: 2,
    filename: "IMG_3479.jpg",
    caption: "Sharing a screen, sharing ideas",
    category: "Connections",
    alt: "A colleague in a green shirt helps educators working together at a blue laptop.",
    driveId: "13xbYq5OK8YgQUPIV1eYazsXP_IQc8Cr8",
    width: 3231,
    height: 3296,
    figmaNode: "98:1432",
    desktopHeight: 520,
    mobileHeight: 320,
  },
  {
    id: 3,
    filename: "IMG_2828.jpg",
    caption: "Ideas taking shape",
    category: "Learning",
    alt: "An educator leads a workshop beside a whiteboard covered in colourful sticky notes.",
    driveId: "1zLrrGzAU9ZD3e3ke7NFEJcm8MI_A6b_u",
    width: 4010,
    height: 2695,
    figmaNode: "98:1436",
    desktopHeight: 420,
    mobileHeight: 252,
  },
  {
    id: 4,
    filename: "IMG_3370.jpg",
    caption: "A conversation by the windows",
    category: "Connections",
    alt: "Three educators share a conversation around a table by a classroom window.",
    driveId: "1ahm5BIJrAU7wg03L-CGw428faMnInN4n",
    width: 3667,
    height: 2949,
    figmaNode: "98:1440",
    desktopHeight: 420,
    mobileHeight: 252,
  },
  {
    id: 5,
    filename: "IMG_3582.jpg",
    caption: "Learning together in the library",
    category: "Learning",
    alt: "A facilitator addresses colleagues seated at tables in the school library.",
    driveId: "11l2gdafLyRvf2ora9geQke2AXdHTvC9N",
    width: 6000,
    height: 4000,
    figmaNode: "98:1444",
    desktopHeight: 420,
    mobileHeight: 252,
  },
  {
    id: 6,
    filename: "IMG_3364.jpg",
    caption: "A moment together",
    category: "Community",
    alt: "Three smiling colleagues stand together in front of a brick wall.",
    driveId: "1qbIXJmQ0tV5ykmJISzz8-ez4AfpW31Co",
    width: 2949,
    height: 2319,
    figmaNode: "98:1448",
    desktopHeight: 420,
    mobileHeight: 252,
  },
  {
    id: 7,
    filename: "IMG_3018.jpg",
    caption: "Sharing perspectives",
    category: "Learning",
    alt: "An educator shares her perspective at the front of a workshop.",
    driveId: "1K2p438ToRvIIIXpM7ZF-FCGnrym2eoXe",
    width: 4000,
    height: 3653,
    figmaNode: "98:1452",
    desktopHeight: 420,
    mobileHeight: 320,
  },
  {
    id: 8,
    filename: "IMG_3527.jpg",
    caption: "Conversation across the table",
    category: "Connections",
    alt: "Two educators talk across a table during a learning session.",
    driveId: "1UsaIMtFB7HvlpWknSRFifbhbGUztGubC",
    width: 3294,
    height: 1933,
    figmaNode: "98:1456",
    desktopHeight: 320,
    mobileHeight: 201,
  },
  {
    id: 9,
    filename: "IMG_2607.jpg",
    caption: "A closer look at the discussion",
    category: "Learning",
    alt: "An educator speaks to a colleague in a classroom lined with books and learning materials.",
    driveId: "1kNeAlK9f8DWrgpdpKCMq0JlvOxJTR6rS",
    width: 2277,
    height: 2481,
    figmaNode: "98:1460",
    desktopHeight: 520,
    mobileHeight: 380,
  },
  {
    id: 10,
    filename: "IMG_3468.jpg",
    caption: "Connecting over laptops",
    category: "Connections",
    alt: "Two smiling participants sit together at a table with their laptops open.",
    driveId: "1kDvTJ2IpjnUnzjxwB9ADz-jowx5EMpuu",
    width: 2285,
    height: 2224,
    figmaNode: "98:1464",
    desktopHeight: 420,
    mobileHeight: 320,
  },
  {
    id: 11,
    filename: "IMG_3398.jpg",
    caption: "Taking the microphone",
    category: "Learning",
    alt: "A workshop speaker holds a microphone beside her presentation laptop.",
    driveId: "1ceK_yK7hAM96niJ3fGD6qaAPkQ_xJe_M",
    width: 1620,
    height: 1964,
    figmaNode: "98:1468",
    desktopHeight: 520,
    mobileHeight: 380,
  },
  {
    id: 12,
    filename: "SJ8A2880.jpg",
    caption: "Connections in the hallway",
    category: "Community",
    alt: "Colleagues gather in small groups and talk in a busy school hallway.",
    driveId: "1T9xGGhK8D6K32EujDS9hlMGHxSmx0zjk",
    width: 5998,
    height: 4640,
    figmaNode: "98:1472",
    desktopHeight: 420,
    mobileHeight: 252,
  },
].map(({ driveId, desktopHeight, mobileHeight, ...photo }) => ({
  ...photo,
  category: photo.category as PhotoCategory,
  src: `/images/j2e/${photo.filename}`,
  driveUrl: `https://drive.google.com/file/d/${driveId}/view?usp=drivesdk`,
  crop: {
    desktop: [9, 10, 11].includes(photo.id) ? "center top" : "center center",
    mobile: photo.id === 11 ? "center top" : "center center",
  },
  thumbnailHeight: { desktop: desktopHeight, mobile: mobileHeight },
}));

export const homeMoments = [
  {
    photo: photos[6],
    category: "01 / FRESH PERSPECTIVES",
    title: "A different point of view.",
  },
  {
    photo: photos[1],
    category: "02 / SHARED DISCOVERY",
    title: "Better, together.",
  },
  {
    photo: photos[2],
    category: "03 / PRACTICAL IDEAS",
    title: "From conversation to action.",
  },
  {
    photo: photos[4],
    category: "04 / OUR COMMUNITY",
    title: "Learning in good company.",
  },
] as const;
