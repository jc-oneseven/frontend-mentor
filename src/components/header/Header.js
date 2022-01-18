import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="header__title">Interactive comments section </h1>
        <h2 className="header__subtitle">
          Challenge by
          <a
            href="https://www.frontendmentor.io/profile/jc-oneseven"
            target="_blank"
            rel="noreferrer"
          >
            Frontend Mentor.
          </a>
          Coded by
          <a
            href="https://github.com/jc-oneseven/frontend-mentor_calculator-app/tree/challenge/calc"
            target="_blank"
            rel="noreferrer"
          >
            Jagdish Chaudhari
          </a>
        </h2>
      </div>
    </header>
  );
};

export default Header;
