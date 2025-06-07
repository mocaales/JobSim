FROM python:3.11-slim

WORKDIR /

COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/
COPY copy-run ./copy-run
RUN chmod +x copy-run

EXPOSE 8000

CMD ["./copy-run"]