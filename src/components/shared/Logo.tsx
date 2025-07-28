interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <img src="/logo.png" alt="App Logo" className={`${className} rotate-45`} />
  );
};
