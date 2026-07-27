step 1: python venv : python3 -m venv venv
step 2: to activate py venv: source venv/bin/activate
step 3: install: pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
step 4: django-admin startproject backend .
step 5: create django app:
                python manage.py startapp accounts
                python manage.py startapp store
                python manage.py startapp cart
                python manage.py startapp orders
                python manage.py startapp chat
                python manage.py startapp core
step 6: python manage.py createsuperuser
        Username (leave blank to use 'abumdashrafulrahat'): rahat
        Email address: abumdrahat@gmail.com
        Password: 123
        Password (again): 123
step 7: pip freeze > requirements.txt
        just write :pip install -r requirements.txt
        to install all dependency 
step 8: for docker run --> docker compose up --build
        for docker to stop --> docker compose down
step 9: to work with images i need pillow a python framework to store images to db
step 10: after writing all models:-
        python manage.py makemigrations
        python manage.py migrate
step 11: to see things in django-admin register everything in app/admin:
        register models in django/admin
step 12: now write serizlizers:
        create serizlizers.py file on apps then serizlize
        the models of that app.
step 13: write permissions; first write a global permission.py
        then use it else where.
Step 14: write urls and views
        what views do:
        They take a user's web request in, 
        figure out what to do with the database, 
        and hand a response back.

