import css from "./logo.module.css";

export const Logo = () => {
  return (
    <a
      href="https://university-site-theta.vercel.app/tutanhamon"
      className={css.logo}
    >
      <div className={css.logoEmblem}>
        <span className={css.initials}>VM</span>
      </div>
      <div className={css.logoText}>
        <p>ВОЛДЕМОРТ</p>
        <p>похоронний дім</p>
      </div>
    </a>
  );
};
