if [ "$PATHS" != "true" ]; then
    export PATHS="true"
#Manipulate and export PATH over here
fi
eval `ssh-agent`
