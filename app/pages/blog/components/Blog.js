import React from 'react';
import Highlight from 'react-highlight';

export default function Blog() {
  return (
    <section className="main-content-container__blog">
      <article>
        <h2>Continuous Delivery Pipeline - Take two</h2>
        <p>
          Last time the improvement points were to set a better version number, and to decrease
          the amount of manual steps. To fix that I put together the script deploy.sh described
          below.
        </p>
        <Highlight className="bash">
          {`#!/usr/bin/env bash
REPO="https://github.com/\<username\>/\<repository name\>.git";
BASE_DIR="/srv/www/example.com";
RELEASE_DIR="\$\{BASE_DIR\}/releases";
RELEASE="\`date +%Y\`.\`date +%m\`.\`date +%d\`.$1";

# Fetch source code
[ -d $RELEASE_DIR ] || mkdir $RELEASE_DIR;
cd $RELEASE_DIR;
git clone -b master $REPO $RELEASE;

# Create symlink
ln -nfs $RELEASE_DIR/$RELEASE $BASE_DIR"/latest";`
          }
        </Highlight>
        <p>
          The first part specifies the address to the repository storing the code, the name of the
          base directory for the site, and the release directory keeping all the different releases.
        </p>
        <p>
          It also generates a release number based on the date as well as a version number provided
          by passing an argument to the script when executing it. Initially I used two arguments,
          one for version, and one for patch version, however it seems unnecessary to have two
          different versions right now, if there is need for a bugfix/patch, it would probably
          suffice with just one version number that is increased.
        </p>
        <p>
          The second part checks if there exists a release directory, otherwise it creates it, moves
          inside it and clones a new branch from the master branch specified at GitHub, then finally
          creates a symlink "latest" to the newly cloned release.
        </p>
        <h3>The new project structure</h3>
        <p>
          Now it is time to increase the complexity a bit, lets add a build step. For the heck of it
          is time to add some
          <a href="https://facebook.github.io/react/" target="_blank">React</a>
          <a href="https://react-router.now.sh/" target="_blank">et al.</a> to the mix.
        </p>
        <p>
          So in order to add React and stuff, I want to add a nice structure for the JavaScript
          to live in. This structure is then supposed to be built into compliant JavaScript code
          using
          <a href="https://webpack.github.io/" target="_blank">webpack</a>
          and
          <a href="https://babeljs.io/" target="_blank">babel</a>. The structure looks as follows.
        </p>
        <Highlight className="bash">
          {`|-rootDirectory
| |-app
| | |-__tests__
| | |-pages
| | | |-blog
| | | | |-components
| | | | | |-__tests__
| | | | | | |-Blog.test.js
| | | | | |-Blog.js
| | | |-home
| | | | |-components
| | | | | |-__tests__
| | | | | | |-Home.test.js
| | | | | |-Home.js
| | |-index.js
| | |-Main.js
| |-config
| |-public
| |- ...
`}
        </Highlight>
        <p>
          The idea is that test files are living in a subdirectory of where the source files are
          located. In my experience this is making things easier when it's time to import
          modules/components since it's not necessary to traverse seven-plus-or-whatever steps
          upward in a mirrored project structure.
        </p>
        <p>
          Files in the test directory are named the same as the source files, with the added
          extension ".test.js", just because I personally prefer ".test." over ".spec.".
        </p>
        <h3>The build step</h3>
        <p>
          Since I am using React and ES6 I am also using babel to
          <a
            href="https://en.wikipedia.org/wiki/Source-to-source_compiler"
            target="_blank"
          >transpile</a>
          the JavaScript to ES5 so that the browser can understand it. This will be the build step
          that I want to automate.
        </p>
        <h4>Enter webpack</h4>
        <p>
          Webpack is a module bundler, it says so on the
          <a
            href="http://webpack.github.io/docs/what-is-webpack.html"
            target="_blank">webpage</a>,
          and I will use it to specify the JavaScript bundle I want to build for my webpage.
          Its configuration lives in a file (<b>webpack.config.js</b>) in the root directory, and
          the points of interest are the <b>entry</b>, <b>output</b>, <b>plugins</b>, and
          <b>loaders</b> properties.
        </p>
        <p>
          <b>
            The
            <a
              href="https://webpack.github.io/docs/configuration.html#entry"
              target="_blank"
            >entry</a>
          </b> property specifies the file(s) that are to be loaded as entry point for
          the
          bundle.
        </p>
        <p>
          <b>
            The
            <a
              href="https://webpack.github.io/docs/configuration.html#output"
              target="_blank"
            >output</a>
          </b> property specifies how webpack should write the bundle output file.
        </p>
        <p>
          <b>
            The
            <a
              href="https://webpack.github.io/docs/configuration.html#plugins"
              target="_blank"
            >plugins</a>
          </b> property specifies plugins to be used in order to work on the bundle. For instance
          to uglify/minify the bundle.
          <a
            href="http://webpack.github.io/docs/using-plugins.html"
            target="_blank"
            title="Webpack using plugins"
          >[*]</a>
        </p>
        <p>
          <b>
            The
            <a
              href="https://webpack.github.io/docs/configuration.html#module-loaders"
              target="_blank"
            >loaders</a>
          </b> property specifies loaders to transform files. A loader is basically a function that
          takes a resource/file as input, performs a transformation of the content of that file,
          and finally returns a new file to be used in the bundle.
          <a
            href="http://webpack.github.io/docs/using-loaders.html"
            target="_blank"
            title="Webpack using loaders"
          >[*]</a>
          For example taking an input file written with ES6 syntax, using babel to transpile the
          content, and then return a new file with browser compatible ES5 syntax for the bundle.
        </p>
        <p>
          Below is slimmed version of the webpack.config used for this site.
        </p>
        <Highlight className="js">
          {`const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './app/index'
  ],
  output: {
    path: path.resolve(__dirname, 'public/assets/javascript'),
    filename: 'index.js',
    publicPath: 'public/assets/javascript/'
  },
  plugins: [new webpack.optimize.OccurenceOrderPlugin()],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'app')],
        exclude: /node_modules/,
        test: /\.js/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};`}
        </Highlight>
        <p>
          When the configuration is done, the bundle is created by running the command
          <b>webpack</b> from the root of the project.
        </p>
        <h4>TravisCI</h4>
        <p>
          <a
            href="https://travis-ci.org"
            target="_blank"
          >Travis CI</a>
          "is a hosted
          <a
            href="http://www.martinfowler.com/articles/continuousIntegration.html"
            target="_blank"
          >continuous integration</a> and deployment system"
          <a
            href="https://github.com/travis-ci/travis-ci"
            target="_blank"
            title="TravisCI Readme"
          >[*]</a> that I will use since it is easy to use together with GitHub.
        </p>
        <p>
          The idea is to add a ".travis.yml" file to instruct Travis to perform a set of tasks.
          The tasks I want to add are to perform an "npm install", running the tests, running
          <a
            href="http://eslint.org/"
            target="_blank"
          >eslint</a>, and if all passes, building the JavaScript to be used. Okay, let's go,
          .travis.yml!
        </p>
        <Highlight className="yaml">
          {`language: node_js
node_js:
  - "6"
before_install:
  # Repo for newer Node.js versions
  - curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  # Repo for Yarn
  - sudo apt-key adv --fetch-keys http://dl.yarnpkg.com/debian/pubkey.gpg
  - echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  - sudo apt-get update -qq
  - sudo apt-get install -y -qq yarn
cache:
  directories:
  - $HOME/.yarn-cache
script:
  - yarn run lint
  - yarn run test
  - yarn run build
`}
        </Highlight>
        <p>
          Note: Am currently trying the above travis file, will update when making progress...
        </p>
      </article>
      <article>
        <h2>Continuous Delivery Pipeline - Take one</h2>
        <p>
          So this is my attempt at creating a continuous delivery pipeline.
          First it seems like a good idea to just deliver something to a
          server manually to get a feel for what needs to be done,
          and what steps can be automated.
        </p>
        <h3>The project structure</h3>
        <p>
          The focus is on the delivery pipeline, not on the content. In other words, no worries
          about what library to chose, how to configure webpack, or what color to use on the
          headlines. It is actually really difficult to let go of all that. But need to move
          forward!
        </p>
        <p>
          So, the structure consists of an index.html file that actually is the page, as well as
          a public directory containing any assets. The assets for the time being are one simple
          stylesheet and a svg image.
        </p>
        <Highlight className="bash">
          {`|-rootDirectory
| |-public
| | |-assets
| | | |-images
| | | | |-logo.svg
| | | |-styles
| | | | |-style.css
| |-index.html`}
        </Highlight>
        <p>
          The project is checked in at
          <a
            target="_blank"
            href="https://github.com/w1nston/jwdotcom"
          >Github</a>.
        </p>
        <h3>The server structure</h3>
        <p>
          The server is running on a virtual private server (VPS), setup with Ubuntu 14.04 LTS.
          Following the guides on
          <a
            target="_blank"
            href="https://www.linode.com/docs/security/securing-your-server"
          >Linode</a>, and in the home
          directory the project is cloned from Github. I then copied the index.html and the
          public directory to
        </p>
        <Highlight className="bash">
          {`/srv/www/example.com/<date>/`}
        </Highlight>
        <p>
          To serve the content I use
          <a
            target="_blank"
            href="https://nginx.org/en/"
          >nginx</a>, and am pointing the root location to
        </p>
        <Highlight className="bash">
          {`/srv/www/example.com/latest`}
        </Highlight>
        <p>
          where the <i>latest</i>-directory is simply a symbolic link pointing to
          another
          sibling directory named with a date. This makes it easy to point to a new release
          once available.

        </p>
        <Highlight className="bash">
          {`20160810/
20160917/
latest -> 20160917/`}
        </Highlight>
        <h3>Reflections</h3>
        <p>
          I have a first version of a pipeline, maybe not much of a continuous delivery
          pipeline just yet, but lets see what we got.
        </p>
        <p>
          With this approach the pipeline looks like follows. I do a change in the source code,
          push it to the origin repository. Manually login to the VPS, pull the new changes,
          copy them to a new directory, and name it with the current date. Oh, wait! What about
          two or more releases during one day?
        </p>
        <p>
          I clearly need to figure out a better way to deal with release versions, duly noted.
          But lets move on...
        </p>
        <p>
          Once the files are copied over to the versioned release directory and we feel lucky.
          A new symlink needs to be created, and it should of course point to the most recent
          release version.
        </p>
        <p>
          So, a lot of manual steps, but that's what's to be expected since the goal was to
          just get anything working. It is easier to improve something than it is to create
          something perfect from the beginning.
        </p>
        <h3>Improvement points</h3>
        <p>
          So, what can be improved? Initially I see two things to improve: release versioning,
          and the number of manual steps.
        </p>
        <h4>Release versioning</h4>
        <p>
          Okay, so just a date won't cut it. Lets play a little with something similar to
          <a
            target="_blank"
            href="http://semver.org/">
            semver
          </a>. The date part is not totally useless, but it needs a little more. Another type
          of sequence to distinguish if it is the first, or second release of the day etc. Lets
          play with the following format.
        </p>
        <Highlight className="bash">
          {`<year>.<month>.<day>.<version>.<patch version>

// E.g.

2016.09.18.1.0`}
        </Highlight>
        <p>
          Right now I can't really think of anything as to why not to try this versioning, so
          I'll just go ahead and evaluate it for now.
        </p>
        <h4>Number of manual steps</h4>
        <p>
          From the git push command there shouldn't be too many steps before a new release
          can be tested, and finally deployed. With this pipeline there are at least five steps
          before a new release sees the light of day.
        </p>
        <p>
          One step to login to the VPS, one step to pull the updates from Github, one step to
          copy the files to a new versioned release directory, one step to redirect the
          <i>latest</i>-symlink, and lastly, one step to reload the nginx-server.
        </p>
        <p>
          So, what to do? I suppose it's time to try som shell scripting. Now what would I need
          in form of a shell script then? Let's see, without changing anything but just automate
          all steps a script could consist of something like the following.
        </p>
        <Highlight className="bash">
          {`#!/usr/bin/env bash

# 1) Fetch latest source code from Github, perhaps by listening on git hooks
...

# 2) Copy just the needed files to /srv/www/example.com/2016.09.18.1.0/
...

# 3) Symlink the directory "latest" to the most recent release directory
...

# 4) Restart nginx
...`}
        </Highlight>
        <p>
          Although, I found
          <a
            target="_blank"
            href="https://serversforhackers.com/video/automating-deployment-from-github"
          >something interesting</a> that got me thinking about a different structure. At first
          I've considered that I don't want to expose the entire repository from Github. Now
          I start to think that maybe it's cleaner just to clone a new repository on every
          release, and do the build step with the script as well.
        </p>
        <p>
          I am thinking that I'll try out the following instead, and simply skip the copying
          step.
        </p>
        <Highlight className="bash">
          {`/srv/www/example.com/releases/2016.09.17.1.0
/srv/www/example.com/releases/2016.09.18.1.0
/srv/www/example.com/latest -> /srv/www/example.com/releases/2016.09.18.1.0`}
        </Highlight>
      </article>
    </section>
  );
}
