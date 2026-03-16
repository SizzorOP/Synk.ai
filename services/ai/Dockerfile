FROM python:3.12-slim
WORKDIR /app
COPY services/ai/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY services/ai ./services/ai
EXPOSE 8001
CMD ["python", "-m", "uvicorn", "services.ai.app.main:app", "--host", "0.0.0.0", "--port", "8001"]
