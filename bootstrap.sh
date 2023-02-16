/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install llvm rust openssl

export CPPFLAGS=-I/usr/local/opt/openssl/include
export LDFLAGS=-L/usr/local/opt/openssl/lib

USER="$(whoami)"
sudo /bin/sh -c 'echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER'

VENV_PATH=.venv
# python 3 required
python3 -m venv $VENV_PATH
source $VENV_PATH/bin/activate

pip3 install -r requirements.txt

ansible-galaxy collection install community.general
