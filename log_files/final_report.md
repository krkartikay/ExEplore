
The server was online roughly from `11:00 am 29/03/2019` to `5:00 pm 30/03/2019`.
The server served a total of `135,585` requests, during which `997` unique visitors
visited the site and 100 unique files were served. It consumed `990.38 MiB` of
network bandwidth and produced a log file of size `30.87 MiB`.
A total of `160` users registered on the site. Some users were spamming the server
and were removed manually. After removal, 136 users remained on the leaderboard.
We analysed the log files using some open source tools like `goaccess` and some small python
scripts. The following are some interesting statistics found by analysing the server log files.

\small

Operating Systems
==========
```
Hits      h% Vis*     v%   Bandwidth Data
----- ------ ---- ------ ----------- ----
81087 59.81%  198 19.86%  534.07 MiB Windows   ************************************************|
35630 26.28%  177 17.75%  298.92 MiB Linux     *********************|
16387 12.09%  583 58.48%  152.10 MiB Android   *********|
1319   0.97%   11  1.10%  406.20 KiB Unknown   |
628    0.46%   14  1.40%    3.72 MiB iOS       |
522    0.38%   10  1.00%    1.16 MiB Macintosh |
10     0.01%    4  0.40%    7.49 KiB Unix-like |
```

Browsers        
==========
```
Hits      h% Vis*     v%   Bandwidth Data
----- ------ ---- ------ ----------- ----
96915 71.48%  862 86.46%  777.59 MiB Chrome   ************************************************|
20498 15.12%   68  6.82%  175.05 MiB Firefox  **********|
15822 11.67%   15  1.50%   33.10 MiB MSIE     *******|
1315   0.97%    9  0.90%  392.58 KiB Unknown  |
865    0.64%   21  2.11%    3.93 MiB Safari   |
119    0.09%    9  0.90%  262.51 KiB Others   |
28     0.02%   10  1.00%   26.69 KiB Crawlers |
```

\pagebreak
Time Distribution
==========
```
11am *******|
12pm ***********************************|
01pm ****************************************|
02pm ******************************************************|
03pm *************************************|
04pm **********************************************************|
05pm ********************************|
06pm *********************|
07pm ***************|
08pm *************|
09pm ****************|
10pm *************************|
11pm ********************************|
12am ************************************|
01am ***************|
02am *************|
03am **|
04am |
05am |
06am |
07am **************|
08am ********************|
09am **********************************|
10am *************************************************************************************|
11am ****************************************************|
12pm **|
01pm *|
02pm *|
03pm |
04pm |
05pm |
```

Each ``*`' denotes 200 requests.
The peak load was at 10am-11am during which it served about 17,000 requests, i.e. 4.72 req/sec.

Time for games were played by users
====================

Most users visited the site for 2-4 hours, but some users were online
for a much longer time.

```
403 users were online for 1 hours
127 users were online for 2 hours
38 users were online for 3 hours
24 users were online for 4 hours
6 users were online for 5 hours
7 users were online for 6 hours
1 users were online for 15 hours
1 users were online for 17 hours
1 users were online for 18 hours
1 users were online for 22 hours
2 users were online for 23 hours
```

Number of times game accessed
==========

Total:

```
Game #1 was accessed 1430 times (Hurdles)            ***********************************|
Game #5 was accessed 1015 times (Bubble Trouble)     *************************|
Game #4 was accessed  702 times (Delta Masters)      *****************|
Game #2 was accessed  589 times (2048)               **************|
Game #7 was accessed  411 times (Pic Puzzle)         **********|
Game #6 was accessed  405 times (Escape The Gravity) **********|
Game #3 was accessed  355 times (Breakout)           ********|
```

Distribution According to time:

```
Number of times game accessed: 
        
        Hurdles          2048       Breakout  Delta Masters    Bubble   Escape Gravity  Pic Puzzle
11am    [         x] [          ] [          ] [          ] [          ] [          ] [          ]    
12pm    [  xxxxxxxx] [        xx] [        xx] [       xxx] [      xxxx] [         x] [         x]    
00pm    [  xxxxxxxx] [        xx] [         x] [       xxx] [   xxxxxxx] [        xx] [        xx]    
01pm    [xxxxxxxxxx] [      xxxx] [        xx] [      xxxx] [xxxxxxxxxx] [        xx] [        xx]    
02pm    [    xxxxxx] [        xx] [          ] [        xx] [       xxx] [        xx] [         x]    
03pm    [  xxxxxxxx] [        xx] [         x] [      xxxx] [   xxxxxxx] [         x] [        xx]    
04pm    [   xxxxxxx] [         x] [          ] [        xx] [      xxxx] [         x] [         x]    
05pm    [        xx] [          ] [          ] [        xx] [        xx] [          ] [          ]    
06pm    [        xx] [         x] [          ] [         x] [        xx] [          ] [         x]    
07pm    [        xx] [          ] [         x] [          ] [        xx] [          ] [         x]    
08pm    [         x] [         x] [          ] [          ] [          ] [          ] [          ]    
09pm    [     xxxxx] [         x] [          ] [        xx] [       xxx] [         x] [          ]    
10pm    [      xxxx] [         x] [         x] [        xx] [        xx] [         x] [          ]    
11pm    [      xxxx] [         x] [         x] [         x] [         x] [         x] [         x]    
12am    [          ] [          ] [          ] [         x] [         x] [          ] [          ]    
00am    [          ] [          ] [          ] [         x] [          ] [          ] [         x]    
01am    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
02am    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
03am    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
04am    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
05am    [          ] [     xxxxx] [          ] [          ] [          ] [          ] [          ]    
06am    [         x] [          ] [          ] [         x] [         x] [         x] [          ]    
07am    [     xxxxx] [        xx] [         x] [        xx] [       xxx] [         x] [         x]    
08am    [ xxxxxxxxx] [       xxx] [        xx] [       xxx] [       xxx] [       xxx] [        xx]    
09am    [        xx] [         x] [          ] [       xxx] [       xxx] [         x] [         x]    
10am    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
11am    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
12pm    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
00pm    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
01pm    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
02pm    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
03pm    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
04pm    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
05pm    [          ] [          ] [          ] [          ] [          ] [          ] [          ]    
```

Users and corresponding IP addresses
==========

Assuming that two computers will have two different IP addresses, and two people
who register from the same IP address are the same people, we were able to find
some correlation between the users on the site. These users may be the same person
or two people using the same computer:

```
TAPESH THAKUR == Pranav Kumar
anubhav gupta == Rohit == dd aa
prashant jangid == Ankit Kumar
Nimit Bhardwaj == Amit Chambial
Chandan Verma == Keshav Garg
lodu kumar == amit singh
Test Sharma == Aarsh Sharma
```