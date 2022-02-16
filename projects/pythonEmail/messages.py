happyBirthday = "Happy Birthday {name}, count your life by smiles, not tears. Count your age by friends, not years."
inspirationalQuote = "I can't change the direction of the wind, but I can adjust my sails to always reach my destination. -Jimmy Dean"
outOfOffice = "I will be out of office on {date}. Sorry for any inconvenience!"

def birthday_msg(name):
    return happyBirthday.format(name=name)

def oof(outDate):
    return outOfOffice.format(date=outDate)