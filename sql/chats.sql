DROP TABLE IF EXISTS chats;

CREATE TABLE chats (
      id SERIAL PRIMARY KEY,
      sender_id INT NOT NULL REFERENCES users(id),
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

     INSERT INTO chats (sender_id, message) VALUES 
     ('2','Hey!'),
     ('3','Hey. good to see you here'),
     ('4','you 2'),
     ('5','any news??'),
     ('6','Missed you!'),
     ('7','Im going on an Holiday'),
     ('8','Please take me '),
     ('9','hahahaha'),
     ('10','LOL!'),
     ('11','Bye')
