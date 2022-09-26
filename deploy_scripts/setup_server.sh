mv node_planner.service ~/etc/systemd/system
rm -rf ~/node-planner
git clone https://github.com/LisaS7/node-planner.git
sudo systemctl daemon-reload
sudo systemctl stop node_planner.service
sudo systemctl start node_planner.service
systemctl -l status node_planner.service
