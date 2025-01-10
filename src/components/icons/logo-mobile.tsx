type LogoProps = {
  className?: string;
};

export function LogoMobile({ className = "" }: LogoProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="none"
    >
      <path
        fill="#633CFF"
        fillRule="evenodd"
        d="M2.619 25.38c1.954 1.953 5.095 1.953 11.38 1.953s9.429 0 11.38-1.953c1.954-1.95 1.954-5.095 1.954-11.38s0-9.428-1.953-11.381C23.43.667 20.285.667 14 .667s-9.428 0-11.381 1.952C.667 4.572.667 7.713.667 13.998c0 6.286 0 9.429 1.952 11.38Zm8.047-15.713A4.333 4.333 0 1 0 15 14a1 1 0 0 1 2 0 6.333 6.333 0 1 1-6.334-6.333 1 1 0 1 1 0 2m11 4.333a4.333 4.333 0 0 1-4.333 4.333 1 1 0 1 0 0 2A6.333 6.333 0 1 0 11 14a1 1 0 1 0 2 0 4.334 4.334 0 0 1 8.666 0"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
