USE blog_db;

INSERT INTO users (username, email, password)
VALUES ('user1', 'user1@example.com', 'hashedpassword1'),
       ('user2', 'user2@example.com', 'hashedpassword2'),
       ('user3', 'user3@example.com', 'hashedpassword3');

INSERT INTO posts (title, content, user_id)
VALUES ('First Post', 'This is the content of the first post', 1),
       ('Second Post', 'Content of the second post', 2);

INSERT INTO comments (content, user_id, post_id)
VALUES ('Great post!', 2, 1),
       ('Thanks for the info', 3, 1);
