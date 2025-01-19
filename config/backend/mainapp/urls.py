from django.urls import path
from . import views
from django.views.generic import TemplateView

app_name = 'mainapp'

urlpatterns = [
  # path('', views.chat, name='chat'),
  path('', TemplateView.as_view(template_name='index.html')),
  path('get_response/', views.get_response, name='get_response'),
<<<<<<< HEAD
=======
  path('update_card_info/', views.update_card_info, name='update_card_info'),
>>>>>>> amon_final2
]