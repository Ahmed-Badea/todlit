export const EGYFlag = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 300">
    <rect width="450" height="300" fill="#CE1126" />
    <rect width="450" height="200" y="100" fill="#FFF" />
    <rect width="450" height="100" y="200" fill="#000" />
    <path
      d="M225 112.5c0 12.5-10 12.5-10 20s10 20 10 27.5c0-7.5 10-15 10-27.5s-10-7.5-10-20zM200 187.5h20c0 10-10 12.5-10 20s5 7.5 10 7.5-10 5-10 12.5h20c0-7.5-10-12.5-10-20s10-10 10-20h20c0 15-10 25-20 25-5 0-10-5-10-12.5s10-5 10-12.5h-20c0 7.5 10 12.5 10 20s-5 5-10 5-10-5-10-12.5c0-10 10-15 10-27.5h-20z"
      fill="#FFD700"
    />
  </svg>
);

export const ENGFlag = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
    <clipPath id="t">
      <path d="M0 0v30h60V0z" />
    </clipPath>
    <clipPath id="s">
      <path d="M30 15V0h30v30H0V0h30v15z" />
    </clipPath>
    <g clipPath="url(#t)">
      <path d="M0 0h60v30H0z" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0 0l60 30M60 0L0 30"
        clipPath="url(#s)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);
