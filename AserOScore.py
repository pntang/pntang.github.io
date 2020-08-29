import random
import sys
import time
import datetime
from datetime import datetime

print("Starting BIOS...")
time.sleep(1)
print("Starting System...")
time.sleep(1)
print(" ")
print('Aser Oprating System - Core ©2020 All right reserved')
time.sleep(0.3)
print("Type 'cmdlist' for help")
while True:
    command = input('>>>')
    if command == 'cmdlist':
        print('Aser/commandlist > cmdlist\show command list')
        time.sleep(0.05)
        print('Aser/commandlist > newfile\make a new file.')
        time.sleep(0.05)
        print('Aser/commandlist > openfile\alter files')
        time.sleep(0.05)
        print('Aser/commandlist > seefile\see a file')
        time.sleep(0.05)
        print('Aser/commandlist > quit\quit ')
        time.sleep(0.05)
        print('Aser/commandlist > ver\Output version.')
        time.sleep(0.05)
        print('Aser/commandlist > time\print datetime')
        time.sleep(0.05)
        print('Aser/commandlist > applist\show all apps')
    elif command == 'newfile':
        fileName = input('newfile/fileName >>>')
        if (fileName == ''):
            print("Error/name_error: name '' is not a char")
            continue
        else:
            print('newFile: Creating......')
            newFile = open(fileName, "w")
            fileContent = input('newfile/fileContent >>>')
            newFile.write(fileContent)
            print('Done')
            newFile.close()
    elif command == 'openfile':
        try:
            fileName = input('openfile/fileName >>>')
            alterType = input('openfile/alterType -Write_or_Add >>>')
            alterFile = open(fileName, alterType)
            fileContent = input('openfile/alter/fileContent >>>')
            print('alter......')
            alterFile.write(fileContent)
            print('Done')
            alterFile.close()
        except:
            print((('Error/file_error: Cannot find ' + fileName) + '.'))
            continue
    elif command == 'seefile':
        try:
            fileName = input('seefile/fileName >>>')
            seeFile = open(fileName, "r")
            text = seeFile.readline()
            seeFile.close()
            print('seefile:', text)
        except:
            print((('Error/file_error: Cannot find ' + fileName) + '.'))
            continue
    elif command == 'ver':
        print("ver/HOSver: Hangco Oprating System Version3.0")
        time.sleep(0.05)
        print("ver/Environment: on Windows(R) 10 Python-3.6.5")
        time.sleep(0.05)
        print("ver/AserOSver: Aser Oprating System Version 12.1")
        time.sleep(0.05)
        print("ver/Copyright: Aser Technology ©2020 Allright reserved")
        time.sleep(0.05)
        print("ver/Vernumber: 2020-8050-828-1010")
    elif command == 'quit':
        print('Closing...')
        time.sleep(0.5)
        break
    elif command == 'time':
        print(datetime.now())
    elif command == 'applist':
        print("<applist>")
        time.sleep(0.05)
        print("Aser Vitual System<aservs>")
        time.sleep(0.05)
        print("Python Shell<shell>")
        time.sleep(0.05)
        print("Chatbot<chatbot>")
        time.sleep(0.05)
        print("Disk Drive<disk>")
    elif command == "aservs":
        print(" >Aser Vitual System <Aser.inc ©2020 All right reserved>")
        time.sleep(1)
        print(" ")
        print(" Starting Vitual Machine...")
        time.sleep(1)
        print(" Installing BIOS...")
        time.sleep(1)
        print(" Installing System...")
        time.sleep(3)
        print(" ")
        print(" Zore OS 5.0")
        time.sleep(0.05)
        print(" Type list for command list")
        while True:
            cmd = input(" >")
            if cmd == 'list':
                print(" list > list/output command list")
                time.sleep(0.05)
                print(" list > ver/check Zore OS version")
                time.sleep(0.05)
                print(" list > new/create a new file")
                time.sleep(0.05)
                print(" list > open/open a file")
                time.sleep(0.05)
                print(" list > time/check datetime")
                time.sleep(0.05)
                print(" list > logout/close Zore OS")
            elif cmd == 'ver':
                print(" ver > Zore Oprating System ©2020 All right reserved")
                time.sleep(0.05)
                print(" Copyright > Aser Technology.inc")
                time.sleep(0.05)
                print(" num > 2080-5084-70-021")
            elif cmd == 'new':
                fname = input(' Filename >')
                if (fname == ''):
                    print(" error > Filename cannot be empty")
                    continue
                else:
                    print(' >creating... ')
                    newf = open(fname, "w")
                    fc = input(' write >')
                    newf.write(fc)
                    print(' Done')
                    newf.close()
            elif cmd == 'open':
                try:
                    fname = input(' FileName >')
                    seef = open(fname, "r")
                    txt = seef.readline()
                    seef.close()
                    print(' File/', txt)
                except:
                    print(' error > Cannot find the file')
                    continue
            elif cmd == 'time':
                print(' ',datetime.now())
            elif cmd == 'logout':
                print(" Closing...")
                time.sleep(3)
                break
            elif cmd == '':
                continue
            else:
                print(" error > Cannot find '",cmd,"'")
    elif command == 'shell':
        print(" </> python shell build 3.6.5")
        while True:
            shell = input(" $ ")
            if shell == 'platform':
                print(" ",sys.platform)
            elif shell == 'version':
                print(" ",sys.version)
            elif shell == 'copyright':
                print(" ",sys.copyright)
            elif shell == 'time':
                print(" ",datetime.now())
            elif shell == 'quit':
                break
            elif shell == '':
                continue
            else:
                print(" error python command")
    elif command == '':
        continue
    elif command == 'chatbot':
        print(' Chatbot build 1.0')
        time.sleep(0.1)
        chatname = input (' Enter your nickname:')
        time.sleep(0.1)
        print(' Type to chat')
        while True:
            chat = input(" "+chatname+" >")
            if 'hi' in chat:
                print(" Sprinkle > Hi~")
            elif 'hello' in chat:
                print(" Sprinkle > Hello~")
            elif 'your name' in chat:
                print(" Sprinkle > My name is Sprinkle~")
            elif 'how old' in chat:
                print(" Sprinkle > I'm fifteen years old.")
            elif 'age' in chat:
                print(" Sprinkle > I'm fifteen.")
            elif 'joke' in chat:
                print(" Sprinkle > Haha?")
            elif '( ﾟ∀。)' in chat:
                print(" Sprinkle > ( ﾟ∀。)")
            elif 'bye' in chat:
                print(" Sprinkle > Byebye~")
                break
            elif '' in chat:
                print(" Sprinkle > ???")
            else:
                print(" Sprinkle > Ha???")
        continue
    elif command == 'disk':
        print(" Disk Drive 1.0 ©2020 Allright reserved")
        print(" Running...")
        time.sleep(2)
        print(" ")
        import Disk
        print(" ")
        print(" Done")
    elif command == 'regedit':
        print("Regedit List")
        time.sleep(0.05)
        print("|   AppList    |   Cmd    |   Num   |")
        time.sleep(0.05)
        print("|   Newfile    | newfile  | 1201001 |")
        time.sleep(0.05)
        print("|   Seefile    | seefile  | 1201002 |")
        time.sleep(0.05)
        print("|   Openfile   | openfile | 1202003 |")
        time.sleep(0.05)
        print("|   Aser Vs    |  aservs  | 1202004 |")
        time.sleep(0.05)
        print("|   Chatbot    | chatbot  | 1202005 |")
        time.sleep(0.05)
        print("| Python Shell |  shell   | 1202006 |")
        time.sleep(0.05)
        print("|  Disk Drive  |   disk   | 1202007 |")
    else:
        print("Error/command_error: Cannot find '", command, "'")
