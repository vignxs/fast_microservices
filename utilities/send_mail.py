import smtplib


def mail(reciever, refund=False):
    # creates SMTP session
    s = smtplib.SMTP('smtp.gmail.com', 587)

    # start TLS for security
    s.starttls()

    # Authentication
    s.login("vignxs@gmail.com", "zwcbvtdsbkiuvtyc")

    # message to be sent
    message = "Your Order recieved"
    if refund:
        message = "Refund Completed Sucessfully"
    # sending the mail
    s.sendmail("vignxs@gmail.com", reciever, message)

    # terminating the session
    s.quit()
