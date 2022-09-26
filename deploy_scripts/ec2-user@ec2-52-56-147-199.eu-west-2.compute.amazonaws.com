[Unit]
Description=Node Planner
After=multi-user.target

[Service]
ExecStart=/usr/bin/node /home/ec2-user/node_planner/app.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=node-planner
User=ec2-user
EnvironmentFile=/home/ec2-user/node_planner/.env

[Install]
WantedBy=multi-user.target
