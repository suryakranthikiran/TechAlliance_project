# DevTinder

    - Fronend - Created Vite + React project
    - Removed unnecessary code
    - Installed Tailwind CSS
    - Installed daisyui
    - Setup Navbar using daisyui
    - Create a NavBar.jsx separate component file
    - Need to setup Routing so installed react-router-dom package
    - Created Footer.jsx using daisyui
    - Create a Login page
    - Install Axios
    - CORS - install cors in backend => add middleware to with configuration: origin,credentials:true
    - Whenever we are making API call so pass axios => {withCredentials : true}
    - Install Redux Toolkit => ConfigureStore => provider => createSlice => add reducer to the store
    - we shouldn't be access other routes without login
    - if token is not present redirect user to login page
    - Logout feature
    - Get the feed and add the feed in the store
    - Build the Usercard
    - Edit profile Feature
    - Show Toast Message on save of profile
    - new page to See all my connections
    - new page to See all my connection request

# Components plan

    - Body
        - NavBar
        - Route = "/" => Feed
        - Route = "/login" => Login Page
        - Route = "/connections" => Connections
        - Route = "/profile" => profile

# Deployment

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- Connect to your instance using its Public DNS:
  ssh -i "devTinder-secret.pem" ubuntu@ec2-51-20-96-154.eu-north-1.compute.amazonaws.com
- Installed node version 22.14.0 on linux
- Git clone

## steps for Frontend Deployment

- npm install => installs the dependencies
- npm run build
- sudo apt update (to update the system)
- sudo apt install nginx
- copy code from dist(build files) to /var/www/html
- sudo scp -r dist/\* /var/www/html/
- Enable port :80 of your instance

## steps for Backend Deployment

- Allowed Ec2 instance public IP on Mongodb server
- Installed pm2 package (npm install pm2 -g) - [it will generate process and run 24/7 in backend]
- pm2 start npm -- start
- pm2 logs (to track the logs)
- pm2 flush (application name) - [it will clear the logs]
- pm2 list (it will list out all the process that are running)
- pm2 stop (application name) - [ it will stop the pm2 process]
- pm2 delete (application name) - [it will delete the npm process ]
- pm2 start npm -- name "name of the app" -- start (to give our own name to the app)

Fontend = http://16.170.155.127/
Backend = http://16.170.155.127/:8005

if map ip to domain name (devTinder.com) => 16.170.155.127 then,

Frontend = devTinder.com
Backend = devTinder.com/api

## nginx configuration : - sudo nano /etc/nginx/sites-available/default

server {
listen 80;
server_name <Name of the domain IP or DNS name>;

    location /api/ {
        proxy_pass http://localhost:8005/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
    try_files $uri $uri/ =404;

}

}

- after above steps need to restart nginx - sudo systemctl restart nginx
- last step modify the BASEURL in frontend project to "/api"
