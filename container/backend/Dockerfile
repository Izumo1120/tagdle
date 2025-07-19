FROM python:3.13-bookworm

WORKDIR /usr/src/backend

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./backend .

CMD ["python", "app.py"]
