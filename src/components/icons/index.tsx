import {
  Gitlab,
  Linkedin,
  LucideIcon,
  LucideProps,
  Twitter,
  Youtube,
  Facebook,
  Twitch,
  Codepen,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  gitlab: Gitlab,
  twitch: Twitch,
  codepen: Codepen,
  devto: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      {...props}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          d="M12.25 0h-8.5A3.75 3.75 0 0 0 0 3.75v8.5A3.75 3.75 0 0 0 3.75 16h8.5A3.75 3.75 0 0 0 16 12.25v-8.5A3.75 3.75 0 0 0 12.25 0Z"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M5.46 9.201c0 .639-.393 1.606-1.638 1.604H2.25V5.188h1.605c1.201 0 1.605.966 1.606 1.605V9.2ZM3.912 6.24c.132 0 .264.049.395.147.131.099.197.247.198.444v2.365c0 .197-.066.345-.197.443a.657.657 0 0 1-.395.148H3.32V6.239h.591Z"
          clipRule="evenodd"
        />
        <path
          fill="currentColor"
          d="M8.872 6.19H7.067v1.305h1.104V8.5H7.067v1.304h1.806v1.004H6.766a.685.685 0 0 1-.702-.668V5.89a.686.686 0 0 1 .668-.703h2.14v1.003Zm3.512 3.915c-.447 1.044-1.248.836-1.607 0L9.47 5.19h1.104l1.007 3.861 1.001-3.861h1.104l-1.303 4.916Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  frontendmentor: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
    >
      <path
        fill="currentColor"
        d="M15.512 8.388a.45.45 0 0 1-.2-.047l-4.188-2.098a.5.5 0 0 1-.21-.202.6.6 0 0 1 0-.593.5.5 0 0 1 .21-.202l4.189-2.091a.44.44 0 0 1 .373-.011.52.52 0 0 1 .271.287.6.6 0 0 1 .01.418.53.53 0 0 1-.257.303l-3.19 1.593 3.192 1.599c.102.05.185.14.236.25.05.112.066.24.042.362a.56.56 0 0 1-.17.31.46.46 0 0 1-.307.122ZM9.804 16c-4.605 0-8.63-3.477-9.788-8.457a.6.6 0 0 1 .051-.413.5.5 0 0 1 .298-.252.44.44 0 0 1 .37.057.54.54 0 0 1 .225.333c.51 2.189 1.656 4.126 3.256 5.509s3.566 2.132 5.588 2.131c.13 0 .253.058.345.16a.58.58 0 0 1 .143.386.58.58 0 0 1-.143.386.46.46 0 0 1-.345.16m-1.681-4.533a.46.46 0 0 1-.345-.16.58.58 0 0 1-.143-.385V.546A.58.58 0 0 1 7.778.16.46.46 0 0 1 8.123 0c.13 0 .253.058.345.16a.58.58 0 0 1 .143.386v10.376a.58.58 0 0 1-.143.386.46.46 0 0 1-.345.16Z"
      ></path>
    </svg>
  ),

  stackoverflow: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      {...props}
      height="17"
      fill="none"
      viewBox="0 0 16 17"
    >
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          d="M12.655 15.075v-4.268h1.425V16.5H1.229v-5.693h1.419v4.268h10.008Zm-8.583-1.421h7.162v-1.425H4.072v1.425Zm.175-3.235 6.988 1.458.299-1.38L4.55 9.042l-.303 1.378Zm.906-3.37 6.47 3.019.601-1.3-6.468-3.02-.602 1.292-.001.01Zm1.81-3.19L12.44 8.43l.906-1.082L7.87 2.781l-.902 1.075-.005.004ZM10.499.5l-1.163.862 4.27 5.736 1.164-.861L10.5.5Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 .5h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  ),

  hashnode: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#a)">
        <path
          fill="currentColor"
          d="M1.1 5.347c-1.466 1.438-1.466 3.84 0 5.306L5.346 14.9c1.437 1.466 3.84 1.466 5.306 0l4.247-4.247c1.465-1.465 1.465-3.868 0-5.306L10.653 1.1C9.187-.366 6.784-.366 5.347 1.1L1.099 5.347ZM9.86 9.86a2.63 2.63 0 0 1-3.716 0 2.624 2.624 0 0 1 0-3.716 2.624 2.624 0 0 1 3.715 0 2.63 2.63 0 0 1 0 3.716Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  github: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  twitter: Twitter,
};
