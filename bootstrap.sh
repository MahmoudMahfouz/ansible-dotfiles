VENV_PATH=.venv

# python 3 required
python3 -m venv $VENV_PATH
source $VENV_PATH/bin/activate

pip3 install -r requirements.txt
