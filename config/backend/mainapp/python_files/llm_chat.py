_observers = []


def add_observer(observer):
    _observers.append(observer)


def generate_response(text):
    response = ""
    for observer in _observers:
        response += observer.process_query(text)
    return response

