# 🍐 Pear Code Editor

Pear Code is a web editor that makes it possible to write code in a real-time **collaboratively** fashion and to **execute** it right inside the browser.

You can find it up and running here: [www.pearcode.it](https://www.pearcode.it)

Once you load the page, the URL is updated with a fresh new **_session id_** and can be shared with other people to start a real-time collaboration.

## Use cases

I know there are many similar tool out there, anyway I didn't find one that is at the same time free to use, with a good syntax highlight and able to execute
code in different language.

The main reason I feel the need for such a tool are:

* Technical interview
* Pair programming
* Proof of concept
* Debugging
* Share code snippets

## Supported languages so far

At the moment the list of executable language is short but I'm working on it so stay tuned or raise a pull request!

Supported languages:
* Javascript (executed by the browser)
* Node.js
* C#
* Python (version 2 and 3)

## Project structure at glance

This repository consists of two main parts: a client application (the `editor` folder) and an API server that execute user's code (the `runner` folder). 

### 🍐 The editor

The editor part is a very simple React application powered by [Firepad](https://firepad.io/), [Firebase](https://firebase.google.com) 
and [Monaco Editor](https://microsoft.github.io/monaco-editor/index.html).

You'll just find bad and dirty integrations of libraries here, man.

### 🏃 The runner

In a nutshell, the runner is a Node JS server which takes advantage of Docker isolation to run the user code within a safe disposable environment.

With more detail, it:

* waits for HTTP requests from the editor indicating that user pressed the _RUN_ button
* retrieve the user code from Firebase
* execute the user code inside a Docker image and wait for its output
* write the output inside the Firebase database which will automatically update the output panel on the client

**It's worth to note that the only _direct communication_ between the client and the runner consists of the _session id_. All other 
communication is based on the firebase real-time syncronization**

## Contribuition

Any kind of pull-request or suggestion is welcome.
If you want to add support for a new language you can refer to the next sub-sections.

### Add support to new languages

You can make a new language executable by the editor almost without writing any code.
What you need to do is to find the proper Docker image - the lighter the better - able to run your language of choice.

Depending on the language, there are two alternative scenarios:

1. the language can be executed within a REPL (e.g. python or javascript)
2. the language needs some initial project configuration and/or compilation before it can be executed (e.g. C#)

The first scenario is the simplest: you only need to create a **single** bash script (i.e. `run.sh`) that will be executed each time the user press the _Run_ button on the editor.

The second scenario is a bit more complex because of the project configuration and compilation.
In this case you need to create **two** bash scripts (i.e. `init.sh` and `run.sh`); as you can image the additional script act as a project initilizer
and will be executed just once for each new editor _session_.

Let's see the two scenarios separately to be more clear on what to do.

#### Scenario 1: REPL executable language

Let's now see the required steps with order:

* check if the language is supported by the Monaco Editor, the list is [here](https://github.com/Microsoft/monaco-languages)
    * at the moment I haven't faced how to (or if) support languages not in that list
    * keep note of the exact way the language is named in that list (e.g. C# is _csharp_ no space, all lowercase): this will be our _language id_
* edit the file `config.yaml` by adding the new _language id_ key under the `languages` section
    * the only field you need to add is `repl: true`
* create a new folder under the directory `languages` and name it as the _language id_
* create a new file named `run.sh` inside the new language folder and give it execution permission: `chmod +x run.sh`
* the body of `run.sh` is all you need to conceive on your own and [this section](#the-run-sh-script) give you some hint about how to write it


#### Scenario 2: compiled language

As already said in this case there is a bit more work to do:

* check if the language is supported by the Monaco Editor, the list is [here](https://github.com/Microsoft/monaco-languages)
    * at the moment I haven't faced how to support languages not in that list
    * keep note of the exact way the language is named in that list (e.g. C# is _csharp_ no space, all lowercase): this will be our _language id_
* edit the file `config.yaml` by adding the new _language id_ key under the `languages` section
    * you need to add two fields:
        * `repl: false`
        * `main: <YourEntryPoint.ext>` the content of this file will be automaitcally replaced with the user's snippet when he press the _Run_ button
* create a new folder under the directory `languages` and name it as the _language id_
* create two new files named `init.sh` and `run.sh` inside the new language folder and give them execution permission: `chmod +x init.sh && chmod +x run.sh`
* the body of `init.sh` and `run.sh` is all you need to conceive on your own and the next two sections give you some hint about how to write them.

### The `init.sh` script

Rather then try to explain how to write this script I'll comment what already done for the C# language.
I trust that any other compiled language will be almost the same.
Also note that your script will automatically receive the same arguments and environement variables that you can see in
the below script.

**_languages/csharp/init.sh_**
``` bash
#!/usr/bin/env bash

#  $1 argument is the session identifier received by the client;
#  we need to create a new folder named as this session id and create an empty project inside it.
#
#  First check that the folder doesn't exists, otherwise the project has already been initialized 
#  and there isn't nothing to do.
if [ ! -d "${BASE_PATH}/languages/csharp/sessions/$1" ]; then    

    # Create the directory for the new session inside the the proper language folder
    mkdir $BASE_PATH/languages/csharp/sessions/$1

    # initialize an empty project inside the just created folder
    # using the official microsoft/dotnet image 
    docker run --rm -i \
        -v $BASE_PATH/languages/csharp/sessions/$1:/sessions/$1 \
        --workdir /sessions/$1 \
        microsoft/dotnet:2.2-sdk dotnet new console
fi
```

After the execution of this script, an empty project has been created inside the `languages/csharp/<session id>` folder with this structure:
```
.
├── <session id>.csproj
├── Program.cs          <--- this is entry point for C# projects
├── app
├── bin
└── obj
```
notice that the `Program.cs` file name is the entry point for a C# project so this is the name that you need to add in `config.yaml` 
under the `main` field.


### The `run.sh` script

#### REPL languages
The `run.sh` script will be responsible to run the user's snippet. In the REPL scenario its first argument `$1` contains the code to run
so all you need to do is to pass it to the REPL, for example this is the script for Python:

``` bash
docker run --rm -i \
    --network="none" \
    --user $RUN_AS_USER_ID \
    python:$Version python -c "${1}"
```

If you are asking where the `$Version` came from, it is an option coming from the language configuration. In effect
each option defined in the language configuration is available inside the script as environment variables.

#### Compiled languages
For compiled languages the first argument `$1` is the _session id_ that you will use to locate the project.
The following is the script that compile and run a C# project.

``` bash
#!/usr/bin/env bash

buildOut=$(docker run --rm -i \
    -v $BASE_PATH/languages/csharp/sessions/$1:/sessions/$1 \
    --workdir /sessions/$1 \
    microsoft/dotnet:2.2-sdk dotnet publish --output app --configuration Release)

buildExitCode=$?
if [ $buildExitCode -ne 0 ]; then
    echo $buildOut
    exit $buildExitCode
fi

chown -R $RUN_AS_USER_ID $BASE_PATH/languages/csharp/sessions/$1

docker run --rm -i \
    --network="none" \
    --user $RUN_AS_USER_ID \
    --env COMPlus_EnableDiagnostic=0 \
    -v $BASE_PATH/languages/csharp/sessions/$1:/sessions/$1:ro \
    --workdir /sessions/$1 \
    microsoft/dotnet:2.2-sdk dotnet app/$1.dll
```

Remember that the entry point file (Program.cs for C#) is automatically replaced with user snippet so you
don't have to worry about it.

Also note some precaution like disabled network and specific user id that mitigate the risk of improper use of the
editor.

## Next Steps

Apart of adding new languages support there are some core features or improvements that I'm plannig to do.
What follows is a rough reminder of what I'm going to implement in the near future.

* expose the full language configuration to the client so that adding new language support doesn't require to touch the web editor

* if there is a selection active in the editor then execute only the portion of code selected
    (this can make sense only in certain languages)

* limit resource on docker container
    * limit execution time
    * limit file size (maybe on firebase?)
    * limit memory usage
    * limit cpu usage

* better security policy on firebase
* cron to remove old sessions
* initial code for boilerplated languages
* output should auto scroll down
* code completion for C#

