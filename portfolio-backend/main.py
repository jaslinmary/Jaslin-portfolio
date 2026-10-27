
import os
import smtplib
from email.message import EmailMessage

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

app = FastAPI(title="Portfolio Contact API")

# Allow your portfolio frontend to communicate with this backend.
frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://127.0.0.1:5500"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        frontend_url,
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=False,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)


class ContactMessage(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=5, max_length=5000)


@app.get("/")
def home():
    return {
        "message": "Portfolio Contact API is running!",
        "status": "success"
    }


@app.post("/contact")
def send_contact_message(contact: ContactMessage):

    sender_email = os.getenv("SENDER_EMAIL")
    app_password = os.getenv("EMAIL_APP_PASSWORD")
    receiver_email = os.getenv("RECEIVER_EMAIL")

    if not sender_email or not app_password or not receiver_email:
        raise HTTPException(
            status_code=500,
            detail="Email settings are not configured."
        )

    email_message = EmailMessage()
    email_message["Subject"] = (
        f"Portfolio Contact Message from {contact.name}"
    )
    email_message["From"] = sender_email
    email_message["To"] = receiver_email
    email_message["Reply-To"] = str(contact.email)

    email_message.set_content(
        f"""
You received a new message from your portfolio.

Name: {contact.name}
Visitor Email: {contact.email}

Message:
{contact.message}
"""
    )

    try:
        with smtplib.SMTP_SSL(
            "smtp.gmail.com", 465, timeout=20
        ) as server:
            server.login(sender_email, app_password)
            server.send_message(email_message)

        return {
            "status": "success",
            "message": "Your message has been sent successfully!"
        }

    except (smtplib.SMTPException, OSError):
        raise HTTPException(
            status_code=500,
            detail="Unable to send your message. Please try again later."
        )
