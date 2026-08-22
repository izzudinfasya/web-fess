import "./profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile__image">
        <img src="/profile.jpg" alt="Fess" />
      </div>

      <div className="profile__name">
        <h1>@fesnotyours</h1>

        <span className="profile__verified" aria-label="Verified">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5l2.2 1.4 2.6-.1 1.3 2.2 2.2 1.3-.1 2.6L21.5 12l-1.3 2.2.1 2.6-2.2 1.3-1.3 2.2-2.6-.1-2.2 1.3-2.2-1.3-2.6.1-1.3-2.2-2.2-1.3.1-2.6L2.5 12l1.3-2.2-.1-2.6 2.2-1.3 1.3-2.2 2.6.1L12 2.5z" />
            <path
              className="profile__verified-check"
              d="M8.3 12.3l2.3 2.3 5.1-5.1"
            />
          </svg>
        </span>
      </div>

      <p>Desk Setup & Tech Creator</p>
    </div>
  );
};

export default Profile;
