interface LoaderProps {
  text?: string;
}

export const Loader = ({ text = "Loading..." }: LoaderProps) => {
  return (
    <div className="loader-row" role="status">
      <div className="spinner small" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
};
