import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv
load_dotenv()

FROM_EMAIL=os.getenv("FROM_EMAIL")

def send_email(to_email, subject, html_content):
    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=to_email,
        subject=subject,
        html_content=html_content
    )
    try:
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(f"Email sent to {to_email}. Status code: {response.status_code}")
    except Exception as e:
        print(f"Error sending email to {to_email}: {e}")