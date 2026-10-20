export const IconHome = ({ active }: { active?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5.2v-6.2h-3.6V21H5a1 1 0 0 1-1-1v-9.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      fill={active ? "currentColor" : "none"}
    />
  </svg>
);

export const IconHeart = ({ active }: { active?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.687 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill={active ? "currentColor" : "none"}
    />
  </svg>
);

export const IconMap = ({ active }: { active?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8.5 4.5 3 6.5v13l5.5-2 7 2 5.5-2v-13l-5.5 2-7-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      fill={active ? "currentColor" : "none"}
    />
    <path d="M8.5 4.5v13M15.5 6.5v13" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const IconUser = ({ active }: { active?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" fill={active ? "currentColor" : "none"} />
    <path
      d="M5 19.2c.8-3.2 3.4-5 7-5s6.2 1.8 7 5"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
    />
  </svg>
);

export const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" stroke="#C56BFF" strokeWidth="1.8" />
    <path d="m4 7 8 6 8-6" stroke="#C56BFF" strokeWidth="1.8" />
  </svg>
);

export const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="3" stroke="#C56BFF" strokeWidth="1.8" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#C56BFF" strokeWidth="1.8" />
  </svg>
);

export const IconPerson = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="3.2" stroke="#C56BFF" strokeWidth="1.8" />
    <path d="M5 19.2c.8-3.2 3.4-5 7-5s6.2 1.8 7 5" stroke="#C56BFF" strokeWidth="1.8" />
  </svg>
);

export const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"
      fill="#B026FF"
    />
    <circle cx="12" cy="10" r="2.2" fill="#fff" />
  </svg>
);

export const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" stroke="#B9ADC4" strokeWidth="1.8" />
    <path d="m16 16 4 4" stroke="#B9ADC4" strokeWidth="1.8" />
  </svg>
);

export const IconBack = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const IconShare = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="6" cy="12" r="2.2" stroke="#7A3CFF" strokeWidth="1.6" />
    <circle cx="17" cy="6" r="2.2" stroke="#7A3CFF" strokeWidth="1.6" />
    <circle cx="17" cy="18" r="2.2" stroke="#7A3CFF" strokeWidth="1.6" />
    <path d="m8 11 7-4M8 13l7 4" stroke="#7A3CFF" strokeWidth="1.6" />
  </svg>
);

export const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#7A3CFF" aria-hidden="true">
    <path d="m12 3 2.5 6.4H21l-5.2 4 2 6.6L12 16.8 6.2 20l2-6.6L3 9.4h6.5L12 3Z" />
  </svg>
);

export const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 16h12l-1.2-2.1V10a4.8 4.8 0 1 0-9.6 0v3.9L6 16Z" stroke="#C218D4" strokeWidth="1.7" />
    <path d="M10 18a2 2 0 0 0 4 0" stroke="#C218D4" strokeWidth="1.7" />
  </svg>
);

export const IconGear = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="3" stroke="#C218D4" strokeWidth="1.7" />
    <path
      d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2M6.4 6.4l1.4 1.4M16.2 16.2l1.4 1.4M17.6 6.4 16.2 7.8M7.8 16.2 6.4 17.6"
      stroke="#C218D4"
      strokeWidth="1.7"
    />
  </svg>
);

export const IconHelp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="#C218D4" strokeWidth="1.7" />
    <path d="M9.6 9.4a2.4 2.4 0 1 1 3.5 2.1c-.7.4-1.1.8-1.1 1.7V14" stroke="#C218D4" strokeWidth="1.7" />
    <circle cx="12" cy="16.6" r=".8" fill="#C218D4" />
  </svg>
);

export const IconFilter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 7h16M7 12h10M10 17h4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4" y="5" width="16" height="15" rx="3" stroke="#C56BFF" strokeWidth="1.7" />
    <path d="M4 10h16M8 3v4M16 3v4" stroke="#C56BFF" strokeWidth="1.7" />
  </svg>
);

export const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="#C56BFF" strokeWidth="1.7" />
    <path d="M12 8v5l3 2" stroke="#C56BFF" strokeWidth="1.7" />
  </svg>
);

export const IconCapacity = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="2.5" stroke="#7A3CFF" strokeWidth="1.6" />
    <circle cx="16" cy="10" r="2.1" stroke="#7A3CFF" strokeWidth="1.6" />
    <path d="M4.5 18c.6-2.5 2.4-4 5-4s4.4 1.5 5 4M13.2 18c.3-1.4 1.3-2.4 2.8-2.4 1.6 0 2.6 1 3 2.4" stroke="#7A3CFF" strokeWidth="1.6" />
  </svg>
);
