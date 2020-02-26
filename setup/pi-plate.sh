#!/bin/bash

xset s noblank
xset s off
xset -dpms
unclutter -idle 0.01 -root &

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

/usr/bin/chromium-browser --disable-pinch --noerrdialogs --disable-infobars --overscroll-history-navigation=0 --check-for-update-interval=604800 --kiosk http://localhost:80
