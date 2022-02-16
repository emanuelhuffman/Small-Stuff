from messages import birthday_msg
from sendMail import sendEmail

if __name__ == "__main__":
    response = sendEmail("Happy Birthday!", birthday_msg("Bobby"), ["bluetoothbloatsbrain@gmail.com"])
    print(response)

