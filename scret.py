import hashlib
import secrets

def generate_password_hash(password):
    salt = secrets.token_bytes(16)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return f"{salt.hex()}:{key.hex()}"

# 使用示例
password = "kb65433Ghy322!"
password_hash = generate_password_hash(password)
print(password_hash)