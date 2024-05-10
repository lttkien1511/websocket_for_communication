class Reply:
    def make(result, message, data: str | None = None):
        return {
            'result': result,
            'message': message,
            'data': data
        }