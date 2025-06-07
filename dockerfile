FROM python:3.11-slim

WORKDIR /

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/
COPY copy-run ./copy-run

RUN chmod +x copy-run

ENV PYTHONPATH="${PYTHONPATH}:/backend"

EXPOSE 8000

CMD ["./copy-run"]