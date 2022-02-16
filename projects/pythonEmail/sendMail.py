import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage

#login credentials
email = "bluetoothbloatsbrain@gmail.com"
password = os.environ['bbbGmailPassword']

#subject=string, text=string, toEmails=string, fromEmail=list of strings
def sendEmail(subject, text, toEmails, fromEmail='Emanuel <bluetoothbloatsbrain@gmail.com>'):
    msg = MIMEMultipart('alternative')
    msg['From'] = fromEmail
    msg['To'] = ", ".join(toEmails)
    msg['Subject'] = subject
    body = MIMEText(text, 'plain')
    msg.attach(body)
    file = open('./birthday.jpg', 'rb')
    img = MIMEImage(file.read())
    msg.attach(img)
    msgStr = msg.as_string()

    #login to SMTP
    server = smtplib.SMTP(host='smtp.gmail.com', port=587) #start connection
    server.ehlo() #identify self
    server.starttls() #encryption
    server.login(email, password) #login
    server.sendmail(fromEmail, toEmails, msgStr) #send
    server.quit() #close server