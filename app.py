import hashlib
import sqlite3
from datetime import datetime
from functools import wraps
import logging
from flask import Flask, request, render_template, redirect, url_for, session, flash

app = Flask(__name__)

# 使用一個固定的字符串作為密鑰（在生產環境中，這應該是一個長且複雜的隨機字符串）
app.secret_key = 'rgorhgnș43jfweuf7y65780wjfdif'  # 請替換為一個長且複雜的隨機字符串

# 配置日誌
logging.basicConfig(level=logging.DEBUG)

# 設置 ADMIN_PASSWORD_HASH
ADMIN_PASSWORD_HASH = "59e1b977b2b7e8b64bbe821415e7fd51:2bb019704c04d257a24d69c71b117286ace96ad826a67c989b8022fcee5c882f"  # 請替換為實際的密碼哈希

# 數據庫初始化
def init_db():
    conn = sqlite3.connect('blog.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS posts
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title TEXT NOT NULL,
                  content TEXT NOT NULL,
                  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

init_db()

def check_password_hash(stored_password_hash, provided_password):
    salt, stored_key = stored_password_hash.split(':')
    salt = bytes.fromhex(salt)
    stored_key = bytes.fromhex(stored_key)
    new_key = hashlib.pbkdf2_hmac('sha256', provided_password.encode('utf-8'), salt, 100000)
    return new_key == stored_key

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('home'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def home():
    if 'logged_in' in session:
        return redirect(url_for('admin'))
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    app.logger.debug(f'Login attempt with method: {request.method}')
    if request.method == 'POST':
        password = request.form['password']
        if check_password_hash(ADMIN_PASSWORD_HASH, password):
            session['logged_in'] = True
            app.logger.info('Successful login')
            return redirect(url_for('admin'))
        app.logger.warning('Invalid login attempt')
        flash('Invalid password', 'error')
        return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/admin')
@login_required
def admin():
    conn = sqlite3.connect('blog.db')
    c = conn.cursor()
    c.execute("SELECT id, title, created_at FROM posts ORDER BY created_at DESC")
    posts = c.fetchall()
    conn.close()
    return render_template('admin.html', posts=posts)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('You have been logged out', 'info')
    return redirect(url_for('home'))

@app.route('/create', methods=['GET', 'POST'])
@login_required
def create_post():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        conn = sqlite3.connect('blog.db')
        c = conn.cursor()
        c.execute("INSERT INTO posts (title, content) VALUES (?, ?)", (title, content))
        conn.commit()
        conn.close()
        flash('New post created successfully!', 'success')
        return redirect(url_for('admin'))
    return render_template('create_post.html')

@app.route('/edit/<int:post_id>', methods=['GET', 'POST'])
@login_required
def edit_post(post_id):
    conn = sqlite3.connect('blog.db')
    c = conn.cursor()
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        c.execute("UPDATE posts SET title = ?, content = ? WHERE id = ?", (title, content, post_id))
        conn.commit()
        flash('Post updated successfully!', 'success')
        return redirect(url_for('admin'))
    c.execute("SELECT title, content FROM posts WHERE id = ?", (post_id,))
    post = c.fetchone()
    conn.close()
    if post is None:
        flash('Post not found', 'error')
        return redirect(url_for('admin'))
    return render_template('edit_post.html', post=post, post_id=post_id)

@app.route('/delete/<int:post_id>')
@login_required
def delete_post(post_id):
    conn = sqlite3.connect('blog.db')
    c = conn.cursor()
    c.execute("DELETE FROM posts WHERE id = ?", (post_id,))
    conn.commit()
    conn.close()
    flash('Post deleted successfully!', 'success')
    return redirect(url_for('admin'))

if __name__ == '__main__':
    app.run(debug=True)