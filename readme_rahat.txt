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
step 6: python manage.py createsuperuser
        Username (leave blank to use 'abumdashrafulrahat'): rahat
        Email address: abumdrahat@gmail.com
        Password: 123
        Password (again): 123
step 7: pip freeze > requirements.txt
        just write :pip install -r requirements.txt
        to install all dependency 