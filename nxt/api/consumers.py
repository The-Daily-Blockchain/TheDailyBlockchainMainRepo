import websockets
from channels.generic.websocket import AsyncWebsocketConsumer


class WebSocketProxyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.target_url = self.get_target_url()
        await self.accept()

        try:
            async with websockets.connect(self.target_url) as websocket:
                self.websocket = websocket
                await self.proxy_messages()
        except Exception as e:
            await self.close(code=500)
            print(f"WebSocket proxy error: {e}")

    async def disconnect(self, close_code):
        if hasattr(self, 'websocket'):
            await self.websocket.close()

    async def receive(self, text_data):
        if hasattr(self, 'websocket'):
            await self.websocket.send(text_data)

    async def proxy_messages(self):
        async for message in self.websocket:
            await self.send(text_data=message)

    def get_target_url(self):
        raise NotImplementedError("Subclasses must implement this method.")


class SingleTickerConsumer(WebSocketProxyConsumer):

    async def connect(self):
        # This should print when a connection is made
        print("WebSocket connect called")
        await super().connect()

    def get_target_url(self):
        query = self.scope['url_route']['kwargs']['query']
        print(f"Received query: {query}")
        return f"wss://stream.binance.com:9443/ws/{query}@ticker"


class AllTickerConsumer(WebSocketProxyConsumer):
    def get_target_url(self):
        query = self.scope['url_route']['kwargs']['query']
        return f"wss://stream.binance.com:9443/stream?streams={query}"
