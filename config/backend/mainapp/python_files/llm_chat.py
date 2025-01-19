import asyncio

_observers = []


def add_observer(observer):
    _observers.append(observer)


def generate_response(text):
    print("generating response")
    for observer in _observers:
        print("notifying observers")
        yield from observer.process_query(text)
