const sqlite3 = require('sqlite3').verbose(); // Import SQLite3 library

// Function to open the database connection
function openDatabase() {
    return new sqlite3.Database('./userdata.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the userdata database.');
    });
}

// Function to close the database connection
function closeDatabase(db) {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
}

// Login function
function login(username, password) {
    const db = openDatabase();

    db.serialize(() => {
        db.get(`SELECT * FROM "User data" WHERE Username = ? AND Password = ?`, [username, password], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            if (row) {
                console.log('Login successful');
                // Redirect to profile page or perform other actions
            } else {
                console.log('Login failed: Invalid username or password');
            }
        });
    });

    closeDatabase(db);
}

// Register function
function register(username, password) {
    const db = openDatabase();

    db.serialize(() => {
        db.run(`INSERT INTO "User data" (Username, Password) VALUES (?, ?)`, [username, password], function(err) {
            if (err) {
                console.error(err.message);
                console.log('Registration failed');
            } else {
                console.log(`Registration successful. User ID: ${this.lastID}`);
                // Redirect to login page or perform other actions
            }
        });
    });

    closeDatabase(db);
}

// Example usage:
login('user1', 'password1');
// register('user2', 'password2');
