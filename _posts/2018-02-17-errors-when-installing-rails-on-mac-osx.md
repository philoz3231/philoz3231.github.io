---
id: 1073
title: Errors when installing rails on mac OSX
date: 2018-02-17T17:34:50+09:00
author: luis
layout: post
guid: http://localhost/wordpress/?p=1073
permalink: /en/2018/02/17/errors-when-installing-rails-on-mac-osx/
image: /assets/wp-content/uploads/2018/02/4223-1-270x270.png
tags: [develop]
categories: [develop, rails]
---
When I installing rails recent version on my mac osx high sierra, there are two errors. So, I find how to solve the problems.

<strong>1.Basic install method</strong>

<a href="https://gorails.com/setup/osx/10.13-high-sierra" target="_blank" rel="noopener">https://gorails.com/setup/osx/10.13-high-sierra</a>

You can find basic install method at the link. you should install 5 component on your mac to make rails projects: homebrew, rbenv, ruby-build, ruby, rails.

Homebrew is package management tool for mac. rbenv/ruby-build is ruby version management tool. ruby is script or package for ruby programming like python. Lastly, rails is framework for web programming on ruby.

&nbsp;

<strong>2. failed at installing 'ffi 1.9.21'</strong>
<pre class="default prettyprint prettyprinted"><code><span class="str">Make sure that `gem install ffi -v '1.9.21'` succeeds before bundling.</span></code></pre>
After I finished the job I've told, I typed 'rails server' to activate rails. But, such error comes out. I think It is &nbsp;ffi recent version bug. You can write gem 'ffi','1.9.18' at Gemfile. Then It work.

<a href="https://github.com/ffi/ffi/issues/608" target="_blank" rel="noopener">https://github.com/ffi/ffi/issues/608</a>

&nbsp;

<strong>3. MySQL2 Gem install fail</strong>
<pre class="default prettyprint prettyprinted"><code><span class="str">Don't know how to set rpath on your system, if MySQL libraries are not in path mysql2 may not load
</span></code></pre>
Default database for rails is sqlite3. But If you want to use mysql, you should install mysql2 gem on your rails project. But rails (high sierra &amp; Xcode already installed &amp; mysql installed) can't find mysql libraries on my mac. According to Stackoverflow, it is because of Xcode command line tool doesn't work. You should reinstall it, even if you have Xcode. I solve the problem by typing&nbsp;‘xcode-select –install’ at terminal.

<a href="https://stackoverflow.com/questions/43661360/install-mysql2-gem-on-macos-sierra" target="_blank" rel="noopener">https://stackoverflow.com/questions/43661360/install-mysql2-gem-on-macos-sierra</a>