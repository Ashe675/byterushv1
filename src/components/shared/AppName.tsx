interface AppNameProps {
  className?: string;
}

const AppName = ({ className = "" }: AppNameProps) => {
  return (
    <h1 className={`font-primary font-extrabold text-primary ${className}`}>
      <span className=" text-accent-light">B</span>YTE
      <span className=" text-accent-light">R</span>USH
    </h1>
  );
};

export default AppName;
