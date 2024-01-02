from flask import request, jsonify
from app.blueprints.activity import activity
from werkzeug.security import check_password_hash

from app.models import db,User,Post
# @activity.route('/')
@activity.route('/api/signup', methods=['POST'])  # Accepting POST requests
def signup():
    if request.method == 'POST':
        data = request.get_json()  # Retrieve JSON data from the request body
        if data:
            # Extract required data fields from the JSON
            username = data.get('username')
            img_base64 = data.get('imgBase64')
            full_name = data.get('fullName')
            password = data.get('password')
            email=data.get('email')

            # Process user data and save to the database

            user = User(full_name=full_name,img_base64=img_base64,username=username,password=password,email=email)
            db.session.add(user)
            db.session.commit()
            # Create a JSON response to send back
            response_data = {
                'success': True,
                'message': 'Signup successful',  # Optionally, include a success message
                # You can include more data in the response if needed
            }
            return jsonify(response_data), 200
        else:
            error_message = 'Invalid JSON data'
            return jsonify({'error': error_message}), 400
        
@activity.route('/api/signin', methods=['POST'])  # Accepting POST requests
def signin():
    if request.method == 'POST':
        data = request.get_json()
        if data:
            username = data.get('username')
            password = data.get('password')

            # Check if the user exists in the database
            user = User.query.filter_by(username=username).first()

            if user and check_password_hash(user.password, password):
                # You can include more data in the response if needed
                response_data = {
                    'success': True,
                    'message': 'Sign in successful',
                    'user_id': user.id,
                    'username': user.username,
                    'email': user.email,
                    # Add more fields as needed
                }
                return jsonify(response_data), 200
            else:
                error_message = 'Invalid username or password'
                return jsonify({'error': error_message}), 401
        else:
            error_message = 'Invalid JSON data'
            return jsonify({'error': error_message}), 400
        
        
@activity.route('/api/user/<int:user_id>/post', methods=['POST',])
def create_post(user_id):
    if request.method == 'POST':
        data = request.get_json()

        if data:
            img_base64 = data.get('img_base64')
            content = data.get('content')
            user = User.query.get(user_id)
            if user:
                post = Post(user_id=user_id, img_base64=img_base64, content=content)
                db.session.add(post)
                db.session.commit()

                response_data = {
                    'success': True,
                    'message': 'Post created successfully',
                    'post_id': post.id
                }
                return jsonify(response_data), 201
            else:
                error_message = 'User not found'
                return jsonify({'error': error_message}), 404
        else:
            error_message = 'Invalid JSON data'
            return jsonify({'error': error_message}), 400
        
@activity.route('/api/user/<int:user_id>/posts', methods=['GET'])
def get_user_posts(user_id):
    user = User.query.get(user_id)
    if user:
        posts = user.posts
        post_data = [{'id': post.id, 'img_base64': post.img_base64, 'content': post.content,'likes':post.likes} for post in posts]
        return jsonify(post_data), 200
    else:
        return jsonify({'error': 'User not found'}), 404
    
    

    
@activity.route('/api/posts', methods=['GET'])
def get_all_posts():
    posts = Post.query.all()
    post_data = [{'id': post.id, 'user_id': post.user_id, 'img_base64': post.img_base64, 'content': post.content,'likes':post.likes} for post in posts]
    return jsonify(post_data), 200

    
    
@activity.route('/api/post/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get(post_id)
    if post:
        data = request.get_json()
        if data:
            post.img_base64 = data.get('imgBase64', post.img_base64)
            post.content = data.get('content', post.content)
            db.session.commit()
            return jsonify({'success': True, 'message': 'Post updated successfully'}), 200
        else:
            return jsonify({'error': 'Invalid JSON data'}), 400
    else:
        return jsonify({'error': 'Post not found'}), 404


@activity.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get(post_id)
    if post:
        post_data = [{'id': post.id, 'img_base64': post.img_base64, 'content': post.content} for post in posts]
        return jsonify(post_data), 200
    else:
        return jsonify({'error': 'Post not found'}), 404

@activity.route('/api/post/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get(post_id)
    if post:
        db.session.delete(post)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Post deleted successfully'}), 200
    else:
        return jsonify({'error': 'Post not found'}), 404
    

@activity.route('/api/post/<int:post_id>/likes', methods=['POST'])
def add_like(post_id):
    post = Post.query.get(post_id)
    if post:
        isLiked = request.get_json()
        if(isLiked):   
            post.likes=post.likes-1
        else:
            post.likes=post.likes+1

        db.session.commit()
        return jsonify({'success': True, 'message': 'Post updated successfully'}), 200

    else:
        return jsonify({'error': 'Post not found'}), 404  
    
    
   