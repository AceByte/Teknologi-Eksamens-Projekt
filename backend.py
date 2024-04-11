from flask import Flask, request, jsonify

app = Flask(__name__)

import sqlite3

# Function to open the database connection
def open_database():
    conn = sqlite3.connect('userdata.db')
    return conn

# Create table if not exists
def create_table():
    conn = open_database()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS "User data" (
                            "Username" TEXT PRIMARY KEY,
                            "Password" TEXT,
                            "Total amount" INTEGER,
                            "Accounts" INTEGER,
                            "Percentage on each account" INTEGER
                        )''')
    conn.commit()
    conn.close()

create_table()  # Call create_table() when the application starts to ensure the table exists

# Register endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    total_amount = data.get('total_amount')
    accounts = data.get('accounts')
    percentage = data.get('percentage')

    conn = open_database()
    cursor = conn.cursor()
    try:
        cursor.execute('''INSERT INTO "User data" (Username, Password, "Total amount", Accounts, "Percentage on each account")
                          VALUES (?, ?, ?, ?, ?)''', (username, password, total_amount, accounts, percentage))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Registration successful'}), 200
    except sqlite3.IntegrityError:
        conn.rollback()
        conn.close()
        return jsonify({'error': 'Username already exists'}), 400

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = open_database()
    cursor = conn.cursor()
    cursor.execute('''SELECT * FROM "User data" WHERE Username = ? AND Password = ?''', (username, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

if __name__ == '__main__':
    app.run(debug=True)