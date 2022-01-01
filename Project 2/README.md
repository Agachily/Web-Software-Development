# Online Address

The online location of the application is : https://question-application-wsd.herokuapp.com/

# Login

You can login the application with the credentials: `123@test.com` and `123456`

# Testing

Run the tests with the command `deno test --allow-all --unstable` in the root directory of the application.

# Database

Configure the database in the file `database.js` under the `database` folder.

There should be four tables in the database:

~~~sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));
~~~

# Running Locally

If you want to run the application locally, use the command after configuring the databases:

`deno run --allow-all --unstable run-locally.js`

