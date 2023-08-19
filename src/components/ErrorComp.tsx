import { Link } from "react-router-dom";

export const ErrorComp: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="fallback-page">
      <h1>Oops, something went wrong!</h1>
      <p>Sorry, the page you're looking for couldn't be found.</p>
      <p>{text}</p>
      <p>
        You can go back to the{' '}
        <Link to="/">homepage</Link> or try again later.
      </p>
    </div>
  );
}