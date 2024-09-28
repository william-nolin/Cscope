FROM python:3-slim

WORKDIR /code

RUN apt-get update && apt-get install -y git

COPY ./resources ./resources

RUN pip install --no-cache-dir --upgrade -r /code/resources/requirements.txt

COPY . .

CMD ["fastapi", "run", "api/main.py", "--port", "80"]
