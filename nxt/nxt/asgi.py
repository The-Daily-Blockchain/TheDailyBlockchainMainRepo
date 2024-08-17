"""
ASGI config for nxt project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from api import consumers

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nxt.settings')

# application = get_asgi_application()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('ws/singleticker/<str:query>',
                 consumers.SingleTickerConsumer.as_asgi()),
            path('ws/allticker/<path:query>',
                 consumers.AllTickerConsumer.as_asgi()),
        ])
    ),
})
