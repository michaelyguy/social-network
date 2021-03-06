const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/social`
);

module.exports.insertRegister = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
        [first, last, email, password]
    );
};
module.exports.getUser = (email) => {
    return db.query(`SELECT id, email, password FROM users WHERE email = $1`, [
        email,
    ]);
};

module.exports.insertCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code) VALUES ($1, $2) RETURNING *`,
        [email, code]
    );
};

module.exports.getCode = (email, code) => {
    return db.query(
        `SELECT * FROM reset_codes
  WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND email = $1 AND code = $2`,
        [email, code]
    );
};

module.exports.updatePassword = (password, Id) => {
    return db.query(
        `UPDATE users
         SET password = $1 WHERE id = $2 RETURNING *`,
        [password, Id]
    );
};

module.exports.getUserImg = (id) => {
    return db.query(
        `SELECT * FROM users
  WHERE id = $1`,
        [id]
    );
};

module.exports.updateProfilePic = (profilePic, userId) => {
    return db.query(`UPDATE users SET imgurl = $1 WHERE id = $2 RETURNING *`, [
        profilePic,
        userId,
    ]);
};

module.exports.updateBio = (bio, userId) => {
    return db.query(`UPDATE users SET bio = $1 WHERE id = $2 RETURNING *`, [
        bio,
        userId,
    ]);
};

module.exports.getOtherProfile = (id) => {
    return db.query(
        `SELECT * FROM users
         WHERE id = $1`,
        [id]
    );
};

module.exports.getInitialStatus = (myId, otherId) => {
    return db.query(
        `SELECT * FROM friendships
           WHERE (receiver_id = $1 AND sender_id = $2)
           OR (receiver_id = $2 AND sender_id = $1);`,
        [myId, otherId]
    );
};

module.exports.getMatchingUsers = (val) => {
    return db.query(
        `SELECT * FROM users WHERE first ILIKE $1 OR last ILIKE $1`,
        [val + "%"]
    );
};

module.exports.getLastUsers = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3`);
};

module.exports.addFriendReq = (myId, otherUserId) => {
    return db.query(
        `INSERT INTO friendships (sender_id, receiver_id) VALUES ($1, $2) RETURNING *`,
        [myId, otherUserId]
    );
};

module.exports.updateUsersFriendship = (myId, otherUserId) => {
    return db.query(
        `UPDATE friendships SET accepted = true WHERE (sender_id = $1 AND receiver_id =$2) OR (sender_id = $2 AND receiver_id =$1) RETURNING *`,
        [myId, otherUserId]
    );
};

module.exports.deleteFriendship = (myId, otherUserId) => {
    return db.query(
        `DELETE FROM friendships WHERE (sender_id = $1 AND receiver_id =$2) OR (sender_id = $2 AND receiver_id =$1) RETURNING *`,
        [myId, otherUserId]
    );
};

module.exports.getAllFriends = (id) => {
    return db.query(
        `SELECT users.id, first, last, imgurl, accepted
  FROM friendships
  JOIN users
  ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
  OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
  OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
        [id]
    );
};

module.exports.getLastTenMsgs = () => {
    return db.query(
        `SELECT users.id, chats.id AS message_id, first, last, imgurl, message, chats.created_at FROM chats JOIN users on (sender_id = users.id) LIMIT 10`
    );
};
