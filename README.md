# NWHacks2025

To Use Django:
cd (project directory)
python -m venv myenv  # Create a virtual environment named "myenv"
source myenv/bin/activate
pip install django
(django-admin startproject nwHacks2025 <- if you haven't made the project yet)
cd nwHacks2025
python manage.py runserver
(python3 manage.py startapp (app name) <- if you haven't made the app yet)

To Apply Changes to the Database:
python manage.py migrate