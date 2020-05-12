<h1>Angular Enviornment Setup (linux)<a href="https://blog.angular-university.io/getting-started-with-angular-setup-a-development-environment-with-yarn-the-angular-cli-setup-an-ide/">[link]</a></h1>
<b>setup done on Fedora 30</b>
<ol>

<li>npm install -g nave</li>
<li>npm install -g yarn</li>
<li>npm init</li>
<li>yarn</li>
<li>yarn global add @angular/cli </li>
<li>ng new blitz</li>
<li>cd blitz</li>
<li>ng set --global packageManager=yarn</li>
<li>ng serve</li>
<li>attach backend<ol>
<li>create proxy.conf.json in Blitz</li>
<li>paste {
    "/api/*": {
      "target": "http://localhost:3000",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": true
    }
  }</li>
  <li>run using ng serve --proxy-config proxy.conf.json</li>
  <li>run node on port 3000</li>
</ol></li>
</ol>

<h1>Node setup</h1>
<ol>
<li></li>
<li></li>
<li></li>
<li></li>
</ol>

<h1>Auth Setup <a href="https://developer.okta.com/quickstart/#/angular/">[Link]</a></h1>
