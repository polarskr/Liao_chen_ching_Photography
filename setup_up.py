import os
import hashlib
import getpass

def generate_password_hash(password):
    # 使用 os.urandom 生成一個隨機的鹽值
    salt = os.urandom(32)
    # 使用 PBKDF2 和 SHA256 生成密碼哈希
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    # 將鹽值和密鑰轉換為十六進制字符串並用冒號分隔
    return salt.hex() + ':' + key.hex()

def setup_password():
    password = getpass.getpass("Enter your new password: ")
    confirm_password = getpass.getpass("Confirm your password: ")
    
    if password != confirm_password:
        print("Passwords do not match. Please try again.")
        return
    
    password_hash = generate_password_hash(password)
    
    with open('.env', 'w') as f:
        f.write(f"ADMIN_PASSWORD_HASH={password_hash}\n")
    
    print("Password has been set successfully!")

if __name__ == "__main__":
    setup_password()