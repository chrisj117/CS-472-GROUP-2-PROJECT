from django.core.mail import EmailMessage, send_mail
from django.utils.html import strip_tags
import os


class Util:

    @staticmethod
    def send_email(data):
        
        # email = EmailMessage(subject=data['email_subject'],
        #                      body=data['email_body'],
        #                      to=[data['to_email']])
        plain_message = strip_tags(data['email_body'])
        email = send_mail(subject=data['email_subject'],
                          message=plain_message,
                          from_email=os.environ.get('EMAIL_HOST_USER'),
                          recipient_list=[data['to_email']],
                          html_message=data['email_body'],
                          fail_silently=False
                          )