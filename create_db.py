import sqlite3

conn = sqlite3.connect("snapqr.db")

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS contact_messages (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    email TEXT NOT NULL,

    subject TEXT NOT NULL,

    message TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)
""")

conn.commit()

conn.close()

print("Database created successfully.")