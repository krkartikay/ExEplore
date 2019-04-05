import re
from collections import defaultdict

logs = open("access.log").readlines()
users = open("users.txt").readlines()


class LogRow:
    def __init__(self, line):
        row = list(map(''.join, re.findall(
            r'\"(.*?)\"|\[(.*?)\]|(\S+)', line)))
        self.src_ip = row[0]
        self.time_ = row[3].split()[0]
        self.hour = int(self.time_.split(
            ':')[1]) + 5 + (int(self.time_.split('/')[0]) - 29)*24
        self.min_ = (int(self.time_.split(':')[2]) + 30) % 60
        self.sec = int(self.time_.split(':')[3])
        self.timestamp = 1553817600 + \
            int(self.time_.split(':')[1]) * 3600 + \
            (int(self.time_.split('/')[0]) - 29) * 24 * 3600 + \
            int(self.time_.split(':')[2]) * 60 + self.sec
        self.req_type = row[4].split()[0]
        self.url = row[4].split()[1]
        self.resp_code = row[5]
        self.resp_len = row[6]
        self.referrer = row[7]
        self.user_agent = row[8]

    def __str__(self):
        return "%s\t(%d:%d:%d)\t%s\t%s\t%s" % (self.src_ip,
                                               self.hour, self.min_, self.sec, self.req_type, self.resp_code, self.url)

    def __repr__(self):
        return __str__(self)


class UserRow:
    def __init__(self, line):
        row = line.split('\t')
        self.user_id = int(row[0])
        self.initial_login_time = row[1]
        self.phone = row[2]
        self.rollno = row[3].strip()
        self.name = row[4].strip() + (' ' + row[5].strip()
                                      if len(row) == 6 else "")

    def __str__(self):
        return "%s\t%s" % (self.rollno, self.name)

    def __repr__(self):
        return __str__(self)


logs = [LogRow(line) for line in logs]
users = (UserRow(line) for line in users)

games = {}

games[1] = "Hurdles"
games[2] = "2048"
games[3] = "Breakout"
games[4] = "Delta Masters"
games[5] = "Bubble Trouble"
games[6] = "Escape The Gravity"
games[7] = "Pic Puzzle"


print("Number of times game accessed: ")

total_game_access = defaultdict(int)
for l in logs:
    if l.url.startswith("/game_actual") and l.resp_code == "200":
        g = int(l.url[-1])
        total_game_access[g] += 1

for i in range(11, 48+11):
    print("%02d m" % (i%13), end="\t")
    game_access = defaultdict(int)
    for l in logs:
        if l.url.startswith("/game_actual") and l.resp_code == "200" and l.hour == i:
            g = int(l.url[-1])
            game_access[g] += 1
    for g in range(1,8):
        h = (game_access[g] * 70) // total_game_access[g]
        print("[%5s]" % ("x" * ((h+1)//2)), end="\t")
    print()
